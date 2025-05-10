import { Surface, Button } from 'react-native-paper';
import { View } from "react-native";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
                padding: 20,
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
                <MaterialCommunityIcons name="account" size={24} color="white" />
            </Button>

            <Button 
                mode="contained"
                onPress={() => router.push("/createQuizz")}
            >
                <MaterialCommunityIcons name="card-plus" size={24} color="white" />
            </Button>

            <Button 
                mode="contained"
                onPress={() => router.push("/scan")}
            >
                <MaterialCommunityIcons name="gamepad" size={24} color="white" />
            </Button>

            <Button 
                mode="contained"
                onPress={() => router.push("/stats")}
            >
                <MaterialCommunityIcons name="chart-line" size={24} color="white" />
            </Button>
        </Surface>
    );
}

    

    