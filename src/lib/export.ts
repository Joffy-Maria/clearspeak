'use client'

import { TranscriptSession } from '../hooks/useTranscripts'

export function exportTranscriptAsTXT(session: TranscriptSession) {
  const textContent = `
ClearSpeak Transcript
Date: ${new Date(session.date).toLocaleString()}
Duration: ${session.duration}s
Words: ${session.wordCount}
Tag: ${session.autoTag}

-------------------------

${session.content}
`

  const blob = new Blob([textContent], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = `transcript-${session.id}.txt`
  link.click()

  URL.revokeObjectURL(url)
}