import { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { QuizzQR } from '@/interfaces/QuizzInterface';
import QuizzGamePage from '@/pages/quizzGame';
import { Text } from 'react-native-paper';


export default function QuizzPage() {
  const [quizz, setQuizz] = useState<QuizzQR>();    
  const { quizzData } = useLocalSearchParams();

  useEffect(() => {
    const parsedQuizz: QuizzQR = JSON.parse(quizzData as string);
    console.log("Quizz Game", parsedQuizz);
    setQuizz(parsedQuizz);
  }, [quizzData]);

  if (!quizz) {
    return <Text>Načítání...</Text>;
  }

  return(
    <QuizzGamePage quizz={quizz.quizz} quizzId={quizz.id} />
  )
}