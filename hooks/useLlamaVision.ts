import { useState, useCallback } from 'react';

interface UseLlamaVisionProps {
  onSuccess?: (response: string) => void;
  onError?: (error: Error) => void;
}

export function useLlamaVision({ onSuccess, onError }: UseLlamaVisionProps = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const generateResponse = useCallback(
    async (prompt: string, imageBase64?: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/llama', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt,
            image: imageBase64,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to get response from LLM');
        }

        const data = await response.json();
        onSuccess?.(data.response);
        return data.response;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('An unknown error occurred');
        setError(error);
        onError?.(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [onSuccess, onError]
  );

  return { generateResponse, isLoading, error };
}
