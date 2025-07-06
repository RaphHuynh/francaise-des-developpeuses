#!/bin/bash

# Script de nettoyage et reconstruction Docker
set -e

echo "🧹 Nettoyage complet de Docker et reconstruction..."

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}1. Arrêt et suppression de tous les conteneurs...${NC}"
docker-compose down --remove-orphans

echo -e "${YELLOW}2. Suppression des images corrompues...${NC}"
docker rmi francaise-des-developpeuses_app 2>/dev/null || echo "Image n'existait pas"
docker rmi $(docker images -f "dangling=true" -q) 2>/dev/null || echo "Pas d'images orphelines"

echo -e "${YELLOW}3. Nettoyage du système Docker...${NC}"
docker system prune -af
docker volume prune -f

echo -e "${YELLOW}4. Vérification du fichier .env...${NC}"
if [ ! -f ".env" ]; then
    echo -e "${RED}❌ Fichier .env manquant!${NC}"
    cp .env.production .env
    echo -e "${GREEN}✅ Fichier .env créé${NC}"
fi

# Vérification de la cohérence des credentials
DB_USER=$(grep POSTGRES_USER .env | cut -d '=' -f2)
DB_PASS=$(grep POSTGRES_PASSWORD .env | cut -d '=' -f2)
DB_NAME=$(grep POSTGRES_DB .env | cut -d '=' -f2)

echo -e "${YELLOW}5. Vérification de la cohérence des credentials...${NC}"
echo "POSTGRES_USER: $DB_USER"
echo "POSTGRES_DB: $DB_NAME"

# Corriger DATABASE_URL si nécessaire
CURRENT_DB_URL=$(grep DATABASE_URL .env | cut -d '"' -f2)
EXPECTED_DB_URL="postgresql://$DB_USER:$DB_PASS@db:5432/$DB_NAME"

if [ "$CURRENT_DB_URL" != "$EXPECTED_DB_URL" ]; then
    echo -e "${YELLOW}🔧 Correction de DATABASE_URL...${NC}"
    sed -i "s|DATABASE_URL=.*|DATABASE_URL=\"$EXPECTED_DB_URL\"|g" .env
    echo -e "${GREEN}✅ DATABASE_URL corrigé${NC}"
fi

echo -e "${YELLOW}6. Génération de package-lock.json si nécessaire...${NC}"
if [ ! -f "package-lock.json" ]; then
    npm install
    echo -e "${GREEN}✅ package-lock.json généré${NC}"
fi

echo -e "${YELLOW}7. Reconstruction complète des images...${NC}"
docker-compose build --no-cache --pull

echo -e "${YELLOW}8. Démarrage étape par étape...${NC}"

# Démarrer la base de données d'abord
echo "🗄️ Démarrage de la base de données..."
docker-compose up -d db

# Attendre que la DB soit prête
echo "⏳ Attente de la base de données (45s)..."
sleep 45

# Vérifier que la DB fonctionne
echo "🧪 Test de la base de données..."
docker-compose exec db psql -U $DB_USER -d $DB_NAME -c "SELECT 1;" > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Base de données opérationnelle${NC}"
else
    echo -e "${RED}❌ Problème avec la base de données${NC}"
    echo "Logs de la DB:"
    docker-compose logs db | tail -20
    exit 1
fi

# Démarrer l'application
echo "🚀 Démarrage de l'application..."
docker-compose up -d app

# Attendre que l'app soit prête
echo "⏳ Attente de l'application (30s)..."
sleep 30

# Exécuter les migrations
echo "🗄️ Exécution des migrations..."
docker-compose exec app npx prisma migrate deploy || {
    echo -e "${YELLOW}⚠️ Migrations échouées, tentative de reset...${NC}"
    docker-compose exec app npx prisma migrate reset --force
    docker-compose exec app npx prisma migrate deploy
}

echo -e "${YELLOW}9. Vérification finale...${NC}"
docker-compose ps

echo -e "\n${GREEN}🎉 Reconstruction terminée avec succès!${NC}"
echo -e "Votre application devrait maintenant fonctionner."
echo -e "Vérifiez avec: ${YELLOW}./healthcheck.sh${NC}"
