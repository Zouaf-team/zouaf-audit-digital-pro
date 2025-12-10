export type QuestionOption = {
  id: string;
  label: string;
  score: number; // 1 (low digital) to 5 (high digital)
};

export type Question = {
  id: number;
  text: string;
  options: QuestionOption[];
};

export type UserAnswers = Record<number, QuestionOption>;

export type AuditResult = {
  score: number;
  digitalMaturityLevel: 'Débutant' | 'Intermédiaire' | 'Avancé';
  analysis: string;
  actionPlan: string[];
};

export enum AppState {
  HOME = 'HOME',
  QUIZ = 'QUIZ',
  CALCULATING = 'CALCULATING',
  LEAD_CAPTURE = 'LEAD_CAPTURE',
  RESULTS = 'RESULTS'
}