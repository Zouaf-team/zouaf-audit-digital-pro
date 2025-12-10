import React, { useState } from 'react';
import { QUESTIONS } from '../constants';
import { UserAnswers, QuestionOption, AppState } from '../types';

interface QuizProps {
  onComplete: (answers: UserAnswers) => void;
}

export const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswers>({});

  const handleOptionSelect = (option: QuestionOption) => {
    const newAnswers = { ...answers, [QUESTIONS[currentQuestionIndex].id]: option };
    setAnswers(newAnswers);

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setTimeout(() => setCurrentQuestionIndex(prev => prev + 1), 250);
    } else {
      onComplete(newAnswers);
    }
  };

  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / QUESTIONS.length) * 100;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-8 min-h-[400px] flex flex-col">
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
        <div 
          className="bg-zouaf-orange h-2.5 rounded-full transition-all duration-500 ease-out" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="flex-grow flex flex-col justify-center">
        <h2 className="text-2xl md:text-3xl font-bold text-zouaf-dark mb-8 text-center leading-tight">
          {currentQuestion.text}
        </h2>

        <div className="grid gap-4">
          {currentQuestion.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleOptionSelect(option)}
              className="w-full text-left p-4 rounded-xl border-2 border-gray-100 hover:border-zouaf-orange hover:bg-zouaf-light/20 transition-all duration-200 group flex items-center justify-between"
            >
              <span className="text-lg font-medium text-gray-700 group-hover:text-zouaf-dark">
                {option.label}
              </span>
              <div className="w-6 h-6 rounded-full border-2 border-gray-300 group-hover:border-zouaf-orange group-hover:bg-zouaf-orange transition-colors"></div>
            </button>
          ))}
        </div>
      </div>
      
      <div className="mt-8 text-center text-gray-400 text-sm">
        Question {currentQuestionIndex + 1} sur {QUESTIONS.length}
      </div>
    </div>
  );
};