import * as SQLite from 'expo-sqlite';

let db;

export const initDB = async () => {
  if (!db) {
    try {
      db = await SQLite.openDatabaseAsync('eccomerce.db');
      //- console.log('Base de datos inicializada:', db);
    } catch (error) {
      console.error('Error al inicializar la base de datos:', error);
      throw error;
    }
  }
  return db;
};

export const createSessionsTable = async () => {
  if (!db) {
    console.error('DB no inicializada');
    throw new Error('DB no inicializada');
  }

  try {
    await db.execAsync(
      `CREATE TABLE IF NOT EXISTS sessions (
        localId TEXT PRIMARY KEY NOT NULL,
        email TEXT NOT NULL,
        token TEXT NOT NULL
      );`);
    //- console.log('Tabla "sessions" creada exitosamente.');
  } catch (error) {
    console.error('Error al crear la tabla "sessions":', error);
    throw error;
  }
};

export const insertSession = async (info) => {
  if (!info?.localId || !info?.email || !info?.token) {
    throw new Error('Información de sesión incompleta');
  }

  await createSessionsTable(); 

  try {
    const result = await db.runAsync(`INSERT OR REPLACE INTO sessions (localId, email, token) VALUES (?, ?, ?)`, info.localId, info.email, info.token);
    
    //- console.log('Sesión insertada:', info);
    //- console.log("resultado", result.lastInsertRowId, result.changes);
  } catch (error) {
    console.error('Error al insertar sesión:', error);
    throw error;
  }
};

export const getSession = async () => {
  await createSessionsTable(); 

  try {
    const result = await db.getFirstAsync('SELECT * FROM sessions');
    if(!result) return null;
    //- console.log('Sesiones obtenidas:',);
    return result;
  } catch (error) {
    console.error('Error al obtener sesiones:', error);
    throw error;
  }
};

export const clearSessions = async () => {
  await createSessionsTable(); 

  try {
    await db.execAsync('DELETE FROM sessions');
    //- console.log('Sesiones eliminadas.');
  } catch (error) {
    console.error('Error al limpiar sesiones:', error);
    throw error;
  }
};

initDB();
