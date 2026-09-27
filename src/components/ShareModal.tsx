import React, { useState } from "react";
import { X, Share2, Copy, Check, ExternalLink, Globe, Smartphone, QrCode } from "lucide-react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== "undefined" ? window.location.href : "https://eduexcellence.org";

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            id="close-share-modal-btn"
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Share2 className="w-4 h-4" />
            <span>Votre Plateforme Est En Ligne</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold">
            Partager votre Plateforme
          </h2>
          <p className="text-xs text-emerald-200/90 mt-1">
            Votre prototype fonctionne en direct sur le web : partagez-le aux membres du jury et aux élèves !
          </p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Public Link Card */}
          <div className="bg-emerald-50/80 border-2 border-emerald-500/40 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-emerald-900 flex items-center space-x-1.5">
                <Globe className="w-4 h-4 text-emerald-700" />
                <span>Lien Direct de votre Application :</span>
              </span>
              <span className="text-[10px] font-bold uppercase bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded font-mono">
                Actif & En Ligne
              </span>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <input
                type="text"
                readOnly
                value={currentUrl}
                className="w-full text-xs font-mono bg-white border border-emerald-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-hidden"
              />
              <button
                onClick={() => copyUrl(currentUrl)}
                id="copy-share-public-btn"
                className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-xl text-xs flex items-center space-x-1 shrink-0 transition-colors shadow-xs"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Copié !</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copier</span>
                  </>
                )}
              </button>
            </div>

            <div className="mt-3 p-3 bg-white/90 border border-slate-200 rounded-xl text-xs text-slate-700 space-y-1">
              <div className="font-bold text-slate-900 flex items-center space-x-1">
                <span>⚡ Compatible Démonstration Vidéo & Jury Hackathon</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-600">
                Vous pouvez envoyer ce lien directement aux examinateurs ou l'utiliser pendant votre enregistrement vidéo de présentation.
              </p>
            </div>
          </div>

          {/* Export guidance */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs space-y-2 text-slate-700">
            <div className="font-bold text-slate-900 flex items-center space-x-1.5">
              <Smartphone className="w-4 h-4 text-slate-700" />
              <span>Déploiement sur votre instance NVIDIA Brev :</span>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Toutes les instructions de clonage et le script <code>./setup-brev.sh</code> sont prêts dans l'onglet <strong>« ⚡ Architecture NVIDIA Brev »</strong> de la barre supérieure.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-between">
          <a
            href={currentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-emerald-700 hover:text-emerald-800 font-bold flex items-center space-x-1"
          >
            <span>Ouvrir dans un nouvel onglet</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-xl transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
