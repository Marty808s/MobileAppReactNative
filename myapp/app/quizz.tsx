import { useLocalSearchParams } from 'expo-router';
import { QuizzQR } from '@/models/Models';
import QuizzGamePage from '@/pages/quizzGame';


export default function QuizzPage() {
  // získání dat kvízu z URL (init fetch) - PŘEDĚLAT DO USESTATE S USE_EFFECTEM NA INIT LOAD
  const { quizzData } = useLocalSearchParams();
  const quizz: QuizzQR = JSON.parse(quizzData as string);
  console.log("Quizz Game", quizz);

  return(
    <QuizzGamePage quizz={quizz.quizz} quizzId={quizz.id} />
  )
}