'use client'

import { useEffect, useState } from 'react'
import AppShell from '../../components/layout/AppShell'
import { useTranscripts, TranscriptSession } from '../../hooks/useTranscripts'

export default function TranscriptsPage() {
  const { getAllTranscripts, deleteTranscript } = useTranscripts()
  const [sessions, setSessions] = useState<TranscriptSession[]>([])

  useEffect(() => {
    const load = async () => {
      const data = await getAllTranscripts()
      if (data) {
        setSessions(data.slice().reverse())
      }
    }
    load()
  }, [])

  const handleDelete = async (id: string) => {
    await deleteTranscript(id)
    setSessions(prev =>
      prev.filter(session => session.id !== id)
    )
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Transcripts</h1>

        {sessions.length === 0 && (
          <p className="opacity-60">No transcripts yet.</p>
        )}

        {sessions.map(session => (
          <div
            key={session.id}
            className="glass p-5 rounded-xl space-y-3"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">
                  Transcript ({session.wordCount} words)
                </p>
                <p className="text-sm opacity-60">
                  {new Date(session.date).toLocaleString()}
                </p>
              </div>

              <button
                onClick={() => handleDelete(session.id)}
                className="text-red-400 hover:text-red-500"
              >
                Delete
              </button>
            </div>

            <p className="text-sm opacity-80">
              Duration: {session.duration}s • Words: {session.wordCount}
            </p>

            <p className="opacity-80 whitespace-pre-wrap">
              {session.content}
            </p>
          </div>
        ))}
      </div>
    </AppShell>
  )
}