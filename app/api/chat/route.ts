import { openai } from '@ai-sdk/openai';
import { google } from '@ai-sdk/google';
import { anthropic } from '@ai-sdk/anthropic';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, modelId } = await req.json();

  let selectedModel;

  switch (modelId) {
    // --- CHATGPT (OpenAI) ---
    case 'gpt-4o': selectedModel = openai('gpt-4o'); break;
    case 'gpt-4-turbo': selectedModel = openai('gpt-4-turbo'); break;
    case 'gpt-3.5-turbo': selectedModel = openai('gpt-3.5-turbo'); break;
    case 'gpt-4': selectedModel = openai('gpt-4'); break;
    case 'o1-preview': selectedModel = openai('o1-preview'); break;

    // --- GEMINI (Google) ---
    case 'gemini-1.5-pro': selectedModel = google('models/gemini-1.5-pro-latest'); break;
    case 'gemini-1.5-flash': selectedModel = google('models/gemini-1.5-flash-latest'); break;
    case 'gemini-1.0-pro': selectedModel = google('models/gemini-1.0-pro'); break;
    case 'gemini-ultra': selectedModel = google('models/gemini-ultra'); break;
    case 'gemini-pro-vision': selectedModel = google('models/gemini-1.5-flash'); break;

    // --- CLAUDE (Anthropic) ---
    case 'claude-3-5-sonnet': selectedModel = anthropic('claude-3-5-sonnet-20240620'); break;
    case 'claude-3-opus': selectedModel = anthropic('claude-3-opus-20240229'); break;
    case 'claude-3-haiku': selectedModel = anthropic('claude-3-haiku-20240307'); break;
    case 'claude-2.1': selectedModel = anthropic('claude-2.1'); break;
    case 'claude-2.0': selectedModel = anthropic('claude-2.0'); break;

    default: selectedModel = openai('gpt-4o');
  }

  const result = await streamText({
    model: selectedModel,
    messages,
  });

  return result.toDataStreamResponse();
}
