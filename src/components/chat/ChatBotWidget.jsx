import { useMemo, useState } from 'react'
import { portfolioData } from '../../data/portfolioData'

function getBotReply(question) {
  const text = question.toLowerCase()

  if (text.includes('project')) {
    return `I currently showcase ${portfolioData.projects.length} major projects. Open the Projects page to see full details.`
  }

  if (text.includes('skill') || text.includes('technology')) {
    const skills = portfolioData.skillCategories.flatMap((category) => category.items).slice(0, 6)
    return `Core technologies include ${skills.join(', ')}.`
  }

  if (text.includes('cert') || text.includes('publish') || text.includes('blog') || text.includes('activity')) {
    return `There are ${portfolioData.credentials.length} credentials and activities listed. Visit the Certifications page to see all details.`
  }

  if (text.includes('contact') || text.includes('email') || text.includes('phone')) {
    return `You can reach ${portfolioData.fullName} via ${portfolioData.contact.details.join(' | ')}.`
  }

  return 'I can help with projects, skills, certifications, activities, and contact details. Try asking one of those.'
}

function ChatBotWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'bot', text: portfolioData.chatbot.greeting },
  ])
  const [input, setInput] = useState('')

  const quickReplies = useMemo(() => portfolioData.chatbot.quickReplies, [])

  const sendMessage = (value) => {
    const trimmed = value.trim()
    if (!trimmed) {
      return
    }

    const reply = getBotReply(trimmed)
    setMessages((prev) => [...prev, { role: 'user', text: trimmed }, { role: 'bot', text: reply }])
    setInput('')
  }

  return (
    <div className="fixed bottom-5 right-5 z-[70]">
      {open ? (
        <div className="w-[320px] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-glow">
          <div className="flex items-center justify-between bg-gradient-to-r from-sky-100 to-violet-100 px-4 py-3">
            <p className="font-display text-sm font-bold text-slate-900">Portfolio Assistant</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full bg-white px-2 py-1 text-xs font-semibold text-slate-600"
            >
              Close
            </button>
          </div>

          <div className="max-h-72 space-y-3 overflow-y-auto px-4 py-3 text-sm">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`max-w-[88%] rounded-2xl px-3 py-2 ${
                  message.role === 'user'
                    ? 'ml-auto bg-primary-600 text-white'
                    : 'bg-slate-100 text-slate-700'
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200 px-3 py-3">
            <div className="mb-2 flex flex-wrap gap-2">
              {quickReplies.map((quickReply) => (
                <button
                  key={quickReply}
                  type="button"
                  onClick={() => sendMessage(quickReply)}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600 hover:bg-slate-100"
                >
                  {quickReply}
                </button>
              ))}
            </div>

            <form
              className="flex gap-2"
              onSubmit={(event) => {
                event.preventDefault()
                sendMessage(input)
              }}
            >
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask me anything"
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none ring-primary-300 focus:ring-2"
              />
              <button
                type="submit"
                className="rounded-xl bg-primary-600 px-3 py-2 text-sm font-semibold text-white hover:bg-primary-700"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-full border border-primary-300 bg-gradient-to-r from-primary-500 to-violet-500 px-5 py-3 text-sm font-bold text-white shadow-glow"
        >
          Chat Bot
        </button>
      )}
    </div>
  )
}

export default ChatBotWidget
