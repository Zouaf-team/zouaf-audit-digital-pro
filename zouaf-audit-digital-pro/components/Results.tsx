import React from 'react';
import { AuditResult } from '../types';

interface ResultsProps {
  result: AuditResult;
  userName: string;
}

export const Results: React.FC<ResultsProps> = ({ result, userName }) => {
  // Determine color based on score
  const scoreColor = result.score > 70 ? 'text-green-500' : result.score > 40 ? 'text-orange-500' : 'text-red-500';
  const progressColor = result.score > 70 ? 'bg-green-500' : result.score > 40 ? 'bg-orange-500' : 'bg-red-500';

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Header Results */}
        <div className="bg-zouaf-dark text-white p-8 md:p-12 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-2">Audit de gestion pour {userName}</h2>
            <p className="opacity-80 uppercase tracking-widest text-sm font-semibold">Maturité Digitale: {result.digitalMaturityLevel}</p>
          </div>
          {/* Decorative circles */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-zouaf-orange/10 rounded-full translate-x-1/3 translate-y-1/3"></div>
        </div>

        <div className="p-8 md:p-12">
          {/* Score Section */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
            <div className="relative w-40 h-40 flex-shrink-0">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#eee"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray={`${result.score}, 100`}
                  className={`${scoreColor} transition-all duration-1000 ease-out`}
                />
              </svg>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <span className={`text-4xl font-bold ${scoreColor}`}>{result.score}</span>
                <span className="block text-xs text-gray-400">/100</span>
              </div>
            </div>
            
            <div className="flex-1">
              <h3 className="text-xl font-bold text-zouaf-dark mb-3">L'analyse de Zouaf :</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                {result.analysis}
              </p>
            </div>
          </div>

          {/* Action Plan */}
          <div className="bg-zouaf-cream rounded-2xl p-8 mb-10 border border-zouaf-light">
            <h3 className="text-xl font-bold text-zouaf-dark mb-6 flex items-center">
              <span className="w-8 h-8 bg-zouaf-orange text-white rounded-lg flex items-center justify-center mr-3 text-sm">🚀</span>
              Votre plan d'action personnalisé
            </h3>
            <div className="space-y-4">
              {result.actionPlan.map((action, idx) => (
                <div key={idx} className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-white border-2 border-zouaf-orange flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                    <span className="text-zouaf-orange text-xs font-bold">{idx + 1}</span>
                  </div>
                  <p className="text-gray-700 font-medium">{action}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-gray-500 mb-6">
              Prêt à mettre ce plan en action et à retrouver votre liberté ?
            </p>
            <a 
              href="https://app.zouaf.pro/souscription" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-zouaf-orange text-white font-bold text-xl px-10 py-4 rounded-xl shadow-lg shadow-zouaf-orange/40 hover:bg-[#E67A58] hover:-translate-y-1 transition-all"
            >
              Découvrir Zouaf Gratuitement
            </a>
              <p className="text-gray-500 text-sm italic mt-2 mb-8"> Sans ajout d'informations bancaires </p>
              <a 
              href="https://app.lemcal.com/@zouaf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-[#0c343d] text-white font-bold text-xl px-10 py-4 rounded-xl shadow-lg shadow-zouaf-orange/40 hover:bg-[#E67A58] hover:-translate-y-1 transition-all"
            >
              Réserver une démo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
