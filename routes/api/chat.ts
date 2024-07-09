import { OpenAI } from "OpenAI/mod.ts"
import { OPENAI_API_KEY, OPENAI_CHAT_MODEL } from "../../infra/config.ts"
import { ChatCompletionMessageParam } from "OpenAI/resources/mod.ts"

const getConversationResponse = async (
  conversationHistory: ChatCompletionMessageParam[],
) => {
  const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
  })

  const response = await openai.chat.completions.create({
    messages: conversationHistory,
    model: OPENAI_CHAT_MODEL,
  })

  if (!response.choices || !response.choices[0].message.content) {
    throw new Error("Error fetching response from OpenAI")
  }

  return response.choices[0].message.content
}

export const handler = async (req: Request) => {
  try {
    const { message } = await req.json()
    const conversationHistory: ChatCompletionMessageParam[] = [
      { role: "user", content: message },
    ]

    const reply = await getConversationResponse(conversationHistory)

    conversationHistory.push({ role: "assistant", content: reply })

    return new Response(JSON.stringify({ reply }), {
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    })
  }
}
