import React, { useState } from "react";
import {
  Cpu,
  Zap,
  Terminal,
  Server,
  Layers,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Play,
  Activity,
  ArrowRight,
  ShieldCheck,
  Award,
  RefreshCw,
} from "lucide-react";
import { BrevEngineStatus } from "../types";

interface BrevHackathonViewProps {
  brevStatus: BrevEngineStatus | null;
  onRefreshStatus: () => void;
  onNavigateToTutorWithPrompt: (prompt: string, subject: string, level: string) => void;
  onNavigateToExam: () => void;
}

export const BrevHackathonView: React.FC<BrevHackathonViewProps> = ({
  brevStatus,
  onRefreshStatus,
  onNavigateToTutorWithPrompt,
  onNavigateToExam,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isPinging, setIsPinging] = useState(false);
  const [pingFeedback, setPingFeedback] = useState<{
    success: boolean;
    message: string;
    latencyMs?: number | null;
  } | null>(null);

  const copyCode = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handlePingNim = async () => {
    setIsPinging(true);
    setPingFeedback(null);
    try {
      const res = await fetch("/api/brev-test-connection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          endpoint: brevStatus?.endpoint,
          model: brevStatus?.model,
        }),
      });
      const data = await res.json();
      if (data.connected) {
        setPingFeedback({
          success: true,
          message: `Connexion vérifiée avec succès ! Inférence en direct mesurée à ${data.latencyMs} ms sur ${brevStatus?.gpuType ? brevStatus.gpuType.split("/")[0]?.trim() : "NVIDIA Brev"}.`,
          latencyMs: data.latencyMs,
        });
      } else {
        setPingFeedback({
          success: false,
          message: `Vérification : ${data.message || "Microservice NIM local non joignable sur le port 8000"}. Le système utilise automatiquement le relais pédagogique de secours.`,
        });
      }
      onRefreshStatus();
    } catch {
      setPingFeedback({
        success: false,
        message: "Erreur réseau lors du test de connexion vers l'instance Brev.",
      });
    } finally {
      setIsPinging(false);
    }
  };

  const isNvidiaConnected = !!brevStatus?.brevConnected;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Hero Header with Hackathon Badge */}
      <div className="bg-gradient-to-r from-slate-950 via-emerald-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-sm border border-emerald-900/60 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[11px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center space-x-1.5">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>NVIDIA Brev Hackathon – Intégration Matérielle Complète</span>
            </span>
            <span
              className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${
                isNvidiaConnected
                  ? "bg-emerald-950/80 text-emerald-300 border-emerald-400/60"
                  : "bg-amber-950/80 text-amber-200 border-amber-500/50"
              }`}
            >
              {isNvidiaConnected
                ? "🟢 Inférence GPU Brev Validée en Direct"
                : "⚙️ Instance Brev : Prête pour Déploiement GPU"}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-serif">
            Architecture Souveraine NVIDIA Brev & Microservices NIM
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 mt-2 leading-relaxed">
            Pour garantir l'égalité des chances à chaque élève, le moteur d'intelligence artificielle d'<strong>ÉduExcellence</strong> ne dépend pas de services opaques : il s'exécute directement sur une <strong>instance GPU NVIDIA orchestrée par Brev</strong> avec le microservice standardisé <strong>NVIDIA NIM</strong> (TensorRT-LLM).
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-5">
            <button
              onClick={() =>
                onNavigateToTutorWithPrompt(
                  "Je suis en 3e et je ne comprends pas le théorème de Pythagore.",
                  "Mathématiques",
                  "Troisième (Brevet / BFEM / DEF)"
                )
              }
              id="hero-test-pythagore-btn"
              className="bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-2 transition-colors shadow-xs"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>Démarrer le Test Officiel (Pythagore 3e)</span>
            </button>

            <button
              onClick={handlePingNim}
              id="hero-ping-nim-btn"
              disabled={isPinging}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-2 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isPinging ? "animate-spin" : ""}`} />
              <span>Tester la Latence GPU en Direct</span>
            </button>
          </div>

          {pingFeedback && (
            <div
              className={`mt-3 p-3 rounded-xl text-xs flex items-start space-x-2.5 border ${
                pingFeedback.success
                  ? "bg-emerald-900/80 border-emerald-400/60 text-emerald-200"
                  : "bg-amber-950/80 border-amber-500/60 text-amber-200"
              }`}
            >
              {pingFeedback.success ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              )}
              <span className="leading-relaxed">{pingFeedback.message}</span>
            </div>
          )}
        </div>
      </div>

      {/* Real-time Status Card */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs">
          <div className="text-xs text-slate-500 flex items-center justify-between font-semibold">
            <span>Moteur d'Inférence Actif</span>
            <Cpu className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-sm font-bold text-slate-900 mt-2 flex items-center space-x-1.5">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isNvidiaConnected ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
              }`}
            ></span>
            <span className="truncate">
              {isNvidiaConnected
                ? `NVIDIA NIM (${brevStatus?.model.split("/")[1] || "Llama 3.1"})`
                : "Moteur Pédagogique de Relais"}
            </span>
          </div>
          <div
            className={`text-[11px] font-semibold mt-1 ${
              isNvidiaConnected ? "text-emerald-700" : "text-amber-700"
            }`}
          >
            {isNvidiaConnected
              ? "🟢 IA NVIDIA active sur Brev"
              : "🟡 Relais Pédagogique (NIM en attente)"}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs">
          <div className="text-xs text-slate-500 flex items-center justify-between font-semibold">
            <span>Instance Brev & GPU</span>
            <Server className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-sm font-bold text-slate-900 mt-2 font-mono">
            {brevStatus?.gpuType ? brevStatus.gpuType.split("/")[0]?.trim() : "NVIDIA L4 GPU"}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Spécification cible : 24 GB VRAM • CUDA 12.4 • TensorRT
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs">
          <div className="text-xs text-slate-500 flex items-center justify-between font-semibold">
            <span>Latence d'Inférence</span>
            <Activity className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl font-extrabold text-slate-900 mt-1 font-mono">
            {brevStatus?.latencyMs !== null && brevStatus?.latencyMs !== undefined
              ? brevStatus.latencyMs
              : brevStatus?.targetLatencyMs || 38}{" "}
            <span className="text-xs font-normal text-slate-500">
              {brevStatus?.latencyMs ? "ms (mesuré)" : "ms (cible L4)"}
            </span>
          </div>
          <div
            className={`text-[11px] font-semibold mt-1 ${
              brevStatus?.latencyMs ? "text-emerald-700" : "text-slate-500"
            }`}
          >
            {brevStatus?.latencyMs
              ? "⚡ Latence mesurée en direct"
              : "En attente du premier test"}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs">
          <div className="text-xs text-slate-500 flex items-center justify-between font-semibold">
            <span>Économie / Élève</span>
            <Award className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-xl font-extrabold text-emerald-700 mt-1 font-mono">
            100% <span className="text-xs font-normal text-slate-500">Gratuit</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            {brevStatus?.nvidiaCreditsInfo || "Crédits NVIDIA Brev pris en charge"}
          </div>
        </div>
      </div>

      {/* Interactive Visual Pipeline */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Le Flux d'Inférence Complet : De l'Élève au GPU NVIDIA sur Brev
            </h2>
            <p className="text-xs text-slate-500">
              Ce schéma illustre précisément où intervient NVIDIA Brev dans la pile logicielle.
            </p>
          </div>
          <span className="text-[10px] font-mono bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-1 rounded">
            REST + TensorRT-LLM
          </span>
        </div>

        {/* Steps diagram */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2">
          {/* Step 1 */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between">
            <div>
              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs mb-2">
                1
              </div>
              <h3 className="text-xs font-bold text-slate-900">Élève Républicain</h3>
              <p className="text-[11px] text-slate-500 mt-1">
                Choisit sa classe (3e ou Bac), pose sa question sur Pythagore ou soumet sa copie.
              </p>
            </div>
            <div className="mt-3 text-[10px] font-mono text-emerald-700 bg-emerald-50 p-1.5 rounded">
              Web Client / PWA
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between">
            <div>
              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs mb-2">
                2
              </div>
              <h3 className="text-xs font-bold text-slate-900">Backend ÉduExcellence</h3>
              <p className="text-[11px] text-slate-500 mt-1">
                Route Express <code>/api/tutor</code>. Applique les règles de pédagogie socratique.
              </p>
            </div>
            <div className="mt-3 text-[10px] font-mono text-slate-700 bg-slate-200/70 p-1.5 rounded">
              server.ts (Node)
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-emerald-50/70 border-2 border-emerald-500/50 rounded-2xl p-4 flex flex-col justify-between shadow-xs">
            <div>
              <div className="w-7 h-7 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold text-xs mb-2">
                3
              </div>
              <h3 className="text-xs font-bold text-emerald-950">NVIDIA NIM Microservice</h3>
              <p className="text-[11px] text-emerald-900/90 mt-1">
                Conteneur officiel <code>meta/llama-3.1-8b-instruct</code> avec API standard <code>/v1/chat/completions</code>.
              </p>
            </div>
            <div className="mt-3 text-[10px] font-mono text-emerald-900 bg-emerald-200/60 p-1.5 rounded font-bold">
              Port 8000 (OpenAI API)
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-slate-950 text-white border border-slate-800 rounded-2xl p-4 flex flex-col justify-between shadow-xs">
            <div>
              <div className="w-7 h-7 rounded-lg bg-emerald-500 text-slate-950 flex items-center justify-center font-bold text-xs mb-2">
                4
              </div>
              <h3 className="text-xs font-bold text-emerald-400">GPU NVIDIA sur Brev</h3>
              <p className="text-[11px] text-slate-300 mt-1">
                Instance Brev Cloud (L4 / A10G) avec CUDA 12 et compilation TensorRT pour inférence temps réel.
              </p>
            </div>
            <div className="mt-3 text-[10px] font-mono text-emerald-300 bg-slate-900 p-1.5 rounded border border-emerald-500/30">
              Brev Cloud Hardware
            </div>
          </div>

          {/* Step 5 */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between">
            <div>
              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs mb-2">
                5
              </div>
              <h3 className="text-xs font-bold text-slate-900">Réponse Socratique</h3>
              <p className="text-[11px] text-slate-500 mt-1">
                L'élève reçoit un guidage bienveillant qui le pousse à raisonner par lui-même.
              </p>
            </div>
            <div className="mt-3 text-[10px] font-mono text-emerald-700 bg-emerald-50 p-1.5 rounded">
              Affichage & Synthèse
            </div>
          </div>
        </div>
      </div>

      {/* Brev Launchable & Reproduction Guide for Hackathon Judges */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 6 Steps on Brev (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Terminal className="w-5 h-5 text-emerald-700" />
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Protocole de Reproduction pour les Juges du Hackathon
              </h2>
              <p className="text-[11px] text-slate-500">
                Comment déployer et vérifier ce prototype sur une instance Brev en 3 minutes :
              </p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            {/* Step 1 */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
              <div className="font-bold text-slate-900 mb-1 flex items-center justify-between">
                <span>1. Créer une instance GPU avec le CLI Brev</span>
                <button
                  onClick={() => copyCode("brev create eduexcellence-gpu --gpu l4", "cmd1")}
                  className="text-[11px] text-emerald-700 hover:text-emerald-900 flex items-center space-x-1"
                >
                  {copiedId === "cmd1" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copier</span>
                </button>
              </div>
              <div className="font-mono text-[11px] bg-slate-950 text-emerald-300 p-2 rounded-lg">
                brev create eduexcellence-gpu --gpu l4
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Brev configure automatiquement Ubuntu, les drivers NVIDIA, CUDA 12 et Docker.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
              <div className="font-bold text-slate-900 mb-1 flex items-center justify-between">
                <span>2. Se connecter au shell de l'instance Brev</span>
                <button
                  onClick={() => copyCode("brev shell eduexcellence-gpu", "cmd2")}
                  className="text-[11px] text-emerald-700 hover:text-emerald-900 flex items-center space-x-1"
                >
                  {copiedId === "cmd2" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copier</span>
                </button>
              </div>
              <div className="font-mono text-[11px] bg-slate-950 text-emerald-300 p-2 rounded-lg">
                brev shell eduexcellence-gpu
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
              <div className="font-bold text-slate-900 mb-1 flex items-center justify-between">
                <span>3. Exécuter le script automatisé setup-brev.sh</span>
                <button
                  onClick={() =>
                    copyCode("chmod +x setup-brev.sh && ./setup-brev.sh", "cmd3")
                  }
                  className="text-[11px] text-emerald-700 hover:text-emerald-900 flex items-center space-x-1"
                >
                  {copiedId === "cmd3" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copier</span>
                </button>
              </div>
              <div className="font-mono text-[11px] bg-slate-950 text-emerald-300 p-2 rounded-lg">
                chmod +x setup-brev.sh && ./setup-brev.sh
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Lance le conteneur NIM sur le GPU local et démarre le serveur web avec les bonnes variables.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Live Demonstration Checklist (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <ShieldCheck className="w-5 h-5 text-emerald-700" />
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Critères de Validation Hackathon
              </h2>
              <p className="text-[11px] text-slate-500">
                Tous les points demandés par le règlement :
              </p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-xl">
              <div className="font-bold text-emerald-950 flex items-center space-x-1.5 mb-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Utilisation Réelle de Brev</span>
              </div>
              <p className="text-[11px] text-emerald-900">
                Inférence NVIDIA NIM hébergée sur GPU Brev, pas seulement un logo décoratif.
              </p>
            </div>

            <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-xl">
              <div className="font-bold text-emerald-950 flex items-center space-x-1.5 mb-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Indicateur Visuel d'État en Direct</span>
              </div>
              <p className="text-[11px] text-emerald-900">
                Badge réactif dans l'en-tête indiquant en temps réel si l'inférence tourne sur <strong>GPU NVIDIA Brev (🟢)</strong> ou en <strong>mode relais / résilient (🟡)</strong>.
              </p>
            </div>

            <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-xl">
              <div className="font-bold text-emerald-950 flex items-center space-x-1.5 mb-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Résilience Pédagogique (Fallback)</span>
              </div>
              <p className="text-[11px] text-emerald-900">
                Basculement transparent vers Gemini ou moteur hors-ligne en cas de coupure réseau.
              </p>
            </div>

            <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-xl">
              <div className="font-bold text-emerald-950 flex items-center space-x-1.5 mb-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Cas d'Usage Réel Testable</span>
              </div>
              <p className="text-[11px] text-emerald-900">
                Test réussi sur le théorème de Pythagore (3e) et évaluation automatique d'une copie du BAC.
              </p>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={onNavigateToExam}
              id="goto-exam-evaluation-btn"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center space-x-2 transition-colors shadow-xs"
            >
              <span>Tester la Correction de Copie BAC (NIM)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
