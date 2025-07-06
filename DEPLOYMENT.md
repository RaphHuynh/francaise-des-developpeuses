# Guide de déploiement sur VPS

## Prérequis sur le VPS

1. **Ubuntu/Debian 20.04+ ou CentOS 8+**
2. **Docker et Docker Compose installés**
3. **Un nom de domaine pointant vers votre VPS**
4. **Ports 80 et 443 ouverts**

## Installation des prérequis

```bash
# Mise à jour du système
sudo apt update && sudo apt upgrade -y

# Installation de Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Installation de Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Redémarrer la session
logout
```

## Étapes de déploiement

### 1. Cloner le projet sur le VPS

```bash
git clone <votre-repo-url> francaise-des-developpeuses
cd francaise-des-developpeuses
```

### 2. Configurer les variables d'environnement

```bash
# Copier et éditer le fichier d'environnement
cp .env.production .env
nano .env
```

**Modifiez les valeurs suivantes :**
- `DATABASE_URL` : URL de connexion PostgreSQL
- `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD` : Credentials DB
- `NEXTAUTH_URL` : Votre domaine (https://votre-domaine.com)
- `NEXTAUTH_SECRET` : Générez un secret sécurisé
- `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` : Si vous utilisez GitHub OAuth

### 3. Configurer Nginx

```bash
# Éditer la configuration Nginx
nano nginx.conf
```

Remplacez `votre-domaine.com` par votre vrai domaine.

### 4. Première construction et déploiement

```bash
# Option A: Utiliser le script automatique (recommandé)
./deploy.sh

# Option B: Étape par étape si vous préférez contrôler
# Générer package-lock.json si nécessaire
npm install

# Construire et démarrer sans SSL d'abord
docker-compose up -d db
sleep 30
docker-compose up -d app

# Exécuter les migrations (peut échouer au premier démarrage)
docker-compose exec app npx prisma migrate deploy || echo "Migrations à exécuter manuellement"
```

**Note importante :** Si les migrations échouent au premier démarrage, c'est normal. Vous pouvez les exécuter manuellement après que tous les services soient en cours d'exécution.

### 5. Configurer SSL (Let's Encrypt)

```bash
# Modifier le script SSL
nano setup-ssl.sh
# Changer DOMAIN et EMAIL

# Exécuter le script SSL
./setup-ssl.sh
```

### 6. Démarrer tous les services

```bash
# Utiliser le script de déploiement
./deploy.sh
```

## Commandes utiles

### Vérifier les logs
```bash
docker-compose logs -f app
docker-compose logs -f db
docker-compose logs -f nginx
```

### Redémarrer les services
```bash
docker-compose restart
```

### Mettre à jour l'application
```bash
git pull origin main
./deploy.sh
```

### Sauvegarder la base de données
```bash
docker-compose exec db pg_dump -U $POSTGRES_USER $POSTGRES_DB > backup.sql
```

### Restaurer la base de données
```bash
docker-compose exec -T db psql -U $POSTGRES_USER $POSTGRES_DB < backup.sql
```

## Monitoring et maintenance

### Vérifier l'état des conteneurs
```bash
docker-compose ps
docker stats
```

### Nettoyer les images inutilisées
```bash
docker system prune -a
```

### Vérifier l'espace disque
```bash
df -h
docker system df
```

## Dépannage

### Erreur 'ContainerConfig' lors du démarrage
Si vous obtenez l'erreur `KeyError: 'ContainerConfig'`, c'est que l'image Docker est corrompue :

```bash
# Solution automatique
./fix-docker.sh

# Solution manuelle
docker-compose down --remove-orphans
docker system prune -af
docker-compose build --no-cache
./deploy.sh
```

### Si l'application ne démarre pas
1. Vérifiez les logs : `docker-compose logs app`
2. Vérifiez les variables d'environnement
3. Assurez-vous que la DB est accessible

### Si SSL ne fonctionne pas
1. Vérifiez que le domaine pointe vers le VPS
2. Vérifiez les ports 80/443 ouverts
3. Relancez `./setup-ssl.sh`

### Si la DB ne se connecte pas
1. Vérifiez les credentials dans `.env`
2. Vérifiez que le conteneur DB fonctionne
3. Testez la connexion : `docker-compose exec app npx prisma db pull`

## Sécurité

1. **Changez tous les mots de passe par défaut**
2. **Configurez un firewall (UFW)**
3. **Mettez à jour régulièrement le système**
4. **Sauvegardez régulièrement la base de données**
5. **Surveillez les logs pour les tentatives d'intrusion**

## URLs importantes

- **Application** : https://votre-domaine.com
- **Base de données** : Accessible seulement en interne
- **Logs** : `docker-compose logs`
