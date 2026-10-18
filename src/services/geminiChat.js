/**
 * Gemini Chat API Service
 * 
 * Sends messages to the Netlify serverless function which proxies
 * them to Gemini 2.0 Flash with system instructions.
 */

const API_ENDPOINT = '/.netlify/functions/chat'

/**
 * Send a conversation to the Gemini AI and get a response.
 * @param {Array<{role: 'user'|'model', text: string}>} messages - The conversation history
 * @returns {Promise<string>} The AI response text
 */
export async function sendChatMessage(messages) {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `Request failed with status ${response.status}`)
    }

    const data = await response.json()
    return data.reply
  } catch (error) {
    console.error('Chat API error:', error)
    throw error
  }
}
