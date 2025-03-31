import { useState, useEffect, useCallback } from "react";
import { Text, Surface, Button } from 'react-native-paper';
import { View, FlatList } from "react-native";
import { useRouter } from "expo-router";
import Nav from "@/components/nav";
import * as db from "../utils/db";
import { Item } from "react-native-paper/lib/typescript/components/Drawer/Drawer";
import { QuizzRow } from "@/utils/QuizzInterfaces";
import { useFocusEffect } from '@react-navigation/native';

const GRID_COLUMNS = 2;

export default function HomePage() {
    const router = useRouter();
    const [quizzes, setQuizzes] = useState<QuizzRow[]>([]);

    //useFocusEffect - zavolané při zobrazení stránky
    useFocusEffect(
        useCallback(() => {
            const fetchQuizzes = async () => {
              console.log("fetchQuizzes Callback...");
                try {
                    const result = await db.getAllQuizzes();
                    //console.log("Fetched quizzes:", result);
                    setQuizzes(result as unknown as QuizzRow[] || []);
                } catch (error) {
                    console.error("Error fetching quizzes:", error);
                    setQuizzes([]);
                }
            };
            fetchQuizzes();
        }, [])
    );

    useEffect(()=> {
      //console.log("Quizzes po formátování", quizzes);
    }, [quizzes])


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
              Vytvořené otázky: {quizzes && ("(" + quizzes?.length + ")")}
              {/* PŘIDAT TLAČÍTKO NA SMAZÁNÍ VŠECH KURZŮ */}
            </Text>

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
          </Surface>
          <Nav />
        </Surface>
      </View>
    );
}
    