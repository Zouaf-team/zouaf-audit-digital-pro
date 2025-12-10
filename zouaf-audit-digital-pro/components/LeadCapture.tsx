import React, { useState } from 'react';

interface LeadCaptureProps {
  onSubmit: (email: string, name: string) => void;
  isProcessing: boolean;
}

export const LeadCapture: React.FC<LeadCaptureProps> = ({ onSubmit, isProcessing }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && name) {
      onSubmit(email, name);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center">
      <div className="mb-6">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-zouaf-dark mb-2">Audit terminé !</h2>
        <p className="text-gray-600">
          Nous avons analysé vos réponses. Votre potentiel de gain de temps est énorme.
          Entrez vos coordonnées pour découvrir votre audit personnalisé et votre plan d'action.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            required
            placeholder="Votre Prénom"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-zouaf-orange focus:ring-2 focus:ring-zouaf-orange/20 outline-none transition-all"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="email"
            required
            placeholder="Votre adresse email pro"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-zouaf-orange focus:ring-2 focus:ring-zouaf-orange/20 outline-none transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={isProcessing}
          className="w-full bg-zouaf-orange text-white font-bold text-lg py-4 rounded-xl hover:bg-[#E67A58] transform hover:scale-[1.02] transition-all shadow-lg shadow-zouaf-orange/30 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isProcessing ? 'Génération de l\'audit...' : 'Voir mon Audit Gratuit'}
        </button>
      </form>
      <p className="mt-4 text-xs text-gray-400">
        Vos données sont sécurisées. Vous recevrez également une copie par email.
      </p>
    </div>
  );
};