import { useEffect, useState } from "react";
import { Text, Surface, TextInput, Button, RadioButton } from 'react-native-paper';
import { View, StyleSheet } from "react-native";
import { QuizzQuestion } from "@/utils/QuizzQuestion";

interface QuizzEntityProps {
  quizz: QuizzQuestion;
  handleQuestionChange: (index: number, dataToUpdate: Partial<QuizzQuestion>) => void;
  index: number;
  onRemove: (index: number) => void;
}

export default function QuizzEntity({ quizz, handleQuestionChange, index, onRemove }: QuizzEntityProps) {
    return (

        <Surface style={styles.container} elevation={1}>
            {/* Otázka */}
            <TextInput
                label="Otázka"
                value={quizz.question}
                onChangeText={(text) => handleQuestionChange(index, { question: text })}
                mode="outlined"
                style={styles.questionInput}
            />

            {/* Odpovědi */}
            <Text style={styles.sectionTitle}>Odpovědi:</Text>
            {quizz.answers.map((answer, answerIndex) => (
                <View key={answerIndex} style={styles.answerContainer}>
                    <TextInput
                        label={`Odpověď ${answerIndex + 1}`}
                        value={answer}
                        onChangeText={(text) => {
                            const newAnswers = [...quizz.answers];
                            newAnswers[answerIndex] = text;
                            handleQuestionChange(index, { answers: newAnswers });
                        }}
                        mode="outlined"
                        style={styles.answerInput}
                    />
                    <RadioButton
                        value={answerIndex.toString()}
                        status={quizz.correctAnswer === answerIndex ? 'checked' : 'unchecked'}
                        onPress={() => handleQuestionChange(index, { correctAnswer: answerIndex })}
                    />
                </View>
            ))}

            {/* Tlačítko pro smazání otázky */}
            <Button 
                mode="outlined" 
                onPress={() => onRemove(index)}
                style={styles.deleteButton}
                textColor="red"
            >
                Smazat otázku
            </Button>
        </Surface>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        margin: 8,
        borderRadius: 8,
        backgroundColor: 'white',
        width: '100%',
        maxWidth: 600,
    },
    questionInput: {
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    answerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    answerInput: {
        flex: 1,
        marginRight: 8,
    },
    deleteButton: {
        marginTop: 16,
        borderColor: 'red',
    }
});
