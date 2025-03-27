import { useState, useEffect } from "react";
import { Text, Surface } from 'react-native-paper';
import { View } from "react-native";
import { useRouter } from "expo-router";
import Nav from "@/components/nav";
import * as db from "../utils/db";

interface QuizzRow {
  id: number;
  name: string;
  quiz_data: string;
}

export default function HomePage() {
    const router = useRouter();
    const [quizzes, setQuizzes] = useState<QuizzRow[]>([]);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const result = await db.getAllQuizzes();
                console.log("Fetched quizzes:", result);
                setQuizzes(result || []);
            } catch (error) {
                console.error("Error fetching quizzes:", error);
                setQuizzes([]);
            }
        };
        fetchQuizzes();
    }, []);

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
                style={{ color: 'rgba(0, 0, 0, 0.87)' }}  // standardní černá z Material Design
            >
                OpenQuizz
            </Text>

            {/* MOJE KVÍZY */}
            {quizzes.length === 0 && (
                <Text>Žádné kvízy nejsou k dispozici</Text>
            )}
            {quizzes.length > 0 && (quizzes.map((quizz) => (
                <Text key={quizz.id}>{quizz.name}</Text>
            )))}

          </Surface>
          <Nav />
        </Surface>
      </View>
    );
}
    