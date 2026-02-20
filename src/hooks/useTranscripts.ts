'use client'

import { dbPromise } from '../lib/db'
import { v4 as uuidv4 } from 'uuid'

/* -------------------- Types -------------------- */

export type TranscriptSession = {
  id: string
  date: number
  duration: number
  wordCount: number
  autoTag: string
  content: string
}

/* -------------------- Auto Tag Logic -------------------- */

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

/* -------------------- Hook -------------------- */

export function useTranscripts() {
  /* Save Transcript */
  const saveTranscript = async (
    content: string,
    duration: number
  ): Promise<void> => {
    const db = await dbPromise

    const wordCount =
      content.trim().length === 0
        ? 0
        : content.trim().split(/\s+/).length

    const session: TranscriptSession = {
      id: uuidv4(),
      date: Date.now(),
      duration,
      wordCount,
      autoTag: autoTag(content),
      content,
    }

    await db.put('transcripts', session)
  }

  /* Get All Transcripts */
  const getAllTranscripts = async (): Promise<TranscriptSession[]> => {
    const db = await dbPromise
    return (await db.getAll('transcripts')) as TranscriptSession[]
  }

  /* Delete Transcript */
  const deleteTranscript = async (id: string): Promise<void> => {
    const db = await dbPromise
    await db.delete('transcripts', id)
  }

  return {
    saveTranscript,
    getAllTranscripts,
    deleteTranscript,
  }
}