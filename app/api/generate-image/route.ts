import { NextResponse } from 'next/server';

export const runtime = 'edge';

// These will be used for MCP server calls
const SUPABASE_PROJECT_ID = 'adtrtyjglwxywusrwjlc'; // Your Supabase project ID

// Access the API key from environment variables
const STABILITY_API_KEY = process.env.NEXT_PUBLIC_STABILITY_API_KEY;

export async function POST(request: Request) {
  try {
    console.log('API Key:', STABILITY_API_KEY ? 'Found' : 'Not found');
    
    const { prompt, aspect_ratio = '1:1', style_preset = 'digital-art' } = await request.json();
    
    if (!prompt) {
      return new NextResponse('Prompt is required', { status: 400 });
    }

    if (!STABILITY_API_KEY) {
      console.error('NEXT_PUBLIC_STABILITY_API_KEY is not set in environment variables');
      return new NextResponse('Server configuration error: Missing API key', { status: 500 });
    }

    // Create form data for the request
    const formData = new FormData();
    formData.append('prompt', prompt);
    formData.append('aspect_ratio', aspect_ratio);
    formData.append('style_preset', style_preset);
    formData.append('output_format', 'webp');

    // Generate image using Stability AI
    const response = await fetch('https://api.stability.ai/v2beta/stable-image/generate/core', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${STABILITY_API_KEY}`,
        'Accept': 'image/*',
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Stability AI API error:', error);
      return new NextResponse('Failed to generate image: ' + error, { status: response.status });
    }

    // Convert image to buffer
    const imageBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(imageBuffer);
    
    // Generate a unique filename
    const timestamp = Date.now();
    const filename = `generated-${timestamp}.webp`;
    const contentType = 'image/webp';
    
    // For MCP, we'll use the service role key directly
    const filePath = `public/generated-${Date.now()}.webp`;
    
    // For MCP, we'll return the image directly without saving to storage
    // In a production environment, you would use the MCP server to handle the upload
    // and database operations
    
    // For now, we'll just return the image as base64
    const base64Image = buffer.toString('base64');
    const dataUrl = `data:${contentType};base64,${base64Image}`;

    return NextResponse.json({ 
      image: dataUrl,
      message: 'Image generated successfully'
    });

  } catch (error) {
    console.error('Image generation error:', error);
    return new NextResponse('Internal server error: ' + (error as Error).message, { status: 500 });
  }
}
