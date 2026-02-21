'use client'

import { getDB } from '../lib/db'
import { v4 as uuidv4 } from 'uuid'

export type TranscriptSession = {
  id: string
  date: number
  duration: number
  wordCount: number
  content: string
}

function autoTag(content: string): string {
  const text = content.toLowerCase()

  if (text.includes('assignment') || text.includes('lecture')) {
    return 'Lecture'
  }

  if (text.includes('meeting') || text.includes('agenda')) {
    return 'Meeting'
  }

  if (text.includes('emergency') || text.includes('alert')) {
    return 'Alert Session'
  }

  return 'Conversation'
}

export function useTranscripts() {
  const saveTranscript = async (
    content: string,
    duration: number
  ) => {
    const db = getDB()
    if (!db) return

    const wordCount =
      content.trim().split(/\s+/).length

    const session: TranscriptSession = {
      id: uuidv4(),
      date: Date.now(),
      duration,
      wordCount,
      content,
    }

    const database = await db
    await database.put('transcripts', session)
  }

  const getAllTranscripts = async () => {
    const db = getDB()
    if (!db) return []

    const database = await db
    return await database.getAll('transcripts')
  }

  const deleteTranscript = async (id: string) => {
    const db = getDB()
    if (!db) return

    const database = await db
    await database.delete('transcripts', id)
  }

  return {
    saveTranscript,
    getAllTranscripts,
    deleteTranscript,
  }
}