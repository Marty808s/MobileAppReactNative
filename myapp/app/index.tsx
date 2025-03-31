import { useEffect, useState } from "react";
import HomePage from "../pages/homePage";
import { createTables } from "../utils/db";
import { Text } from "react-native";

export default function Index() { 
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function initDb() {
      // lazy loading - vytvoření tabulek, pak HomePage
      try {
        await createTables();
        setIsReady(true);
      } catch (error) {
        console.error("DB init error:", error);
      }
    }
    initDb();
  }, []);

  if (!isReady) {
    return <Text>Načítání...</Text>;
  }
  return <HomePage/>;
}