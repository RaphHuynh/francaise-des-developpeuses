#!/bin/bash

# Script de dépannage pour les erreurs courantes
set -e

echo "🔧 Script de dépannage Docker..."

# Fonction pour afficher les couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "\n${YELLOW}1. Vérification des fichiers de verrouillage...${NC}"
if [ ! -f "package-lock.json" ]; then
    echo -e "${RED}❌ package-lock.json manquant${NC}"
    echo -e "${YELLOW}🔧 Génération du package-lock.json...${NC}"
    rm -rf node_modules
    npm install
    echo -e "${GREEN}✅ package-lock.json généré${NC}"
else
    echo -e "${GREEN}✅ package-lock.json présent${NC}"
fi

echo -e "\n${YELLOW}2. Nettoyage Docker...${NC}"
echo "🧹 Arrêt de tous les conteneurs..."
docker-compose down --remove-orphans

echo "🧹 Suppression des images obsolètes..."
docker system prune -f

echo "🧹 Suppression des volumes orphelins..."
docker volume prune -f

echo -e "\n${YELLOW}3. Reconstruction complète...${NC}"
echo "🔨 Construction des images sans cache..."
docker-compose build --no-cache --pull

echo -e "\n${YELLOW}4. Test de construction seulement...${NC}"
echo "🧪 Test de construction de l'application..."
if docker-compose build app; then
    echo -e "${GREEN}✅ Construction réussie${NC}"
else
    echo -e "${RED}❌ Échec de la construction${NC}"
    echo -e "${YELLOW}💡 Solutions possibles :${NC}"
    echo "   - Vérifiez votre fichier package.json"
    echo "   - Vérifiez que toutes les dépendances sont correctes"
    echo "   - Utilisez le Dockerfile.simple : cp Dockerfile.simple Dockerfile"
    exit 1
fi

echo -e "\n${YELLOW}5. Démarrage des services...${NC}"
docker-compose up -d db
sleep 15
docker-compose up -d app
sleep 10

echo -e "\n${YELLOW}6. Vérification finale...${NC}"
docker-compose ps

echo -e "\n${GREEN}🎉 Dépannage terminé !${NC}"
echo -e "Si des problèmes persistent :"
echo -e "  - Consultez les logs : ${YELLOW}docker-compose logs app${NC}"
echo -e "  - Utilisez le Dockerfile simplifié : ${YELLOW}cp Dockerfile.simple Dockerfile${NC}"
echo -e "  - Vérifiez votre configuration .env"
