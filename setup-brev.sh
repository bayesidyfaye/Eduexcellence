#!/bin/bash
# ==============================================================================
# ÉduExcellence Nationale - Script de Déploiement NVIDIA Brev & NIM
# Hackathon NVIDIA - Guide d'Exécution sur GPU Brev (L4 / A10G / A100)
# ==============================================================================
set -e

echo "🚀 [1/6] Vérification de l'environnement NVIDIA Brev..."
if command -v nvidia-smi &> /dev/null; then
    echo "✅ GPU NVIDIA détecté sur l'instance Brev :"
    nvidia-smi --query-gpu=name,memory.total,driver_version --format=csv,noheader
else
    echo "⚠️ Attention : nvidia-smi non trouvé. Assurez-vous d'être sur une instance GPU Brev (ex: L4 ou A10G)."
fi

echo ""
echo "📦 [2/6] Configuration du conteneur NVIDIA NIM (Llama 3.1 8B Instruct)..."
# Vérifier la présence de la clé NGC
if [ -z "$NGC_API_KEY" ] && [ -z "$NVIDIA_API_KEY" ]; then
    echo "ℹ️ Note: Exportez votre NGC_API_KEY pour télécharger et exécuter le conteneur NIM localement :"
    echo "   export NGC_API_KEY='nvapi-xxxxxxxxxxxxxxxxxxxxxxxx'"
    echo "   docker login nvcr.io --username '$oauthtoken' --password $NGC_API_KEY"
fi

echo ""
echo "🐳 [3/6] Commande Docker pour lancer le microservice NVIDIA NIM :"
cat << 'EOF'
docker run -d --gpus all \
  --name eduexcellence-nim \
  -e NGC_API_KEY=$NGC_API_KEY \
  -v /var/cache/nim:/opt/nim/.cache \
  -p 8000:8000 \
  nvcr.io/nim/meta/llama-3.1-8b-instruct:latest
EOF

echo ""
echo "⏳ [4/6] Vérification du statut du serveur NIM sur http://localhost:8000/v1/health/ready..."
echo "Une fois le conteneur prêt, l'endpoint OpenAI-compatible est disponible sur :"
echo "   http://localhost:8000/v1/chat/completions"

echo ""
echo "🌐 [5/6] Configuration des variables pour ÉduExcellence..."
export NVIDIA_NIM_ENDPOINT="http://localhost:8000/v1"
export NVIDIA_MODEL="meta/llama-3.1-8b-instruct"
export BREV_INSTANCE_ID=$(hostname)
export BREV_GPU_TYPE="NVIDIA GPU (Brev Cloud Instance)"

echo ""
echo "⚡ [6/6] Lancement du serveur ÉduExcellence..."
echo "Installation des dépendances Node.js..."
npm install
echo "Lancement du serveur en mode Brev GPU..."
npm run dev
