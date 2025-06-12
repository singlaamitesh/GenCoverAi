export const STABILITY_API_KEY = process.env.NEXT_PUBLIC_STABILITY_API_KEY;

if (!STABILITY_API_KEY) {
  console.warn('STABILITY_API_KEY is not set. Image generation will not work.');
}

export const STABILITY_API_ENDPOINT = 'https://api.stability.ai/v2beta/stable-image/generate/core';

export const STYLE_PRESETS = [
  { value: 'digital-art', label: 'Digital Art' },
  { value: 'photographic', label: 'Photographic' },
  { value: 'anime', label: 'Anime' },
  { value: 'comic-book', label: 'Comic Book' },
  { value: 'fantasy-art', label: 'Fantasy Art' },
  { value: '3d-model', label: '3D Model' },
  { value: 'analog-film', label: 'Analog Film' },
  { value: 'cinematic', label: 'Cinematic' },
  { value: 'enhance', label: 'Enhanced' },
  { value: 'isometric', label: 'Isometric' },
  { value: 'line-art', label: 'Line Art' },
  { value: 'low-poly', label: 'Low Poly' },
  { value: 'modeling-compound', label: 'Modeling Compound' },
  { value: 'neon-punk', label: 'Neon Punk' },
  { value: 'origami', label: 'Origami' },
  { value: 'pixel-art', label: 'Pixel Art' },
  { value: 'tile-texture', label: 'Tile Texture' },
];

export const ASPECT_RATIOS = [
  { value: '1:1', label: 'Square (1:1)' },
  { value: '16:9', label: 'Wide (16:9)' },
  { value: '4:5', label: 'Portrait (4:5)' },
  { value: '9:16', label: 'Tall (9:16)' },
  { value: '2:3', label: 'Portrait (2:3)' },
  { value: '3:2', label: 'Landscape (3:2)' },
  { value: '21:9', label: 'Ultrawide (21:9)' },
  { value: '9:21', label: 'Ultrawide Tall (9:21)' },
];
