// tady budou styly/stylsheets, které budu importovat na jendotlivých stránkách
import { StyleSheet } from "react-native";

export const homePageStyle = StyleSheet.create({
    tableContainer: {
        margin: 10,
        borderRadius: 8,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#9545FD',
        padding: 10,
    },
    tableRow: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    tableCell: {
        flex: 1,
        textAlign: 'center',
    },
    headerText: {
        color: 'white',
        fontWeight: 'bold',
    },
    evenRow: {
        backgroundColor: '#fff',
    },
    oddRow: {
        backgroundColor: '#f9f9f9',
    },
    questionsContainer: {
        flex: 1,
        marginBottom: 5,
        minHeight: 200
    },
    historyContainer: {
        flex: 1,
        marginBottom: 20,
        minHeight: 200
    }
});

export const homePageHeaderStyle = StyleSheet.create({
  text: {
    color: 'rgba(0, 0, 0, 0.87)',
    marginBottom: 10,
    marginTop: 2
  },
  subtext: {
    textAlign: 'center',
    marginBottom: 16,
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: 12,
    fontWeight: 'normal'
  }
});

export const gameStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        position: 'relative',
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 16,
        paddingBottom: 100,
        gap: 16
    },
    surface: {
        flex: 1,
        padding: 16,
        backgroundColor: 'white',
        minHeight: '100%',
    },
    title: {
        textAlign: 'center',
        marginBottom: 12,
        color: '#1a1a1a',
        fontWeight: 'bold',
    },
    subtext: {
        textAlign: 'center',
        marginBottom: 6,
        color: '#1a1a1a',
        fontSize: 18,
        fontWeight: 'normal',
    },
    questionContainer: {
        marginBottom: 4,
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 4,
        elevation: 2,
    },
    questionNumber: {
        fontSize: 16,
        color: '#666',
        marginBottom: 12,
        textAlign: 'center',
    },
    button: {
        marginTop: 15,
        marginHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 8,
        backgroundColor: '#9545FD',
        elevation: 2,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export const scanStyle = StyleSheet.create({
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

export const answerStyle = StyleSheet.create({
    container: {
        padding: 16,
        margin: 0,
        borderRadius: 8,
        backgroundColor: 'white',
        width: '100%',
        maxWidth: 600,
        marginBottom: 8,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    answerContainer: {
        marginBottom: 8,
    },
    answerText: {
        fontSize: 16,
    },
    correctAnswer: {
        color: 'green',
        fontWeight: 'bold',
    },
    wrongAnswer: {
        color: 'red',
        textDecorationLine: 'line-through',
    }
    });

export const quizzEntityStyle = StyleSheet.create({
    container: {
        padding: 16,
        margin: 8,
        borderRadius: 8,
        backgroundColor: 'white',
        width: '100%',
        maxWidth: 600,
    },
    questionInput: {
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    answerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    answerInput: {
        flex: 1,
        marginRight: 8,
    },
    deleteButton: {
        marginTop: 16,
        borderColor: 'red',
    }
    });
