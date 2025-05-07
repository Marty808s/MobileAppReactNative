import { QuizzQuestion } from "@/interfaces/QuizzInterface";

export default function checkQuestions(quizz: QuizzQuestion[]) {
    const notEmpty = quizz.filter(question => {
      if (!question.question || question.question.trim() === '') return false;
      
      if (!question.answers || question.answers.length === 0) return false;
      
      const hasEmptyAnswer = question.answers.some(answer => 
        !answer || answer.trim() === ''
      );
      if (hasEmptyAnswer) return false;
      
      if (question.correctAnswer === null || question.correctAnswer === undefined) return false;
      
      return true;
    });

    // kontrola, zda jsou všechny otázky validní
    return notEmpty.length === quizz.length;
  }