const demoFallbackSetting = process.env.ENABLE_DEMO_FALLBACK

export const isDemoFallbackEnabled = () => demoFallbackSetting !== 'false'

const cleanPrompt = (prompt: string) => prompt.trim().slice(0, 240)

export const createDemoConversation = (prompt: string) => ({
  role: 'assistant' as const,
  demo: true,
  content: `This is a portfolio demo response for: “${cleanPrompt(prompt)}”\n\nThe interface, authentication, usage limits, and error handling are working. Connect a funded AI provider to replace this fallback with live generation.`,
})

export const createDemoCode = (prompt: string) => ({
  role: 'assistant' as const,
  demo: true,
  content: `\`\`\`ts\n// Portfolio demo for: ${cleanPrompt(prompt).replaceAll('\n', ' ')}\nexport function createResult(input: string) {\n  if (!input.trim()) throw new Error('Input is required')\n\n  return {\n    ok: true,\n    value: input.trim(),\n  }\n}\n\`\`\``,
})

const escapeXml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')

export const createDemoImage = (prompt: string) => {
  const words = cleanPrompt(prompt).split(/\s+/)
  const lines: string[] = []
  let current = ''

  for (const word of words) {
    if (`${current} ${word}`.trim().length > 34) {
      lines.push(current)
      current = word
    } else {
      current = `${current} ${word}`.trim()
    }
  }
  if (current) lines.push(current)

  const text = lines
    .slice(0, 4)
    .map(
      (line, index) =>
        `<text x="512" y="${500 + index * 58}" text-anchor="middle" fill="white" font-family="system-ui, sans-serif" font-size="38">${escapeXml(line)}</text>`
    )
    .join('')

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#312e81"/><stop offset="0.5" stop-color="#7c3aed"/><stop offset="1" stop-color="#db2777"/></linearGradient></defs><rect width="1024" height="1024" fill="url(#g)"/><circle cx="260" cy="250" r="190" fill="#fff" opacity=".08"/><circle cx="800" cy="760" r="260" fill="#fff" opacity=".07"/><text x="512" y="390" text-anchor="middle" fill="#fff" font-family="system-ui, sans-serif" font-size="28" font-weight="700" letter-spacing="5">JARVIS DEMO</text>${text}</svg>`

  return {
    url: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`,
    demo: true,
  }
}

export const createDemoAudio = (prompt: string) => {
  const sampleRate = 8_000
  const durationSeconds = 4
  const sampleCount = sampleRate * durationSeconds
  const dataSize = sampleCount * 2
  const wav = Buffer.alloc(44 + dataSize)

  wav.write('RIFF', 0)
  wav.writeUInt32LE(36 + dataSize, 4)
  wav.write('WAVEfmt ', 8)
  wav.writeUInt32LE(16, 16)
  wav.writeUInt16LE(1, 20)
  wav.writeUInt16LE(1, 22)
  wav.writeUInt32LE(sampleRate, 24)
  wav.writeUInt32LE(sampleRate * 2, 28)
  wav.writeUInt16LE(2, 32)
  wav.writeUInt16LE(16, 34)
  wav.write('data', 36)
  wav.writeUInt32LE(dataSize, 40)

  const seed = [...cleanPrompt(prompt)].reduce(
    (total, character) => total + character.charCodeAt(0),
    0
  )
  const notes = [220, 261.63, 329.63, 392, 440]

  for (let index = 0; index < sampleCount; index += 1) {
    const time = index / sampleRate
    const note = notes[(Math.floor(time * 2) + seed) % notes.length]
    const envelope = Math.min(1, (time % 0.5) * 10) * 0.22
    const sample = Math.sin(2 * Math.PI * note * time) * envelope
    wav.writeInt16LE(Math.round(sample * 32767), 44 + index * 2)
  }

  return {
    url: `data:audio/wav;base64,${wav.toString('base64')}`,
    demo: true,
  }
}

export const createDemoVideo = (prompt: string) => ({
  url: null,
  prompt: cleanPrompt(prompt),
  demo: true,
})

export const getProviderStatus = (error: unknown) => {
  if (!error || typeof error !== 'object') return undefined
  if ('status' in error && typeof error.status === 'number') return error.status
  if (
    'response' in error &&
    error.response &&
    typeof error.response === 'object' &&
    'status' in error.response &&
    typeof error.response.status === 'number'
  ) {
    return error.response.status
  }
  return undefined
}
