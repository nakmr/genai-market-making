import { Context } from "oak"
import { getChatResponse } from "../../app/services/chatService.ts"

export const getRoot = (context: Context) => {
    context.response.body = "Hello World!"
}

export const getChat = async (context: Context) => {
    const { request, response } = context
    if (!request.hasBody) {
        response.status = 400
        response.body = { message: "Invalid chat request" }
        return
    }

    const { prompt } = await request.body.json()
    const chatResponse = await getChatResponse(prompt)
    response.body = { chatResponse: chatResponse }
}
