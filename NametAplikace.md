
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
- [React Navigation](https://reactnavigation.org/)

### Databáze
- [expo-sqlite](https://docs.expo.dev/versions/latest/sdk/sqlite/) – lokální ukládání skóre

### QR funkce
- [expo-barcode-scanner](https://docs.expo.dev/versions/latest/sdk/bar-code-scanner/) – skenování QR kódů
- [react-native-qrcode-svg](https://github.com/awesomejerry/react-native-qrcode-svg) – generování QR kódů

### Pomocné knihovny
- [zod](https://github.com/colinhacks/zod) nebo `ajv` – validace JSON struktury
- [expo-sharing](https://docs.expo.dev/versions/latest/sdk/sharing/) – sdílení vygenerovaných QR kódů (volitelné)

---

## 📦 Struktura projektu

```
/App.js
/screens/
  - HomeScreen.js
  - ScannerScreen.js
  - QuizScreen.js
  - ResultScreen.js
/utils/
  - db.js             # SQLite wrapper
  - jsonValidator.js  # Validace JSON struktury
```

---

## 🧩 Ukázka struktury JSON kvízu

```json
{
  "title": "Kvíz o zvířatech",
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
- [ ] Editor vlastního kvízu
- [ ] Generování QR kódu z vlastního JSON
- [ ] Sdílení QR kódu

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

## 📄 Licence

MIT
