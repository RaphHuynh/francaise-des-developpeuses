#!/bin/bash

# Script de déploiement pour VPS
set -e

echo "🚀 Début du déploiement..."

# Arrêter les conteneurs existants
echo "📦 Arrêt des conteneurs existants..."
docker-compose down

# Construire les nouvelles images
echo "🔨 Construction des nouvelles images..."
docker-compose build --no-cache

# Démarrer les services
echo "▶️ Démarrage des services..."
docker-compose up -d

# Attendre que la base de données soit prête
echo "⏳ Attente de la base de données..."
sleep 30

# Exécuter les migrations Prisma
echo "🗄️ Exécution des migrations de base de données..."
docker-compose exec app npx prisma migrate deploy

# Vérifier que tout fonctionne
echo "✅ Vérification des services..."
docker-compose ps

echo "🎉 Déploiement terminé avec succès!"
echo "📱 Votre application est disponible sur https://votre-domaine.com"
