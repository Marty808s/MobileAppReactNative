import { useEffect, useState } from "react";
import { Text, Surface, TextInput, Button, RadioButton } from 'react-native-paper';
import { View, StyleSheet } from "react-native";
import { QuizzQuestion, QuizzEntityProps } from "@/interfaces/QuizzInterface";
import { quizzEntityStyle } from "@/theme/styles"


export default function QuizzEntity({ quizz, handleQuestionChange, index, onRemove }: QuizzEntityProps) {
    
    const styles = quizzEntityStyle
    
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
