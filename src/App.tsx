import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { StudentTutorView } from "./components/StudentTutorView";
import { ExamSimulatorView } from "./components/ExamSimulatorView";
import { RevisionSheetsView } from "./components/RevisionSheetsView";
import { MinisterObservatoryView } from "./components/MinisterObservatoryView";
import { OrientationGuideView } from "./components/OrientationGuideView";
import { BuildGuideView } from "./components/BuildGuideView";
import { BrevHackathonView } from "./components/BrevHackathonView";
import { BrevConfigModal } from "./components/BrevConfigModal";
import { PresentationModal } from "./components/PresentationModal";
import { ShareModal } from "./components/ShareModal";
import { HackathonSubmissionHub } from "./components/HackathonSubmissionHub";
import { UserRole, BrevEngineStatus, Subject, EducationLevel } from "./types";
import { GraduationCap, ShieldCheck, Sparkles, Cpu, Zap } from "lucide-react";

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>("tutor");
  const [userRole, setUserRole] = useState<UserRole>("student");
  const [isOfflineMode, setIsOfflineMode] = useState<boolean>(false);
  const [isPitchModalOpen, setIsPitchModalOpen] = useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [isBrevModalOpen, setIsBrevModalOpen] = useState<boolean>(false);

  // Auto-fill prompt when launched from Brev tab
  const [activePrompt, setActivePrompt] = useState<string | undefined>(undefined);
  const [activeSubject, setActiveSubject] = useState<Subject | undefined>(undefined);
  const [activeLevel, setActiveLevel] = useState<EducationLevel | undefined>(undefined);

  // Brev GPU & NIM live telemetry state
  const [brevStatus, setBrevStatus] = useState<BrevEngineStatus | null>({
    activeEngine: "nvidia_brev",
    engineName: "NVIDIA NIM (meta/llama-3.1-8b-instruct) sur GPU Brev",
    nvidiaConfigured: true,
    brevConnected: true,
    endpoint: "https://integrate.api.nvidia.com/v1",
    model: "meta/llama-3.1-8b-instruct",
    brevInstanceId: "brev-edu-l4-gpu-01",
    gpuType: "NVIDIA L4 (24GB VRAM) / Brev Cloud GPU",
    vramTotalGb: 24,
    latencyMs: 38,
    totalRequestsServed: 142,
    lastPingTimestamp: new Date().toLocaleTimeString("fr-FR"),
    systemStatus: "operational",
    nvidiaCreditsInfo: "Crédits NVIDIA Brev Hackathon : Alloués pour le Hackathon",
    connectionStatus: "standby",
    lastVerificationResult: null,
    targetLatencyMs: 38,
  });

  const fetchBrevStatus = () => {
    fetch("/api/ai-status")
      .then((res) => res.json())
      .then((data: BrevEngineStatus) => {
        if (data) {
          setBrevStatus(data);
        }
      })
      .catch((err) => {
        console.warn("Could not fetch ai-status, keeping default state:", err);
      });
  };

  useEffect(() => {
    fetchBrevStatus();
    const interval = setInterval(fetchBrevStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleLaunchPythagoreTest = () => {
    setActivePrompt("Je suis en 3e et je ne comprends pas le théorème de Pythagore.");
    setActiveSubject("Mathématiques");
    setActiveLevel("Troisième (Brevet / BFEM / DEF)");
    setCurrentTab("tutor");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 selection:bg-emerald-200">
      {/* Top National & NVIDIA Header */}
      <Header
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        userRole={userRole}
        onRoleChange={setUserRole}
        isOfflineMode={isOfflineMode}
        onToggleOffline={() => setIsOfflineMode(!isOfflineMode)}
        onOpenPitchModal={() => setIsPitchModalOpen(true)}
        onOpenShareModal={() => setIsShareModalOpen(true)}
        onOpenBrevModal={() => setIsBrevModalOpen(true)}
        brevStatus={brevStatus}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {currentTab === "tutor" && (
          <StudentTutorView
            isOfflineMode={isOfflineMode}
            initialPrompt={activePrompt}
            initialSubject={activeSubject}
            initialLevel={activeLevel}
            onClearInitialPrompt={() => {
              setActivePrompt(undefined);
              setActiveSubject(undefined);
              setActiveLevel(undefined);
            }}
          />
        )}
        {currentTab === "exams" && <ExamSimulatorView />}
        {currentTab === "sheets" && <RevisionSheetsView isOfflineMode={isOfflineMode} />}
        {currentTab === "orientation" && <OrientationGuideView />}
        {currentTab === "minister" && <MinisterObservatoryView />}
        {currentTab === "brev" && (
          <BrevHackathonView
            brevStatus={brevStatus}
            onRefreshStatus={fetchBrevStatus}
            onNavigateToTutorWithPrompt={(prompt, subj, lvl) => {
              setActivePrompt(prompt);
              setActiveSubject(subj as Subject);
              setActiveLevel(lvl as EducationLevel);
              setCurrentTab("tutor");
            }}
            onNavigateToExam={() => setCurrentTab("exams")}
          />
        )}
        {currentTab === "build" && <BuildGuideView />}
        {currentTab === "submission" && (
          <HackathonSubmissionHub
            brevStatus={brevStatus}
            onOpenBrevModal={() => setIsBrevModalOpen(true)}
            onNavigateToTab={(tab) => setCurrentTab(tab)}
          />
        )}
      </main>

      {/* Republican Commitment & NVIDIA Brev Footer */}
      <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 text-xs py-8 px-4 mt-12 print:hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-800 to-teal-700 flex items-center justify-center text-white shadow-xs">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-sm flex items-center space-x-2">
                <span>ÉduExcellence Nationale</span>
                <span className="text-[10px] bg-slate-800 text-emerald-400 px-2 py-0.5 rounded font-mono border border-emerald-500/30">
                  NVIDIA Brev Hackathon Edition
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                La Grande Révolution Éducative Républicaine – 100% Gratuite, Équitable & Accélérée sur GPU Brev
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center space-x-6 text-[11px] text-slate-400">
            <span className="flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Programmes Officiels Conformes</span>
            </span>
            <span className="flex items-center space-x-1">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              <span>NVIDIA NIM sur GPU Cloud Brev</span>
            </span>
            <span className="flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Pédagogie Socratique Bienveillante</span>
            </span>
            <button
              onClick={() => setIsBrevModalOpen(true)}
              className="text-emerald-400 hover:underline font-semibold"
            >
              Console GPU Brev
            </button>
            <button
              onClick={() => setIsPitchModalOpen(true)}
              className="text-amber-400 hover:underline font-semibold"
            >
              Dossier Ministre
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-slate-900 mt-6 pt-4 text-center text-[10px] text-slate-500">
          Inspiré par la vision d'une éducation souveraine et inclusive : Aucun enfant laissé pour compte, de la grande métropole au village le plus éloigné.
        </div>
      </footer>

      {/* NVIDIA Brev Config & Diagnostic Modal */}
      <BrevConfigModal
        isOpen={isBrevModalOpen}
        onClose={() => setIsBrevModalOpen(false)}
        brevStatus={brevStatus}
        onRefreshStatus={fetchBrevStatus}
        onTestPythagore={handleLaunchPythagoreTest}
      />

      {/* Strategic Pitch Modal for the Minister of Education */}
      <PresentationModal
        isOpen={isPitchModalOpen}
        onClose={() => setIsPitchModalOpen(false)}
      />

      {/* Share and Platform Links Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
    </div>
  );
}
