import { QuizzQuestion } from '@/utils/QuizzQuestion';
import AnswerEntity from '@/components/quizzGame/answerEntity';
import { Text, Surface, Button } from 'react-native-paper';
import { View, ScrollView, StyleSheet } from "react-native";
import React, {useEffect, useState} from 'react';
import Score from '@/components/score';

interface QuizzGameProps {
  quizzData: QuizzQuestion[];
}
interface AnswerDictionary {
    [key: number]: number; 
}

export default function QuizzGamePage({ quizzData }: QuizzGameProps) {
    const [answers, setAnswers] = useState<AnswerDictionary>({});
    const [score, setScore] = useState<number>(0);

    const handleAnswerSelect = (questionIndex: number, selectedAnswer: number) => {
        if (answers[questionIndex] !== undefined) {
            return;
        }

        setAnswers(prev => ({
            ...prev,
            [questionIndex]: selectedAnswer
        }));

        if (selectedAnswer === quizzData[questionIndex].correctAnswer) {
            setScore(prev => prev + 10);
        }
    };


    return (
        <View style={styles.container}>
            <ScrollView 
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <Surface style={styles.surface}>
                    <Text variant="headlineMedium" style={styles.title}>
                        Kvíz
                    </Text>
                    
                    {quizzData.map((question, index) => (
                        <View key={index} style={styles.questionContainer}>
                            <Text style={styles.questionNumber}>
                                Otázka {index + 1}/{quizzData.length}
                            </Text>
                            <AnswerEntity 
                                quizz={question}
                                onAnswerSelect={(answer) => handleAnswerSelect(index, answer)}
                                answers={Object.values(answers)}
                                questionIndex={index}
                            />
                        </View>
                    ))}
                    {Object.keys(answers).length === quizzData.length && (
                        <Button 
                            mode="contained" 
                            onPress={() => {
                                console.log(answers) // tady udělat zápis do db s výsledky
                            }} style={{
                                marginTop: 10,
                                marginBottom: 60,
                                marginHorizontal: 20,
                                paddingVertical: 8,
                                borderRadius: 8,
                                backgroundColor: '#9545FD',
                                elevation: 2,
                            }}>
                                Zobrazit výsledky
                        </Button>
                    )}
                </Surface>
            </ScrollView>
            <Score score={score} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        position: 'relative',
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 20, // prostor pro Score komponentu
    },
    surface: {
        padding: 16,
        backgroundColor: 'white',
        minHeight: '100%',
    },
    title: {
        textAlign: 'center',
        marginBottom: 24,
        color: '#1a1a1a',
        fontWeight: 'bold',
    },
    questionContainer: {
        marginBottom: 20,
    },
    questionNumber: {
        fontSize: 16,
        color: '#666',
        marginBottom: 8,
        textAlign: 'center',
    },
    button: {
        marginTop: 30,
        marginHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 8,
        backgroundColor: '#9545FD',
        elevation: 2,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    }
});

