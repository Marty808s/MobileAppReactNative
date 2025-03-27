import { useState } from "react";
import { Text, Surface, RadioButton } from 'react-native-paper';
import { View, StyleSheet } from "react-native";
import { QuizzQuestion } from "@/utils/QuizzQuestion";

interface AnswerEntityProps {
    quizz: QuizzQuestion;
    answers: { [key: number]: number };
    questionIndex: number;
    onAnswerSelect: (selectedAnswer: number) => void;
}

export default function AnswerEntity({ quizz, answers, questionIndex, onAnswerSelect }: AnswerEntityProps) {
    const isAnswered = answers[questionIndex] !== undefined;
    const isCorrect = (index: number) => quizz.correctAnswer === index;
    
    const handleAnswerSelect = (index: number) => {
        if (!isAnswered) {
            onAnswerSelect(index);
        }
    };

    const getAnswerStyle = (index: number) => {
        if (!isAnswered) return styles.answerText;
        
        if (isCorrect(index)) {
            return [styles.answerText, styles.correctAnswer];
        }
        if (answers[questionIndex] === index) {
            return [styles.answerText, styles.wrongAnswer];
        }
        return styles.answerText;
    };

    return (
        <Surface style={styles.container} elevation={1}>
            <Text style={styles.sectionTitle}>{quizz.question}</Text>
            
            {quizz.answers.map((answer, index) => (
                <View key={index} style={styles.answerContainer}>
                    <RadioButton.Item
                        label={answer}
                        value={index.toString()}
                        status={answers[questionIndex] === index ? 'checked' : 'unchecked'}
                        onPress={() => handleAnswerSelect(index)}
                        disabled={isAnswered}
                        labelStyle={getAnswerStyle(index)}
                    />
                </View>
            ))}
        </Surface>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        margin: 0,
        borderRadius: 8,
        backgroundColor: 'white',
        width: '100%',
        maxWidth: 600,
        marginBottom: 8,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    answerContainer: {
        marginBottom: 8,
    },
    answerText: {
        fontSize: 16,
    },
    correctAnswer: {
        color: 'green',
        fontWeight: 'bold',
    },
    wrongAnswer: {
        color: 'red',
        textDecorationLine: 'line-through',
    }
});