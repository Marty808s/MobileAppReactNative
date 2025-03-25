import React from 'react';
import { View } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import QRCode from 'react-native-qrcode-svg';
import { QuizzQuestion } from '@/utils/QuizzQuestion';

export async function generateAndSaveQRCodes(quizz: QuizzQuestion[]) {
  try {
    // Požádání o povolení přístupu do galerie
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Potřebujeme povolení pro ukládání do galerie');
      return;
    }

    if (status) {
        console.log("Mám přístup?", status)
    }

    let qrRef: any = null;

    const QRComponent = (
      <QRCode
        value={JSON.stringify(quizz)}
        size={200}
        backgroundColor="white"
        color="black"
        getRef={(ref) => (qrRef = ref)}
      />
    );

    console.log("QRComponent", QRComponent);
    console.log("ref", qrRef); // JE NULL

    // Převedení QR kódu na PNG a uložení - NEFUNGUJE
    if (qrRef) {
      qrRef.toDataURL((data: string) => {
        const filePath = FileSystem.documentDirectory + 'qr_code.png';
        console.log("Path", filePath);
        FileSystem.writeAsStringAsync(filePath, data, {
          encoding: FileSystem.EncodingType.Base64,
        }).then(() => {
          MediaLibrary.saveToLibraryAsync(filePath)
            .then(() => {
              alert('QR kód byl úspěšně uložen do galerie!');
            })
            .catch((error) => {
              console.error('Chyba při ukládání do galerie:', error);
              alert('Chyba při ukládání do galerie');
            });
        });
      });
    }
  } catch (error) {
    console.error('Chyba při generování QR kódu:', error);
    alert('Chyba při generování QR kódu');
  }
}
