# Française des Développeuses

Application Next.js pour la communauté des développeuses françaises.

## 🚀 Déploiement sur VPS

### Prérequis
- VPS avec Ubuntu/Debian 20.04+
- Docker et Docker Compose installés
- Nom de domaine pointant vers le VPS
- Ports 80 et 443 ouverts

### Installation rapide

1. **Cloner le projet**
```bash
git clone <votre-repo-url> francaise-des-developpeuses
cd francaise-des-developpeuses
```

2. **Configurer l'environnement**
```bash
cp .env.production .env
nano .env  # Modifier avec vos vraies valeurs
```

3. **Configurer le domaine**
```bash
nano nginx.conf  # Remplacer votre-domaine.com
nano setup-ssl.sh  # Modifier DOMAIN et EMAIL
```

4. **Déployer**
```bash
./deploy.sh
```

5. **Configurer SSL**
```bash
./setup-ssl.sh
```

### Fichiers créés pour le déploiement

- `Dockerfile` - Configuration Docker
- `docker-compose.yml` - Services en production
- `nginx.conf` - Configuration du reverse proxy
- `.env.production` - Variables d'environnement
- `deploy.sh` - Script de déploiement automatique
- `setup-ssl.sh` - Configuration SSL automatique
- `backup.sh` - Script de sauvegarde
- `healthcheck.sh` - Monitoring de l'application
- `DEPLOYMENT.md` - Guide détaillé

### Commandes utiles

```bash
# Vérifier l'état
./healthcheck.sh

# Sauvegarder
./backup.sh

# Voir les logs
docker-compose logs -f app

# Redémarrer
docker-compose restart

# Mettre à jour
git pull && ./deploy.sh
```

### Monitoring (optionnel)

Pour activer le monitoring avec Prometheus et Grafana :

```bash
docker-compose -f docker-compose.yml -f docker-compose.monitoring.yml --profile monitoring up -d
```

- Grafana : http://votre-domaine.com:3001 (admin/admin)
- Prometheus : http://votre-domaine.com:9090

## 📋 Étapes de déploiement détaillées

Consultez le fichier [DEPLOYMENT.md](./DEPLOYMENT.md) pour un guide complet.

## 🔧 Développement local

### Avec Devcontainers
- Téléchargez l'extension [Devcontainers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
- Cliquez sur **Reopen In Container** dans le sous menu
- Remplissez vos variables d'environnement à l'aide du `.env.example`
- Lancez `pnpm dlx prisma generate`
- Exécutez `pnpm run dev`

### Installation classique
```bash
npm install
cp .env.example .env  # Configurez vos variables
npx prisma generate
npm run dev
```

## 🏗️ Architecture

- **Frontend** : Next.js 14 avec TypeScript
- **Base de données** : PostgreSQL avec Prisma
- **Authentification** : NextAuth.js
- **Styling** : Tailwind CSS
- **Déploiement** : Docker + Nginx + Let's Encrypt

## 📞 Support

Pour toute question sur le déploiement, consultez les logs avec `docker-compose logs` ou utilisez le script `healthcheck.sh` pour diagnostiquer les problèmes.
