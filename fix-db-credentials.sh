#!/bin/bash

# Script pour corriger rapidement les credentials de base de données
set -e

echo "🔧 Correction des credentials de base de données..."

# Vérifier si .env existe
if [ ! -f ".env" ]; then
    echo "❌ Fichier .env introuvable!"
    exit 1
fi

echo "📋 Configuration actuelle:"
echo "DATABASE_URL: $(grep DATABASE_URL .env)"
echo "POSTGRES_USER: $(grep POSTGRES_USER .env)"

# Backup du fichier .env
cp .env .env.backup.$(date +%Y%m%d_%H%M%S)

# Corriger la DATABASE_URL pour qu'elle utilise les mêmes credentials que POSTGRES_USER et POSTGRES_PASSWORD
sed -i 's|DATABASE_URL="postgresql://raphhuynh:huynh@db:5432/fr_des_dev_db"|DATABASE_URL="postgresql://admin_raph:AdminRaph51100\&@db:5432/fr_des_dev_db"|g' .env

# Générer un vrai secret NextAuth si ce n'est pas fait
if grep -q "$(openssl rand -base64 32)" .env; then
    NEXTAUTH_SECRET=$(openssl rand -base64 32)
    sed -i "s|NEXTAUTH_SECRET=.*|NEXTAUTH_SECRET=$NEXTAUTH_SECRET|g" .env
fi

echo "✅ Credentials corrigés!"
echo "📋 Nouvelle configuration:"
echo "DATABASE_URL: $(grep DATABASE_URL .env)"

echo "🔄 Redémarrage des services..."

# Arrêter tous les conteneurs
docker-compose down

# Supprimer le volume de la base de données pour repartir à zéro
docker volume rm francaise-des-developpeuses_postgres_data 2>/dev/null || echo "Volume n'existait pas"

# Redémarrer la base de données
docker-compose up -d db

echo "⏳ Attente de la base de données (30s)..."
sleep 30

# Vérifier la connexion
echo "🧪 Test de connexion..."
if docker-compose exec db psql -U admin_raph -d fr_des_dev_db -c "SELECT 1;" > /dev/null 2>&1; then
    echo "✅ Connexion réussie!"
else
    echo "❌ Échec de connexion - Vérification des logs:"
    docker-compose logs db | tail -10
fi

echo "🚀 Redémarrage de l'application..."
docker-compose up -d app

sleep 20

echo "🗄️ Exécution des migrations..."
docker-compose exec app npx prisma migrate deploy

echo "🎉 Correction terminée!"
echo "Votre application devrait maintenant fonctionner correctement."
