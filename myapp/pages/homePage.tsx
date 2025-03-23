import { useState, useEffect } from "react";
import { Text, Surface } from 'react-native-paper';
import { View } from "react-native";
import { useRouter } from "expo-router";
import Nav from "@/components/nav";

export default function HomePage() {
    const router = useRouter();

    return (
        <Surface style={{ flex: 1 }}>
          <Surface 
            elevation={0}
            style={{
              flex: 1,
              alignItems: "center",
              padding: 10,
              backgroundColor: "rgb(255 255 255)"
            }}
          >
            
            <Text 
                variant="headlineMedium" 
                style={{ color: 'rgba(0, 0, 0, 0.87)' }}  // standardní černá z Material Design
            >
                OpenQuizz
            </Text>

          </Surface>
          <Nav />
        </Surface>
    );
}
    