import { useState, useEffect } from "react";
import { Text, Surface, Button } from 'react-native-paper';
import { View, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import Nav from "@/components/nav";
import QuizzEntity from "@/components/createQuizz/quizzEntity";
import { QuizzQuestion } from "@/utils/QuizzQuestion";
import { generateAndSaveQRCodes } from "@/utils/exportQR";


export default function CreateQuizzPage() {
    const router = useRouter();
    const [quizz, setQuizz] = useState<QuizzQuestion[]>([]);

    const checkQuestions = () => {
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

      // Vrátí true pokud všechny otázky jsou validní (nemají prázdné hodnoty)
      return notEmpty.length === quizz.length;
    }

    // přidej mi otázku
    const handleAddQuestion = () => {
      setQuizz([...quizz, {
        question: '',
        answers: ['', '', ''], //pevně jen 3
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
      console.log(quizz);
      setQuizz(newQuizz);
    }
    
    //odstran otázku podle indexu
    const handleRemoveQuestion = (index: number) => {
      const newQuizz = [...quizz];
      newQuizz.splice(index, 1);
      setQuizz(newQuizz);
    }
    
    return (
      <Surface style={{ flex: 1, backgroundColor: "rgb(255 255 255)"}}>
        <ScrollView 
          contentContainerStyle={{ 
            flexGrow: 1,
            padding: 10,
            paddingBottom: 100 // pro spodní navigaci
          }}
        >
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
              style={{ marginTop: 10 }}
            >
              <Text style={{ color: 'white' }}>Přidej otázku</Text>
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

            { quizz.length > 0 && checkQuestions() && (<Button 
              mode="contained"
              onPress={() => generateAndSaveQRCodes(quizz)}
              style={{ marginTop: 10 }}
            >
              <Text style={{ color: 'white' }}>Vygeneruj sadu otázek</Text>
            </Button>)
            }
            
          </Surface>
          <Nav />
        </ScrollView>
      </Surface>
    );
}
    