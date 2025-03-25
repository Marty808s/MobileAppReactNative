import React from 'react';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { QuizzQuestion } from '@/utils/QuizzQuestion';
import QRCode from 'react-native-qrcode-svg'; // použít pak tohle

export async function generateAndSaveQRCodes(quizz: QuizzQuestion[]) {
  try {
    const timestamp = new Date().getTime();
    const filePath = FileSystem.documentDirectory + 'qr_code.png'+ {timestamp} + ".png";
    console.log("Cesta", filePath);
    
    // Vytvoříme QR kód jako SVG string - DOLADIT FORMÁT (ASI PŘES KOMPONENTU QRCode)
    const svgString = `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" fill="white"/>
      <text x="50%" y="50%" text-anchor="middle" dy=".3em">${JSON.stringify(quizz)}</text>
    </svg>`;

    // TOHLE UŽ FUNGUJE
    await FileSystem.writeAsStringAsync(filePath, svgString);
    await Sharing.shareAsync(filePath);
    
  } catch (error) {
    console.error('Chyba při generování QR kódu:', error);
    alert('Chyba při generování QR kódu');
  }
}
