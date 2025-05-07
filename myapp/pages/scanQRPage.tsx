import React, { useState, useEffect } from 'react';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { QuizzQR } from '@/interfaces/QuizzInterface';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default function ScanPage() {
    // získání oprávnění k použití kamery
    const [permission, requestPermission] = useCameraPermissions();
    // zda je skenování dokončeno
    const [scanned, setScanned] = useState(false);
  
    if (!permission) {
      // čekání na oprávnění
      return <View />;
    }
  
    if (!permission.granted) {
      // žádání o oprávnění
      return (
        <View style={styles.container}>
          <Text style={styles.message}>K využití aplikace potřebujeme kameru!</Text>
          <Button onPress={requestPermission} title="grant permission" />
        </View>
      );
    }
  
    // zpracování skenování
    const handleBarCodeScanned = ({ data }: { data: string }) => {
      setScanned(true);
      console.log("Callback na scan kodu")
      try {
        // zpracování dat kvízu
        const quizz: QuizzQR = JSON.parse(data);
        console.log('Naskenovaný kvíz:', quizz);
        // přesměrování na stránku s kvízem + JSON
        router.push({
          pathname: '/quizz',
          params: {
            quizzData: JSON.stringify(quizz)
          }
        });
      } catch (error) {
        alert('Neplatný QR kód kvízu');
      }
    };
  
    return (
      <View style={styles.container}>
        {/* kamera */}
        <CameraView 
          style={styles.camera} 
          facing={"back"}
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ['qr'],
          }}
        />
        {/* button pro skenování dalšího QR kódu (pokud je již skenování dokončeno) */}
        {scanned && (
          <Button 
            title="Skenovat další"
            onPress={() => setScanned(false)}
          />
        )}
      </View>
    );
}
  