import { useLocalSearchParams } from 'expo-router';
import { QuizzQuestion } from '@/utils/QuizzQuestion';
import QuizzGamePage from '@/pages/quizzGame';

export default function QuizzPage() {
  const { quizzData } = useLocalSearchParams();
  const quizz: QuizzQuestion[] = JSON.parse(quizzData as string);
  console.log("Quizz Game", quizz);

  return(
    <QuizzGamePage quizzData={quizz} />
  )
}