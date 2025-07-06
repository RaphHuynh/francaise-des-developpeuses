#!/bin/bash

# Script pour configurer SSL avec Let's Encrypt
set -e

DOMAIN="votre-domaine.com"
EMAIL="votre-email@example.com"

echo "🔒 Configuration SSL avec Let's Encrypt pour $DOMAIN"

# Créer le dossier SSL
mkdir -p ssl

# Installer Certbot si nécessaire
if ! command -v certbot &> /dev/null; then
    echo "📦 Installation de Certbot..."
    sudo apt update
    sudo apt install -y certbot python3-certbot-nginx
fi

# Arrêter nginx temporairement
docker-compose stop nginx

# Obtenir le certificat SSL
echo "🎫 Obtention du certificat SSL..."
sudo certbot certonly --standalone \
    --email $EMAIL \
    --agree-tos \
    --no-eff-email \
    -d $DOMAIN \
    -d www.$DOMAIN

# Copier les certificats
sudo cp /etc/letsencrypt/live/$DOMAIN/fullchain.pem ssl/
sudo cp /etc/letsencrypt/live/$DOMAIN/privkey.pem ssl/
sudo chown $(whoami):$(whoami) ssl/*.pem

# Redémarrer nginx
docker-compose up -d nginx

echo "✅ SSL configuré avec succès!"

# Configurer le renouvellement automatique
echo "⏰ Configuration du renouvellement automatique..."
(crontab -l 2>/dev/null; echo "0 12 * * * /usr/bin/certbot renew --quiet --deploy-hook 'docker-compose restart nginx'") | crontab -

echo "🎉 Configuration SSL terminée!"
