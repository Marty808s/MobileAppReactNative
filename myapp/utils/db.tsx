import * as SQLite from 'expo-sqlite';
import { QuizzRow, ScoreRow } from '@/interfaces/QuizzInterface';
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
    console.log("--------------------------------");
    console.log("insertQuizz", name, quizData);
    try {
        const statement = await db.prepareAsync(
            'INSERT INTO quizz (name, quiz_data) VALUES ($name, $quiz_data)'
        );
        await statement.executeAsync({ $name: name, $quiz_data: quizData });
        await statement.finalizeAsync();
        console.log("quizz inserted");
        console.log("--------------------------------");
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


export async function deleteQuestions() {
    const db = getDb();
    console.log("Delete paměť")
    try {
        await db.execAsync('DELETE FROM quizz_results');
        await db.execAsync('DELETE FROM quizz');
        console.log("Všechna data byla smazána");
    } catch (error) {
        console.error("Chyba při mazání dat:", error);
    } finally {
        await db.closeAsync();
    }
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
        const rows: any[] = await result.getAllAsync();
        console.log("rows", rows.length);
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
    console.log("Zápis výsledku", quizz_id, points);
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
    try {
        const statement = await db.prepareAsync(
            'SELECT * FROM quizz_results'
        );
        const result = await statement.executeAsync();
        const rows = await result.getAllAsync();
        await statement.finalizeAsync();

        const scores = rows.map((row: any) => ({
            id: row.id,
            quizz_id: row.quizz_id,
            points: row.points
        }));

        console.log('history from db:', scores);
        return scores;
        
    } finally {
        await db.closeAsync();  
    }
}

// získej mi id pro nový kvíz - ze sekvence
export async function getNextQuizzId(): Promise<number> {
    const db = getDb();
    try {
        const statement = await db.prepareAsync(
            "SELECT seq + 1 AS next_id FROM sqlite_sequence WHERE name='quizz';"
        );
        const result = await statement.executeAsync();
        const rows: any[] = await result.getAllAsync();
        await statement.finalizeAsync();
        await db.closeAsync();

        if (rows.length > 0 && rows[0].next_id != null) {
            return rows[0].next_id;
        } else {
            return 1;
        }
    } catch (error) {
        await db.closeAsync();
        throw error;
    }
}


export async function getStats() {
    const db = getDb();
    try {
        const statement = await db.prepareAsync(
            'SELECT q.id, q.name, q.quiz_data, r.points as score FROM quizz q JOIN quizz_results r ON q.id = r.quizz_id'
        );
        const result = await statement.executeAsync();
        const rows = await result.getAllAsync();
        await statement.finalizeAsync();

        const stats = rows.map((row: any) => ({
            quizz: {
                id: row.id,
                name: row.name,
                quiz_data: JSON.parse(row.quiz_data)
            },
            score: {
                score: row.score
            }
        }));

        console.log('getStats from db:', stats);
        return stats;
        
    } finally {
        await db.closeAsync();  
    }
}