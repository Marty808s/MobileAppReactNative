import { useLocalSearchParams } from 'expo-router';
import { QuizzRow, QuizzQR } from '@/utils/QuizzInterfaces';
import QuizzGamePage from '@/pages/quizzGame';


export default function QuizzPage() {
  const { quizzData } = useLocalSearchParams();
  const quizz: QuizzQR = JSON.parse(quizzData as string);
  console.log("Quizz Game", quizz);

  return(
    <QuizzGamePage quizz={quizz.quizz} quizzId={quizz.id} />
  )
}