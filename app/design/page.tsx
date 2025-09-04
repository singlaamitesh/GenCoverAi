'use client';

import { PhoneCoverGenerator } from '@/components/PhoneCoverGenerator';

export default function DesignPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl mx-auto">
            Design Your Phone Cover
          </h1>
          <p className="mt-5 max-w-2xl mx-auto text-xl text-gray-600">
            Create a custom phone cover design with AI. Describe your vision, choose a style, and get a unique design.
          </p>
        </div>
        
        <div className="mt-8">
          <PhoneCoverGenerator />
        </div>
      </div>
    </main>
  );
}
