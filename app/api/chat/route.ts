import { streamText, convertToModelMessages } from 'ai'
import { getAgentById, AGENTS } from '@/lib/agents'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { messages, agentId } = body

    // Get the selected agent or default to first one
    const agent = getAgentById(agentId) || AGENTS[0]

    // Convert UI messages to model messages
    const modelMessages = await convertToModelMessages(messages)

    const result = streamText({
      model: agent.model,
      system: agent.systemPrompt,
      messages: modelMessages,
    })

    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error('Chat API error:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to process chat request' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
