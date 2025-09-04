'use client';

import { useState, useRef, useEffect } from 'react';
import { useImageGeneration } from '@/hooks/useImageGeneration';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { FiDownload, FiSave, FiLoader, FiInfo, FiImage, FiShoppingCart } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/lib/cart-context';
import { Button } from './ui/button';
import { v4 as uuidv4 } from 'uuid';

const ASPECT_RATIOS = [
  { value: '1:1', label: 'Square (1:1)' },
  { value: '16:9', label: 'Wide (16:9)' },
  { value: '4:5', label: 'Portrait (4:5)' },
  { value: '9:16', label: 'Tall (9:16)' },
];

const STYLE_PRESETS = [
  { value: 'digital-art', label: '🎨 Digital Art' },
  { value: 'photographic', label: '📷 Photographic' },
  { value: 'anime', label: '🎌 Anime' },
  { value: 'comic-book', label: '🖍️ Comic Book' },
  { value: 'fantasy-art', label: '🧙 Fantasy Art' },
  { value: '3d-model', label: '🖥️ 3D Model' },
  { value: 'neon-punk', label: '🔮 Neon Punk' },
  { value: 'isometric', label: '🧊 Isometric' },
];

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [stylePreset, setStylePreset] = useState('digital-art');
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { generateImage, isLoading, error, imageUrl, reset } = useImageGeneration();
  const { dispatch } = useCart();
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Auto-focus the prompt input on mount
  useEffect(() => {
    const promptInput = document.getElementById('prompt');
    if (promptInput) promptInput.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setSaveError('Please enter a prompt');
      return;
    }
    
    try {
      await generateImage({
        prompt: `${prompt}${stylePreset === 'photographic' ? ', high quality, 8k, professional photography' : ''}`,
        aspect_ratio: aspectRatio,
        style_preset: stylePreset,
      });
      setSaveError(null);
    } catch (err) {
      console.error('Generation error:', err);
      setSaveError('Failed to generate image. Please try again.');
    }
  };

  const handleDownload = () => {
    if (!imageUrl) return;
    
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `ai-generated-${Date.now()}.webp`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRegenerate = () => {
    reset();
    setPrompt('');
  };

  const handleSaveToProfile = async () => {
    if (!imageUrl || !prompt) return;
    
    setIsSaving(true);
    setSaveError(null);
    
    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session?.user) {
        router.push('/auth/login');
        return;
      }

      const { data, error } = await supabase
        .from('designs')
        .insert([
          {
            user_id: session.user.id,
            image_url: imageUrl,
            prompt: prompt,
            style: stylePreset,
            price: 9.99,
            name: `Generated Design - ${new Date().toLocaleDateString()}`,
          },
        ])
        .select()
        .single();
      
      if (error) throw error;
      
      router.push(`/designs/${data.id}`);
    } catch (error) {
      console.error('Error saving design:', error);
      setSaveError('Failed to save design. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddToCart = async () => {
    if (!imageUrl || !prompt) return;
    
    setIsAddingToCart(true);
    
    try {
      const designId = uuidv4();
      
      dispatch({
        type: 'ADD_ITEM',
        payload: {
          id: designId,
          name: `Generated Design - ${new Date().toLocaleDateString()}`,
          image: imageUrl,
          price: 9.99,
          phoneModel: {
            id: 'custom',
            name: 'Custom Design',
            image: '/phone-placeholder.png',
            cases: [],
          },
          style: stylePreset,
          designId: designId,
        },
      });
      
      // Show success message
      // router.push('/cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          AI Image Generator
        </h1>
        <p className="mt-2 text-gray-600">
          Create stunning AI-generated images with just a few words
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left side: Input form */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
                Describe your image <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="A beautiful landscape with mountains and a lake at sunset, digital art, highly detailed, 8k"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 resize-none"
                  rows={4}
                  disabled={isLoading}
                  required
                />
                <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                  {prompt.length}/1000
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="style-preset" className="block text-sm font-medium text-gray-700 mb-2">
                  Style
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {STYLE_PRESETS.map((style) => (
                    <button
                      key={style.value}
                      type="button"
                      onClick={() => setStylePreset(style.value)}
                      className={`flex items-center justify-center py-2 px-3 text-sm rounded-md border transition-colors ${
                        stylePreset === style.value
                          ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                      disabled={isLoading}
                    >
                      {style.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-gray-700">Aspect Ratio</label>
                  <button
                    type="button"
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="text-xs text-indigo-600 hover:text-indigo-800"
                  >
                    {showAdvanced ? 'Hide options' : 'More options'}
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {ASPECT_RATIOS.map((ratio) => (
                    <button
                      key={ratio.value}
                      type="button"
                      onClick={() => setAspectRatio(ratio.value)}
                      className={`py-2 text-sm rounded-md border transition-colors ${
                        aspectRatio === ratio.value
                          ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                      disabled={isLoading}
                    >
                      {ratio.label}
                    </button>
                  ))}
                </div>
              </div>

              <AnimatePresence>
                {showAdvanced && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-2 space-y-4 border-t border-gray-200">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Negative Prompt (optional)
                        </label>
                        <input
                          type="text"
                          placeholder="blurry, low quality, text, watermark"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Guidance Scale
                        </label>
                        <input
                          type="range"
                          min="1"
                          max="20"
                          defaultValue="7"
                          className="w-full"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="pt-2">
              <div className="flex gap-2">
                {!imageUrl ? (
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                  >
                    {isLoading ? (
                      <>
                        <FiLoader className="animate-spin mr-2" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <FiImage className="mr-2" />
                        Generate Image
                      </>
                    )}
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={handleAddToCart}
                      disabled={isAddingToCart}
                      variant="outline"
                      className="flex-1"
                    >
                      {isAddingToCart ? (
                        <>
                          <FiLoader className="animate-spin mr-2" />
                          Adding...
                        </>
                      ) : (
                        <>
                          <FiShoppingCart className="mr-2" />
                          Add to Cart
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={handleSaveToProfile}
                      disabled={isSaving}
                      className="flex-1"
                    >
                      {isSaving ? (
                        <>
                          <FiLoader className="animate-spin mr-2" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <FiSave className="mr-2" />
                          Save
                        </>
                      )}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </form>

          <div className="mt-4 text-xs text-gray-500 flex items-center">
            <FiInfo className="mr-1 flex-shrink-0" />
            <span>Generated images may take a moment to process. Higher resolutions take longer.</span>
          </div>
        </div>

        {/* Right side: Image preview */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 h-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">Generated Image</h2>
            {imageUrl && (
              <div className="flex space-x-2">
                <button
                  onClick={handleDownload}
                  className="p-2 text-gray-500 hover:text-indigo-600 transition-colors"
                  title="Download"
                >
                  <FiDownload size={20} />
                </button>
                <button
                  onClick={handleSaveToProfile}
                  disabled={isSaving}
                  className="p-2 text-gray-500 hover:text-indigo-600 transition-colors disabled:opacity-50"
                  title="Save to profile"
                >
                  {isSaving ? <FiLoader className="animate-spin" size={20} /> : <FiSave size={20} />}
                </button>
              </div>
            )}
          </div>

          <div 
            className={`relative rounded-lg border-2 border-dashed ${
              imageUrl ? 'border-transparent' : 'border-gray-300'
            } bg-gray-50 flex items-center justify-center overflow-hidden transition-all duration-300`}
            style={{
              aspectRatio: aspectRatio.replace(':', '/')
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <AnimatePresence>
              {isLoading ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-5"
                >
                  <div className="text-center p-4">
                    <FiLoader className="animate-spin h-8 w-8 text-indigo-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Creating your masterpiece...</p>
                  </div>
                </motion.div>
              ) : imageUrl ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative w-full h-full"
                >
                  <img
                    src={imageUrl}
                    alt={prompt}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  {isHovered && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-8"
                    >
                      <p className="text-white text-sm line-clamp-2" title={prompt}>
                        {prompt}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center p-6"
                >
                  <FiImage className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No image generated yet</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Enter a prompt and click "Generate Image" to create something amazing!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {(error || saveError) && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-red-50 border-l-4 border-red-400 text-red-700 rounded-r"
            >
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm">{error || saveError}</p>
                </div>
              </div>
            </motion.div>
          )}

          {imageUrl && (
            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleRegenerate}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Generate New
              </button>
              <button
                onClick={handleDownload}
                className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FiDownload className="mr-2" />
                Download
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-12 max-w-3xl mx-auto">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Tips for better results</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: 'Be specific',
              description: 'Include details about style, colors, and composition.',
              icon: '🎯'
            },
            {
              title: 'Use adjectives',
              description: 'Words like "majestic," "serene," or "dramatic" help set the mood.',
              icon: '✨'
            },
            {
              title: 'Reference styles',
              description: 'Mention styles like "oil painting" or "minimalist" for better results.',
              icon: '🎨'
            }
          ].map((tip, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow border border-gray-100">
              <div className="text-2xl mb-2">{tip.icon}</div>
              <h4 className="font-medium text-gray-900">{tip.title}</h4>
              <p className="text-sm text-gray-600 mt-1">{tip.description}</p>
            </div>
          ))}
        </div>
      </div>

      {saveError && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {saveError}
        </div>
      )}

      {imageUrl && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Generated Image</h3>
          <div className="border rounded-md overflow-hidden">
            <img 
              src={imageUrl} 
              alt="Generated content" 
              className="w-full h-auto"
            />
          </div>
          <div className="mt-3 flex justify-between items-center">
            <a
              href={imageUrl}
              download={`generated-image-${Date.now()}.webp`}
              className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
            >
              Download Image
            </a>
            <button
              onClick={handleSaveToProfile}
              disabled={isSaving}
              className="px-4 py-1.5 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Saving...' : 'Save to Profile'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
