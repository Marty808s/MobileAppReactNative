
import { QuizzRow, ScoreRow } from "@/interfaces/QuizzInterface";
import { View, Text } from "react-native";

export default function renderScoreTable({scores}: {scores: ScoreRow[]}, {quizzes}: {quizzes: QuizzRow[]}, {styles}: {styles: StyleSheet}) {
    return (
        <View style={styles.tableContainer}>
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
    </View>
    )
}