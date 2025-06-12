import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { prompt, style = 'minimalist', colorScheme = 'vibrant' } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Enhanced prompt for phone cover design
    const enhancedPrompt = `Create a high-quality phone cover design with the following specifications:
    - Style: ${style}
    - Color Scheme: ${colorScheme}
    - Design Elements: ${prompt}
    - Include space for camera cutouts
    - Ensure the design is visually appealing and suitable for a phone cover
    - Use high contrast for better visibility
    - Make sure the design is centered and properly scaled for a phone cover`;

    // Ollama API endpoint for text generation (we'll use this to get a description)
    // Note: For actual image generation, you might want to use a dedicated image generation model
    const ollamaUrl = 'http://localhost:11434/api/generate';
    
    const response = await fetch(ollamaUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3.2-vision',
        prompt: `Generate a detailed description of a phone cover design based on: ${enhancedPrompt}`,
        stream: false,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Image generation error:', error);
      return NextResponse.json(
        { error: 'Failed to generate image description' },
        { status: 500 }
      );
    }

    const data = await response.json();
    return NextResponse.json({ 
      description: data.response,
      prompt: enhancedPrompt,
      message: 'For actual image generation, consider integrating with a dedicated image generation model like Stable Diffusion or DALL-E.'
    });
    
  } catch (error) {
    console.error('Error in image generation:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
