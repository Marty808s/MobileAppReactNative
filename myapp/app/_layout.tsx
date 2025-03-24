import { Stack } from "expo-router";
import { PaperProvider, MD3LightTheme } from 'react-native-paper'; //stylování materials - pomocí providers
import { colors } from '../theme/colors';

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.primary,
  },
};

export default function RootLayout() {

  const DEAFULT_STYLE = {
    headerStyle: {
      backgroundColor: colors.primary,
    },
    headerTintColor: "#FFFFFF",
    headerShadowVisible: true,
  }

  return (
    <PaperProvider theme={theme}>
      <Stack>
        <Stack.Screen 
          name="index"
          options={{...DEAFULT_STYLE, headerTitle: "Hlavní stránka"}}
        />
        <Stack.Screen 
          name="createQuizz" 
          options={{...DEAFULT_STYLE, headerTitle: "Vytvoření kvízu"}}
        />
      </Stack>
    </PaperProvider>
  );
}
