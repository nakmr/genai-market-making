import { OpenAI } from "OpenAI"
import { OPENAI_API_KEY, OPENAI_CHAT_MODEL } from "../../infra/config/config.ts"

export async function getChatResponse(prompt: string): Promise<string> {
    const openai = new OpenAI({
        apiKey: OPENAI_API_KEY,
    })
    const response = await openai.chat.completions.create({
        messages: [
            { role: "user", content: prompt }
        ],
        model: OPENAI_CHAT_MODEL
    })
    
    if (!response.choices[0].message.content) {
        throw new Error("Error fetching response from OpenAI")
    }

    return response.choices[0].message.content
}