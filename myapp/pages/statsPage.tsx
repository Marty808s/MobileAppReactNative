import { useState, useEffect, useCallback } from "react";
import { Text, Surface, Button } from 'react-native-paper';
import { View, ScrollView, FlatList } from 'react-native'
import { useRouter } from "expo-router";
import Nav from "@/components/nav";
import * as db from "../utils/db";
import { StatEntityProps } from "@/interfaces/QuizzInterface";
import StatEntity from "@/components/statsPage/quizzStatEntity";


export default function StatPage() {
    const [statData, setStats] = useState<StatEntityProps[]>([]); 
    const [uniqueIds, setIds] = useState<number[]>([]);

    useEffect(() => {
        const fetchInit = async () => {
            const stats = await db.getStats();
            console.log('Fetched stats:', stats); 
            setStats(stats);

            // unikátní id klíče - vzestupně
            const uniqueQuizIds = Array.from(new Set(stats.map(stat => stat.quizz.id))).sort((a, b) => a - b);
            setIds(uniqueQuizIds);
            console.log(uniqueQuizIds)
        }
        fetchInit();
    }, []);

    return(
        <View style={{ flex: 1 }}>
            <Surface style={{ 
                flex: 1,
                position: 'relative',
                height: '100%'
            }}>
 
                <ScrollView
                    style={{
                        flex: 1,
                        padding: 10,
                        backgroundColor: "rgb(255 255 255)",
                        marginBottom: 80
                    }}
                >
                    
                    {
                        uniqueIds.map(id => {
                            const quizStats = statData.filter(stat => stat.quizz.id === id);
                            const quizData = {
                                quizz: {
                                    ...quizStats[0].quizz,
                                    quiz_data: quizStats.map(stat => stat.score)
                                },
                                score: quizStats.reduce((acc, curr) => acc + curr.score.score, 0) / quizStats.length,
                            };
                            
                            return (
                                <StatEntity
                                    key={id}
                                    entity={quizData as unknown as StatEntityProps}
                                />
                            );
                        })
                    }
                </ScrollView>    
                <Nav/>
            </Surface>
        </View>
    )
}