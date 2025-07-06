#!/bin/bash

# Script pour préparer le projet pour Docker
set -e

echo "🔧 Préparation du projet pour Docker..."

# Générer package-lock.json si il n'existe pas
if [ ! -f "package-lock.json" ]; then
    echo "📦 Génération du package-lock.json..."
    rm -rf node_modules
    npm install
    echo "✅ package-lock.json généré"
fi

# Vérifier que Prisma est configuré
if [ ! -f "prisma/schema.prisma" ]; then
    echo "❌ Fichier prisma/schema.prisma manquant!"
    exit 1
fi

echo "✅ Projet prêt pour Docker!"
echo "Vous pouvez maintenant exécuter: ./deploy.sh"
