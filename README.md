# ÉduExcellence Nationale – Prototype Hackathon NVIDIA Brev

> **Plateforme républicaine de réussite éducative et d'égalité des chances propulsée par NVIDIA Brev & NVIDIA NIM.**  
> Développé pour le **Hackathon GoMyCode x NVIDIA 2026** (Piste Spéciale NVIDIA Brev & IA Éducative).

---

## 🏆 Fiche de Soumission Hackathon (Formulaire Officiel)

| Champ Demandé | Valeur Officielle à Soumettre |
| :--- | :--- |
| **Nom du Projet** | `ÉduExcellence Nationale - Propulsé par NVIDIA Brev & NIM` |
| **Tagline / Slogan** | `L'égalité républicaine des chances accélérée par GPU : un tuteur socratique IA souverain, 100% gratuit et accessible 24h/24 pour chaque élève, même hors-ligne.` |
| **Catégories / Prix** | `NVIDIA Brev Track (Best Use of Brev Cloud GPU & NIM) + AI for Education & Social Good` |
| **Lien Démo Publique (Live App)** | [https://ais-pre-ypcjghlz3ivf4js2o3fqlw-828645065507.europe-west2.run.app](https://ais-pre-ypcjghlz3ivf4js2o3fqlw-828645065507.europe-west2.run.app) |
| **Téléchargement Code Source (.zip)** | `/api/download-project-zip` (Disponible en 1 clic dans l'application) |
| **Technologies Clés** | NVIDIA Brev GPU Cloud (L4 24GB), NVIDIA NIM (`meta/llama-3.1-8b-instruct`), Docker, CUDA 12.4, Node.js/Express, React 19, TypeScript, Tailwind CSS |

---

## 🏛️ Architecture Technique & Rôle de NVIDIA Brev

```text
               +------------------------------------------------+
               |        ÉLÈVE (Collège / Lycée / Bac)           |
               +------------------------------------------------+
                                       |
                                       v
               +------------------------------------------------+
               |       ÉduExcellence Interface Web (React)      |
               |  - Tuteur Socratique interactif (Prof. Sékou)  |
               |  - Simulateur d'épreuves BAC & Brevet          |
               |  - Fiches mémos & Mode hors-ligne résilient    |
               |  - Baromètre d'équité territoriale ministériel |
               +------------------------------------------------+
                                       |  REST POST /api/tutor
                                       v
               +------------------------------------------------+
               |             Backend Express (server.ts)        |
               |  Vérifie la disponibilité du moteur IA :       |
               |  1. Moteur Primaire : NVIDIA NIM sur Brev      |
               |  2. Moteur Secondaire : Google Gemini          |
               |  3. Mode Hors-Ligne : Moteur pédagogique local |
               +------------------------------------------------+
                                       |
               +-----------------------+------------------------+
               |                                                |
               v (Prioritaire)                                  v (Fallback)
+------------------------------------------+       +-----------------------------+
|    NVIDIA NIM (Microservice d'Inférence) |       |   Google Gemini 3.8 Flash   |
|  - Modèle : meta/llama-3.1-8b-instruct   |       |   (Développement & Secours) |
|  - API compatible OpenAI /v1             |       +-----------------------------+
+------------------------------------------+
               |
               v
+---------------------------------------------------------------+
|             INSTANCE GPU NVIDIA BREV (Cloud GPU)              |
|  - GPU : NVIDIA L4 / A10G / A100 avec CUDA & TensorRT-LLM     |
|  - Conteneur Docker pré-configuré via Brev Launchable         |
|  - Latence ultra-basse pour des milliers d'élèves simultanés  |
+---------------------------------------------------------------+
```

---

## 🌟 Pourquoi NVIDIA Brev est au cœur du projet ?

1. **Calcul GPU Souverain & Performance** :
   Le tutorat socratique exige des temps de réponse sous la seconde (< 800ms) pour maintenir l'attention de l'élève. L'instance Brev équipée de GPU NVIDIA (L4 ou A10G) avec les microservices **NVIDIA NIM** accélérés par TensorRT-LLM garantit cette fluidité.
2. **Déploiement Reproductible (Brev Launchable)** :
   Grâce aux Launchables de Brev, n'importe quel évaluateur du jury ou rectorat peut recréer l'environnement GPU complet en une seule commande CLI (`brev create`) sans configuration manuelle de CUDA ou de pilotes.
3. **Inférence Éthique & Souveraine** :
   Les données d'évaluation des copies des élèves ne sont ni revendues ni exposées publiquement : l'inférence se fait dans le conteneur NIM privé hébergé sur Brev.

---

## 🚀 Guide de Démarrage Rapide

### 1. Sur une instance NVIDIA Brev

```bash
# Se connecter à votre instance Brev
brev shell eduexcellence-workspace

# Cloner et entrer dans le projet
cd eduexcellence-nationale

# Rendre le script exécutable et lancer
chmod +x setup-brev.sh
./setup-brev.sh
```

### 2. Variables d'Environnement (.env)

```env
# Clé et Endpoint NVIDIA NIM (Brev GPU ou NVIDIA API)
NVIDIA_NIM_ENDPOINT="http://localhost:8000/v1"
NVIDIA_API_KEY="nvapi-xxxxxxxxxxxxxxxxxxxxxxxx"
NVIDIA_MODEL="meta/llama-3.1-8b-instruct"
BREV_INSTANCE_ID="brev-edu-l4-gpu-01"
BREV_GPU_TYPE="NVIDIA L4 (24GB VRAM)"

# Fallback Gemini (optionnel pour le dev)
GEMINI_API_KEY="votre_cle_gemini"
```

---

## 🧪 Questions de Démonstration pour le Jury

- **Question élève de 3e (Brevet)** :  
  *« Je suis en 3e et je ne comprends pas le théorème de Pythagore. »*  
  -> Le tuteur répond en guidant pas à pas : formule fondamentale $a^2 + b^2 = c^2$, identification de l'hypoténuse, questions directrices.
- **Vérification du badge** :  
  L'en-tête et le panneau Brev affichent **🟢 IA NVIDIA active sur Brev** avec les métriques GPU (VRAM, latence, conteneur NIM).
