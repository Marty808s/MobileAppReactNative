
import { Button } from 'react-native-paper';
import { QuizzRow } from "@/interfaces/QuizzInterface";
import { useRouter } from "expo-router";

export default function renderQuizzButton({ item: quizz }: { item: QuizzRow }) {
    const router = useRouter();

    return (
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
}