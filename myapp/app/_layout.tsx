import { Stack } from "expo-router";
import { PaperProvider } from 'react-native-paper'; //stylování materials - pomocí providers

export default function RootLayout() {

  const DEAFULT_STYLE = {
    headerTitle: "Hlavní stránka",
    headerStyle: {
      backgroundColor: "#9545FD",
    },
    headerTintColor: "#FFFFFF",
    headerShadowVisible: true,
  }

  return (
    <PaperProvider>
      <Stack>
        <Stack.Screen 
          name="index"
          options={{...DEAFULT_STYLE, headerTitle: "Hlavní stránka"}}
        />
        <Stack.Screen 
          name="test" 
          options={{...DEAFULT_STYLE, headerTitle: "COPY stránka"}}
        />
      </Stack>
    </PaperProvider>
  );
}
