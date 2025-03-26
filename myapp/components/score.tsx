import { Surface, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';

interface Score {
    score: number;
}

export default function Score({ score }: Score) {
    return (
        <Surface style={styles.container}>
            <Text style={styles.scoreText}>
                Skóre: <Text style={styles.scoreNumber}>{score}</Text>
            </Text>
        </Surface>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#9545FD',
        padding: 16,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        elevation: 8,
    },
    scoreText: {
        fontSize: 20,
        color: 'white',
        fontWeight: '500',
    },
    scoreNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFD700',
    }
});

    

    