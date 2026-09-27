import React from "react";
import {
  GraduationCap,
  ShieldCheck,
  BookOpen,
  Compass,
  Award,
  Wifi,
  WifiOff,
  FileText,
  Share2,
  Cpu,
  Zap,
  Trophy,
} from "lucide-react";
import { UserRole, BrevEngineStatus } from "../types";

interface HeaderProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  userRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  isOfflineMode: boolean;
  onToggleOffline: () => void;
  onOpenPitchModal: () => void;
  onOpenShareModal: () => void;
  onOpenBrevModal: () => void;
  brevStatus: BrevEngineStatus | null;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  userRole,
  onRoleChange,
  isOfflineMode,
  onToggleOffline,
  onOpenPitchModal,
  onOpenShareModal,
  onOpenBrevModal,
  brevStatus,
}) => {
  const isNvidiaActive = brevStatus?.activeEngine === "nvidia_brev";

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      {/* Official Government & NVIDIA Hackathon Top Bar */}
      <div className="bg-slate-950 text-white text-xs py-1.5 px-4 border-b border-emerald-900/60">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold tracking-wider uppercase text-[11px] text-emerald-200">
              Initiative Nationale de Réussite Éducative & Égalité Républicaine
            </span>
          </div>

          <div className="flex items-center space-x-3">
            {/* Live NVIDIA Brev Badge requested by user */}
            <button
              onClick={onOpenBrevModal}
              id="brev-status-pill-btn"
              title="Cliquer pour configurer l'instance NVIDIA Brev ou tester la connexion NIM en direct"
              className={`flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all shadow-xs border ${
                brevStatus?.brevConnected
                  ? "bg-emerald-950 text-emerald-300 border-emerald-500 hover:bg-emerald-900"
                  : "bg-slate-900 text-amber-300 border-amber-500/60 hover:bg-slate-800"
              }`}
            >
              <Cpu className={`w-3.5 h-3.5 ${brevStatus?.brevConnected ? "text-emerald-400" : "text-amber-400"}`} />
              <span>
                {brevStatus?.brevConnected
                  ? `🟢 GPU Brev Vérifié (${brevStatus.latencyMs || 42} ms)`
                  : "🟡 Brev NIM : En Attente (Relais Actif)"}
              </span>
              <span className="text-[9px] bg-slate-800 text-slate-300 px-1.5 py-0.2 rounded font-mono border border-slate-700">
                {brevStatus?.gpuType ? brevStatus.gpuType.split("/")[0]?.trim() : "NVIDIA L4"}
              </span>
            </button>

            {/* Offline toggle */}
            <button
              onClick={onToggleOffline}
              id="toggle-offline-btn"
              className={`flex items-center space-x-1.5 px-2.5 py-0.5 rounded text-[11px] font-medium transition-colors ${
                isOfflineMode
                  ? "bg-amber-500 text-slate-900 font-bold"
                  : "bg-slate-800/90 hover:bg-slate-700 text-slate-300"
              }`}
              title="Activer le mode économie de données pour zones à faible connectivité"
            >
              {isOfflineMode ? (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-slate-950" />
                  <span>Mode Hors-Ligne Actif</span>
                </>
              ) : (
                <>
                  <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Connecté au Réseau National</span>
                </>
              )}
            </button>

            {/* Hackathon Submission Quick Button */}
            <button
              onClick={() => onTabChange("submission")}
              id="open-submission-btn"
              className="flex items-center space-x-1.5 text-[11px] font-extrabold bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 px-3 py-0.5 rounded-full shadow-md transition-all border border-amber-300 ring-2 ring-amber-400/50"
            >
              <Trophy className="w-3.5 h-3.5 text-slate-950" />
              <span>🏆 Soumission Hackathon (17h30)</span>
            </button>

            {/* Minister presentation */}
            <button
              onClick={onOpenPitchModal}
              id="open-minister-pitch-btn"
              className="flex items-center space-x-1 text-[11px] font-medium bg-amber-400/80 hover:bg-amber-300 text-slate-950 px-2.5 py-0.5 rounded shadow-xs transition-colors font-semibold"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Dossier Ministre</span>
            </button>

            {/* Share app */}
            <button
              onClick={onOpenShareModal}
              id="open-share-modal-btn"
              className="flex items-center space-x-1.5 text-[11px] font-bold bg-white hover:bg-emerald-50 text-slate-900 px-3 py-0.5 rounded-full shadow-xs transition-colors ring-1 ring-emerald-400"
            >
              <Share2 className="w-3.5 h-3.5 text-emerald-700" />
              <span>Partager</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Branding Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-800 via-emerald-700 to-teal-600 flex items-center justify-center text-white shadow-sm ring-2 ring-emerald-500/20">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight font-serif">
                ÉduExcellence Nationale
              </h1>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Officiel
              </span>
              <span className="bg-slate-900 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-md border border-emerald-500/30 font-mono flex items-center space-x-1">
                <Zap className="w-3 h-3 text-emerald-400" />
                <span>NVIDIA Brev</span>
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Le tuteur d'excellence 24h/24 pour tous les lycéens et collégiens – Accéléré sur GPU NVIDIA Cloud Brev
            </p>
          </div>
        </div>

        {/* User Role Selector */}
        <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 self-start md:self-auto">
          <button
            onClick={() => {
              onRoleChange("student");
              if (currentTab === "minister") onTabChange("tutor");
            }}
            id="role-student-btn"
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              userRole === "student"
                ? "bg-white text-emerald-900 shadow-xs font-semibold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            👨‍🎓 Espace Élève
          </button>
          <button
            onClick={() => {
              onRoleChange("teacher");
              if (currentTab === "minister") onTabChange("exams");
            }}
            id="role-teacher-btn"
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              userRole === "teacher"
                ? "bg-white text-emerald-900 shadow-xs font-semibold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            👩‍🏫 Enseignant
          </button>
          <button
            onClick={() => {
              onRoleChange("minister");
              onTabChange("minister");
            }}
            id="role-minister-btn"
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              userRole === "minister"
                ? "bg-emerald-800 text-white shadow-xs font-semibold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            🏛️ Observatoire Ministre
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-slate-50 border-t border-slate-200 px-4">
        <div className="max-w-7xl mx-auto flex space-x-1 sm:space-x-2 overflow-x-auto py-2 scrollbar-none text-xs">
          <button
            onClick={() => onTabChange("tutor")}
            id="nav-tutor-tab"
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              currentTab === "tutor"
                ? "bg-emerald-800 text-white shadow-xs font-semibold"
                : "text-slate-600 hover:bg-slate-200/70 hover:text-slate-900"
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Tuteur Socratique IA (24/7)</span>
          </button>

          <button
            onClick={() => onTabChange("exams")}
            id="nav-exams-tab"
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              currentTab === "exams"
                ? "bg-emerald-800 text-white shadow-xs font-semibold"
                : "text-slate-600 hover:bg-slate-200/70 hover:text-slate-900"
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Simulateur d'Examens (BAC & Brevet)</span>
          </button>

          <button
            onClick={() => onTabChange("sheets")}
            id="nav-sheets-tab"
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              currentTab === "sheets"
                ? "bg-emerald-800 text-white shadow-xs font-semibold"
                : "text-slate-600 hover:bg-slate-200/70 hover:text-slate-900"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Fiches Mémos & Cahier Hors-Ligne</span>
          </button>

          <button
            onClick={() => onTabChange("orientation")}
            id="nav-orientation-tab"
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              currentTab === "orientation"
                ? "bg-emerald-800 text-white shadow-xs font-semibold"
                : "text-slate-600 hover:bg-slate-200/70 hover:text-slate-900"
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Boussole Métiers & Bourses</span>
          </button>

          <button
            onClick={() => onTabChange("minister")}
            id="nav-minister-tab"
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              currentTab === "minister"
                ? "bg-amber-600 text-white shadow-xs font-bold"
                : "text-amber-800 hover:bg-amber-100 hover:text-amber-900 font-semibold"
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Observatoire & Baromètre Ministériel</span>
          </button>

          {/* Dedicated Tab for NVIDIA Brev Architecture & Hackathon Demonstration */}
          <button
            onClick={() => onTabChange("brev")}
            id="nav-brev-tab"
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              currentTab === "brev"
                ? "bg-slate-950 text-emerald-400 border border-emerald-500 shadow-xs font-bold"
                : "bg-emerald-950/90 text-emerald-200 hover:bg-emerald-900 font-semibold"
            }`}
          >
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span>⚡ Architecture NVIDIA Brev (Hackathon)</span>
          </button>

          {/* Submission Hub Tab */}
          <button
            onClick={() => onTabChange("submission")}
            id="nav-submission-tab"
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              currentTab === "submission"
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md font-extrabold ring-2 ring-amber-400"
                : "bg-amber-100/90 text-amber-950 hover:bg-amber-200/90 font-bold border border-amber-300"
            }`}
          >
            <Trophy className="w-4 h-4 text-amber-700" />
            <span>🏆 Soumission Hackathon</span>
            <span className="text-[9px] bg-amber-500 text-slate-950 px-1.5 py-0.2 rounded-full font-bold">17h30</span>
          </button>

          <button
            onClick={() => onTabChange("build")}
            id="nav-build-guide-tab"
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              currentTab === "build"
                ? "bg-slate-900 text-amber-300 shadow-xs font-bold border border-amber-400/40"
                : "text-slate-700 bg-amber-100/70 hover:bg-amber-200/80 font-bold"
            }`}
          >
            <span>🛠️ Guide de Construction</span>
          </button>
        </div>
      </div>
    </header>
  );
};
