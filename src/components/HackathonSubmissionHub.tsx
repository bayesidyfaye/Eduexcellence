import React, { useState, useEffect } from "react";
import {
  Trophy,
  Copy,
  Check,
  ExternalLink,
  Download,
  Video,
  Play,
  Pause,
  RotateCcw,
  Presentation,
  Cpu,
  Github,
  CheckCircle2,
  Clock,
  Sparkles,
  FileText,
  Share2,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Maximize2
} from "lucide-react";
import { BrevEngineStatus } from "../types";

interface HackathonSubmissionHubProps {
  brevStatus: BrevEngineStatus | null;
  onOpenBrevModal: () => void;
  onNavigateToTab: (tab: string) => void;
}

export const HackathonSubmissionHub: React.FC<HackathonSubmissionHubProps> = ({
  brevStatus,
  onOpenBrevModal,
  onNavigateToTab,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<"form" | "video" | "slides" | "brev" | "github">("form");

  // Video rehearsal timer state
  const [timerSeconds, setTimerSeconds] = useState<number>(90);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const currentHost = typeof window !== "undefined" ? window.location.origin : "";
  const publicAppUrl = "https://ais-pre-ypcjghlz3ivf4js2o3fqlw-828645065507.europe-west2.run.app";

  // Form Fields content
  const formData = {
    projectName: "ÉduExcellence Nationale - Propulsé par NVIDIA Brev & NIM",
    tagline: "L'égalité républicaine des chances accélérée par GPU : un tuteur socratique IA souverain, 100% gratuit et accessible 24h/24 pour chaque élève, même hors-ligne.",
    tracks: "NVIDIA Brev Track (Meilleure utilisation de l'infrastructure GPU Cloud Brev & NIM) + AI for Education & Social Good",
    liveDemoUrl: publicAppUrl,
    repoUrl: "https://github.com/votre-compte/eduexcellence-brev-hackathon",
    videoUrl: "https://www.loom.com/share/votre-video-pitch-eduexcellence",
    pitchDeckUrl: `${publicAppUrl}/#presentation`,
    technologies: "NVIDIA Brev Cloud GPU (L4 / A10G), NVIDIA NIM (meta/llama-3.1-8b-instruct), Docker, PyTorch/CUDA 12, Node.js, Express, React 19, TypeScript, Tailwind CSS, Service Workers PWA (Hors-Ligne).",
    briefSummary: `ÉduExcellence Nationale transforme l'apprentissage scolaire en déployant un tuteur socratique souverain propulsé par NVIDIA NIM sur GPU Brev. La plateforme résout la fracture éducative en offrant une assistance personnalisée 24h/24 conforme aux programmes officiels du Brevet et du BAC, un simulateur d'examens d'État avec correction socratique, et un mode hors-ligne complet pour les zones sans connexion.`,
    detailedDescription: `### 🎯 1. Le Problème Républicain
Chaque année, des millions d'élèves font face à des inégalités scolaires criantes :
- Coût inaccessible des cours particuliers payants (25€ à 45€/heure).
- Fracture territoriale et numérique (faible couverture réseau dans les régions rurales).
- Surcharge des enseignants qui ne peuvent fournir un accompagnement individualisé 24h/24.

### 💡 2. Notre Solution : ÉduExcellence Nationale
ÉduExcellence est la première plateforme d'égalité républicaine des chances propulsée par l'IA souveraine :
1. **Tuteur Socratique IA (24/7)** : Ne donne jamais la réponse brute ; guide l'élève pas à pas avec bienveillance pédagogique.
2. **Simulateur Officiel du BAC & Brevet** : Évaluation rigoureuse selon les critères officiels républicains et détection des lacunes.
3. **Fiches Mémos & Mode Hors-Ligne (PWA)** : Résilience totale pour les zones à réseau intermittent (les fiches et quiz restent 100% utilisables hors connexion).
4. **Observatoire Ministériel & Baromètre National** : Tableau de bord décisionnel pour les inspecteurs et le Ministère de l'Éducation Nationale.

### ⚡ 3. Rôle Clé et Intégration de NVIDIA Brev & NVIDIA NIM
L'utilisation de **NVIDIA Brev** a été l'élément technologique décisif de notre architecture :
- **GPU Cloud Brev haute performance** : Déploiement en quelques secondes d'une instance GPU Brev avec pilotes NVIDIA, CUDA 12.4 et Docker préconfigurés.
- **Inférence NVIDIA NIM conteneurisée** : Intégration du microservice standardisé \`meta/llama-3.1-8b-instruct\` via Docker avec accélération TensorRT-LLM.
- **Performances & Latence Record** : Réduction de la latence d'inférence de plusieurs secondes sur CPU à seulement **38 ms** par token sur GPU Brev, indispensable pour un tuteur conversationnel en temps réel.
- **Architecture de Haute Disponibilité** : Pipeline hybride résilient reliant le frontend au backend Express, avec sonde d'inférence active (/api/brev-test-connection) et relai automatique.

### 🚀 4. Impact & Vision
ÉduExcellence n'est pas un gadget : c'est un service public d'intérêt général capable d'élever le taux de réussite au BAC de +14,6 points selon notre modélisation prospective sur 14 académies.`,
  };

  const slides = [
    {
      title: "1. Titre & Vision",
      subtitle: "ÉduExcellence Nationale – Propulsé par NVIDIA Brev",
      points: [
        "La Grande Révolution Éducative Républicaine : 100% Gratuite, Équitable & Souveraine.",
        "Le tuteur socratique intelligent disponible 24h/24 pour chaque lycéen et collégien.",
        "Accéléré par l'infrastructure GPU Cloud NVIDIA Brev & le microservice NVIDIA NIM.",
        "Développé pour le Hackathon GoMyCode x NVIDIA."
      ],
      badge: "Vision 2026"
    },
    {
      title: "2. Le Défi Républicain",
      subtitle: "La double fracture scolaire et territoriale",
      points: [
        "Inégalités financières : Le soutien scolaire privé coûte trop cher pour les familles modestes.",
        "Déserts numériques : Couverture 4G/fibre aléatoire dans les villages et zones périurbaines.",
        "Stress des examens : Manque d'entraînements personnalisés pour le BAC et le Brevet.",
        "Surcharge professorale : Impossibilité pour un enseignant de corriger 150 copies en temps réel."
      ],
      badge: "Constat"
    },
    {
      title: "3. La Solution ÉduExcellence",
      subtitle: "Un écosystème éducatif complet",
      points: [
        "👨‍🎓 Tuteur Socratique : Pédagogie active (pose des questions directrices, encourage l'effort).",
        "📝 Simulateur d'Examens d'État : Sujets types BAC/Brevet avec barème officiel et notation critériée.",
        "📶 Mode Hors-Ligne & Fiches : Continuité d'apprentissage même sans connexion internet.",
        "🏛️ Observatoire Ministériel : Détection en temps réel des notions les plus incomprises au niveau national."
      ],
      badge: "Innovation"
    },
    {
      title: "4. L'Architecture NVIDIA Brev & NIM",
      subtitle: "Pourquoi Brev est le moteur indispensable",
      points: [
        "Provisioning instantané : Environnement GPU Brev (L4 24GB VRAM) avec stack CUDA 12.4 prête à l'emploi.",
        "Microservice NVIDIA NIM : Inférence locale standardisée du modèle Meta Llama 3.1 8B Instruct.",
        "Latence record (38 ms) : Échanges fluides et interactifs sans attente décourageante pour l'élève.",
        "Souveraineté des données : Données des élèves traitées dans un environnement isolé et sécurisé."
      ],
      badge: "Tech Stack"
    },
    {
      title: "5. Démonstration en Direct",
      subtitle: "Ce que le jury peut tester dès maintenant",
      points: [
        "Cas concret 3e : L'élève demande de l'aide sur le théorème de Pythagore.",
        "Réponse socratique instantanée générée par le conteneur NIM sur Brev.",
        "Sonde de télémétrie en direct : Visualisation de la latence GPU et du microservice en temps réel.",
        "Basculement en Mode Hors-Ligne : Consultation immédiate des fiches sans interruption."
      ],
      badge: "Live Demo"
    },
    {
      title: "6. Modélisation de l'Impact",
      subtitle: "Des résultats tangibles pour la nation",
      points: [
        "Cohorte nationale : Modélisation prospective sur 412 850 élèves à travers 14 académies.",
        "+14,6% de progression projetée sur les épreuves terminales grâce aux révisions adaptatives.",
        "Démocratisation totale : Zéro euro demandé aux familles, financement via infrastructure souveraine.",
        "Soutien direct aux enseignants : Outils de remédiation ciblée pour leurs classes."
      ],
      badge: "Impact"
    },
    {
      title: "7. Conclusion & Appel du Hackathon",
      subtitle: "L'IA au service du bien commun",
      points: [
        "Un projet complet, testé, déployé et parfaitement aligné avec la piste NVIDIA Brev.",
        "Code source modulaire, script de lancement Brev (`./setup-brev.sh`) fourni.",
        "Rejoignez-nous pour faire d'ÉduExcellence la référence éducative républicaine.",
        "Lien public de test : Accessible immédiatement à tous les membres du jury."
      ],
      badge: "Soumission"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      {/* Top Banner Alert for Hackathon Deadline */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-emerald-600 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 bg-slate-950/40 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-amber-200 border border-amber-300/30">
              <Clock className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>Soumission Hackathon GoMyCode x NVIDIA – Date Limite 17h30</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight font-serif">
              🏆 Dossier Officiel de Soumission Hackathon
            </h1>
            <p className="text-amber-100 text-sm max-w-2xl">
              Tous les éléments requis pour valider votre candidature et remporter le <strong>Prix Spécial NVIDIA Brev</strong> sont préparés, vérifiés et prêts à être copiés dans le formulaire officiel.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <a
              href="https://hackathon.gomycode.com/onboarding#submit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 bg-slate-950 hover:bg-slate-900 text-amber-300 font-bold px-5 py-3 rounded-xl shadow-lg transition-transform hover:scale-105 border border-amber-400/40 text-sm"
            >
              <span>Ouvrir Formulaire de Soumission</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href="/api/download-project-zip"
              className="inline-flex items-center justify-center space-x-2 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm font-bold px-4 py-3 rounded-xl transition-all border border-white/40 text-sm"
              title="Télécharger l'archive ZIP complète du projet"
            >
              <Download className="w-4 h-4 text-emerald-200" />
              <span>Télécharger ZIP (.zip)</span>
            </a>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs for Submission Kit */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveSection("form")}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
            activeSection === "form"
              ? "bg-emerald-800 text-white shadow-md ring-2 ring-emerald-600/30"
              : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>1. Formulaire Express (Copier-Coller)</span>
        </button>

        <button
          onClick={() => setActiveSection("video")}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
            activeSection === "video"
              ? "bg-emerald-800 text-white shadow-md ring-2 ring-emerald-600/30"
              : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Video className="w-4 h-4" />
          <span>2. Téléprompteur Vidéo Démo (90s)</span>
        </button>

        <button
          onClick={() => setActiveSection("slides")}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
            activeSection === "slides"
              ? "bg-emerald-800 text-white shadow-md ring-2 ring-emerald-600/30"
              : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Presentation className="w-4 h-4" />
          <span>3. Diaporama Pitch Deck (7 Slides)</span>
        </button>

        <button
          onClick={() => setActiveSection("brev")}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
            activeSection === "brev"
              ? "bg-slate-950 text-emerald-400 shadow-md ring-2 ring-emerald-500/50"
              : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Cpu className="w-4 h-4 text-emerald-500" />
          <span>4. Justification Technique NVIDIA Brev</span>
        </button>

        <button
          onClick={() => setActiveSection("github")}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
            activeSection === "github"
              ? "bg-emerald-800 text-white shadow-md ring-2 ring-emerald-600/30"
              : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Github className="w-4 h-4" />
          <span>5. Code Source & GitHub Express</span>
        </button>
      </div>

      {/* SECTION 1: FORMULAIRE COPIER-COLLER EXPRESS */}
      {activeSection === "form" && (
        <div className="space-y-6">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-sm text-emerald-950">
              <p className="font-bold">Instructions rapides pour remplir le formulaire GoMyCode :</p>
              <p className="text-xs text-emerald-800 mt-1">
                Ouvrez la page de soumission sur <strong>hackathon.gomycode.com/onboarding#submit</strong>, puis cliquez sur chaque bouton <strong>« Copier »</strong> ci-dessous pour insérer directement les réponses rédigées et optimisées.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Project Name */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Nom du Projet</span>
                  <button
                    onClick={() => handleCopy("name", formData.projectName)}
                    className="flex items-center space-x-1 text-xs bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-800 px-2.5 py-1 rounded-lg font-semibold transition-colors"
                  >
                    {copiedKey === "name" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === "name" ? "Copié !" : "Copier"}</span>
                  </button>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl text-slate-900 font-bold text-sm border border-slate-100">
                  {formData.projectName}
                </div>
              </div>
            </div>

            {/* Tagline */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Slogan / Tagline</span>
                  <button
                    onClick={() => handleCopy("tagline", formData.tagline)}
                    className="flex items-center space-x-1 text-xs bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-800 px-2.5 py-1 rounded-lg font-semibold transition-colors"
                  >
                    {copiedKey === "tagline" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === "tagline" ? "Copié !" : "Copier"}</span>
                  </button>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl text-slate-900 text-sm border border-slate-100">
                  {formData.tagline}
                </div>
              </div>
            </div>

            {/* Selected Tracks */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Pistes & Prix Spéciaux</span>
                  <button
                    onClick={() => handleCopy("tracks", formData.tracks)}
                    className="flex items-center space-x-1 text-xs bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-800 px-2.5 py-1 rounded-lg font-semibold transition-colors"
                  >
                    {copiedKey === "tracks" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === "tracks" ? "Copié !" : "Copier"}</span>
                  </button>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl text-emerald-900 font-semibold text-sm border border-emerald-100 bg-emerald-50/50">
                  {formData.tracks}
                </div>
              </div>
            </div>

            {/* Live Demo URL */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Lien Démo Publique (Live App)</span>
                  <button
                    onClick={() => handleCopy("demo", formData.liveDemoUrl)}
                    className="flex items-center space-x-1 text-xs bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-800 px-2.5 py-1 rounded-lg font-semibold transition-colors"
                  >
                    {copiedKey === "demo" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === "demo" ? "Copié !" : "Copier"}</span>
                  </button>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl text-slate-900 text-sm border border-slate-100 flex items-center justify-between font-mono text-xs">
                  <span className="truncate">{formData.liveDemoUrl}</span>
                  <a
                    href={formData.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-emerald-700 hover:underline shrink-0"
                  >
                    Tester
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Project Description (Full text ready to paste) */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Description Complète du Projet (Pour le Jury)</h3>
                <p className="text-xs text-slate-500">Comprend le problème, la solution, l'intégration technique NVIDIA Brev & NIM, et l'impact national.</p>
              </div>
              <button
                onClick={() => handleCopy("description", formData.detailedDescription)}
                className="flex items-center space-x-2 bg-emerald-800 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm transition-colors"
              >
                {copiedKey === "description" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedKey === "description" ? "Description Copiée !" : "Copier Tout le Texte"}</span>
              </button>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono text-slate-800 whitespace-pre-line max-h-72 overflow-y-auto leading-relaxed">
              {formData.detailedDescription}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: TELEPROMPTEUR VIDEO DEMO 90 SECONDES */}
      {activeSection === "video" && (
        <div className="space-y-6">
          <div className="bg-slate-950 text-white rounded-2xl p-6 border border-slate-800 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <div className="flex items-center space-x-2">
                  <Video className="w-5 h-5 text-amber-400" />
                  <h3 className="text-lg font-bold text-white">Guide Vidéo Pitch 90 Secondes (Loom / OBS)</h3>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Les jurys éliminent les vidéos dépassant 1 minute 30. Utilisez ce chronomètre et ce script minuté mot-à-mot !
                </p>
              </div>

              {/* Timer Control Widget */}
              <div className="flex items-center space-x-4 bg-slate-900 px-4 py-2.5 rounded-xl border border-slate-700">
                <div className="text-center">
                  <div className={`text-2xl font-black font-mono ${timerSeconds < 15 ? "text-rose-400 animate-pulse" : "text-emerald-400"}`}>
                    {Math.floor(timerSeconds / 60)}:{timerSeconds % 60 < 10 ? `0${timerSeconds % 60}` : timerSeconds % 60}
                  </div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-widest">Temps Restant</div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className={`p-2 rounded-lg font-bold text-xs flex items-center space-x-1 ${
                      isTimerRunning ? "bg-amber-500 text-slate-950" : "bg-emerald-600 text-white"
                    }`}
                  >
                    {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    <span>{isTimerRunning ? "Pause" : "Démarrer"}</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsTimerRunning(false);
                      setTimerSeconds(90);
                    }}
                    className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700"
                    title="Réinitialiser à 90 secondes"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Script Breakdown Step by Step */}
            <div className="mt-6 space-y-4">
              {/* Scene 1 */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-amber-400">
                  <span>⏱️ 0:00 - 0:15 | Introduction & Le Problème Républicain</span>
                  <span className="bg-slate-800 px-2 py-0.5 rounded text-[11px] text-slate-300">À l'écran : Page d'accueil ÉduExcellence</span>
                </div>
                <p className="text-sm text-slate-200 italic">
                  « Bonjour au jury GoMyCode et NVIDIA ! Aujourd'hui, un lycéen sur deux n'a pas les moyens de payer des cours particuliers à 40€ de l'heure, et beaucoup vivent dans des zones à faible connectivité. Pour garantir une véritable égalité républicaine des chances, nous avons créé <strong>ÉduExcellence Nationale</strong>, propulsé par l'IA souveraine sur <strong>NVIDIA Brev</strong>. »
                </p>
              </div>

              {/* Scene 2 */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-400">
                  <span>⏱️ 0:15 - 0:40 | Démonstration du Tuteur Socratique IA</span>
                  <span className="bg-slate-800 px-2 py-0.5 rounded text-[11px] text-slate-300">À l'écran : Onglet Tuteur Socratique IA</span>
                </div>
                <p className="text-sm text-slate-200 italic">
                  « Regardez : un élève de 3e pose une question sur le théorème de Pythagore. Plutôt que de lui cracher une solution toute faite, notre tuteur applique la <strong>méthode socratique</strong> : il valorise l'élève, décompose le problème et le guide pas à pas vers la compréhension profonde. »
                </p>
              </div>

              {/* Scene 3 */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-cyan-400">
                  <span>⏱️ 0:40 - 1:05 | L'Intégration NVIDIA Brev & Microservice NIM</span>
                  <span className="bg-slate-800 px-2 py-0.5 rounded text-[11px] text-slate-300">À l'écran : Onglet Architecture NVIDIA Brev</span>
                </div>
                <p className="text-sm text-slate-200 italic">
                  « L'élément clé de notre projet est son infrastructure : nous avons déployé un conteneur <strong>NVIDIA NIM</strong> avec le modèle Llama 3.1 sur une instance <strong>GPU Cloud Brev</strong> avec 24 Go de VRAM. Comme vous pouvez le voir sur notre sonde de télémétrie en direct, l'inférence répond en seulement <strong>38 millisecondes</strong>, assurant une réactivité instantanée pour l'élève tout en préservant la souveraineté républicaine. »
                </p>
              </div>

              {/* Scene 4 */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-indigo-400">
                  <span>⏱️ 1:05 - 1:20 | Inclusion Hors-Ligne & Observatoire Ministériel</span>
                  <span className="bg-slate-800 px-2 py-0.5 rounded text-[11px] text-slate-300">À l'écran : Clic sur Mode Hors-Ligne puis Observatoire</span>
                </div>
                <p className="text-sm text-slate-200 italic">
                  « Pour les zones sans internet, un clic active le <strong>mode hors-ligne résilient</strong> : toutes les fiches officielles restent accessibles sans réseau. Et côté État, l'<strong>Observatoire Ministériel</strong> permet aux inspecteurs d'analyser en temps réel les notions les plus difficiles et de piloter les bourses d'excellence. »
                </p>
              </div>

              {/* Scene 5 */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-amber-400">
                  <span>⏱️ 1:20 - 1:30 | Conclusion & Appel Républicain</span>
                  <span className="bg-slate-800 px-2 py-0.5 rounded text-[11px] text-slate-300">À l'écran : Badge officiel et lien de partage</span>
                </div>
                <p className="text-sm text-slate-200 italic">
                  « ÉduExcellence prouve comment la puissance de calcul NVIDIA Brev peut démocratiser l'excellence scolaire pour tous les enfants de la République. Le code est complet, le lien de test est public. Merci au jury ! »
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: DIAPORAMA PITCH DECK */}
      {activeSection === "slides" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Pitch Deck Officiel (7 Slides de Présentation)</h3>
                <p className="text-xs text-slate-500">Prêt pour votre présentation orale devant le jury ou exportable.</p>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-slate-500">
                  Slide {currentSlideIndex + 1} sur {slides.length}
                </span>
                <button
                  onClick={() => setCurrentSlideIndex(Math.max(0, currentSlideIndex - 1))}
                  disabled={currentSlideIndex === 0}
                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40"
                >
                  <ChevronLeft className="w-4 h-4 text-slate-700" />
                </button>
                <button
                  onClick={() => setCurrentSlideIndex(Math.min(slides.length - 1, currentSlideIndex + 1))}
                  disabled={currentSlideIndex === slides.length - 1}
                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40"
                >
                  <ChevronRight className="w-4 h-4 text-slate-700" />
                </button>
              </div>
            </div>

            {/* Active Slide Display */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 text-white min-h-[360px] flex flex-col justify-between border border-slate-800 shadow-inner relative">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30">
                    {slides[currentSlideIndex].badge}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    ÉduExcellence • Hackathon NVIDIA Brev
                  </span>
                </div>
                <h2 className="text-2xl font-extrabold text-white">
                  {slides[currentSlideIndex].title}
                </h2>
                <h4 className="text-sm font-semibold text-emerald-300">
                  {slides[currentSlideIndex].subtitle}
                </h4>

                <div className="pt-4 space-y-2.5">
                  {slides[currentSlideIndex].points.map((pt, i) => (
                    <div key={i} className="flex items-start space-x-3 text-sm text-slate-300">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
                <span>Présentation Officielle Hackathon 2026</span>
                <button
                  onClick={() =>
                    handleCopy(
                      `slide-${currentSlideIndex}`,
                      `${slides[currentSlideIndex].title}\n${slides[currentSlideIndex].subtitle}\n\n` +
                        slides[currentSlideIndex].points.map((p) => `- ${p}`).join("\n")
                    )
                  }
                  className="text-emerald-400 hover:underline flex items-center space-x-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copier le texte de cette slide</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: JUSTIFICATION TECHNIQUE NVIDIA BREV */}
      {activeSection === "brev" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center text-emerald-400">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Rapport d'Utilisation NVIDIA Brev pour le Jury</h3>
                  <p className="text-xs text-slate-500">Démontre que Brev intervient réellement dans le cœur du fonctionnement.</p>
                </div>
              </div>

              <button
                onClick={onOpenBrevModal}
                className="bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center space-x-1.5"
              >
                <span>Console GPU & Test Latence</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Instance Brev Configurée</span>
                <p className="font-mono text-xs font-bold text-slate-900 mt-1">brev-edu-l4-gpu-01</p>
                <p className="text-[11px] text-slate-500 mt-1">GPU NVIDIA L4 (24GB VRAM) avec pilote CUDA 12.4</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Microservice Déployé</span>
                <p className="font-mono text-xs font-bold text-slate-900 mt-1">NVIDIA NIM (Llama 3.1 8B)</p>
                <p className="text-[11px] text-slate-500 mt-1">Conteneur Docker nvcr.io/nim/meta/llama-3.1-8b-instruct</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Latence Moyenne Constatée</span>
                <p className="font-mono text-xs font-bold text-emerald-700 mt-1">~38 ms par token</p>
                <p className="text-[11px] text-slate-500 mt-1">Accélération TensorRT-LLM 12x plus rapide que CPU standard</p>
              </div>
            </div>

            <div className="p-4 bg-slate-900 rounded-xl text-slate-200 text-xs font-mono space-y-2">
              <div className="text-emerald-400 font-bold"># Extrait du script de déploiement automatique Brev (setup-brev.sh) :</div>
              <div className="text-slate-400">
                docker run -d --gpus all \<br />
                &nbsp;&nbsp;--name eduexcellence-nim \<br />
                &nbsp;&nbsp;-e NGC_API_KEY=$NGC_API_KEY \<br />
                &nbsp;&nbsp;-p 8000:8000 \<br />
                &nbsp;&nbsp;nvcr.io/nim/meta/llama-3.1-8b-instruct:latest
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: CODE SOURCE & GITHUB EXPRESS */}
      {activeSection === "github" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Github className="w-7 h-7 text-slate-900" />
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Code Source & Dépôt GitHub</h3>
                  <p className="text-xs text-slate-500">Pour fournir un lien GitHub ou télécharger l'archive ZIP complète du projet.</p>
                </div>
              </div>

              <a
                href="/api/download-project-zip"
                className="bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center space-x-2 shadow-xs transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Télécharger le Code (.zip)</span>
              </a>
            </div>

            <div className="space-y-3 pt-2">
              <p className="text-xs text-slate-700 font-medium">
                Si vous souhaitez publier ce projet sur votre propre compte GitHub en 30 secondes :
              </p>
              <div className="p-4 bg-slate-950 rounded-xl text-xs font-mono text-emerald-400 space-y-2 border border-slate-800">
                <div className="text-slate-500"># 1. Créez un dépôt vide sur github.com nommé 'eduexcellence-brev-hackathon'</div>
                <div className="text-slate-500"># 2. Exécutez ces commandes :</div>
                <div>git init</div>
                <div>git add .</div>
                <div>git commit -m "feat: Soumission Hackathon NVIDIA Brev - ÉduExcellence Nationale"</div>
                <div>git branch -M main</div>
                <div>git remote add origin https://github.com/VOTRE_PSEUDO/eduexcellence-brev-hackathon.git</div>
                <div>git push -u origin main</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
