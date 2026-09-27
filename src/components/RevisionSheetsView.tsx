import React, { useState } from "react";
import { BookOpen, Printer, Download, Search, CheckCircle2, AlertOctagon, Lightbulb, FileCheck } from "lucide-react";
import { REVISION_SHEETS } from "../data/curriculumData";
import { RevisionSheet } from "../types";

interface RevisionSheetsViewProps {
  isOfflineMode: boolean;
}

export const RevisionSheetsView: React.FC<RevisionSheetsViewProps> = ({ isOfflineMode }) => {
  const [selectedSubject, setSelectedSubject] = useState<string>("Toutes");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSheet, setActiveSheet] = useState<RevisionSheet>(REVISION_SHEETS[0]);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const filteredSheets = REVISION_SHEETS.filter((sheet) => {
    const matchesSubject = selectedSubject === "Toutes" || sheet.subject === selectedSubject;
    const matchesQuery =
      sheet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sheet.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesQuery;
  });

  const handlePrint = () => {
    window.print();
  };

  const handleSimulateDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg">
                <BookOpen className="w-5 h-5" />
              </span>
              <h2 className="text-base font-bold text-slate-900">
                Fiches Mémos Officielles & Cahier Hors-Ligne
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Conçues pour les élèves sans connexion permanente : téléchargeables en local et optimisées pour l'impression en noir et blanc économique.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              id="print-sheet-btn"
              className="flex items-center space-x-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors border border-slate-200"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimer la Fiche</span>
            </button>
            <button
              onClick={handleSimulateDownload}
              id="download-offline-pack-btn"
              className="flex items-center space-x-1.5 px-3.5 py-2 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition-colors shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>Pack Hors-Ligne (PDF & Mémo)</span>
            </button>
          </div>
        </div>

        {downloadSuccess && (
          <div className="mt-3 p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center space-x-2">
            <FileCheck className="w-4 h-4 text-emerald-600" />
            <span>
              <strong>Fiche synchronisée dans votre mémoire locale !</strong> Vous pouvez désormais la consulter même en coupant complètement votre connexion Internet.
            </span>
          </div>
        )}

        {/* Search & Filter */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-slate-100">
          <div className="sm:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              id="search-sheet-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher une notion (Pythagore, dérivée, Rousseau, diffraction, méiose...)"
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-600/30"
            />
          </div>
          <div>
            <select
              value={selectedSubject}
              id="subject-sheet-filter"
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-600/30"
            >
              <option value="Toutes">Toutes les matières</option>
              <option value="Mathématiques">Mathématiques</option>
              <option value="Physique-Chimie">Physique-Chimie</option>
              <option value="Philosophie">Philosophie</option>
              <option value="Sciences de la Vie et de la Terre (SVT)">SVT</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: List of Sheets (4 cols) */}
        <div className="lg:col-span-4 space-y-2.5">
          <div className="text-xs font-bold text-slate-700 px-1">
            Fiches disponibles ({filteredSheets.length})
          </div>
          {filteredSheets.map((sheet) => {
            const isCurrent = sheet.id === activeSheet.id;
            return (
              <div
                key={sheet.id}
                id={`sheet-item-${sheet.id}`}
                onClick={() => setActiveSheet(sheet)}
                className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                  isCurrent
                    ? "bg-emerald-50/80 border-emerald-500 shadow-xs"
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded">
                    {sheet.subject}
                  </span>
                  <span className="text-slate-400">{sheet.level.split("(")[0]}</span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                  {sheet.title}
                </h4>
                <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                  {sheet.summary}
                </p>
              </div>
            );
          })}
        </div>

        {/* Right: Detailed Sheet Display (8 cols) */}
        <div className="lg:col-span-8">
          <article className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 print:border-none print:shadow-none">
            {/* Header info */}
            <div className="border-b border-slate-200 pb-4 mb-5">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md">
                  Fiche Officielle N° {activeSheet.id.slice(-4)}
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  {activeSheet.level}
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-extrabold text-slate-900">
                {activeSheet.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                {activeSheet.summary}
              </p>
            </div>

            {/* Core formulas or concepts */}
            <div className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center mb-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-1.5" />
                Formules Clés & Notions Fondamentales
              </h2>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                {activeSheet.keyFormulasOrConcepts.map((item, idx) => (
                  <div
                    key={idx}
                    className="font-mono text-xs sm:text-sm text-slate-800 bg-white p-2.5 rounded-lg border border-slate-200/80 shadow-2xs"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Common Mistakes */}
            <div className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center mb-3">
                <AlertOctagon className="w-4 h-4 text-rose-600 mr-1.5" />
                Les Pièges & Erreurs Classiques qui font perdre des points
              </h2>
              <ul className="space-y-2">
                {activeSheet.commonMistakesToAvoid.map((mistake, idx) => (
                  <li
                    key={idx}
                    className="text-xs sm:text-sm text-slate-700 bg-rose-50/50 border border-rose-200/70 p-3 rounded-xl flex items-start space-x-2"
                  >
                    <span className="text-rose-600 font-bold shrink-0">⚠</span>
                    <span>{mistake}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* The BAC Tip */}
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4">
              <div className="flex items-center space-x-2 text-xs font-bold text-amber-900 mb-1">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <span>Le Conseil d'Or de l'Inspecteur d'Académie :</span>
              </div>
              <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-medium">
                {activeSheet.bacTip}
              </p>
            </div>

            {/* Footer stamp */}
            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span>ÉduExcellence Nationale – Document Républicain Libre de Diffusion</span>
              <span>Conforme Programmes Officiels</span>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};
