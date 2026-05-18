import { openai } from '@ai-sdk/openai';
import { google } from '@ai-sdk/google';
import { anthropic } from '@ai-sdk/anthropic';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, modelId } = await req.json();

    let selectedModel;

    switch (modelId) {
      case 'gpt-4o': 
        selectedModel = openai('gpt-4o'); 
        break;
      case 'gemini-1.5-pro': 
        selectedModel = google('models/gemini-1.5-pro-latest'); 
        break;
      case 'claude-3-5-sonnet': 
        selectedModel = anthropic('claude-3-5-sonnet-20240620'); 
        break;
      default: 
        selectedModel = openai('gpt-4o');
    }

    const result = await streamText({
      model: selectedModel,
      messages,
    });

    // Version standard et universelle pour renvoyer le flux textuel
    return result.toTextStreamResponse();
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Erreur serveur interne' }), { status: 500 });
  }
}
