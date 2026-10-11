import { useState, useRef, useEffect } from 'react'
import { portfolioData } from '../../data/portfolioData'
import {
  Bot,
  Sparkles,
  Send,
  X,
  ArrowRight,
  Mail,
  Clock,
} from 'lucide-react'

function ChatBotWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: `Hi there! 👋 I'm Gunath's AI Portfolio Assistant.`,
      isFeatureCard: true,
    },
  ])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (open) {
      scrollToBottom()
    }
  }, [messages, open, isTyping])

  const samplePrompts = [
    'What are Gunath’s core skills?',
    'Tell me about Project Sentry',
    'How can I contact Gunath?',
  ]

  const handleSend = (textToSend) => {
    const query = (textToSend || input).trim()
    if (!query) return

    setMessages((prev) => [...prev, { role: 'user', text: query }])
    setInput('')
    setIsTyping(true)

    // Simulate smart AI response with coming soon notification
    setTimeout(() => {
      setIsTyping(false)
      let customNote = ''
      const lower = query.toLowerCase()

      if (lower.includes('sentry') || lower.includes('project') || lower.includes('nbro')) {
        customNote =
          'You can explore full interactive architecture breakdowns in the Projects section above!'
      } else if (lower.includes('contact') || lower.includes('hire') || lower.includes('email')) {
        customNote = `You can directly reach Gunath at ${portfolioData.contact.email} or on LinkedIn.`
      } else if (lower.includes('skill')) {
        customNote =
          'Gunath specializes in React, Node.js, Flutter, Supabase, and IoT Embedded Systems.'
      }

      setMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          text: `✨ Full autonomous AI query answering is **Coming Soon**!`,
          detail:
            customNote ||
            'I am currently being integrated with full Retrieval-Augmented Generation (RAG) over Gunath’s technical projects, academic research, and code repositories.',
          showActions: true,
        },
      ])
    }, 900)
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
                  <h3 className="text-sm font-bold text-white tracking-wide">Gunath AI Assistant</h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Coming Soon
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-blue-400" /> Powered by Next-Gen RAG
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              title="Close Assistant"
            >
              <X className="w-4 h-4" />
            </button>
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
                      : 'bg-slate-800/90 text-slate-200 border border-slate-700/60 shadow-inner rounded-bl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                  {msg.detail && <p className="mt-2 text-slate-300 text-[11px] leading-relaxed">{msg.detail}</p>}

                  {/* Coming Soon Feature Card inside greeting */}
                  {msg.isFeatureCard && (
                    <div className="mt-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-[11px] space-y-2">
                      <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Interactive AI in Active Development</span>
                      </div>
                      <p className="text-slate-400 leading-normal">
                        This AI chatbot is currently being connected to Gunath's real portfolio data, project documentation, and contact endpoints.
                      </p>
                      <div className="pt-2 border-t border-slate-800/80 flex flex-col gap-1.5">
                        <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                          Preview supported topics:
                        </span>
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

                  {/* Actions buttons on response */}
                  {msg.showActions && (
                    <div className="mt-3 pt-2.5 border-t border-slate-700/60 flex flex-wrap gap-2">
                      <a
                        href="#contact"
                        onClick={() => setOpen(false)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600/90 hover:bg-blue-600 text-white font-semibold text-[11px] transition-colors"
                      >
                        <Mail className="w-3 h-3" />
                        <span>Send Message</span>
                      </a>
                      <a
                        href="#projects"
                        onClick={() => setOpen(false)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold text-[11px] transition-colors"
                      >
                        <span>View Projects</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 bg-slate-800/60 border border-slate-700/40 rounded-2xl px-4 py-2.5 w-24">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" />
                <span
                  className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"
                  style={{ animationDelay: '150ms' }}
                />
                <span
                  className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"
                  style={{ animationDelay: '300ms' }}
                />
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
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question (Coming Soon preview)..."
                className="w-full bg-transparent text-xs text-white placeholder-slate-500 outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="w-8 h-8 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:hover:bg-blue-600 text-white flex items-center justify-center transition-all flex-shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
            <div className="mt-2 text-center text-[10px] text-slate-500 flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>Full Autonomous AI Chatbot • Coming Soon</span>
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
          <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40">
            Soon
          </span>
        </div>
      </button>
    </div>
  )
}

export default ChatBotWidget

