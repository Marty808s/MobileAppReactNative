import * as SQLite from 'expo-sqlite';
import { QuizzRow } from './QuizzInterfaces';
// https://docs.expo.dev/versions/latest/sdk/sqlite/


// Funkce pro získání nového připojení
function getDb() {
    return SQLite.openDatabaseSync('openquizz');
}


export async function createTables() {
    const db = getDb();
    try {
        // quizz table
        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS quizz (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                quiz_data TEXT
            )
        `);
        
        // results table
        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS quizz_results (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                quizz_id INTEGER,
                points INTEGER,
                FOREIGN KEY (quizz_id) REFERENCES quizz(id)
            )
        `);
    } catch (error) {
        console.error("Error creating tables:", error);
        throw error;
    } finally {
        await db.closeAsync();
    }
}


// quizz table - založ mi quizz
export async function insertQuizz(name: string, quizData: string) {
    const db = getDb();
    try {
        const statement = await db.prepareAsync(
            'INSERT INTO quizz (name, quiz_data) VALUES ($name, $quiz_data)'
        );
        await statement.executeAsync({ $name: name, $quiz_data: quizData });
        await statement.finalizeAsync();
        console.log("quizz inserted");
    } finally {
        await db.closeAsync();
    }
}


// quizz table - aktualizuj mi quizz
export async function updateQuizz(id: number, name: string, quizData: string) {
    console.log("updateQuizz", id, name, quizData);
    const db = getDb();
    const statement = await db.prepareAsync(
        'UPDATE quizz SET name = $name, quiz_data = $quiz_data WHERE id = $id'
    );
    await statement.executeAsync({ $id: id, $name: name, $quiz_data: quizData });
    await statement.finalizeAsync();
    await db.closeAsync();
}


export async function getQuizz(id: number) {
    const db = getDb();
    const statement = await db.prepareAsync(
        'SELECT * FROM quizz WHERE id = $id'
    );
    const result = await statement.executeAsync({ $id: id });
    console.log(result);
    await statement.finalizeAsync();
    await db.closeAsync();
    return result;
}

export async function getAllQuizzes(): Promise<QuizzRow[]> {
    const db = getDb();
    try {
        const statement = await db.prepareAsync('SELECT * FROM quizz');
        const result = await statement.executeAsync();
        const rows = await result.getAllAsync();
        await statement.finalizeAsync();
        
        const quizzes = rows.map((row: any) => ({
            id: row.id,
            name: row.name,
            quiz_data: row.quiz_data
        }));
        
        console.log("quizzes from db:", quizzes);
        return quizzes;
    } finally {
        await db.closeAsync();
    }
}


// results table - založ mi výsledek
export async function insertResult(quizz_id: number, points: number) {
    const db = getDb();
    const statement = await db.prepareAsync(
        'INSERT INTO quizz_results (quizz_id, points) VALUES ($quizz_id, $points)'
    );
    await statement.executeAsync({ $quizz_id: quizz_id, $points: points });
    await statement.finalizeAsync();
    await db.closeAsync();
}


// results table - získej mi všechny výsledky
export async function getResults() {
    const db = getDb();
    const statement = await db.prepareAsync(
        'SELECT * FROM quizz_results'
    );
    const result = await statement.executeAsync();
    await statement.finalizeAsync();
    await db.closeAsync();
    return result;
}

