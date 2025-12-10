import { Question } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Quelle est votre profession principale ?",
    options: [
      { id: 'groomer', label: 'Toiletteur / Toiletteuse', score: 0 },
      { id: 'osteo', label: 'Ostéopathe Animalier', score: 0 },
      { id: 'sitter', label: 'Pet Sitter / Pension', score: 0 },
      { id: 'other', label: 'Autre professionnel animalier', score: 0 },
    ]
  },
  {
    id: 2,
    text: "Comment gérez-vous actuellement vos rendez-vous ?",
    options: [
      { id: 'paper', label: 'Agenda papier / Cahier', score: 1 },
      { id: 'phone', label: 'Notes téléphone / Google Agenda basique', score: 3 },
      { id: 'software', label: 'Logiciel spécialisé', score: 5 },
      { id: 'mixed', label: 'Un peu de tout (c\'est le chaos)', score: 1 },
    ]
  },
  {
    id: 3,
    text: "Comment effectuez-vous les rappels de rendez-vous ?",
    options: [
      { id: 'none', label: 'Je ne fais pas de rappels (trop de lapins !)', score: 1 },
      { id: 'manual', label: 'J\'envoie des SMS manuellement la veille', score: 2 },
      { id: 'auto', label: 'C\'est automatisé', score: 5 },
    ]
  },
  {
    id: 4,
    text: "Combien de temps consacrez-vous à l'administratif par jour (factures, planning...) ?",
    options: [
      { id: 'alot', label: 'Plus de 2 heures (au secours)', score: 1 },
      { id: 'medium', label: 'Environ 1 heure', score: 3 },
      { id: 'little', label: 'Moins de 30 minutes', score: 5 },
    ]
  },
  {
    id: 5,
    text: "Comment décririez-vous votre charge mentale actuelle ?",
    options: [
      { id: 'zen', label: 'Zen, tout est sous contrôle', score: 5 },
      { id: 'heavy', label: 'Lourde, je pense au travail le soir', score: 2 },
      { id: 'overwhelmed', label: 'Saturée, je n\'ai plus de temps pour moi', score: 1 },
    ]
  }
];

export const TESTIMONIALS = [
  {
    name: "Sophie T.",
    role: "Toiletteuse à Lyon",
    text: "Avant Zouaf, je passais mes soirées à répondre aux SMS. Aujourd'hui, mes clients réservent en ligne et je gagne 1h30 par jour !"
  },
  {
    name: "Marc D.",
    role: "Ostéopathe Animalier",
    text: "La gestion des fiches clients et des factures est devenue un jeu d'enfant. Moins de paperasse, plus de temps avec les animaux."
  }
];