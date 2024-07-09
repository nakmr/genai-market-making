import { useState } from "preact/hooks"
// import "../static/build.css"

export default function Chat() {
  const [messages, setMessages] = useState<string[]>([])
  const [input, setInput] = useState("")

  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    if (input.trim() === "") return

    setMessages([...messages, `You: ${input}`])

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    })
    const data = await response.json()
    setMessages([...messages, `You: ${input}`, `AI: ${data.reply}`])
    setInput("")
  }

  return (
    <div class="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden mt-10">
      <div class="bg-blue-500 text-white text-center py-3">
        <h1 class="text-xl">Chat with OpenAI</h1>
      </div>
      <div class="p-4 h-96 overflow-y-auto">
        {messages.map((msg) => (
          <p
            class={`mb-4 ${
              msg.startsWith("You:")
                ? "text-right text-blue-600"
                : "text-left text-gray-700"
            }`}
          >
            {msg}
          </p>
        ))}
      </div>
      <form class="flex p-4 border-t" onSubmit={handleSubmit}>
        <input
          type="text"
          class="flex-1 p-2 border border-gray-300 rounded mr-2"
          value={input}
          onInput={(e) => setInput((e.target as HTMLInputElement).value)}
        />
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
          Send
        </button>
      </form>
    </div>
  )
}
