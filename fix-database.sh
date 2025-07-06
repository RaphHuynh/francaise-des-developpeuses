#!/bin/bash

# Script pour corriger la configuration de la base de données
set -e

echo "🔧 Correction de la configuration de la base de données..."

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Vérifier si le fichier .env existe
if [ ! -f ".env" ]; then
    echo -e "${RED}❌ Fichier .env manquant!${NC}"
    echo "Copie du fichier .env.production..."
    cp .env.production .env
fi

echo -e "${YELLOW}📋 Configuration actuelle de la base de données:${NC}"
echo "DATABASE_URL: $(grep DATABASE_URL .env || echo 'Non défini')"
echo "POSTGRES_USER: $(grep POSTGRES_USER .env | cut -d '=' -f2 || echo 'Non défini')"
echo "POSTGRES_DB: $(grep POSTGRES_DB .env | cut -d '=' -f2 || echo 'Non défini')"

echo -e "\n${YELLOW}🔧 Correction automatique...${NC}"

# Générer des credentials cohérents
DB_NAME="francaise_dev_db"
DB_USER="francaise_user"
DB_PASSWORD=$(openssl rand -base64 32 | tr -d "=+/" | cut -c1-25)

echo -e "${GREEN}Nouveaux credentials générés:${NC}"
echo "Base de données: $DB_NAME"
echo "Utilisateur: $DB_USER"
echo "Mot de passe: $DB_PASSWORD"

# Mettre à jour le fichier .env
echo -e "\n${YELLOW}📝 Mise à jour du fichier .env...${NC}"

# Backup de l'ancien .env
cp .env .env.backup

# Mettre à jour les variables
sed -i.bak "s|DATABASE_URL=.*|DATABASE_URL=\"postgresql://$DB_USER:$DB_PASSWORD@db:5432/$DB_NAME\"|g" .env
sed -i.bak "s|POSTGRES_DB=.*|POSTGRES_DB=$DB_NAME|g" .env
sed -i.bak "s|POSTGRES_USER=.*|POSTGRES_USER=$DB_USER|g" .env
sed -i.bak "s|POSTGRES_PASSWORD=.*|POSTGRES_PASSWORD=$DB_PASSWORD|g" .env

# Supprimer les fichiers de backup
rm -f .env.bak .env.backup.bak

echo -e "${GREEN}✅ Configuration mise à jour!${NC}"

echo -e "\n${YELLOW}🔄 Redémarrage des services de base de données...${NC}"

# Arrêter et supprimer les volumes de la DB pour repartir à zéro
docker-compose down
docker volume rm francaise-des-developpeuses_postgres_data 2>/dev/null || echo "Volume n'existait pas"

# Redémarrer la DB avec la nouvelle configuration
echo "🗄️ Redémarrage de la base de données..."
docker-compose up -d db

# Attendre que la DB soit prête
echo "⏳ Attente de la base de données (30s)..."
sleep 30

# Vérifier que la DB fonctionne
echo "🧪 Test de connexion à la base de données..."
if docker-compose exec db psql -U $DB_USER -d $DB_NAME -c "SELECT 1;" > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Connexion à la base de données réussie!${NC}"
else
    echo -e "${RED}❌ Échec de connexion à la base de données${NC}"
    echo "Vérification des logs..."
    docker-compose logs db | tail -10
fi

echo -e "\n${GREEN}🎉 Configuration de la base de données corrigée!${NC}"
echo -e "Vous pouvez maintenant:"
echo -e "  1. ${YELLOW}docker-compose up -d app${NC} - Démarrer l'application"
echo -e "  2. ${YELLOW}docker-compose exec app npx prisma migrate deploy${NC} - Exécuter les migrations"
echo -e "  3. ${YELLOW}./deploy.sh${NC} - Redéployer complètement"
