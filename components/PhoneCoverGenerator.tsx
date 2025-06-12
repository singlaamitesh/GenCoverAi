'use client';

import { useState } from 'react';
import { useCoverGenerator } from '@/hooks/useCoverGenerator';

export function PhoneCoverGenerator() {
  const [designPrompt, setDesignPrompt] = useState('');
  const [style, setStyle] = useState('minimalist');
  const [colorScheme, setColorScheme] = useState('vibrant');
  
  const { generateCover, isGenerating, error, result } = useCoverGenerator({
    onSuccess: (data) => {
      console.log('Cover generated successfully:', data);
    },
    onError: (error) => {
      console.error('Error generating cover:', error);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!designPrompt.trim()) return;
    
    try {
      await generateCover({
        prompt: designPrompt,
        style,
        colorScheme,
      });
    } catch (err) {
      console.error('Error in handleSubmit:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Generate Custom Phone Cover Design
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="designPrompt" className="block text-sm font-medium text-gray-700 mb-2">
            Describe your ideal phone cover design
          </label>
          <textarea
            id="designPrompt"
            value={designPrompt}
            onChange={(e) => setDesignPrompt(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={4}
            placeholder="E.g., A mountain landscape at sunset with a geometric pattern overlay"
            disabled={isGenerating}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="style" className="block text-sm font-medium text-gray-700 mb-2">
              Design Style
            </label>
            <select
              id="style"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={isGenerating}
            >
              <option value="minimalist">Minimalist</option>
              <option value="abstract">Abstract</option>
              <option value="geometric">Geometric</option>
              <option value="watercolor">Watercolor</option>
              <option value="photographic">Photographic</option>
              <option value="illustrated">Illustrated</option>
            </select>
          </div>

          <div>
            <label htmlFor="colorScheme" className="block text-sm font-medium text-gray-700 mb-2">
              Color Scheme
            </label>
            <select
              id="colorScheme"
              value={colorScheme}
              onChange={(e) => setColorScheme(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={isGenerating}
            >
              <option value="vibrant">Vibrant</option>
              <option value="pastel">Pastel</option>
              <option value="monochrome">Monochrome</option>
              <option value="earthy">Earthy Tones</option>
              <option value="neon">Neon</option>
              <option value="gradient">Gradient</option>
            </select>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isGenerating || !designPrompt.trim()}
            className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-colors
              ${isGenerating || !designPrompt.trim()
                ? 'bg-blue-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
              }`}
          >
            {isGenerating ? 'Generating...' : 'Generate Cover Design'}
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-400 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                Error: {error.message}
              </p>
            </div>
          </div>
        </div>
      )}

      {result && (
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Generated Design</h3>
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-500 mb-2">Design Prompt</h4>
              <p className="text-gray-700 whitespace-pre-line">{result.prompt}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">Design Description</h4>
              <p className="text-gray-700 whitespace-pre-line">{result.description}</p>
            </div>

            <div className="mt-8 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    Note: This is a text-based description. For actual image generation, consider integrating with a dedicated image generation model like Stable Diffusion or DALL-E.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PhoneCoverGenerator;
