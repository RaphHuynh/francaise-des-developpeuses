#!/bin/bash

# Script de sauvegarde automatique
set -e

# Configuration
BACKUP_DIR="/var/backups/francaise-des-developpeuses"
DATE=$(date +%Y%m%d_%H%M%S)
POSTGRES_USER=$(grep POSTGRES_USER .env | cut -d '=' -f2)
POSTGRES_DB=$(grep POSTGRES_DB .env | cut -d '=' -f2)

# Créer le dossier de sauvegarde
mkdir -p $BACKUP_DIR

echo "💾 Début de la sauvegarde..."

# Sauvegarde de la base de données
echo "🗄️ Sauvegarde de la base de données..."
docker-compose exec -T db pg_dump -U $POSTGRES_USER $POSTGRES_DB > $BACKUP_DIR/db_backup_$DATE.sql

# Sauvegarde des fichiers uploadés (si applicable)
echo "📁 Sauvegarde des fichiers..."
if [ -d "uploads" ]; then
    tar -czf $BACKUP_DIR/uploads_backup_$DATE.tar.gz uploads/
fi

# Sauvegarde de la configuration
echo "⚙️ Sauvegarde de la configuration..."
tar -czf $BACKUP_DIR/config_backup_$DATE.tar.gz .env nginx.conf docker-compose.yml

# Nettoyage des anciennes sauvegardes (garder 7 jours)
echo "🧹 Nettoyage des anciennes sauvegardes..."
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete

echo "✅ Sauvegarde terminée : $BACKUP_DIR"
echo "📊 Taille totale des sauvegardes :"
du -sh $BACKUP_DIR
