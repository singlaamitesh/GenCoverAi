import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { prompt, image } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Ollama API endpoint (running locally)
    const ollamaUrl = 'http://localhost:11434/api/generate';
    
    const response = await fetch(ollamaUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3.2-vision',
        prompt: prompt,
        images: image ? [image] : undefined,
        stream: false,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Ollama API error:', error);
      return NextResponse.json(
        { error: 'Failed to get response from LLM' },
        { status: 500 }
      );
    }

    const data = await response.json();
    return NextResponse.json({ response: data.response });
    
  } catch (error) {
    console.error('Error in LLM API route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
