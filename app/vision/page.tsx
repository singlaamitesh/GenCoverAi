'use client';

import { LlamaVision } from '@/components/LlamaVision';

export default function VisionPage() {
  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Llama 3.2 Vision
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Interact with the Llama 3.2 Vision model. Upload an image and ask questions about it!
          </p>
        </div>
        
        <div className="mt-12">
          <LlamaVision />
        </div>
      </div>
    </main>
  );
}
