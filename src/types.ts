export type UserRole = "student" | "teacher" | "minister";

export type EducationLevel =
  | "Terminale S (Scientifique)"
  | "Terminale L (Littéraire)"
  | "Terminale G (Économie & Gestion)"
  | "Première"
  | "Troisième (Brevet / BFEM / DEF)";

export type Subject =
  | "Mathématiques"
  | "Physique-Chimie"
  | "Philosophie"
  | "Sciences de la Vie et de la Terre (SVT)"
  | "Français"
  | "Histoire-Géographie"
  | "Anglais";

export interface ChatMessage {
  id: string;
  sender: "user" | "tutor";
  text: string;
  timestamp: string;
  source?: "nvidia_brev" | "gemini" | "pedagogical_engine";
  gpuInfo?: string;
  latencyMs?: number;
}

export interface ExamProblem {
  id: string;
  title: string;
  subject: Subject;
  level: EducationLevel;
  year: number;
  durationMinutes: number;
  totalPoints: number;
  instructions: string;
  questionText: string;
  officialCriteria: string;
  officialSolution: string;
  hints: string[];
}

export interface RevisionSheet {
  id: string;
  title: string;
  subject: Subject;
  level: EducationLevel;
  summary: string;
  keyFormulasOrConcepts: string[];
  commonMistakesToAvoid: string[];
  bacTip: string;
}

export interface RegionalMetric {
  region: string;
  students: number;
  completion: number;
  status: "Optimal" | "Très bon" | "En hausse" | "Prioritaire" | "Priorité Équité";
}

export interface CriticalTopic {
  subject: string;
  topic: string;
  struggleRate: number;
  recommendedAction: string;
}

export interface MinisterStats {
  isProjectionModel: boolean;
  localPrototypeSessions: {
    totalRequests: number;
    activeSessions: number;
    evaluatedCopies: number;
    nodeInstance: string;
  };
  nationalIndex: {
    registeredStudents: number;
    activeToday: number;
    ruralCoveragePercentage: number;
    offlineSessionsCompleted: number;
    bacPassingRateProjection: string;
    genderParityIndex: number;
  };
  criticalTopicsAttention: CriticalTopic[];
  regionalObservatory: RegionalMetric[];
}

export interface BrevEngineStatus {
  activeEngine: "nvidia_brev" | "gemini" | "pedagogical_engine";
  engineName: string;
  nvidiaConfigured: boolean;
  brevConnected: boolean;
  connectionStatus: "connected" | "standby" | "disconnected";
  endpoint: string;
  model: string;
  brevInstanceId: string;
  gpuType: string;
  vramTotalGb: number;
  latencyMs: number | null;
  targetLatencyMs: number;
  totalRequestsServed: number;
  lastPingTimestamp: string;
  lastVerificationResult?: {
    success: boolean;
    message: string;
    testedAt: string;
  } | null;
  systemStatus: "operational" | "standby" | "degraded";
  nvidiaCreditsInfo: string;
}

