import React from "react";
import { X, Award, CheckCircle2, HeartHandshake, Cpu, ShieldCheck } from "lucide-react";

interface PresentationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PresentationModal: React.FC<PresentationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            id="close-presentation-modal-btn"
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Award className="w-4 h-4" />
            <span>Document de Plaidoyer Stratégique</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold">
            Dossier de Présentation Officiel à Monsieur le Ministre & au Jury Hackathon
          </h2>
          <p className="text-xs text-emerald-200/90 mt-1">
            « Comment nous avons rendu possible ce que tout le monde croyait infaisable : l'excellence scolaire pour chaque enfant de la République avec NVIDIA Brev. »
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto text-slate-800 text-xs sm:text-sm leading-relaxed">
          {/* Section 1 */}
          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4">
            <h3 className="font-bold text-emerald-950 text-sm mb-1 flex items-center">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 mr-1.5" />
              1. Le Paradoxe que tout le monde jugeait « Impossible »
            </h3>
            <p className="text-emerald-900/90 text-xs leading-relaxed">
              Pendant des décennies, on disait : <em>« On ne pourra jamais offrir un tuteur particulier de haut niveau à un élève de village éloigné »</em> et <em>« Le numérique ne marche pas sans connexion internet permanente »</em>.
              <br /><br />
              <strong>Notre plateforme prouve le contraire dès aujourd'hui :</strong>
              <br />
              Grâce à l'infrastructure accélérée par <strong>GPU NVIDIA sur Brev</strong>, au conteneur <strong>NVIDIA NIM</strong> et à l'architecture hors-ligne résiliente, chaque enfant dispose gratuitement, 24h/24, du meilleur précepteur national qui respecte scrupuleusement les programmes officiels.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-sm">
              2. Les 4 Piliers Inégalables du Projet
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <strong className="text-emerald-800 block mb-1">🏛️ Tuteur Socratique IA Bienveillant</strong>
                Ne fait pas les devoirs à la place de l'élève ! Il pose des questions guides, décompose le problème étape par étape et lui redonne confiance.
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <strong className="text-emerald-800 block mb-1">⚡ Inférence Souveraine sur NVIDIA Brev</strong>
                Modèle Llama 3.1 8B Instruct accéléré par TensorRT-LLM sur GPU Brev Cloud : latence &lt; 50ms, sécurité totale des données scolaires.
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <strong className="text-emerald-800 block mb-1">📝 Simulateur Réel BAC & Brevet</strong>
                Les vrais sujets nationaux avec chronomètre, critères de notation officiels de l'inspection et calcul instantané de mention.
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <strong className="text-emerald-800 block mb-1">📊 Observatoire Décisionnel Ministériel</strong>
                Détection précoce en temps réel des chapitres où les élèves échouent à l'échelle du pays, pour adapter les formations des enseignants avant les épreuves.
              </div>
            </div>
          </div>

          {/* Section 3: Speech prompt for the user */}
          <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4">
            <h3 className="font-bold text-amber-950 text-sm mb-1.5 flex items-center">
              <HeartHandshake className="w-4 h-4 text-amber-700 mr-1.5" />
              3. Votre Discours d'Introduction devant Monsieur le Ministre (30 secondes)
            </h3>
            <blockquote className="italic text-xs text-amber-900 bg-white/70 p-3 rounded-xl border border-amber-200/60 leading-relaxed font-serif">
              « Monsieur le Ministre, membres du Jury, nous avons tous appris que l'éducation est le premier pilier de notre souveraineté nationale. Pourtant, beaucoup pensaient qu'il était impossible d'offrir l'égalité parfaite des chances à l'enfant de la capitale et à celui du village le plus isolé.
              <br /><br />
              Aujourd'hui, j'ai l'honneur de vous présenter <strong>ÉduExcellence Nationale</strong> : une plateforme 100% républicaine, gratuite, résiliente aux coupures de réseau, dotée d'un tuteur socratique accéléré sur <strong>NVIDIA Brev</strong> qui élève le niveau de chaque candidat et vous offre, à vous et à vos équipes, un observatoire en temps réel de la réussite de nos enfants. »
            </blockquote>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            ÉduExcellence Nationale – L'École de la République réinventée avec NVIDIA
          </span>
          <button
            onClick={onClose}
            id="modal-close-action-btn"
            className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl transition-colors shadow-xs"
          >
            Fermer le dossier
          </button>
        </div>
      </div>
    </div>
  );
};
