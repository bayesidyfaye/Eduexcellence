import React, { useState } from "react";
import {
  Hammer,
  Terminal,
  Cpu,
  ShieldCheck,
  Copy,
  Check,
  ChevronRight,
  Rocket,
  Sparkles,
  Globe2,
  Database,
  Lightbulb,
  Code2,
} from "lucide-react";

interface Step {
  id: number;
  title: string;
  subtitle: string;
  badge: string;
  icon: any;
  explanation: string;
  commands?: string[];
  codeSnippet?: {
    filename: string;
    lang: string;
    code: string;
  };
  tips: string[];
  ministerArgument: string;
}

const STEPS: Step[] = [
  {
    id: 1,
    title: "1. La Fondation Technique (L'Atelier)",
    subtitle: "Installer les outils gratuits et préparer l'environnement",
    badge: "Étape Initiale",
    icon: Terminal,
    explanation:
      "Pour créer votre propre plateforme, vous avez besoin de 3 briques fondamentales gratuites : Node.js (le moteur JavaScript), Vite (l'outil ultra-rapide pour construire l'application) et Tailwind CSS (pour dessiner une interface propre et républicaine).",
    commands: [
      "# 1. Créer le projet avec React et TypeScript",
      "npm create vite@latest ma-plateforme-educative -- --template react-ts",
      "",
      "# 2. Entrer dans le dossier",
      "cd ma-plateforme-educative",
      "",
      "# 3. Installer les bibliothèques indispensables",
      "npm install express dotenv @google/genai lucide-react canvas-confetti",
      "npm install -D tsx esbuild @types/node @types/express @types/canvas-confetti tailwindcss"
    ],
    tips: [
      "TypeScript vous protège contre les erreurs de frappe avant même de lancer l'application.",
      "Vite est 10 fois plus rapide que les anciens outils comme Create-React-App."
    ],
    ministerArgument:
      "« Monsieur le Ministre, notre architecture repose à 100% sur des technologies ouvertes, sans redevance de licence propriétaire pour l'État. »",
  },
  {
    id: 2,
    title: "2. Le Cœur Accéléré (NVIDIA Brev & NIM)",
    subtitle: "Déployer le microservice d'inférence souverain sur GPU Cloud Brev",
    badge: "Inférence GPU Brev",
    icon: Cpu,
    explanation:
      "Pour garantir une inférence ultra-rapide (< 50ms) et souveraine, nous déployons le conteneur NVIDIA NIM sur une instance NVIDIA Brev (GPU L4 avec 24GB VRAM). Le serveur Express se connecte via une API REST standard compatible OpenAI.",
    codeSnippet: {
      filename: "server.ts",
      lang: "typescript",
      code: `// Appel au microservice NVIDIA NIM hébergé sur Brev
async function callNvidiaNim(messages: { role: string; content: string }[]) {
  const res = await fetch("http://localhost:8000/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "meta/llama-3.1-8b-instruct",
      messages,
      temperature: 0.6
    })
  });
  const data = await res.json();
  return data.choices[0].message.content;
}`
    },
    tips: [
      "Brev fournit des crédits gratuits pour les hackathons afin de tester sans carte bancaire.",
      "Le microservice NIM utilise TensorRT-LLM pour optimiser le débit de requêtes simultanées."
    ],
    ministerArgument:
      "« Grâce aux GPU NVIDIA orchestrés par Brev, des dizaines de milliers d'élèves peuvent réviser en même temps sans ralentissement ni fuite de données vers des serveurs tiers. »",
  },
  {
    id: 3,
    title: "3. Le Cerveau Pédagogique (La Méthode Socratique)",
    subtitle: "Régler l'IA pour qu'elle apprenne à réfléchir, sans faire les devoirs à leur place",
    badge: "Pédagogie Pure",
    icon: Database,
    explanation:
      "C'est la différence clé entre un simple gadget et une plateforme d'État : le 'Prompt Engineering' pédagogique. Si l'IA donne directement la réponse, l'élève ne progresse pas. Nous lui ordonnons de décomposer chaque exercice.",
    codeSnippet: {
      filename: "prompts/socraticRules.ts",
      lang: "typescript",
      code: `export const PEDAGOGICAL_PROMPT = \`Règles strictes du Professeur Sékou :
1. Si l'élève demande 'Donne-moi la réponse', refuse avec courtoisie et demande-lui : 'Quelle est la première formule du cours qui te vient à l'esprit ?'.
2. S'il fait une erreur de calcul, ne dis pas 'Faux', dis plutôt : 'Regarde bien la ligne 2, vérifie le signe négatif devant la parenthèse'.
3. Termine toujours par une note d'encouragement : 'Tu as le potentiel pour réussir cette épreuve du BAC !'.
\`;`
    },
    tips: [
      "Les inspecteurs de l'éducation nationale vérifient toujours si l'outil respecte la déontologie pédagogique.",
      "Ajoutez une synthèse vocale (Web Speech API) pour les élèves dyslexiques ou malvoyants."
    ],
    ministerArgument:
      "« Notre tuteur ne triche pas : il oblige l'élève à chercher, à comprendre et à retenir pour toujours. »",
  },
  {
    id: 4,
    title: "4. Le Mode Résilience (Hors-Ligne & Fiches Téléchargeables)",
    subtitle: "Rendre l'apprentissage accessible sans abonnement Internet cher",
    badge: "Inclusion Territoriale",
    icon: Globe2,
    explanation:
      "Dans beaucoup de localités, le réseau 4G est cher ou instable. Votre plateforme doit pouvoir enregistrer les fiches mémo et exercices dans le navigateur de l'élève (via localStorage ou Service Worker) pour qu'il révise même en mode avion.",
    codeSnippet: {
      filename: "src/utils/offlineStorage.ts",
      lang: "typescript",
      code: `// Sauvegarder une fiche de cours sur le téléphone de l'élève
export function saveSheetOffline(sheetId: string, sheetData: any) {
  const existing = JSON.parse(localStorage.getItem("offline_sheets") || "{}");
  existing[sheetId] = sheetData;
  localStorage.setItem("offline_sheets", JSON.stringify(existing));
}

// Vérifier si l'élève est connecté ou hors-ligne
export function checkConnectivity(callback: (online: boolean) => void) {
  window.addEventListener("online", () => callback(true));
  window.addEventListener("offline", () => callback(false));
}`
    },
    tips: [
      "Permettez l'impression au format A4 en noir et blanc pour les salles d'études de village.",
      "Chaque fiche doit faire moins de 50 Ko pour s'enregistrer instantanément."
    ],
    ministerArgument:
      "« C'est ici que l'impossible devient réalité : même dans les zones blanches sans signal Internet, nos élèves continuent d'apprendre. »",
  },
  {
    id: 5,
    title: "5. L'Observatoire des Données (Pour le Ministre)",
    subtitle: "Transformer les statistiques anonymisées en outil de décision pour l'État",
    badge: "Haute Décision",
    icon: ShieldCheck,
    explanation:
      "C'est l'argument qui convainc immédiatement les autorités : une vue cartographique anonymisée qui montre quelles matières posent problème dans chaque académie avant la session d'examen.",
    tips: [
      "Agrégez les statistiques par matière et région (ex: 64% de blocage sur les probabilités à Tambacounda ou Diourbel).",
      "Proposez un bouton 'Exporter en PDF officiel pour le Conseil des Ministres'."
    ],
    ministerArgument:
      "« Monsieur le Ministre, au lieu d'attendre les résultats décevants de juillet, vous voyez les difficultés en mars et vous envoyez des renforts à temps ! »",
  },
  {
    id: 6,
    title: "6. Le Déploiement Public & Launchable Brev",
    subtitle: "Créer un Launchable Brev pour reproduire l'environnement en 1 clic",
    badge: "Mise en Ligne",
    icon: Rocket,
    explanation:
      "Votre plateforme peut être lancée avec le Launchable Brev qui contient la recette matérielle (GPU L4), logicielle (Docker, CUDA) et le code source complet.",
    commands: [
      "# 1. Créer le Launchable Brev",
      "brev create eduexcellence-instance --gpu l4",
      "",
      "# 2. Lancer le conteneur NIM",
      "./setup-brev.sh",
      "",
      "# 3. L'application est en ligne sur l'URL publique fournie !"
    ],
    tips: [
      "Le jury du hackathon peut vérifier le code directement dans l'interface Brev.",
      "Vous pouvez lier un nom de domaine officiel comme 'eduexcellence.org'."
    ],
    ministerArgument:
      "« La plateforme est déjà en ligne, opérationnelle et prête à accueillir des millions d'élèves dès demain matin. »",
  },
];

export const BuildGuideView: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const step = STEPS.find((s) => s.id === activeStep) || STEPS[0];

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 mb-8 shadow-sm">
        <div className="max-w-3xl">
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-widest mb-2">
            <Hammer className="w-4 h-4" />
            <span>Guide Pratique du Concepteur & Bâtisseur</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-serif">
            Comment Fabriquer Votre Propre Plateforme Pas à Pas
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
            Voici la feuille de route complète, simple et concrète pour bâtir vous-même cette solution de A à Z avec NVIDIA Brev et React. Chaque étape est détaillée avec le code, les astuces et les mots exacts à prononcer devant le jury et le Ministre.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Step Selector Menu (4 cols) */}
        <div className="lg:col-span-4 space-y-2.5">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1 mb-2">
            Le Plan de Construction (6 étapes)
          </div>
          {STEPS.map((s) => {
            const isSelected = s.id === activeStep;
            const Icon = s.icon;
            return (
              <div
                key={s.id}
                id={`step-menu-btn-${s.id}`}
                onClick={() => setActiveStep(s.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start space-x-3 text-left ${
                  isSelected
                    ? "bg-white border-emerald-600 shadow-md ring-2 ring-emerald-500/20"
                    : "bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white"
                }`}
              >
                <div
                  className={`p-2 rounded-xl shrink-0 ${
                    isSelected
                      ? "bg-emerald-800 text-white"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      {s.badge}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-400">
                      0{s.id}
                    </span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                    {s.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                    {s.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Step Detailed Walkthrough (8 cols) */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
            {/* Header */}
            <div className="border-b border-slate-100 pb-5">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-xs font-extrabold text-emerald-800 uppercase tracking-widest bg-emerald-100/80 px-2.5 py-1 rounded-md">
                  {step.badge}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Étape {step.id} sur {STEPS.length}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
                {step.title}
              </h2>
              <p className="text-xs sm:text-sm font-medium text-emerald-800 mt-1">
                {step.subtitle}
              </p>
              <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                {step.explanation}
              </p>
            </div>

            {/* Commands block if present */}
            {step.commands && (
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
                  <span className="flex items-center">
                    <Terminal className="w-4 h-4 mr-1 text-emerald-700" />
                    Commandes à taper dans votre terminal :
                  </span>
                  <button
                    onClick={() => copyToClipboard(step.commands!.join("\n"), `cmd-${step.id}`)}
                    className="flex items-center space-x-1 text-[11px] text-emerald-700 hover:text-emerald-800 font-medium"
                  >
                    {copiedIndex === `cmd-${step.id}` ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Copié !</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copier tout</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="bg-slate-950 text-emerald-300 font-mono text-xs p-4 rounded-2xl overflow-x-auto border border-slate-800 shadow-inner">
                  <pre>{step.commands.join("\n")}</pre>
                </div>
              </div>
            )}

            {/* Code Snippet if present */}
            {step.codeSnippet && (
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
                  <span className="flex items-center">
                    <Code2 className="w-4 h-4 mr-1 text-emerald-700" />
                    Fichier : <code className="ml-1 text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded font-mono">{step.codeSnippet.filename}</code>
                  </span>
                  <button
                    onClick={() => copyToClipboard(step.codeSnippet!.code, `code-${step.id}`)}
                    className="flex items-center space-x-1 text-[11px] text-emerald-700 hover:text-emerald-800 font-medium"
                  >
                    {copiedIndex === `code-${step.id}` ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Code copié !</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copier le fichier</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="bg-slate-900 text-slate-200 font-mono text-xs p-4 rounded-2xl overflow-x-auto border border-slate-800 max-h-72">
                  <pre>{step.codeSnippet.code}</pre>
                </div>
              </div>
            )}

            {/* Practical Advice */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
              <div className="text-xs font-bold text-slate-800 flex items-center mb-2">
                <Lightbulb className="w-4 h-4 text-amber-500 mr-1.5" />
                Conseils Pratiques du Bâtisseur :
              </div>
              <ul className="list-disc pl-5 text-xs text-slate-600 space-y-1.5">
                {step.tips.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>

            {/* The Speech for the Minister */}
            <div className="bg-amber-50/80 border border-amber-200/90 rounded-2xl p-4">
              <div className="text-xs font-bold text-amber-950 uppercase tracking-wider flex items-center mb-1.5">
                <Sparkles className="w-4 h-4 text-amber-600 mr-1.5" />
                Ce que vous devez dire au Ministre & au Jury à cette étape :
              </div>
              <p className="text-xs sm:text-sm font-serif italic text-amber-900 bg-white/70 p-3.5 rounded-xl border border-amber-200/60 leading-relaxed">
                {step.ministerArgument}
              </p>
            </div>

            {/* Navigation buttons */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
                disabled={activeStep === 1}
                className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-40 transition-colors"
              >
                ← Étape Précédente
              </button>
              <button
                onClick={() => setActiveStep((prev) => Math.min(STEPS.length, prev + 1))}
                disabled={activeStep === STEPS.length}
                className="px-5 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold disabled:opacity-40 transition-colors flex items-center space-x-1"
              >
                <span>Étape Suivante</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
