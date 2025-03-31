export interface QuizzQuestion {
    question: string;
    answers: string[];
    correctAnswer: number;
}

export interface QuizzRow {
    id: number;
    name: string;
    quiz_data: QuizzQuestion[];
}

export interface QuizzGameProps {
    quizz: QuizzQuestion[];
    quizzId: number;
}

export interface QuizzQR {
    quizz: QuizzQuestion[];
    id: number;
}

export interface AnswerDictionary {
    [key: number]: number; 
}

export interface QuizzIdProps {
    quizzId: number;
}

export interface ScoreRow {
    id: number;
    quizz_id: number;
    points: number;
}