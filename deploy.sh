#!/bin/bash

# Script de déploiement pour VPS
set -e

echo "🚀 Début du déploiement..."

# Vérifier si package-lock.json existe, sinon le générer
if [ ! -f "package-lock.json" ]; then
    echo "📦 Génération du package-lock.json..."
    npm install
fi

# Arrêter les conteneurs existants
echo "📦 Arrêt des conteneurs existants..."
docker-compose down

# Nettoyer les images pour éviter les problèmes de cache
echo "🧹 Nettoyage des images..."
docker-compose build --no-cache

# Démarrer les services étape par étape
echo "🗄️ Démarrage de la base de données..."
docker-compose up -d db

# Attendre que la base de données soit prête
echo "⏳ Attente de la base de données..."
sleep 30

echo "🚀 Démarrage de l'application..."
docker-compose up -d app

# Attendre que l'application soit prête
echo "⏳ Attente de l'application..."
sleep 20

# Exécuter les migrations Prisma
echo "🗄️ Exécution des migrations de base de données..."
docker-compose exec app npx prisma migrate deploy || echo "⚠️ Migrations échouées - première installation ?"

# Démarrer nginx
echo "🌐 Démarrage de Nginx..."
docker-compose up -d nginx

# Vérifier que tout fonctionne
echo "✅ Vérification des services..."
docker-compose ps

echo "🎉 Déploiement terminé avec succès!"
echo "📱 Votre application est disponible sur http://votre-domaine.com (ou https:// si SSL configuré)"
echo "📊 Utilisez './healthcheck.sh' pour vérifier l'état de l'application"
