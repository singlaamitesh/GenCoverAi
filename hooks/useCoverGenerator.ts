import { useState, useCallback } from 'react';

interface CoverGenerationOptions {
  style?: string;
  colorScheme?: string;
  prompt: string;
}

interface UseCoverGeneratorProps {
  onSuccess?: (result: { description: string; prompt: string }) => void;
  onError?: (error: Error) => void;
}

export function useCoverGenerator({ onSuccess, onError }: UseCoverGeneratorProps = {}) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [result, setResult] = useState<{ description: string; prompt: string } | null>(null);

  const generateCover = useCallback(
    async ({ style = 'minimalist', colorScheme = 'vibrant', prompt }: CoverGenerationOptions) => {
      setIsGenerating(true);
      setError(null);

      try {
        const response = await fetch('/api/generate-cover', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt,
            style,
            colorScheme,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to generate cover');
        }

        const data = await response.json();
        setResult({
          description: data.description,
          prompt: data.prompt,
        });
        onSuccess?.({
          description: data.description,
          prompt: data.prompt,
        });
        return data;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to generate cover');
        setError(error);
        onError?.(error);
        throw error;
      } finally {
        setIsGenerating(false);
      }
    },
    [onSuccess, onError]
  );

  return { generateCover, isGenerating, error, result };
}
