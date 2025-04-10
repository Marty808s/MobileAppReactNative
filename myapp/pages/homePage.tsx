import { useState, useEffect, useCallback } from "react";
import { Text, Surface, Button } from 'react-native-paper';
import { View, FlatList, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Nav from "@/components/nav";
import * as db from "../utils/db";
import { Item } from "react-native-paper/lib/typescript/components/Drawer/Drawer";
import { QuizzRow, ScoreRow } from "@/utils/QuizzInterfaces";
import { useFocusEffect } from '@react-navigation/native';

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

export default function HomePage() {
    const router = useRouter();
    const [quizzes, setQuizzes] = useState<QuizzRow[]>([]);
    const [scores, setScores] = useState<ScoreRow[]>([]);
  

    const fetchInit = async () => {
      console.log("fetchQuizzes Callback...");
        try {
            const result = await db.getAllQuizzes();
            //console.log("Fetched quizzes:", result);
            setQuizzes(result as unknown as QuizzRow[] || []);

            const scoreFetch = await db.getResults()
            setScores(scoreFetch as unknown as ScoreRow[] || []);

        } catch (error) {
            console.log("Error fetching init:", error);
            setQuizzes([]);
        }
    };

    //useFocusEffect - zavolané při zobrazení stránky
    useFocusEffect(
        useCallback(() => {
          fetchInit();
        }, [])
    );

    useEffect(()=> {
      console.log("Quizzes po formátování", quizzes);
      console.log("*********************")
      console.log('Historie', scores);
    }, [quizzes, scores])

    const handleDelete = () => {
      db.deleteQuestions();
      fetchInit();
    }

    const renderQuizButton = ({ item: quizz }: { item: QuizzRow }) => (
        // když ho podržím, tak ho odstraním - DODĚLAT
        <Button 
            key={quizz.id}
            onPress={() => router.push({
                pathname: '/createQuizz',
                params: {
                    initQuizz: JSON.stringify(quizz)
                }
            })}
            style={{
                margin: 1,
                flex: 1,
                minWidth: '45%',
            }}
            mode="outlined"
        >
            {quizz.name}
        </Button>
    );

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
              style={{ 
                color: 'rgba(0, 0, 0, 0.87)',
                marginBottom: 10
              }}
            >
              Vytvořené otázky: {quizzes.length > 0 && ("(" + quizzes?.length + ")")}
            </Text>

            
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
                renderItem={renderQuizButton}
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
              style={{ 
                color: 'rgba(0, 0, 0, 0.87)',
                marginBottom: 10,
                marginTop: 10
              }}
            >
              Historie: {scores.length > 0 && ("(" + scores?.length + ")")}
            </Text>
            
            {/* Vykreslení skore */}
           {scores.length > 0 ? (<View style={styles.tableContainer}>
                <View style={styles.tableHeader}>
                    <Text style={[styles.tableCell, styles.headerText]}>Název kvízu</Text>
                    <Text style={[styles.tableCell, styles.headerText]}>Body</Text>
                </View>
                {scores.map((score, index) => (
                    <View key={index} style={[styles.tableRow, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>
                        <Text style={styles.tableCell}>
                            {quizzes.find(q => q.id === score.quizz_id)?.name || 'Neznámý'}
                        </Text>
                        <Text style={styles.tableCell}>
                            {score.points}
                        </Text>
                    </View>
                ))}
            </View>)
            :
            (<Text>Žádná historie není k dispozici</Text>)}

          </Surface>
          <Nav />
        </Surface>
      </View>
    );
}
    