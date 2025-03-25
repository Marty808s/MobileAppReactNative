import { Surface, Button } from 'react-native-paper';
import { View } from "react-native";
import { useRouter } from "expo-router";

export default function Nav() {
    const router = useRouter();

    return (
        <Surface 
            elevation={1}
            style={{    
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                backgroundColor: "rgb(103 22 209)",
                padding: 10,
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
            }}
        >
            <Button 
                mode="contained"
                onPress={() => router.push("/")}
            >
                Home
            </Button>

            <Button 
                mode="contained"
                onPress={() => router.push("/createQuizz")}
            >
                Vytvořit Quizz
            </Button>
        </Surface>
    );
}

    

    