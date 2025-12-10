import { GoogleGenAI, Type } from "@google/genai";
import { UserAnswers, AuditResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateAudit = async (answers: UserAnswers): Promise<AuditResult> => {
  const model = "gemini-2.5-flash";

  // Reconstruct context from answers
  const profession = answers[1]?.label || "Professionnel animalier";
  const management = answers[2]?.label || "Inconnu";
  const reminders = answers[3]?.label || "Inconnu";
  const timeSpent = answers[4]?.label || "Inconnu";
  const stress = answers[5]?.label || "Inconnu";

  const prompt = `
    Tu es un expert consultant pour 'Zouaf', une solution de gestion pour les pros animaliers.
    L'utilisateur est un ${profession}.
    Sa situation :
    - Gestion rdv: ${management}
    - Rappels: ${reminders}
    - Temps administratif: ${timeSpent}
    - Stress: ${stress}

    Génère un audit court, percutant et bienveillant.
    
    1. Calcule un score de maturité digitale sur 100 (basé sur le fait que papier/manuel = bas, logiciel/auto = haut).
    2. Fournis une analyse de 2 phrases expliquant pourquoi il perd du temps ou de l'argent (insiste sur la charge mentale).
    3. Donne 3 actions concrètes (Action Plan) que Zouaf permettrait de résoudre immédiatement (ex: Réservation en ligne 24/7, Rappels SMS automatiques, Fichier client digital).
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.INTEGER },
            digitalMaturityLevel: { type: Type.STRING, enum: ["Débutant", "Intermédiaire", "Avancé"] },
            analysis: { type: Type.STRING },
            actionPlan: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["score", "digitalMaturityLevel", "analysis", "actionPlan"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as AuditResult;
    }
    throw new Error("Empty response");

  } catch (error) {
    console.error("Gemini Error:", error);
    // Fallback if API fails
    return {
      score: 45,
      digitalMaturityLevel: "Débutant",
      analysis: "Votre gestion actuelle vous demande beaucoup d'énergie manuelle. Le risque d'oubli et la fatigue administrative freinent le développement de votre activité de " + profession + ".",
      actionPlan: [
        "Automatisez vos rappels de RDV pour réduire l'absentéisme.",
        "Passez à l'agenda en ligne pour ne plus répondre au téléphone en pleine prestation.",
        "Centralisez vos dossiers clients pour un suivi médical/esthétique pro."
      ]
    };
  }
};