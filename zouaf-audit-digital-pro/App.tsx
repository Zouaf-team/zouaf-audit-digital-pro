import React, { useState } from 'react';
import { Quiz } from './components/Quiz';
import { LeadCapture } from './components/LeadCapture';
import { Results } from './components/Results';
import { generateAudit } from './services/geminiService';
import { AppState, UserAnswers, AuditResult } from './types';
import { TESTIMONIALS } from './constants';

const App = () => {
  const [appState, setAppState] = useState<AppState>(AppState.HOME);
  const [answers, setAnswers] = useState<UserAnswers>({});
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [userData, setUserData] = useState<{name: string, email: string}>({name: '', email: ''});
  const [isProcessing, setIsProcessing] = useState(false);

  const startQuiz = () => {
    setAppState(AppState.QUIZ);
    window.scrollTo(0, 0);
  };

  const handleQuizComplete = (userAnswers: UserAnswers) => {
    setAnswers(userAnswers);
    setAppState(AppState.LEAD_CAPTURE);
    window.scrollTo(0, 0);
  };

  const handleLeadSubmit = async (email: string, name: string) => {
    setIsProcessing(true);
    setUserData({ email, name });
    
    // Simulate slight delay for UX (feeling of "processing")
    // Then call Gemini
    try {
      const result = await generateAudit(answers);
      setAuditResult(result);
      setAppState(AppState.RESULTS);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Error generating audit", error);
      // Handle error gracefully (maybe show a generic error or fallback result)
    } finally {
      setIsProcessing(false);
    }
  };

  const AVATARS = [
  "/avatar-sophie.jpg",
  "/avatar-marc.jpg",
];

  return (
    <div className="min-h-screen flex flex-col font-sans text-zouaf-dark bg-zouaf-cream">
      {/* Header */}
      <header className="py-4 md:py-6 px-4 md:px-8 flex flex-col sm:flex-row justify-between items-center max-w-7xl mx-auto w-full gap-4 sm:gap-0">
        <div className="flex items-center">
           {/* Official Logo */}
           <img 
             src="/logo-zouaf.png" 
             alt="Zouaf-logo" 
             className="h-8 w-auto"/>
        </div>
        
        {/* No Navigation Menu to prevent distractions */}

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a href="#" className="text-zouaf-dark/70 font-semibold text-sm hover:text-zouaf-orange transition-colors hidden md:block">
            Ajouter mon établissement
          </a>
          <button className="bg-zouaf-dark text-white px-5 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors text-sm shadow-md flex-shrink-0">
            Parler à un expert
          </button>
        </div>
      </header>

      <main className="flex-grow px-4 md:px-8 py-6 md:py-12">
        
        {appState === AppState.HOME && (
          <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24 mb-20 lg:mb-28">
              <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
                <span className="inline-block bg-white text-zouaf-orange px-4 py-1.5 rounded-full text-xs md:text-sm font-bold shadow-sm mb-6 border border-zouaf-light uppercase tracking-wide">
                  Pour Toiletteurs, Ostéopathes & Pet Sitters
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                  Boostez votre activité.<br/>
                  <span className="text-zouaf-orange">Zéro charge mentale.</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  Découvrez pourquoi +1500 professionnels animaliers ont digitalisé leur gestion. 
                  Faites l'audit gratuit et découvrez votre potentiel de croissance immédiat.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <button 
                    onClick={startQuiz}
                    className="bg-zouaf-orange text-white font-bold text-lg px-8 py-4 rounded-full shadow-lg shadow-zouaf-orange/40 hover:bg-[#E67A58] hover:-translate-y-1 transition-all w-full sm:w-auto"
                  >
                    Faire mon audit gratuit
                  </button>
                </div>
                <div className="mt-6 flex items-center justify-center lg:justify-start gap-2 text-sm text-gray-500">
                  <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                      <img key={i} className="w-8 h-8 rounded-full border-2 border-white" src={`https://picsum.photos/seed/${i+20}/50/50`} alt="User" />
                    ))}
                  </div>
                  <p>Rejoignez <span className="font-bold text-zouaf-dark">1500+ Zouafers</span></p>
                </div>
              </div>

              <div className="flex-1 relative order-1 lg:order-2 w-full">
                 <div className="absolute inset-0 bg-zouaf-orange/20 rounded-full blur-3xl transform translate-y-10 scale-90"></div>
                 <img 
                   src="/toiletteur-mobile.png" 
                   alt="Chien heureux chez le toiletteur" 
                   className="relative rounded-[2rem] shadow-2xl z-10 w-full max-w-md mx-auto transform hover:rotate-1 transition-transform duration-500 object-cover aspect-[4/5] sm:aspect-square"
                 />
                 {/* Floating badge */}
                 <div className="absolute bottom-6 -right-4 sm:bottom-10 sm:-left-10 bg-white p-4 sm:p-5 rounded-2xl shadow-xl z-20 animate-bounce max-w-[160px] sm:max-w-none" style={{animationDuration: '3s'}}>
                   <p className="font-bold text-zouaf-dark text-sm sm:text-base">Gain de temps moyen</p>
                   <p className="text-zouaf-orange font-extrabold text-xl sm:text-3xl">+6h <span className="text-sm font-normal text-gray-400">/ semaine</span></p>
                 </div>
              </div>
            </div>

            {/* Main Value Propositions */}
            <div className="mb-24">
              <div className="text-center mb-16 max-w-4xl mx-auto">
                <span className="text-zouaf-orange font-bold tracking-widest text-sm uppercase mb-4 inline-block px-4 py-1 bg-zouaf-orange/10 rounded-full border border-zouaf-orange/20">Votre Copilote Digital</span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 text-zouaf-dark leading-tight">
                  Une seule solution pour votre visibilité, vos réservations et votre planning.
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Page vitrine sur Zouaf, référencement Google, prise de rendez-vous 24/7, 
                  rappels automatiques, gestion de planning complexe... Nous centralisons tout 
                  ce qui vous fait perdre du temps aujourd'hui.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {[
                   {
                     title: "Visibilité en ligne",
                     desc: "Fiche pro optimisée sur Zouaf, visibilité boostée avec Google Reserve, mise en avant locale et parcours de réservation fluide et sans effort pour vos clients.",
                     icon: (
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                       </svg>
                     ),
                     color: "bg-red-100 text-red-500"
                   },
                   {
                     title: "Réservations & rappels",
                     desc: "Prises de rendez-vous en ligne, rappels mails/SMS automatiques et réduction des no-show.",
                     icon: (
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                       </svg>
                     ),
                     color: "bg-blue-100 text-blue-500"
                   },
                   {
                     title: "Gestion administrative",
                     desc: "Moyens de paiement en ligne et acomptes, facturation automatique, exports comptables prêts pour vos déclarations.",
                     icon: (
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                       </svg>
                     ),
                     color: "bg-green-100 text-green-500"
                   },
                   {
                     title: "Marketing & fidélité",
                     desc: "Codes promo, fidélité en ligne, carte cadeaux et campagnes mails/SMS ciblées pour remplir votre planning aux bons moments.",
                     icon: (
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                       </svg>
                     ),
                     color: "bg-pink-100 text-pink-500"
                   },
                   {
                     title: "Moins de charge mentale",
                     desc: "Planning clair, historique des animaux et journées optimisées : vous savez où vous allez, quand, pour quoi et pour qui.",
                     icon: (
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                       </svg>
                     ),
                     color: "bg-yellow-100 text-yellow-600"
                   }
                 ].map((item, idx) => (
                   <div key={idx} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all flex flex-col items-start group">
                     <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${item.color} group-hover:scale-110 transition-transform`}>
                        {item.icon}
                     </div>
                     <h3 className="text-xl font-bold text-zouaf-dark mb-3">{item.title}</h3>
                     <p className="text-gray-600 leading-relaxed text-sm">{item.desc}</p>
                   </div>
                 ))}
                 
                 {/* Last card is a CTA/Summary visually */}
                 <div className="bg-zouaf-dark rounded-2xl p-8 shadow-lg flex flex-col justify-center items-center text-center text-white">
                    <h3 className="text-2xl font-bold mb-4">Et bien plus encore...</h3>
                    <p className="text-gray-300 mb-6 text-sm">Découvrez toutes les fonctionnalités en faisant votre audit personnalisé.</p>
                    <button onClick={startQuiz} className="bg-zouaf-orange hover:bg-white hover:text-zouaf-orange text-white font-bold py-3 px-6 rounded-full transition-all text-sm">
                      Faire mon audit
                    </button>
                 </div>
              </div>
            </div>

            {/* AI Differentiation Section */}
            <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-gray-100 mb-24">
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/2 p-8 md:p-16 bg-gradient-to-br from-white to-zouaf-cream">
                  <span className="text-zouaf-orange font-bold text-sm tracking-widest uppercase mb-4 block">Notre Différence</span>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-zouaf-dark mb-6">
                    Gestion des déplacements à la réservation grâce à l'IA
                  </h2>
                  <p className="text-lg text-gray-600 mb-10">
                    Optimisation des tournées, regroupement automatique par zone, calcul des frais kilométriques : Zouaf pense comme vous, avant même que vous ne preniez la route.
                  </p>
                  
                  <div className="space-y-6">
                    {[
                      { title: "Tournées optimisées", desc: "Moins de km inutiles et pertes financières, plus de temps consacré à votre métier." },
                      { title: "Regroupement par zone", desc: "Vos rendez-vous à domicile organisés intelligemment et automatiquement." },
                      { title: "Frais auto-calculés", desc: "Frais kilométriques intégrés directement à vos RDV." }
                    ].map((feat, i) => (
                      <div key={i} className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-zouaf-dark text-lg">{feat.title}</h4>
                          <p className="text-gray-500">{feat.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="lg:w-1/2 bg-gray-100 relative min-h-[400px]">
                   <img 
                     src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=800"
                     alt="Carte et déplacement" 
                     className="absolute inset-0 w-full h-full object-cover opacity-90"
                   />
                   <div className="absolute inset-0 bg-zouaf-dark/10"></div>
                   {/* Overlay visual element simulating map optimization */}
                   <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-2xl max-w-xs w-full border border-white/50">
                      <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-2">
                        <span className="text-xs font-bold text-gray-400 uppercase">Trajet optimisé</span>
                        <span className="text-green-500 text-xs font-bold">-24% de km</span>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-zouaf-orange mr-2"></div>
                          <span className="text-sm text-gray-600">09:00 - 15 min trajet - Client A</span>
                        </div>
                        <div className="h-4 border-l-2 border-dashed border-gray-300 ml-1"></div>
                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-zouaf-orange mr-2"></div>
                          <span className="text-sm text-gray-600">10:15 - 10 min trajet - Client B</span>
                        </div>
                        <div className="h-4 border-l-2 border-dashed border-gray-300 ml-1"></div>
                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-zouaf-orange mr-2"></div>
                          <span className="text-sm text-gray-600">11:45 - 25 min trajet - Client C</span>
                        </div>
                      </div>
                      <div className="mt-4 pt-3 border-t border-gray-100">
                         <div className="flex justify-between items-center">
                           <span className="text-xs text-gray-500">Frais calculés</span>
                           <span className="text-sm font-bold text-zouaf-dark">12,50 €</span>
                         </div>
                      </div>
                   </div>
                </div>
              </div>
            </div>

            {/* Social Proof */}
            <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-xl relative overflow-hidden mb-24">
              <div className="absolute top-0 right-0 w-64 h-64 bg-zouaf-light/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
              
              <div className="text-center mb-12 relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ils ont transformé leur quotidien</h2>
                <p className="text-gray-500">Découvrez les retours de nos Zouafers certifiés</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 relative z-10">
                {TESTIMONIALS.map((t, i) => (
                  <div key={i} className="bg-zouaf-cream p-8 rounded-2xl border border-zouaf-light/50 flex flex-col sm:flex-row gap-6 items-start hover:bg-white hover:shadow-md transition-all">
                    <div className="w-16 h-16 bg-gray-300 rounded-full flex-shrink-0 overflow-hidden border-2 border-white shadow-md">
                       <img src={AVATARS[i]} alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="flex text-yellow-400 text-sm mb-2">★★★★★</div>
                      <p className="text-gray-700 italic mb-4 text-lg leading-relaxed">"{t.text}"</p>
                      <div>
                        <p className="font-bold text-zouaf-dark">{t.name}</p>
                        <p className="text-sm text-zouaf-orange font-medium">{t.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Institutional Support Section */}
            <div className="mb-20 text-center">
              <p className="text-gray-400 uppercase tracking-widest text-sm font-bold mb-8">Ils nous soutiennent</p>
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                {/* Institutional Logos (using reliable public URLs or placeholders) */}
                <img src="/logo-frenchtechtremplin.png" alt="La French Tech" className="h-16 md:h-20 object-contain" />
                <img src="/bpifrance.jpg" alt="Bpifrance" className="h-16 md:h-20 object-contain" />
                <img src="/reservewithgoogle.png" alt="google-reserve" className="h-16 md:h-20 object-contain" />
              </div>
            </div>
            
            {/* Final CTA */}
            <div className="text-center mb-12">
               <button 
                  onClick={startQuiz}
                  className="bg-zouaf-dark text-white font-bold text-lg px-10 py-5 rounded-full shadow-2xl hover:bg-black hover:-translate-y-1 transition-all"
                >
                  Commencer mon audit gratuit
                </button>
            </div>
          </div>
        )}

        {appState === AppState.QUIZ && (
          <Quiz onComplete={handleQuizComplete} />
        )}

        {appState === AppState.LEAD_CAPTURE && (
          <LeadCapture onSubmit={handleLeadSubmit} isProcessing={isProcessing} />
        )}

        {appState === AppState.RESULTS && auditResult && (
          <Results result={auditResult} userName={userData.name} />
        )}

      </main>

      {/* Footer */}
      <footer className="bg-zouaf-dark text-white/60 py-12 px-8 text-center text-sm mt-auto">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 mb-8 text-left">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold text-white">Zouaf</span>
            </div>
            <p className="leading-relaxed">La solution tout-en-un pour les professionnels du monde animalier. Gagnez du temps, vivez de votre passion.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Produit</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-zouaf-orange transition-colors">Fonctionnalités</a></li>
              <li><a href="#" className="hover:text-zouaf-orange transition-colors">Tarifs</a></li>
              <li><a href="#" className="hover:text-zouaf-orange transition-colors">Application Mobile</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Ressources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-zouaf-orange transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-zouaf-orange transition-colors">Centre d'aide</a></li>
              <li><a href="#" className="hover:text-zouaf-orange transition-colors">Communauté</a></li>
            </ul>
          </div>
          <div>
             <h4 className="text-white font-bold mb-4">Légal</h4>
             <ul className="space-y-2">
               <li><a href="#" className="hover:text-zouaf-orange transition-colors">Mentions légales</a></li>
               <li><a href="#" className="hover:text-zouaf-orange transition-colors">Confidentialité</a></li>
               <li><a href="#" className="hover:text-zouaf-orange transition-colors">CGV</a></li>
             </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
           <span>&copy; {new Date().getFullYear()} Zouaf. Tous droits réservés.</span>
           <span className="flex items-center gap-2">Fait avec ❤️ pour les <span className="text-2xl">🐾</span></span>
        </div>
      </footer>
    </div>
  );
};

export default App;
