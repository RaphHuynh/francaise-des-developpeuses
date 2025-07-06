#!/bin/bash

# Script de monitoring pour vérifier la santé de l'application
set -e

echo "🔍 Vérification de la santé de l'application..."

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Fonction pour afficher le statut
show_status() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✅ $2${NC}"
    else
        echo -e "${RED}❌ $2${NC}"
    fi
}

# Vérifier si Docker est en cours d'exécution
docker --version > /dev/null 2>&1
show_status $? "Docker est installé et fonctionne"

# Vérifier si les conteneurs sont en cours d'exécution
APP_STATUS=$(docker-compose ps app | grep "Up" | wc -l)
DB_STATUS=$(docker-compose ps db | grep "Up" | wc -l)
NGINX_STATUS=$(docker-compose ps nginx | grep "Up" | wc -l)

show_status $APP_STATUS "Conteneur Application"
show_status $DB_STATUS "Conteneur Base de données"
show_status $NGINX_STATUS "Conteneur Nginx"

# Vérifier la connectivité HTTP
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:80 || echo "000")
if [ "$HTTP_STATUS" -eq "301" ] || [ "$HTTP_STATUS" -eq "200" ]; then
    echo -e "${GREEN}✅ HTTP accessible (Code: $HTTP_STATUS)${NC}"
else
    echo -e "${RED}❌ HTTP non accessible (Code: $HTTP_STATUS)${NC}"
fi

# Vérifier la connectivité HTTPS (si SSL configuré)
if [ -f "ssl/fullchain.pem" ]; then
    HTTPS_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://localhost:443 --insecure || echo "000")
    if [ "$HTTPS_STATUS" -eq "200" ]; then
        echo -e "${GREEN}✅ HTTPS accessible (Code: $HTTPS_STATUS)${NC}"
    else
        echo -e "${RED}❌ HTTPS non accessible (Code: $HTTPS_STATUS)${NC}"
    fi
fi

# Vérifier l'utilisation des ressources
echo -e "\n${YELLOW}📊 Utilisation des ressources :${NC}"
docker stats --no-stream --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.MemPerc}}"

# Vérifier l'espace disque
echo -e "\n${YELLOW}💾 Espace disque :${NC}"
df -h / | tail -1

# Vérifier les logs récents pour les erreurs
echo -e "\n${YELLOW}📋 Dernières erreurs dans les logs :${NC}"
docker-compose logs --tail=10 app | grep -i error || echo "Aucune erreur récente trouvée"

echo -e "\n${GREEN}🎉 Vérification terminée${NC}"
