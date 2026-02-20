'use client'

import { openDB, DBSchema } from 'idb'

interface ClearSpeakDB extends DBSchema {
  transcripts: {
    key: string
    value: {
      id: string
      date: number
      duration: number
      wordCount: number
      content: string
    }
  }
}

export const dbPromise = openDB<ClearSpeakDB>('ClearSpeakDB', 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('transcripts')) {
      db.createObjectStore('transcripts', {
        keyPath: 'id',
      })
    }
  },
})