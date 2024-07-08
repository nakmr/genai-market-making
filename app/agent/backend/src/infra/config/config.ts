import "std/dotenv"

const openaiApiKey = Deno.env.get("OPENAI_API_KEY")

if (!openaiApiKey) {
  console.error("Error: OPENAI_API_KEY is not set in the environment variables.")
  Deno.exit(1) // Exit the application with a status code of 1
}
export const OPENAI_API_KEY = openaiApiKey

export const OPENAI_CHAT_MODEL = Deno.env.get("OPENAI_CHAT_MODEL") || "gpt-4o"
