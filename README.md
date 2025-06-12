# 🎨 GenCover AI - AI-Powered Phone Case Design

Transform your ideas into stunning, custom phone cases with the power of AI. GenCover AI allows you to generate unique designs, customize them, and order high-quality phone cases with just a few clicks.

![GenCover AI Banner](public/Anime-Inspired%20iPhone%2012%20Pro%20Case.png)

## ✨ Features

- 🎨 AI-Generated Designs: Create unique phone case designs using text prompts
- 🖼️ Multiple Style Presets: Choose from various artistic styles
- 📱 Phone Model Support: Select from a range of phone models
- 🛒 E-commerce Integration: Seamless cart and checkout experience
- 🔐 User Authentication: Secure user accounts and order history
- ⚡ Fast & Responsive: Built with Next.js for optimal performance

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/singlaamitesh/GenCoverAi.git
   cd GenCoverAi
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Update the `.env.local` file with your API keys and configuration.

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Tech Stack

### Core Technologies
- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Shadcn/UI
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **State Management**: React Context API
- **Form Handling**: React Hook Form
- **Deployment**: Vercel (recommended)

### AI & Machine Learning
- **Image Generation**: Stability AI's Stable Image Core
  - High-quality image generation from text prompts
  - Multiple style presets and aspect ratios
  - Fast inference with enterprise-grade reliability

### Backend Services
- **API Routes**: Next.js API Routes
- **Image Processing**: Custom image manipulation pipeline
- **Database**: Supabase PostgreSQL with real-time subscriptions

### Development Tools
- **Type Safety**: TypeScript
- **Code Quality**: ESLint, Prettier
- **Version Control**: Git & GitHub
- **Package Manager**: npm / yarn

## 📁 Project Structure

```
.
├── app/                    # App router pages and API routes
├── components/             # Reusable UI components
├── lib/                    # Utility functions and configurations
├── public/                 # Static files
├── styles/                 # Global styles
└── types/                  # TypeScript type definitions
```

## 🔒 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
# Add other required API keys
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Supabase](https://supabase.com/) for backend services
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Shadcn/UI](https://ui.shadcn.com/) for beautiful components

---

<p align="center">
  Made with ❤️ by Your Name | <a href="https://github.com/singlaamitesh">GitHub</a>
</p>