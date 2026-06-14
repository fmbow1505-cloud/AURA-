import { openai } from '@ai-sdk/openai';
import { google } from '@ai-sdk/google';
import { anthropic } from '@ai-sdk/anthropic';
import { streamText } from 'ai';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

const OPENAI_MODELS: Record<string, string> = {
  'gpt-4o': 'gpt-4o',
  'gpt-4-turbo': 'gpt-4-turbo',
  'gpt-4o-mini': 'gpt-4o-mini',
  'gpt-4': 'gpt-4',
  'gpt-3.5-turbo': 'gpt-3.5-turbo',
  'gpt-4o-coder': 'gpt-4o',
  'gpt-4-vision': 'gpt-4-turbo',
  'gpt-4o-128k': 'gpt-4o',
  'gpt-3.5-turbo-16k': 'gpt-3.5-turbo-16k',
  'gpt-4-32k': 'gpt-4-32k',
};

const GOOGLE_MODELS: Record<string, string> = {
  'gemini-1.5-pro': 'gemini-1.5-pro',
  'gemini-1.5-flash': 'gemini-1.5-flash',
  'gemini-1.0-pro': 'gemini-pro',
  'gemini-1.5-pro-vision': 'gemini-1.5-pro',
  'gemini-1.5-flash-8b': 'gemini-1.5-flash-8b',
  'gemini-ultra': 'gemini-1.5-pro',
  'gemini-nano': 'gemini-1.5-flash',
  'gemini-1.5-pro-exp': 'gemini-experimental',
  'gemini-flash-thinking': 'gemini-1.5-flash',
  'gemini-2.0-flash': 'gemini-2.0-flash',
};

const ANTHROPIC_MODELS: Record<string, string> = {
  'claude-3-5-sonnet': 'claude-3-5-sonnet-20241022',
  'claude-3-5-haiku': 'claude-3-5-haiku-20241022',
  'claude-3-opus': 'claude-3-opus-20240229',
  'claude-3-sonnet': 'claude-3-sonnet-20240229',
  'claude-3-haiku': 'claude-3-haiku-20240307',
  'claude-2-1': 'claude-2.1',
  'claude-2-0': 'claude-2.0',
  'claude-instant': 'claude-instant-1.2',
  'claude-3-opus-vision': 'claude-3-opus-20240229',
  'claude-3-5-sonnet-200k': 'claude-3-5-sonnet-20241022',
};

export async function POST(req: NextRequest) {
  try {
    const { messages, modelId } = await req.json();

    if (!modelId || typeof modelId !== 'string') {
      return NextResponse.json({ error: 'modelId requis' }, { status: 400 });
    }

    let result;

    if (OPENAI_MODELS[modelId]) {
      result = await streamText({
        model: openai(OPENAI_MODELS[modelId]),
        messages,
        system: 'Tu es AURA, un assistant IA premium, élégant et précis.',
      });
    } else if (GOOGLE_MODELS[modelId]) {
      result = await streamText({
        model: google(GOOGLE_MODELS[modelId]),
        messages,
        system: 'Tu es AURA, un assistant IA premium, élégant et précis.',
      });
    } else if (ANTHROPIC_MODELS[modelId]) {
      result = await streamText({
        model: anthropic(ANTHROPIC_MODELS[modelId]),
        messages,
        system: 'Tu es AURA, un assistant IA premium, élégant et précis.',
      });
    } else {
      return NextResponse.json({ error: 'Modèle inconnu' }, { status: 400 });
    }

    return result.toDataStreamResponse();

  } catch (error) {
    console.error('Erreur API chat:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
  }
