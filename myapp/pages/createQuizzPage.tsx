import { useState, useEffect, useRef } from "react";
import { Text, Surface, Button } from 'react-native-paper';
import { View, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Nav from "@/components/nav";
import QuizzEntity from "@/components/createQuizz/quizzEntity";
import { QuizzQuestion } from "@/interfaces/QuizzInterface";
import QRCode from 'react-native-qrcode-svg';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as db from "@/utils/db";
import { getNextQuizzId } from "@/utils/db";
import checkQuestions from "@/utils/checkQuestions";

export default function CreateQuizzPage() {
    const router = useRouter();

    //získání nového id kvízu (ze sekvence pro QR kód)
    const handleNextQuizzId = async () => {
        const newQuizzId = await getNextQuizzId();
        setNewQuizzId(newQuizzId);
    }

    //získání id kvízu z URL
    const { initQuizz } = useLocalSearchParams();
    // kvíz id (z URL)
    const [quizzId, setQuizzId] = useState<number>();
    // nové id kvízu (ze sekvence pro QR kód)
    const [newQuizzId, setNewQuizzId] = useState<number>();
    // kvíz
    const [quizz, setQuizz] = useState<QuizzQuestion[]>(() => {
        if (!initQuizz) {
          // nemám init quizz z URL, takže vygeneruju nový
          handleNextQuizzId();
          return [];
        }
        
        try {
            const parsedData = JSON.parse(initQuizz as string);
            // získám data kvízu
            const quizData = typeof parsedData.quiz_data === 'string' && JSON.parse(parsedData.quiz_data)
            console.log('Parsed quiz data:', quizData);
            // vrátím data kvízu
            return quizData;
        } catch (error) {
            console.error('Error parsing initQuizz:', error);
            return [];
        }
    });

    // zobrazit QR kód
    const [showQR, setShowQR] = useState(false);
    // reference na QR kód - pro generování
    const qrRef = useRef<any>(null);

    // useEffect pro získání id kvízu z URL - kvůli QR kódu
    useEffect(() => {
      if (initQuizz) {
          const parsedData = JSON.parse(initQuizz as string);
          setQuizzId(parsedData.id);
      }
    }, [initQuizz]);

    // pro debug
    useEffect(() => {
      console.log("quizzId", quizzId);
      console.log("quizz", quizz);
    }, [quizzId, quizz]);

    // generování QR kódu
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
                    
                    // získání názvu kvízu
                    const quizzName = quizz[0].question;
                    // získání dat kvízu
                    const quizzData = JSON.stringify(quizz);
                    console.log("quizzName", quizzName);
                    console.log("quizzData", quizzData);

                    if (quizzId) {
                      //existující kvíz - aktualizace
                      await db.updateQuizz(quizzId, quizzName, quizzData);
                    } else {
                      //nový kvíz - vložení
                      await db.insertQuizz(quizzName, quizzData);
                    }

                } catch (error) {
                    console.error('Chyba:', error);
                    alert('Chyba při generování QR kódu');
                } finally {
                    setShowQR(false);
                }
            });
        }
    }, [showQR, quizz]);


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

    // vygeneruj mi JSON pro QR kód
    const createQRValue = () => {
      // hodnoty pro QR kód
      const val = JSON.stringify({quizz, "id": quizzId || newQuizzId})
      console.log("val", val);
      return val;
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
              Vytvoření kvízu {quizzId ? ("id:" + quizzId) : "| NOVÝ"}
            </Text>

            <Button 
              mode="contained"
              onPress={() => handleAddQuestion()}
              style={{ marginTop: 10 }}
            >
              <Text style={{ color: 'white' }}>Přidej otázku</Text>
            </Button>

            {/* otázky */}
            {quizz.map((question, index) => (
              <QuizzEntity
                key={index}
                quizz={question}
                handleQuestionChange={handleQuestionChange}
                index={index}
                onRemove={handleRemoveQuestion}
              />
            ))}

            {/* QR kód */}
            <View style={{ position: 'absolute', opacity: 0, width: 1, height: 1 }}>
                <QRCode
                    value={createQRValue()}
                    size={200}
                    getRef={(ref) => (qrRef.current = ref)}
                />
            </View>

            {/* vygenerovat sadu otázek */}
            {quizz.length > 0 && checkQuestions(quizz) && (
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
    