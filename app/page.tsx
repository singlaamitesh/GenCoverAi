"use client"

import Link from "next/link"
import {
  Sparkles,
  Smartphone,
  Truck,
  Shield,
  Star,
  ArrowRight,
  CheckCircle,
  Zap,
  Heart,
  Users,
  Award,
  Palette,
  Clock,
  Globe,
} from "lucide-react"
import { Navigation } from "@/components/navigation"

export default function HomePage() {
  const features = [
    {
      icon: Zap,
      title: "AI-Powered Design",
      description: "Advanced AI creates unique designs from your imagination in seconds",
      color: "from-brand-500 to-brand-600",
      gradient: "bg-gradient-to-br from-brand-50 to-brand-100",
    },
    {
      icon: Smartphone,
      title: "Perfect Fit Guarantee",
      description: "Precision-cut for 500+ phone models with perfect camera alignment",
      color: "from-accent-500 to-accent-600",
      gradient: "bg-gradient-to-br from-accent-50 to-accent-100",
    },
    {
      icon: Truck,
      title: "Lightning Fast Delivery",
      description: "Express delivery across India in 24-48 hours with live tracking",
      color: "from-success-500 to-success-600",
      gradient: "bg-gradient-to-br from-success-50 to-success-100",
    },
    {
      icon: Shield,
      title: "Military-Grade Protection",
      description: "Premium materials with 10ft drop protection and lifetime warranty",
      color: "from-warning-500 to-warning-600",
      gradient: "bg-gradient-to-br from-warning-50 to-warning-100",
    },
  ]

  const stats = [
    { number: "50K+", label: "Happy Customers", icon: Users },
    { number: "99.9%", label: "Satisfaction Rate", icon: Heart },
    { number: "500+", label: "Phone Models", icon: Smartphone },
    { number: "24hrs", label: "Avg Delivery", icon: Clock },
  ]

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Designer",
      rating: 5,
      comment:
        "Absolutely blown away by the quality! The AI understood exactly what I wanted. My phone case is a masterpiece!",
      avatar: "/placeholder.svg?height=60&width=60",
      location: "Mumbai",
    },
    {
      name: "Rahul Gupta",
      role: "Tech Enthusiast",
      rating: 5,
      comment: "Best investment ever! The protection is incredible and the design is unique. Got so many compliments!",
      avatar: "/placeholder.svg?height=60&width=60",
      location: "Delhi",
    },
    {
      name: "Sneha Patel",
      role: "Student",
      rating: 5,
      comment: "Fast delivery, amazing quality, and the customer service is top-notch. Highly recommend GenCover!",
      avatar: "/placeholder.svg?height=60&width=60",
      location: "Bangalore",
    },
  ]

  const designStyles = [
    {
      name: "Anime Style",
      image: "/Anime-Inspired iPhone 12 Pro Case.png"
    },
    {
      name: "Cosmic Design",
      image: "/Cosmic Deity iPhone Case Design.png"
    },
    {
      name: "Vibrant Collection",
      image: "/Vibrant Smartphone Case Collection.png"
    },
    {
      name: "Stargazer",
      image: "/Stargazer under the Milky Way.png"
    }
  ]

  const benefits = [
    "Free design revisions until perfect",
    "30-day money-back guarantee",
    "Lifetime warranty on all cases",
    "24/7 customer support",
    "Eco-friendly materials",
    "Express shipping included",
  ]

  const process = [
    {
      step: "01",
      title: "Describe Your Vision",
      description: "Tell our AI what you want - be as creative as you like!",
      icon: Palette,
    },
    {
      step: "02",
      title: "AI Creates Magic",
      description: "Watch as our AI generates multiple unique designs for you",
      icon: Sparkles,
    },
    {
      step: "03",
      title: "Choose & Customize",
      description: "Pick your favorite and customize it to perfection",
      icon: Heart,
    },
    {
      step: "04",
      title: "Fast Delivery",
      description: "Get your premium case delivered in 24-48 hours",
      icon: Truck,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Creative Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-50/50 via-white to-accent-50/30"></div>
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-brand-200/30 to-accent-200/30 rounded-full blur-3xl animate-float"></div>
          <div
            className="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-br from-accent-200/30 to-brand-200/30 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-brand-100/10 to-accent-100/10 rounded-full blur-3xl animate-pulse"></div>

          {/* Geometric Shapes */}
          <div
            className="absolute top-20 right-20 w-4 h-4 bg-brand-400/20 rounded-full animate-bounce"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-40 left-20 w-6 h-6 bg-accent-400/20 rounded-full animate-bounce"
            style={{ animationDelay: "3s" }}
          ></div>
          <div
            className="absolute top-1/3 right-1/3 w-2 h-2 bg-brand-500/30 rounded-full animate-ping"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-50 to-accent-50 text-brand-700 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-brand-100">
                <Sparkles className="w-4 h-4" />
                AI-Powered Design Technology
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold text-neutral-900 mb-6 leading-tight">
                Design Your
                <span className="gradient-text block">Perfect Phone Case</span>
              </h1>

              <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
                Transform your ideas into stunning, premium phone cases with our advanced AI technology. Get
                professional-quality protection with personalized style.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/generate" className="premium-button text-lg flex items-center justify-center gap-2">
                  <Zap className="w-5 h-5" />
                  Start Creating
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/gallery" className="secondary-button text-lg flex items-center justify-center gap-2">
                  <Palette className="w-5 h-5" />
                  Browse Gallery
                </Link>
              </div>

              <div className="flex items-center gap-6 text-sm text-neutral-500">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success-500" />2 Free Designs
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success-500" />
                  Free Shipping
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success-500" />
                  30-Day Guarantee
                </div>
              </div>
            </div>

            <div className="relative animate-float">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-400 to-accent-400 rounded-3xl blur-3xl opacity-20 animate-glow"></div>
                <div className="relative modern-card p-8">
                  <div className="grid grid-cols-2 gap-4">
                    {designStyles.map((style, i) => (
                      <div
                        key={i}
                        className="aspect-[3/4] bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-2xl overflow-hidden group hover:scale-105 transition-transform duration-300"
                      >
                        <img
                          src={style.image}
                          alt={style.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 text-center">
                    <p className="text-sm text-neutral-600 mb-2">✨ AI-Generated Designs</p>
                    <div className="flex justify-center">
                      <div className="flex -space-x-2">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star key={i} className="w-4 h-4 text-warning-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-neutral-900 to-neutral-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-brand-500 to-accent-500 rounded-xl mb-4">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold mb-1">{stat.number}</div>
                <div className="text-neutral-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="bg-gradient-to-br from-neutral-50 via-white to-brand-50/20"></div>
          <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-accent-100/30 to-brand-100/30 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-brand-100/30 to-accent-100/30 rounded-full blur-2xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Creating your perfect phone case is easier than ever with our AI-powered design process
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-brand-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-large">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-neutral-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">{step.title}</h3>
                <p className="text-neutral-600">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/generate" className="premium-button text-lg">
              Start Your Design Journey
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-5">
            <div className="absolute top-20 left-20 w-8 h-8 border-2 border-brand-300 rounded-full"></div>
            <div className="absolute top-40 right-40 w-6 h-6 border-2 border-accent-300 rounded-full"></div>
            <div className="absolute bottom-20 left-1/3 w-4 h-4 border-2 border-brand-300 rounded-full"></div>
            <div className="absolute bottom-40 right-20 w-10 h-10 border-2 border-accent-300 rounded-full"></div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
              Why Choose <span className="gradient-text">GenCover</span>?
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Experience the perfect blend of cutting-edge technology, premium quality, and exceptional service
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`${feature.gradient} p-8 rounded-3xl group animate-slide-up hover:scale-105 transition-all duration-300`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r ${feature.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-medium`}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">{feature.title}</h3>
                <p className="text-neutral-700 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 section-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-neutral-900 mb-6">
                Premium Experience, <span className="gradient-text">Guaranteed</span>
              </h2>
              <p className="text-xl text-neutral-600 mb-8">
                We're committed to delivering the best phone case experience with unmatched quality and service.
              </p>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CheckCircle className="w-5 h-5 text-success-500 flex-shrink-0" />
                    <span className="text-neutral-700 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link href="/about" className="secondary-button">
                  Learn More About Us
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-400 to-accent-400 rounded-3xl blur-3xl opacity-20"></div>
              <div className="relative modern-card p-8">
                <div className="text-center">
                  <Award className="w-16 h-16 text-brand-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-neutral-900 mb-2">Premium Quality Promise</h3>
                  <p className="text-neutral-600 mb-6">
                    Every case is crafted with precision and backed by our lifetime warranty
                  </p>
                  <div className="flex justify-center mb-4">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-6 h-6 text-warning-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-neutral-500">Rated 4.9/5 by 50,000+ customers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-6">
              Loved by <span className="gradient-text">Thousands</span>
            </h2>
            <p className="text-xl text-neutral-600">
              See what our customers are saying about their GenCover experience
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="modern-card p-8 animate-slide-up hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-warning-400 fill-current" />
                  ))}
                </div>

                <p className="text-neutral-700 mb-6 leading-relaxed italic">"{testimonial.comment}"</p>

                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-neutral-900">{testimonial.name}</p>
                    <p className="text-sm text-neutral-500">
                      {testimonial.role} • {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-brand-600 to-accent-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Ready to Create Your Masterpiece?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers and design your perfect phone case today. Start with 2 free designs!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/generate"
              className="bg-white text-brand-600 font-semibold py-4 px-8 rounded-xl shadow-large hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Start Creating Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/gallery"
              className="border-2 border-white text-white font-semibold py-4 px-8 rounded-xl hover:bg-white hover:text-brand-600 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Globe className="w-5 h-5" />
              Explore Gallery
            </Link>
          </div>

          <p className="text-white/80 text-sm mt-6">
            No credit card required • 2 free designs • 30-day money-back guarantee
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8 mb-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-brand-500 to-accent-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">GenCover</span>
              </div>
              <p className="text-neutral-400 mb-6 max-w-md">
                Creating premium, personalized phone cases with cutting-edge AI technology. Protecting your device while
                expressing your unique style.
              </p>
              <div className="flex gap-4">{/* Social media icons would go here */}</div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-neutral-400">
                <li>
                  <Link href="/generate" className="hover:text-white transition-colors">
                    Design Tool
                  </Link>
                </li>
                <li>
                  <Link href="/gallery" className="hover:text-white transition-colors">
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-neutral-400">
                <li>
                  <Link href="/help" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="hover:text-white transition-colors">
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="hover:text-white transition-colors">
                    Returns
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-neutral-800 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-neutral-400 text-sm">© 2024 GenCover. All rights reserved.</p>
            <div className="flex gap-6 text-sm text-neutral-400 mt-4 sm:mt-0">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
