# 📱 QR Kvíz App – React Native + Expo

Aplikace, která umožňuje:
- 📷 Načítat QR kódy obsahující JSON s otázkami kvízu
- ✅ Validovat JSON a zobrazit interaktivní kvíz
- 🗃️ Ukládat skóre do lokální SQLite databáze
- 🛠️ Vytvářet vlastní kvízy a generovat pro ně QR kód
---

## 🧰 Tech Stack

### Frontend
- [React Native](https://reactnative.dev/) (Expo framework)
- [Expo](https://expo.dev/)

### Databáze
- [expo-sqlite](https://docs.expo.dev/versions/latest/sdk/sqlite/) – lokální ukládání skóre

### QR funkce
- [react-native-qrcode-svg](https://github.com/awesomejerry/react-native-qrcode-svg) – generování QR kódů

### Pomocné knihovny
- [expo-sharing](https://docs.expo.dev/versions/latest/sdk/sharing/) – sdílení vygenerovaných QR kódů

### Stylování
- [React Native Paper](https://callstack.github.io/react-native-paper/) – Material Design komponenty
- [Materials Community Icons](https://static.enapter.com/rn/icons/material-community.html) – ikony
- Style Sheets
---

## 🧩 Ukázka struktury JSON kvízu

```json
{
  "questions": [
    {
      "question": "Jaký je největší savec?",
      "options": ["Slon", "Velryba", "Nosorožec"],
      "correctIndex": 1
    },
    {
      "question": "Kolik nohou má pavouk?",
      "options": ["6", "8", "10"],
      "correctIndex": 1
    }
  ]
}
```

---

## ✨ Plánované funkce

- [x] Skenování QR kódů a čtení JSON
- [x] Zobrazení otázek a odpovědí
- [x] Vyhodnocení výsledků
- [x] Ukládání skóre do SQLite
- [x] Editor vlastního kvízu
- [x] Sdílení QR kódu

---

## 🧪 Vývoj & testování

1. Spusť vývojový server:
```bash
npx expo start
```

2. Testuj:
- ✅ Na fyzickém zařízení s aplikací **Expo Go**
- 🧪 Nebo na emulátoru (Android Studio / Xcode)

---


## EMULATORT SETUP
https://www.youtube.com/watch?v=xKGESzemfdw


