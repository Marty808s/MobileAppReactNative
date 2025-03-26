import { useState } from "react";
import { Text, Surface, RadioButton } from 'react-native-paper';
import { View, StyleSheet } from "react-native";
import { QuizzQuestion } from "@/utils/QuizzQuestion";

interface AnswerEntityProps {
    quizz: QuizzQuestion;
    onAnswerSelect: (selectedAnswer: number) => void;
}

export default function AnswerEntity({ quizz, onAnswerSelect }: AnswerEntityProps) {
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

    const handleAnswerSelect = (index: number) => {
        setSelectedAnswer(index);
        onAnswerSelect(index);
    };

    return (
        <Surface style={styles.container} elevation={1}>
            <Text style={styles.sectionTitle}>{quizz.question}</Text>
            
            {quizz.answers.map((answer, index) => (
                <View key={index} style={styles.answerContainer}>
                    <RadioButton.Item
                        label={answer}
                        value={index.toString()}
                        status={selectedAnswer === index ? 'checked' : 'unchecked'}
                        onPress={() => handleAnswerSelect(index)}
                        labelStyle={styles.answerText}
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
    }
});