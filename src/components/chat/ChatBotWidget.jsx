import { useState, useRef, useEffect, useCallback } from 'react'
import { sendChatMessage } from '../../services/geminiChat'
import {
  Bot,
  Sparkles,
  Send,
  X,
  ArrowRight,
  RotateCcw,
} from 'lucide-react'

/**
 * Simple markdown-like renderer for chat messages.
 * Handles **bold**, bullet lists (• or -), and links [text](url).
 */
function renderMarkdown(text) {
  if (!text) return null

  const lines = text.split('\n')
  const elements = []
  let currentList = []

  const processInline = (line, lineIdx) => {
    // Process bold and links within a line
    const parts = []
    // Regex: match **bold**, [text](url), or plain text
    const regex = /(\*\*(.+?)\*\*)|(\[([^\]]+)\]\(([^)]+)\))/g
    let lastIndex = 0
    let match

    while ((match = regex.exec(line)) !== null) {
      // Add text before the match
      if (match.index > lastIndex) {
        parts.push(line.slice(lastIndex, match.index))
      }

      if (match[1]) {
        // Bold **text**
        parts.push(
          <strong key={`${lineIdx}-b-${match.index}`} className="font-semibold text-white">
            {match[2]}
          </strong>
        )
      } else if (match[3]) {
        // Link [text](url)
        parts.push(
          <a
            key={`${lineIdx}-a-${match.index}`}
            href={match[5]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
          >
            {match[4]}
          </a>
        )
      }
      lastIndex = regex.lastIndex
    }

    // Add remaining text
    if (lastIndex < line.length) {
      parts.push(line.slice(lastIndex))
    }

    return parts.length > 0 ? parts : [line]
  }

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="space-y-1 my-1.5">
          {currentList.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5 flex-shrink-0">•</span>
              <span>{processInline(item, `li-${i}`)}</span>
            </li>
          ))}
        </ul>
      )
      currentList = []
    }
  }

  lines.forEach((line, idx) => {
    const trimmed = line.trim()

    // Bullet list items
    if (/^[•\-\*]\s+/.test(trimmed)) {
      currentList.push(trimmed.replace(/^[•\-\*]\s+/, ''))
      return
    }

    // Numbered list items
    if (/^\d+\.\s+/.test(trimmed)) {
      currentList.push(trimmed.replace(/^\d+\.\s+/, ''))
      return
    }

    flushList()

    // Empty line
    if (!trimmed) {
      elements.push(<div key={`br-${idx}`} className="h-1.5" />)
      return
    }

    // Normal paragraph
    elements.push(
      <p key={`p-${idx}`} className="leading-relaxed">
        {processInline(trimmed, idx)}
      </p>
    )
  })

  flushList()

  return <>{elements}</>
}

function ChatBotWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [error, setError] = useState(null)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Conversation history for Gemini context (role: 'user' | 'model')
  const conversationRef = useRef([])

  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: `Hi there! 👋 I'm Gunath's AI Portfolio Assistant. Ask me anything about his skills, projects, experience, or how to get in touch!`,
      isWelcome: true,
    },
  ])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (open) {
      scrollToBottom()
      // Focus the input when chat opens
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [messages, open, isTyping])

  const samplePrompts = [
    `What are Gunath's core skills?`,
    'Tell me about Project Sentry',
    'How can I contact Gunath?',
    'What projects has he built?',
  ]

  const handleSend = useCallback(
    async (textToSend) => {
      const query = (textToSend || input).trim()
      if (!query || isTyping) return

      setError(null)
      setMessages((prev) => [...prev, { role: 'user', text: query }])
      setInput('')
      setIsTyping(true)

      // Add to conversation history
      conversationRef.current.push({ role: 'user', text: query })

      try {
        const reply = await sendChatMessage(conversationRef.current)

        // Add AI response to conversation history
        conversationRef.current.push({ role: 'model', text: reply })

        setMessages((prev) => [
          ...prev,
          { role: 'bot', text: reply },
        ])
      } catch (err) {
        console.error('Chat error:', err)
        setError(err.message || 'Something went wrong. Please try again.')
        setMessages((prev) => [
          ...prev,
          {
            role: 'bot',
            text: '⚠️ I had trouble connecting. Please try again in a moment.',
            isError: true,
          },
        ])
      } finally {
        setIsTyping(false)
      }
    },
    [input, isTyping]
  )

  const handleReset = () => {
    conversationRef.current = []
    setError(null)
    setMessages([
      {
        role: 'bot',
        text: `Hi there! 👋 I'm Gunath's AI Portfolio Assistant. Ask me anything about his skills, projects, experience, or how to get in touch!`,
        isWelcome: true,
      },
    ])
  }

  return (
    <div className="fixed bottom-6 right-6 z-[80] font-sans">
      {/* ─── Chat Window ─── */}
      {open && (
        <div className="mb-4 w-[340px] sm:w-[380px] rounded-3xl bg-slate-900/95 backdrop-blur-2xl border border-slate-700/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col transition-all duration-300 animate-in fade-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="relative px-5 py-4 bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                {/* Glowing live pulse indicator */}
                <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-slate-900" />
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white tracking-wide">Gunath AI</h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Live
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-blue-400" /> Powered by Gemini AI
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Reset conversation button */}
              <button
                type="button"
                onClick={handleReset}
                className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                title="Reset conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                title="Close Assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="h-[380px] overflow-y-auto p-4 space-y-4 text-xs scrollbar-thin scrollbar-thumb-slate-700">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                {msg.role === 'bot' && (
                  <div className="flex items-center gap-1.5 mb-1 text-[10px] text-slate-400 font-medium">
                    <Sparkles className="w-3 h-3 text-blue-400" />
                    <span>Gunath AI</span>
                  </div>
                )}

                <div
                  className={`rounded-2xl px-4 py-3 max-w-[90%] leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white shadow-md rounded-br-none'
                      : msg.isError
                        ? 'bg-red-950/60 text-red-200 border border-red-800/60 shadow-inner rounded-bl-none'
                        : 'bg-slate-800/90 text-slate-200 border border-slate-700/60 shadow-inner rounded-bl-none'
                  }`}
                >
                  {msg.role === 'bot' ? renderMarkdown(msg.text) : <p>{msg.text}</p>}

                  {/* Welcome card with sample prompts */}
                  {msg.isWelcome && (
                    <div className="mt-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-[11px] space-y-2">
                      <div className="flex items-center gap-1.5 text-blue-400 font-semibold">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Try asking me about:</span>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        {samplePrompts.map((prompt) => (
                          <button
                            key={prompt}
                            type="button"
                            onClick={() => handleSend(prompt)}
                            className="text-left px-2.5 py-1.5 rounded-lg bg-slate-850 hover:bg-slate-800 text-blue-300 hover:text-blue-200 border border-slate-800 text-[11px] transition-colors flex items-center justify-between group"
                          >
                            <span>{prompt}</span>
                            <ArrowRight className="w-3 h-3 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start gap-2">
                <div className="flex items-center gap-1.5 mt-1">
                  <Sparkles className="w-3 h-3 text-blue-400" />
                </div>
                <div className="flex items-center gap-2 text-slate-400 bg-slate-800/60 border border-slate-700/40 rounded-2xl px-4 py-2.5">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" />
                  <span
                    className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"
                    style={{ animationDelay: '150ms' }}
                  />
                  <span
                    className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"
                    style={{ animationDelay: '300ms' }}
                  />
                  <span className="text-[10px] text-slate-500 ml-1">Thinking...</span>
                </div>
              </div>
            )}

            {/* Error retry */}
            {error && !isTyping && (
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => {
                    // Retry the last user message
                    const lastUserMsg = conversationRef.current[conversationRef.current.length - 1]
                    if (lastUserMsg?.role === 'user') {
                      conversationRef.current.pop() // Remove the failed attempt
                      handleSend(lastUserMsg.text)
                    }
                  }}
                  className="text-[10px] text-blue-400 hover:text-blue-300 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/60 border border-slate-700/40 hover:border-blue-500/40 transition-all"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Retry</span>
                </button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-slate-950/80 border-t border-slate-800">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSend()
              }}
              className="flex items-center gap-2 bg-slate-900 border border-slate-700/80 rounded-2xl px-3 py-1.5 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all"
            >
              <Sparkles className="w-4 h-4 text-slate-500 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about skills, projects, experience..."
                className="w-full bg-transparent text-xs text-white placeholder-slate-500 outline-none"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="w-8 h-8 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:hover:bg-blue-600 text-white flex items-center justify-center transition-all flex-shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
            <div className="mt-2 text-center text-[10px] text-slate-500 flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Powered by Gemini AI • Responses may not be perfect</span>
            </div>
          </div>
        </div>
      )}

      {/* ─── Modern Floating Launcher Button ─── */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="group relative flex items-center gap-3 px-5 py-3.5 rounded-full bg-slate-950 text-white border border-slate-700/80 shadow-[0_10px_35px_-5px_rgba(37,99,235,0.4)] hover:shadow-[0_15px_45px_-5px_rgba(37,99,235,0.6)] hover:border-blue-500/80 hover:-translate-y-1 transition-all duration-300"
      >
        {/* Glow backdrop aura */}
        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/30 via-indigo-600/30 to-purple-600/30 blur-md opacity-60 group-hover:opacity-100 transition-opacity" />

        <div className="relative flex items-center justify-center w-7 h-7 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-md">
          <Bot className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
          {/* Pulsing indicator */}
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
        </div>

        <div className="relative flex items-center gap-2">
          <span className="text-xs font-bold tracking-wide">AI Assistant</span>
          <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            Live
          </span>
        </div>
      </button>
    </div>
  )
}

export default ChatBotWidget
