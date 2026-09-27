import React, { useState } from "react";
import { Compass, Award, CheckCircle2, GraduationCap, Briefcase } from "lucide-react";
import { ORIENTATION_CAREERS } from "../data/curriculumData";

export const OrientationGuideView: React.FC = () => {
  const [filterQuery, setFilterQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState(ORIENTATION_CAREERS[0]);

  const filtered = ORIENTATION_CAREERS.filter((item) =>
    item.sector.toLowerCase().includes(filterQuery.toLowerCase()) ||
    item.filiereBac.toLowerCase().includes(filterQuery.toLowerCase()) ||
    item.debouches.some((d) => d.toLowerCase().includes(filterQuery.toLowerCase()))
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg">
                <Compass className="w-5 h-5" />
              </span>
              <h2 className="text-base font-bold text-slate-900">
                Boussole Nationale des Métiers d'Avenir & Bourses d'Excellence
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Guider chaque bachelier vers les secteurs prioritaires pour le développement du pays, dont l'ingénierie IA sur NVIDIA Brev, avec critères d'attribution des bourses républicaines.
            </p>
          </div>
          <div className="w-full md:w-72">
            <input
              type="text"
              id="orientation-search-input"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Rechercher (IA, NVIDIA, Agronomie, S1, S2...)"
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-600/30"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Sectors list (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-bold text-slate-700 px-1">
            Filières Stratégiques Officielles ({filtered.length})
          </div>
          {filtered.map((item, idx) => {
            const isSelected = item.sector === selectedSector.sector;
            return (
              <div
                key={idx}
                id={`sector-card-${idx}`}
                onClick={() => setSelectedSector(item)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? "bg-emerald-50/90 border-emerald-600 shadow-xs"
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                    {item.badge}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500">
                    {item.filiereBac.split("ou")[0]}
                  </span>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                  {item.sector}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Right: Detailed Sector Dossier (7 cols) */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded">
                {selectedSector.badge}
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-2">
                {selectedSector.sector}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                {selectedSector.description}
              </p>
            </div>

            {/* Bac requirements */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <div className="text-xs font-bold text-slate-800 flex items-center mb-1">
                <GraduationCap className="w-4 h-4 text-emerald-700 mr-1.5" />
                Séries de Baccalauréat recommandées :
              </div>
              <div className="text-xs font-semibold text-emerald-900">
                {selectedSector.filiereBac}
              </div>
            </div>

            {/* Careers */}
            <div>
              <div className="text-xs font-bold text-slate-800 flex items-center mb-3">
                <Briefcase className="w-4 h-4 text-emerald-700 mr-1.5" />
                Débouchés professionnels & métiers concrets :
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedSector.debouches.map((deb, i) => (
                  <div
                    key={i}
                    className="p-3 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800 flex items-center space-x-2 shadow-2xs"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{deb}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Scholarships */}
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4">
              <div className="flex items-center space-x-2 text-xs font-bold text-amber-900 mb-1">
                <Award className="w-4 h-4 text-amber-600" />
                <span>Régime des Bourses Républicaines d'Excellence :</span>
              </div>
              <p className="text-xs sm:text-sm text-amber-900 font-medium">
                {selectedSector.statutBourse}
              </p>
            </div>

            <div className="border-t border-slate-100 pt-4 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Orientations conformes au Plan National de Développement du Capital Humain</span>
              <span>Accès Universités & Écoles Nationales</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
