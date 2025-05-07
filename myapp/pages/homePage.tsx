import { useState, useEffect, useCallback } from "react";
import { Text, Surface, Button } from 'react-native-paper';
import { View, FlatList, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Nav from "@/components/nav";
import * as db from "../utils/db";
import { QuizzRow, ScoreRow } from "@/interfaces/QuizzInterface";
import { useFocusEffect } from '@react-navigation/native';
import renderQuizzButton from "@/components/homePage/renderQuizzButton";
import renderScoreTable from "@/components/homePage/renderScoreTable";

const GRID_COLUMNS = 2;

const styles = StyleSheet.create({
    tableContainer: {
        margin: 10,
        borderRadius: 8,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#9545FD',
        padding: 10,
    },
    tableRow: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    tableCell: {
        flex: 1,
        textAlign: 'center',
    },
    headerText: {
        color: 'white',
        fontWeight: 'bold',
    },
    evenRow: {
        backgroundColor: '#fff',
    },
    oddRow: {
        backgroundColor: '#f9f9f9',
    },
});

const headerStyle = { 
  color: 'rgba(0, 0, 0, 0.87)',
  marginBottom: 10,
  marginTop: 10
}

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
              style={headerStyle}
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
              <FlatList
                data={quizzes}
                renderItem={renderQuizzButton}
                keyExtractor={(item) => item.id.toString()}
                numColumns={GRID_COLUMNS}
                style={{ width: '100%' }}
                contentContainerStyle={{ paddingBottom: 80 }}
                columnWrapperStyle={{
                  justifyContent: 'space-between',
                  padding: 2,
                }}
              />
            )}

            <Text 
              variant="headlineMedium" 
              style={headerStyle}
            >
              Historie: {scores.length > 0 && ("(" + scores?.length + ")")}
            </Text>
            
            {/* Vykreslení skore */}
           {scores.length > 0 ? (renderScoreTable({scores}, {quizzes}, {styles}))
            :
            (<Text>Žádná historie není k dispozici</Text>)}

          </Surface>
          <Nav />
        </Surface>
      </View>
    );
}
    