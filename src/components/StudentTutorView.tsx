import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Sparkles,
  Volume2,
  RotateCcw,
  BookOpen,
  CheckCircle2,
  User,
  Bot,
  Loader2,
  Cpu,
  Zap,
  ShieldCheck,
} from "lucide-react";
import { EducationLevel, Subject, ChatMessage } from "../types";

interface StudentTutorViewProps {
  isOfflineMode: boolean;
  initialPrompt?: string;
  initialSubject?: Subject;
  initialLevel?: EducationLevel;
  onClearInitialPrompt?: () => void;
}

const SAMPLE_QUESTIONS: { label: string; subject: Subject; level: EducationLevel; text: string }[] = [
  {
    label: "⭐ Pythagore (3e Brevet)",
    subject: "Mathématiques",
    level: "Troisième (Brevet / BFEM / DEF)",
    text: "Je suis en 3e et je ne comprends pas le théorème de Pythagore.",
  },
  {
    label: "Exponentielle & TVI (Bac S)",
    subject: "Mathématiques",
    level: "Terminale S (Scientifique)",
    text: "Je n'arrive pas à comprendre quand et comment utiliser le Théorème des Valeurs Intermédiaires (TVI) pour montrer qu'une équation a une unique solution.",
  },
  {
    label: "Dissertation Philo (Bac L)",
    subject: "Philosophie",
    level: "Terminale L (Littéraire)",
    text: "Comment passer de la citation 'L'obéissance à la loi qu'on s'est prescrite est liberté' de Rousseau à une problématique philosophique sans donner mon simple avis ?",
  },
  {
    label: "Satellite & 2e loi de Newton",
    subject: "Physique-Chimie",
    level: "Terminale S (Scientifique)",
    text: "Peux-tu m'expliquer pourquoi l'accélération tangentielle d'un satellite en mouvement circulaire uniforme est nulle dans le repère de Frenet ?",
  },
  {
    label: "Participe Passé (BFEM)",
    subject: "Français",
    level: "Troisième (Brevet / BFEM / DEF)",
    text: "Quelle est l'astuce infaillible pour ne plus jamais hésiter sur l'accord du participe passé avec l'auxiliaire 'avoir' ?",
  },
];

export const StudentTutorView: React.FC<StudentTutorViewProps> = ({
  isOfflineMode,
  initialPrompt,
  initialSubject,
  initialLevel,
  onClearInitialPrompt,
}) => {
  const [subject, setSubject] = useState<Subject>(initialSubject || "Mathématiques");
  const [level, setLevel] = useState<EducationLevel>(
    initialLevel || "Troisième (Brevet / BFEM / DEF)"
  );
  const [pedagogicalMode, setPedagogicalMode] = useState<"socratique" | "explicatif">("socratique");
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-1",
      sender: "tutor",
      text: `Salutations républicaines ! Je suis le **Professeur Sékou**, ton Tuteur National d'Excellence, propulsé par l'intelligence artificielle **NVIDIA NIM sur GPU Brev**.

Je suis là pour t'accompagner gratuitement jour et nuit, que tu sois au fond d'un village ou dans un grand lycée de capitale.

En **${subject}** (${level}), nous allons décortiquer chaque notion sans stress.
Pose-moi ta question ou choisis un sujet ci-dessous : où bloques-tu aujourd'hui ?`,
      timestamp: "à l'instant",
      source: "nvidia_brev",
      gpuInfo: "NVIDIA L4 (Brev Cloud)",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Handle auto-trigger from external tab
  useEffect(() => {
    if (initialPrompt) {
      if (initialSubject) setSubject(initialSubject);
      if (initialLevel) setLevel(initialLevel);
      handleSendMessage(initialPrompt);
      if (onClearInitialPrompt) onClearInitialPrompt();
    }
  }, [initialPrompt]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          subject,
          level,
          mode: pedagogicalMode,
          history: messages.slice(-5),
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur de communication avec le serveur");
      }

      const data = await response.json();
      const tutorMsg: ChatMessage = {
        id: `tut-${Date.now()}`,
        sender: "tutor",
        text: data.reply || "Poursuivons notre réflexion ensemble !",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        source: data.source,
        gpuInfo: data.gpuInfo,
        latencyMs: data.latencyMs,
      };

      setMessages((prev) => [...prev, tutorMsg]);
    } catch (err) {
      console.error(err);
      // Resilience fallback
      const offlineMsg: ChatMessage = {
        id: `tut-off-${Date.now()}`,
        sender: "tutor",
        text: `Mode de résilience activé : pour résoudre cette question en **${subject}** :
1. Isole les données de départ et le but final.
2. Formule l'hypothèse centrale sur ton cahier.
3. Quelle est la première ligne de calcul ou d'argumentation que tu tentes ? Je t'écoute !`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        source: "pedagogical_engine",
        gpuInfo: "Moteur Pédagogique Embarqué",
      };
      setMessages((prev) => [...prev, offlineMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const speakText = (text: string, msgId: string) => {
    if (!("speechSynthesis" in window)) return;

    if (isSpeaking === msgId) {
      window.speechSynthesis.cancel();
      setIsSpeaking(null);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*_#`]/g, "");
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = "fr-FR";
    utterance.rate = 1.0;
    utterance.onend = () => setIsSpeaking(null);
    utterance.onerror = () => setIsSpeaking(null);
    setIsSpeaking(msgId);
    window.speechSynthesis.speak(utterance);
  };

  const handleResetChat = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(null);
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: "tutor",
        text: `Séance réinitialisée en **${subject}** (${level}). De quoi aimerais-tu parler maintenant ?`,
        timestamp: "à l'instant",
        source: "nvidia_brev",
      },
    ]);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Configuration bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 mb-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-emerald-800 to-teal-700 text-white shadow-xs">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-sm font-bold text-slate-900">
                  Professeur Sékou – Tuteur Républicain Interactif
                </h2>
                <span className="bg-slate-900 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full font-mono flex items-center space-x-1 border border-emerald-500/30">
                  <Zap className="w-3 h-3 text-emerald-400" />
                  <span>NVIDIA NIM / Brev</span>
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Méthode active : guidage pas à pas, encouragement et respect du programme officiel
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">Méthode :</span>
            <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
              <button
                onClick={() => setPedagogicalMode("socratique")}
                id="mode-socratic-btn"
                className={`px-2.5 py-1 rounded font-medium transition-all ${
                  pedagogicalMode === "socratique"
                    ? "bg-white text-emerald-800 shadow-xs font-semibold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                🧠 Socratique (Pas-à-pas)
              </button>
              <button
                onClick={() => setPedagogicalMode("explicatif")}
                id="mode-explicatif-btn"
                className={`px-2.5 py-1 rounded font-medium transition-all ${
                  pedagogicalMode === "explicatif"
                    ? "bg-white text-emerald-800 shadow-xs font-semibold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                📖 Cours Magistral
              </button>
            </div>
            <button
              onClick={handleResetChat}
              id="reset-chat-btn"
              title="Nouvelle session"
              className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Classe / Examen préparé :
            </label>
            <select
              value={level}
              id="tutor-level-select"
              onChange={(e) => setLevel(e.target.value as EducationLevel)}
              className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-emerald-600/30"
            >
              <option value="Troisième (Brevet / BFEM / DEF)">Classe de Troisième (Brevet / BFEM / DEF)</option>
              <option value="Terminale S (Scientifique)">Terminale S (Scientifique - BAC S1 / S2)</option>
              <option value="Terminale L (Littéraire)">Terminale L (Littéraire - BAC L1 / L2)</option>
              <option value="Terminale G (Économie & Gestion)">Terminale G (Économie & Gestion)</option>
              <option value="Première">Classe de Première</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Matière d'étude :
            </label>
            <select
              value={subject}
              id="tutor-subject-select"
              onChange={(e) => setSubject(e.target.value as Subject)}
              className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-emerald-600/30"
            >
              <option value="Mathématiques">Mathématiques</option>
              <option value="Physique-Chimie">Physique-Chimie</option>
              <option value="Philosophie">Philosophie</option>
              <option value="Sciences de la Vie et de la Terre (SVT)">SVT (Biologie-Géologie)</option>
              <option value="Français">Français & Grammaire</option>
              <option value="Histoire-Géographie">Histoire-Géographie</option>
              <option value="Anglais">Anglais</option>
            </select>
          </div>
        </div>

        {/* Suggested Quick Questions */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 font-medium whitespace-nowrap text-[11px] flex items-center">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 mr-1" />
            Exemples :
          </span>
          {SAMPLE_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              id={`quick-question-${idx}`}
              onClick={() => {
                setSubject(q.subject);
                setLevel(q.level);
                handleSendMessage(q.text);
              }}
              className="bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300 border border-slate-200/80 px-2.5 py-1 rounded-full text-slate-700 whitespace-nowrap transition-colors text-[11px] font-medium"
            >
              {q.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs flex flex-col h-[520px]">
        {/* Messages Stream */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg) => {
            const isTutor = msg.sender === "tutor";
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isTutor ? "justify-start" : "justify-end"}`}
              >
                {isTutor && (
                  <div className="w-8 h-8 rounded-full bg-emerald-800 text-white flex items-center justify-center shrink-0 shadow-xs text-xs font-bold ring-2 ring-emerald-500/20">
                    PS
                  </div>
                )}
                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                    isTutor
                      ? "bg-slate-50 border border-slate-200 text-slate-800"
                      : "bg-emerald-800 text-white"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5 opacity-80 text-[11px]">
                    <span className="font-semibold flex items-center space-x-1.5">
                      <span>{isTutor ? "Professeur Sékou" : "Moi (Élève)"}</span>
                      {isTutor && msg.source === "nvidia_brev" && (
                        <span className="bg-slate-900 text-emerald-300 text-[9px] px-1.5 py-0.2 rounded font-mono font-bold border border-emerald-400/30">
                          NVIDIA NIM (Brev)
                        </span>
                      )}
                    </span>
                    <div className="flex items-center space-x-1.5">
                      <span>{msg.timestamp}</span>
                      {isTutor && (
                        <button
                          onClick={() => speakText(msg.text, msg.id)}
                          id={`speak-btn-${msg.id}`}
                          className="hover:text-emerald-600 transition-colors p-0.5"
                          title="Écouter la réponse à voix haute"
                        >
                          <Volume2
                            className={`w-3.5 h-3.5 ${
                              isSpeaking === msg.id ? "text-amber-500 animate-pulse" : ""
                            }`}
                          />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 whitespace-pre-line font-sans">
                    {msg.text}
                  </div>

                  {isTutor && (msg.gpuInfo || msg.latencyMs) && (
                    <div className="mt-2.5 pt-2 border-t border-slate-200/80 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                      <span className="flex items-center space-x-1">
                        <Cpu className="w-3 h-3 text-emerald-600" />
                        <span>{msg.gpuInfo || "NVIDIA L4 Cloud GPU"}</span>
                      </span>
                      {msg.latencyMs && <span>{msg.latencyMs} ms</span>}
                    </div>
                  )}
                </div>

                {!isTutor && (
                  <div className="w-8 h-8 rounded-full bg-slate-300 text-slate-700 flex items-center justify-center shrink-0 text-xs font-bold">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 justify-start items-center">
              <div className="w-8 h-8 rounded-full bg-emerald-800 text-white flex items-center justify-center shrink-0 text-xs font-bold">
                PS
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 flex items-center space-x-2 text-xs text-slate-600">
                <Loader2 className="w-4 h-4 text-emerald-600 animate-spin" />
                <span>Le Professeur Sékou prépare ton raisonnement pédagogique sur NVIDIA GPU Brev...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <div className="p-3 border-t border-slate-200 bg-slate-50/70 rounded-b-2xl">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              id="tutor-chat-input"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={`Pose ta question en ${subject} ou décris ce qui te bloque...`}
              disabled={isLoading}
              className="flex-1 bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-600/40"
            />
            <button
              type="submit"
              id="tutor-send-btn"
              disabled={!inputMessage.trim() || isLoading}
              className="bg-emerald-800 hover:bg-emerald-700 disabled:opacity-50 text-white px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm flex items-center space-x-1.5 transition-colors shadow-xs"
            >
              <span>Envoyer</span>
              <Send className="w-4 h-4" />
            </button>
          </form>

          <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 px-1">
            <span className="flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Conforme aux programmes et épreuves officielles de la République</span>
            </span>
            <span className="text-emerald-700 font-medium">Inférence accélérée par NVIDIA Brev</span>
          </div>
        </div>
      </div>
    </div>
  );
};
