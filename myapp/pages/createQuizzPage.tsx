import { useState, useEffect } from "react";
import { Text, Surface, Button } from 'react-native-paper';
import { View } from "react-native";
import { useRouter } from "expo-router";
import Nav from "@/components/nav";
import QuizzEntity from "@/components/createQuizz/quizzEntity";
import { QuizzQuestion } from "@/utils/QuizzQuestion";

export default function CreateQuizzPage() {
    const router = useRouter();
    const [quizz, setQuizz] = useState<QuizzQuestion[]>([]);

    // přidej mi otázku
    const handleAddQuestion = () => {
      setQuizz([...quizz, {
        question: '',
        answers: ['', '', '', ''],
        correctAnswer: 0
      }])
    }

    // změň otázku
    const handleQuestionChange = (index: number, dataToUpdate: Partial<QuizzQuestion>) => {
      const newQuizz = [...quizz];
      newQuizz[index] = {
        ...newQuizz[index],
        ...dataToUpdate
      }
      setQuizz(newQuizz);
    }
    
    //odstran otázku podle indexu
    const handleRemoveQuestion = (index: number) => {
      const newQuizz = [...quizz];
      newQuizz.splice(index, 1);
      setQuizz(newQuizz);
    }
    
    return (
      <View style={{ flex: 1 }}>
        <Surface style={{ 
          flex: 1,
          position: 'relative',
          height: '100%'
        }}>
          <Surface 
            elevation={0}
            style={{
              flex: 1,
              alignItems: "center",
              padding: 10,
              backgroundColor: "rgb(255 255 255)",
              position: 'relative'
            }}
          >
            <Text 
              variant="headlineMedium" 
              style={{ color: 'rgba(0, 0, 0, 0.87)' }}
            >
              Vytvoření kvízu
            </Text>

            <Button 
              mode="contained"
              onPress={() => handleAddQuestion()}
            >
              <Text>Přidej otázku</Text>
            </Button>

            {/* Zde mapujeme přes všechny otázky */}
            {quizz.map((question, index) => (
              <QuizzEntity
                key={index}
                quizz={question}
                handleQuestionChange={handleQuestionChange}
                index={index}
                onRemove={handleRemoveQuestion}
              />
            ))}

          </Surface>
          <Nav />
        </Surface>
      </View>
    );
}
    