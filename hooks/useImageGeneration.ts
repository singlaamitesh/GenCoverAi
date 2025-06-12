import { useState, useCallback } from 'react';

interface ImageGenerationOptions {
  prompt: string;
  aspect_ratio?: string;
  style_preset?: string;
}

export const useImageGeneration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const generateImage = useCallback(async (options: ImageGenerationOptions) => {
    const { prompt, aspect_ratio = '1:1', style_preset = 'digital-art' } = options;
    
    if (!prompt.trim()) {
      setError('Prompt is required');
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          aspect_ratio,
          style_preset,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate image');
      }

      const data = await response.json();
      setImageUrl(data.image);
      return data.image;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    generateImage,
    isLoading,
    error,
    imageUrl,
    reset: () => {
      setImageUrl(null);
      setError(null);
    },
  };
};
