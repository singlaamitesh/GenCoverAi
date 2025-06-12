import ImageGenerator from '@/components/ImageGenerator';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'AI Image Generator - Create Stunning Images',
  description: 'Generate beautiful AI-powered images with simple text prompts',
};

export default function GeneratePage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </div>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
            AI Image Generator
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Transform your ideas into stunning visuals with AI
          </p>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <ImageGenerator />
        </div>
        
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>Powered by Stability AI's Stable Image Core</p>
          <p className="mt-1">Each generation uses 3 credits</p>
        </div>
      </div>
    </main>
  );
}
