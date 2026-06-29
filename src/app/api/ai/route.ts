import { NextResponse } from 'next/server';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function POST(request: Request) {
  if (!OPENAI_API_KEY) {
    return NextResponse.json(
      { error: 'OPENAI_API_KEY is not configured. Set it in .env.local.' },
      { status: 500 }
    );
  }

  const body = await request.json();
  const prompt = typeof body.prompt === 'string' ? body.prompt.trim() : '';

  if (!prompt) {
    return NextResponse.json({ error: 'A prompt is required.' }, { status: 400 });
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful dashboard assistant that summarizes financial analytics in a concise manner.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 250,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    return NextResponse.json(
      { error: 'OpenAI request failed.', details: errorText },
      { status: response.status }
    );
  }

  const result = await response.json();
  const message = result?.choices?.[0]?.message?.content;

  return NextResponse.json({ text: message ?? 'No response returned from OpenAI.' });
}
