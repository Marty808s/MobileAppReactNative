import { useState, useEffect, useRef } from "react";
import { Text, Surface, Button } from 'react-native-paper';
import { View, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import Nav from "@/components/nav";
import QuizzEntity from "@/components/createQuizz/quizzEntity";
import { QuizzQuestion } from "@/utils/QuizzQuestion";
import QRCode from 'react-native-qrcode-svg';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';


export default function CreateQuizzPage() {
    const router = useRouter();
    const [quizz, setQuizz] = useState<QuizzQuestion[]>([]);
    const [showQR, setShowQR] = useState(false);
    const qrRef = useRef<any>(null);

    useEffect(() => {
        if (showQR && qrRef.current) {
            qrRef.current.toDataURL(async (dataUrl: string) => {
                try {
                    const timestamp = new Date().getTime();
                    const filePath = FileSystem.documentDirectory + `qr_code_${timestamp}.png`;
                    
                    if (!dataUrl) {
                        throw new Error('QR kód se nepodařilo vygenerovat');
                    }

                    const base64Data = dataUrl.includes('base64,') 
                        ? dataUrl.split('base64,')[1] 
                        : dataUrl;

                    if (!base64Data) {
                        throw new Error('Neplatná data QR kódu');
                    }

                    await FileSystem.writeAsStringAsync(filePath, base64Data, { encoding: FileSystem.EncodingType.Base64 });
                    await Sharing.shareAsync(filePath);
                } catch (error) {
                    console.error('Chyba:', error);
                    alert('Chyba při generování QR kódu');
                } finally {
                    setShowQR(false);
                }
            });
        }
    }, [showQR, quizz]);

    let ref: any = null;

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
      <Surface style={{ flex: 1, backgroundColor: "rgb(255 255 255)", height: '100%',}}>
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

            {quizz.map((question, index) => (
              <QuizzEntity
                key={index}
                quizz={question}
                handleQuestionChange={handleQuestionChange}
                index={index}
                onRemove={handleRemoveQuestion}
              />
            ))}


            <View style={{ position: 'absolute', opacity: 0, width: 1, height: 1 }}>
                <QRCode
                    value={JSON.stringify(quizz)}
                    size={200}
                    getRef={(ref) => (qrRef.current = ref)}
                />
            </View>


            {quizz.length > 0 && checkQuestions() && (
              <Button 
                mode="contained"
                onPress={() => setShowQR(true)}
                style={{ marginTop: 10 }}
              >
                <Text style={{ color: 'white' }}>Vygeneruj sadu otázek</Text>
              </Button>
            )}
            
          </Surface>
          <Nav />
        </ScrollView>
      </Surface>
    );
}
    