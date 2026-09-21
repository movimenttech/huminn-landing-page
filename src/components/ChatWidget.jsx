import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SHEET_SCRIPT_URL } from '../config'

const AUTO_OPEN_DELAY = 2 * 60 * 1000 // 2 minutos
const BOT_NAME = 'Steve'
const GREETING = `Olá! Seja bem-vindo à Huminn 👋 Meu nome é ${BOT_NAME}, como posso te ajudar?`

const EMAIL_RE = /\S+@\S+\.\S+/

// Perguntas feitas em sequência depois da primeira mensagem livre da
// pessoa (que vira o campo "mensagem"). `validate` bloqueia o avanço se a
// resposta não servir — é assim que nome/e-mail ficam "obrigatórios" numa
// conversa de chat, já que não existe um <input required> aqui.
const QUESTIONS = [
  {
    field: 'nome',
    ask: () => 'Legal! Pra eu passar isso pro nosso time, qual é o seu nome?',
    validate: (v) => v.trim().length > 0,
    retry: () => 'Preciso do seu nome pra continuar :)',
  },
  {
    field: 'email',
    ask: (a) => `Prazer, ${a.nome}! Qual o seu e-mail?`,
    validate: (v) => EMAIL_RE.test(v.trim()),
    retry: () => 'Esse e-mail não parece válido. Pode digitar de novo?',
  },
  {
    field: 'telefone',
    ask: () => 'E um telefone ou WhatsApp pra contato?',
    validate: (v) => v.trim().length > 0,
    retry: () => 'Preciso de um telefone ou WhatsApp pra continuar.',
  },
  {
    field: 'empresa',
    ask: () => 'De qual empresa você é?',
    validate: (v) => v.trim().length > 0,
    retry: () => 'Preciso do nome da empresa pra continuar.',
  },
]

const CLOSING = (a) =>
  `Perfeito, ${a.nome}! Já anotei tudo e o nosso time vai te chamar em breve. Obrigado! 🙌`

function Bubble({ from, text }) {
  const isBot = from === 'bot'
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm leading-snug ${
          isBot ? 'bg-gray-100 text-black rounded-bl-sm' : 'bg-huminn-purple text-white rounded-br-sm'
        }`}
      >
        {text}
      </div>
    </div>
  )
}

function TypingBubble() {
  return (
    <div className="flex justify-start">
      <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  )
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [stepIndex, setStepIndex] = useState(-1) // -1 = aguardando mensagem livre
  const answersRef = useRef({ mensagem: '', nome: '', email: '', telefone: '', empresa: '' })
  const scrollRef = useRef(null)
  const hasStartedRef = useRef(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasStartedRef.current) setOpen(true)
    }, AUTO_OPEN_DELAY)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (open && !hasStarted) {
      setHasStarted(true)
      hasStartedRef.current = true
      setMessages([{ from: 'bot', text: GREETING }])
    }
  }, [open, hasStarted])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, typing])

  const say = (text, delay = 700) => {
    setTyping(true)
    return new Promise((resolve) => {
      setTimeout(() => {
        setTyping(false)
        setMessages((m) => [...m, { from: 'bot', text }])
        resolve()
      }, delay)
    })
  }

  const submitToSheet = async () => {
    if (!SHEET_SCRIPT_URL) {
      console.warn('SHEET_SCRIPT_URL não configurada em src/config.js')
      return
    }
    try {
      await fetch(SHEET_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: new URLSearchParams(answersRef.current),
      })

      // Disparo de conversão — Google Ads + Meta Pixel (via GTM)
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({ event: 'envio_chat' })
    } catch {
      // silencioso: no-cors não deixa ler o resultado mesmo
    }
  }

  const handleSend = async (e) => {
    e.preventDefault()
    const value = input.trim()
    if (!value || typing) return

    setMessages((m) => [...m, { from: 'user', text: value }])
    setInput('')

    if (stepIndex === -1) {
      answersRef.current.mensagem = value
      await say(QUESTIONS[0].ask(answersRef.current))
      setStepIndex(0)
      return
    }

    const question = QUESTIONS[stepIndex]
    if (!question.validate(value)) {
      await say(question.retry())
      return
    }

    answersRef.current[question.field] = value
    const nextIndex = stepIndex + 1

    if (nextIndex < QUESTIONS.length) {
      await say(QUESTIONS[nextIndex].ask(answersRef.current))
      setStepIndex(nextIndex)
    } else {
      await say(CLOSING(answersRef.current))
      setStepIndex(QUESTIONS.length)
      submitToSheet()
    }
  }

  const done = stepIndex === QUESTIONS.length

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="w-[min(90vw,360px)] h-[480px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="bg-huminn-purple text-white px-4 py-3 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center font-space text-sm">
                  🤖
                </div>
                <div>
                  <p className="font-space text-sm leading-none">{BOT_NAME}</p>
                  <p className="text-[11px] text-white/70 leading-none mt-1">Huminn</p>
                </div>
              </div>
              <button
                type="button"
                aria-label="Fechar chat"
                onClick={() => setOpen(false)}
                className="text-white/80 hover:text-white text-lg leading-none"
              >
                ✕
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
              {messages.map((m, i) => (
                <Bubble key={i} from={m.from} text={m.text} />
              ))}
              {typing && <TypingBubble />}
            </div>

            <form onSubmit={handleSend} className="border-t border-gray-100 p-3 flex gap-2 shrink-0">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={done}
                placeholder={done ? 'Conversa finalizada' : 'Digite sua mensagem...'}
                className="flex-1 min-w-0 rounded-full border border-gray-200 px-4 py-2 text-sm text-black placeholder-gray-400 focus:outline-none focus:border-huminn-purple disabled:bg-gray-50"
              />
              <button
                type="submit"
                disabled={done || !input.trim()}
                aria-label="Enviar"
                className="shrink-0 h-9 w-9 rounded-full bg-huminn-purple text-white flex items-center justify-center disabled:opacity-40"
              >
                ➤
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        aria-label={open ? 'Fechar chat' : 'Abrir chat'}
        onClick={() => setOpen((o) => !o)}
        className="h-14 w-14 rounded-full bg-huminn-purple text-white shadow-lg flex items-center justify-center text-2xl hover:opacity-90 transition-opacity"
      >
        {open ? '✕' : '💬'}
      </button>
    </div>
  )
}
