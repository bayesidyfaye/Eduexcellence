import React, { useState } from "react";
import {
  X,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Terminal,
  Activity,
  Server,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { BrevEngineStatus } from "../types";

interface BrevConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  brevStatus: BrevEngineStatus | null;
  onRefreshStatus: () => void;
  onTestPythagore: () => void;
}

export const BrevConfigModal: React.FC<BrevConfigModalProps> = ({
  isOpen,
  onClose,
  brevStatus,
  onRefreshStatus,
  onTestPythagore,
}) => {
  const [endpoint, setEndpoint] = useState(
    brevStatus?.endpoint || "http://localhost:8000/v1"
  );
  const [apiKey, setApiKey] = useState("");
  const [model, setModel] = useState(brevStatus?.model || "meta/llama-3.1-8b-instruct");
  const [preferNvidia, setPreferNvidia] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error" | "info";
    text: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleTestConnection = async () => {
    setIsTesting(true);
    setFeedback(null);
    try {
      const res = await fetch("/api/brev-test-connection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          endpoint,
          apiKey,
          model,
        }),
      });
      const data = await res.json();
      if (data.connected) {
        setFeedback({
          type: "success",
          text: `Connexion vérifiée avec succès ! Microservice NIM joignable en ${data.latencyMs} ms sur ${endpoint}.`,
        });
      } else {
        setFeedback({
          type: "error",
          text: `Échec du test : ${data.message || "Endpoint inaccessible"}. Le relais pédagogique résilient prend le relais automatiquement.`,
        });
      }
      onRefreshStatus();
    } catch {
      setFeedback({
        type: "error",
        text: "Erreur réseau lors du test de connexion.",
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setFeedback(null);
    try {
      const res = await fetch("/api/brev-config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          endpoint,
          apiKey,
          model,
          preferNvidia,
          testImmediately: true,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        if (data.testResult?.connected) {
          setFeedback({
            type: "success",
            text: `Configuration sauvegardée et connexion vérifiée (${data.testResult.latencyMs} ms) !`,
          });
        } else {
          setFeedback({
            type: "info",
            text: "Configuration enregistrée. En attente du démarrage du conteneur NIM sur l'instance Brev.",
          });
        }
        onRefreshStatus();
      } else {
        setFeedback({
          type: "error",
          text: "Erreur lors de la mise à jour de la configuration.",
        });
      }
    } catch {
      setFeedback({
        type: "error",
        text: "Erreur de communication réseau.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const isNvidiaConnected = !!brevStatus?.brevConnected;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-950 via-emerald-950 to-slate-900 text-white p-6 relative border-b border-emerald-800">
          <button
            onClick={onClose}
            id="close-brev-modal-btn"
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Cpu className="w-4 h-4" />
            <span>Console Moteur & Diagnostics GPU</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white flex items-center space-x-2">
            <span>NVIDIA Brev & NIM Infrastructure</span>
          </h2>
          <p className="text-xs text-emerald-200/90 mt-1">
            Supervisez et connectez le microservice d'inférence NVIDIA NIM hébergé sur votre instance GPU Brev.
          </p>
        </div>

        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-slate-800 text-xs sm:text-sm">
          {/* Live Engine Status Card */}
          <div
            className={`p-4 rounded-2xl border ${
              isNvidiaConnected
                ? "bg-emerald-50/90 border-emerald-300"
                : "bg-amber-50/90 border-amber-300"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center space-x-1.5">
                <Activity className="w-4 h-4 text-emerald-600" />
                <span>Statut d'Inférence Actuel</span>
              </span>
              <span
                className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                  isNvidiaConnected
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-amber-500 text-slate-950 font-bold"
                }`}
              >
                {isNvidiaConnected
                  ? "🟢 IA NVIDIA active sur Brev"
                  : "🟡 Mode Relais Pédagogique Actif"}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-3 text-xs">
              <div className="bg-white p-2.5 rounded-xl border border-slate-200/80">
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">Instance Brev</span>
                <span className="font-mono font-bold text-slate-900 truncate block">
                  {brevStatus?.brevInstanceId || "brev-edu-l4-gpu-01"}
                </span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-200/80">
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">GPU Cible</span>
                <span className="font-mono font-bold text-emerald-800 truncate block">
                  {brevStatus?.gpuType ? brevStatus.gpuType.split("/")[0]?.trim() : "NVIDIA L4"}
                </span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-200/80">
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">Latence Mesurée</span>
                <span className="font-mono font-bold text-slate-900 block">
                  {brevStatus?.latencyMs !== null && brevStatus?.latencyMs !== undefined
                    ? `${brevStatus.latencyMs} ms`
                    : "Non mesurée"}
                </span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-200/80">
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">Requêtes Servies</span>
                <span className="font-mono font-bold text-slate-900 block">
                  {brevStatus?.totalRequestsServed || 0}
                </span>
              </div>
            </div>

            <div className="mt-3 text-[11px] text-slate-600 flex items-center justify-between">
              <span>{brevStatus?.nvidiaCreditsInfo || "Programme Hackathon : crédits Brev alloués"}</span>
              <button
                onClick={onRefreshStatus}
                id="refresh-brev-status-btn"
                className="text-emerald-700 hover:text-emerald-900 font-semibold flex items-center space-x-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Rafraîchir statut</span>
              </button>
            </div>
          </div>

          {/* Quick Jury Test Action: Pythagorean theorem test */}
          <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold text-amber-300 flex items-center space-x-1">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Test Rapide d'Évaluation Hackathon</span>
              </div>
              <p className="text-[11px] text-slate-300 mt-0.5">
                Lancer immédiatement la question clé : <em>« Je suis en 3e et je ne comprends pas le théorème de Pythagore »</em>
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                onTestPythagore();
              }}
              id="trigger-pythagore-test-btn"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-3.5 py-2 rounded-xl text-xs whitespace-nowrap transition-colors shadow-xs"
            >
              Tester avec Professeur Sékou 🚀
            </button>
          </div>

          {/* Configuration Form */}
          <form onSubmit={handleSaveConfig} className="space-y-4">
            <div className="text-xs font-bold text-slate-900 border-b border-slate-100 pb-2">
              Paramètres de Connexion au Microservice NIM
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Endpoint du Microservice NVIDIA NIM :
              </label>
              <input
                type="text"
                value={endpoint}
                onChange={(e) => setEndpoint(e.target.value)}
                placeholder="http://localhost:8000/v1 ou https://integrate.api.nvidia.com/v1"
                className="w-full text-xs font-mono bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 focus:ring-2 focus:ring-emerald-600/30"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                Sur votre instance Brev locale : <code>http://localhost:8000/v1</code> ou le port 8000 exposé par Brev.
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Clé API NGC / NVIDIA Brev (Optionnelle si conteneur local) :
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="nvapi-xxxxxxxxxxxxxxxxxxxxxxxx"
                  className="w-full text-xs font-mono bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:ring-2 focus:ring-emerald-600/30"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Modèle NVIDIA NIM sélectionné :
                </label>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:ring-2 focus:ring-emerald-600/30"
                >
                  <option value="meta/llama-3.1-8b-instruct">meta/llama-3.1-8b-instruct (Ultra-rapide, standard Brev)</option>
                  <option value="meta/llama-3.3-70b-instruct">meta/llama-3.3-70b-instruct (Grand raisonnement)</option>
                  <option value="mistralai/mixtral-8x7b-instruct-v0.1">mistralai/mixtral-8x7b-instruct-v0.1</option>
                  <option value="nvidia/nemotron-4-340b-instruct">nvidia/nemotron-4-340b-instruct</option>
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <input
                type="checkbox"
                id="prefer-nvidia-checkbox"
                checked={preferNvidia}
                onChange={(e) => setPreferNvidia(e.target.checked)}
                className="w-4 h-4 text-emerald-700 rounded border-slate-300 focus:ring-emerald-500"
              />
              <label htmlFor="prefer-nvidia-checkbox" className="text-xs font-medium text-slate-700 cursor-pointer">
                Prioriser systématiquement l'inférence sur GPU NVIDIA Brev (avec fallback Gemini automatique)
              </label>
            </div>

            {feedback && (
              <div
                className={`p-3 rounded-xl text-xs flex items-start space-x-2 border ${
                  feedback.type === "success"
                    ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                    : feedback.type === "error"
                    ? "bg-amber-50 border-amber-300 text-amber-900"
                    : "bg-blue-50 border-blue-300 text-blue-900"
                }`}
              >
                {feedback.type === "success" ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : feedback.type === "error" ? (
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                ) : (
                  <Activity className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                )}
                <span className="leading-relaxed">{feedback.text}</span>
              </div>
            )}

            <div className="pt-3 flex flex-wrap items-center justify-between gap-2">
              <button
                type="button"
                onClick={handleTestConnection}
                disabled={isTesting}
                id="modal-test-connection-btn"
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-emerald-300 font-semibold rounded-xl text-xs flex items-center space-x-1.5 transition-colors border border-emerald-500/40"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? "animate-spin" : ""}`} />
                <span>{isTesting ? "Vérification en cours..." : "Tester la connexion NIM"}</span>
              </button>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
                >
                  Fermer
                </button>
                <button
                  type="submit"
                  id="save-brev-config-btn"
                  disabled={isSaving}
                  className="px-5 py-2 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors shadow-xs"
                >
                  {isSaving ? "Enregistrement..." : "Appliquer la configuration"}
                </button>
              </div>
            </div>
          </form>

          {/* Quick CLI command helper */}
          <div className="bg-slate-950 p-4 rounded-2xl text-emerald-300 font-mono text-xs border border-slate-800">
            <div className="text-[11px] text-slate-400 mb-2 flex items-center justify-between">
              <span className="flex items-center space-x-1">
                <Terminal className="w-3.5 h-3.5 text-emerald-400 mr-1" />
                <span>Commandes Brev CLI :</span>
              </span>
              <span>Launchable NVIDIA Brev</span>
            </div>
            <pre className="text-[11px] overflow-x-auto whitespace-pre">
{`# 1. Créer une instance GPU sur Brev
brev create eduexcellence-gpu --gpu l4

# 2. Ouvrir le shell
brev shell eduexcellence-gpu

# 3. Lancer le déploiement automatisé
./setup-brev.sh`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
