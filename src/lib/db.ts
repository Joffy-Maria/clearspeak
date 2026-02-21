import { openDB, IDBPDatabase } from 'idb'

let dbPromise: Promise<IDBPDatabase> | null = null

export function getDB() {
  if (typeof window === 'undefined') {
    return null
  }

  if (!dbPromise) {
    dbPromise = openDB('ClearSpeakDB', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('transcripts')) {
          db.createObjectStore('transcripts', {
            keyPath: 'id',
          })
        }
      },
    })
  }

  return dbPromise
}