import { useState, useEffect, useCallback } from "react";
import { Text, Surface, Button } from 'react-native-paper';
import { View, ScrollView, FlatList } from 'react-native'
import { useRouter } from "expo-router";
import Nav from "@/components/nav";
import * as db from "../utils/db";
import { QuizzRow, ScoreRow } from "@/interfaces/QuizzInterface";
import { useFocusEffect } from '@react-navigation/native';
import renderQuizzButton from "@/components/homePage/renderQuizzButton";
import renderScoreTable from "@/components/homePage/renderScoreTable";
import { homePageStyle } from "@/theme/styles";
import { homePageHeaderStyle } from "@/theme/styles";

// počet sloupců entit vytvořených otázek
const GRID_COLUMNS = 1;

// import style sheetů
const styles = homePageStyle;
const headerStyle = homePageHeaderStyle;

export default function HomePage() {
    const router = useRouter();
    const [quizzes, setQuizzes] = useState<QuizzRow[]>([]);
    const [scores, setScores] = useState<ScoreRow[]>([]);
  

    const fetchInit = async () => {
      console.log("fetchQuizzes Callback...");
        try {
            const result = await db.getAllQuizzes();
            setQuizzes(result as QuizzRow[] || []);

            const scoreFetch = await db.getResults()
            setScores(scoreFetch as ScoreRow[] || []);

        } catch (error) {
            console.log("Error fetching init:", error);
            setQuizzes([]);
        }
    };

    //useFocusEffect - zavolá se při zobrazení stránky
    useFocusEffect(
        useCallback(() => {
          fetchInit();
        }, [])
    );

    // pro debug
    useEffect(()=> {
      console.log("*********************")
      console.log("Quizzes po formátování", quizzes);
      console.log("*********************")
      console.log('Historie', scores);
      console.log("*********************")
    }, [quizzes, scores])

    // Odstranění všech otázek
    const handleDelete = () => {
      db.deleteQuestions();
      fetchInit();
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
              padding: 10,
              backgroundColor: "rgb(255 255 255)",
            }}
          >

            <Text 
              variant="headlineMedium" 
              style={headerStyle.text}
            >
              Vytvořené otázky: {quizzes.length > 0 && ("(" + quizzes?.length + ")")}
            </Text>

            {/* Odstranění všech otázek */}
            <Button
                onPress={() => handleDelete()}
                mode="contained"
                style={{ marginTop: 10, marginBottom: 10 }}
              >
                Vymazat paměť 
              </Button>


            {quizzes.length === 0 ? (
              <Text>Žádné kvízy nejsou k dispozici</Text>
            ) : (
              <View style={styles.questionsContainer}>
                <FlatList
                  data={quizzes}
                  renderItem={renderQuizzButton}
                  keyExtractor={(item) => item.id.toString()}
                  style={{ width: '100%' }}
                  contentContainerStyle={{ 
                    flexGrow: 1
                  }}
                  ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
                />
              </View>
            )}

            <Text 
              variant="headlineMedium" 
              style={headerStyle.text}
            >
              Historie: {scores.length > 0 && ("(" + scores?.length + ")")}
            </Text>
            
            {/* Vykreslení skore */}
            <View style={styles.historyContainer}>
              <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                {scores.length > 0 ? (renderScoreTable({scores}, {quizzes}, {styles}))
                :
                (<Text>Žádná historie není k dispozici</Text>)}
              </ScrollView>
            </View>

          </Surface>
          <Nav />
        </Surface>
      </View>
    );
}
    