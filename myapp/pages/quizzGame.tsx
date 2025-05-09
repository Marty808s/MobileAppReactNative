import { QuizzGameProps, AnswerDictionary } from '@/interfaces/QuizzInterface';
import AnswerEntity from '@/components/quizzGame/answerEntity';
import { Text, Surface, Button } from 'react-native-paper';
import { View, ScrollView, StyleSheet } from "react-native";
import React, { useState } from 'react';
import * as db from '@/utils/db';
import ScorePanel from '@/components/score';
import { useRouter } from 'expo-router';
import { gameStyle } from '@/theme/styles';

//import style sheetu
const styles = gameStyle

export default function QuizzGamePage({ quizz, quizzId }: QuizzGameProps) {
    const [answers, setAnswers] = useState<AnswerDictionary>({});
    const [score, setScore] = useState<number>(0);
    const router = useRouter();

    if (!quizz) {
        return <Text>Načítání...</Text>;
    }

    //console.log("quizzData", quizz);

    const handleAnswerSelect = (questionIndex: number, selectedAnswer: number) => {
        if (answers[questionIndex] !== undefined) {
            return;
        }

        setAnswers(prev => ({
            ...prev,
            [questionIndex]: selectedAnswer
        }));

        if (selectedAnswer === quizz[questionIndex].correctAnswer) {
            setScore(prev => prev + 10);
        }
    };


    return (
        <View style={styles.container}>
            <Surface style={styles.surface}>

                {quizz && <Text variant="headlineMedium" style={styles.title}>
                    {quizz[0]?.question}
                </Text>}

                <View
                    style={{
                        borderBottomWidth: 1,
                        borderBottomColor: '#ddd',
                        marginVertical: 8,
                        width: '100%'
                    }}
                />

                <ScrollView 
                    style={{ width: '100%' }}
                    contentContainerStyle={{
                        paddingHorizontal: 16,
                        paddingBottom: 200, // pro spodní navigaci
                        gap: 16 // mezera mezi otázkami
                    }}
                    showsVerticalScrollIndicator={false}
                >
                {/* entity pro otázky s titulkem */}
                {quizz.map((question, index) => (
                    <View key={index} style={styles.questionContainer}>
                        <Text style={styles.questionNumber}>
                            Otázka {index + 1}/{quizz.length}
                        </Text>
                        <AnswerEntity 
                            quizz={question}
                            onAnswerSelect={(answer) => handleAnswerSelect(index, answer)}
                            answers={Object.values(answers)}
                            questionIndex={index}
                        />
                    </View>
                ))}
                {Object.keys(answers).length === quizz.length && (
                    <Button 
                        mode="contained" 
                        onPress={() => {
                            console.log(answers);
                            db.insertResult(quizzId, score);
                            router.push("/");
                        }} 
                        style={styles.button}>
                            Uložit výsledky
                    </Button>
                )}
                </ScrollView>
            </Surface>
            <ScorePanel score={score} />
        </View>
    );
}



