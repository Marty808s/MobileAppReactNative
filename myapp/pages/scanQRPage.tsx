import React, { useState, useEffect } from 'react';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';

import { QuizzRow, QuizzQR } from '@/utils/QuizzInterfaces';

export default function ScanPage() {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
  
    if (!permission) {
      return <View />;
    }
  
    if (!permission.granted) {
      return (
        <View style={styles.container}>
          <Text style={styles.message}>K využití aplikace potřebujeme kameru!</Text>
          <Button onPress={requestPermission} title="grant permission" />
        </View>
      );
    }
  
    const handleBarCodeScanned = ({ data }: { data: string }) => {
      setScanned(true);
      console.log("Callback na scan kodu")
      try {
        const quizz: QuizzQR = JSON.parse(data);
        console.log('Naskenovaný kvíz:', quizz);
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
        <CameraView 
          style={styles.camera} 
          facing={"back"}
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ['qr'],
          }}
        />
        {scanned && (
          <Button 
            title="Skenovat další"
            onPress={() => setScanned(false)}
          />
        )}
      </View>
    );
}
  
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