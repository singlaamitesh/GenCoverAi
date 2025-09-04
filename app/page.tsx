"use client"

import Link from "next/link"
import Image from "next/image"
import dynamic from "next/dynamic"
import {
  Shield,
  Truck,
  Star,
  CheckCircle,
  ArrowRight,
  Award,
  Users,
  Clock,
  Phone,
  Heart,
  Globe,
} from "lucide-react"

// Lazy load navigation for better performance
const Navigation = dynamic(() => import("@/components/navigation").then(mod => ({ default: mod.Navigation })), {
  loading: () => <div className="h-16 bg-white animate-pulse" />
})

export default function HomePage() {
  const features = [
    {
      icon: Shield,
      title: "Premium Protection",
      description: "Military-grade materials with 10ft drop protection and lifetime warranty",
    },
    {
      icon: Truck,
      title: "Free Shipping",
      description: "Free express delivery across India with real-time tracking",
    },
    {
      icon: Phone,
      title: "Perfect Fit",
      description: "Precision-cut for 500+ phone models with perfect camera alignment",
    },
  ]

  const stats = [
    { number: "50K+", label: "Happy Customers" },
    { number: "4.9/5", label: "Customer Rating" },
    { number: "24hrs", label: "Average Delivery" },
    { number: "500+", label: "Phone Models" },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "Mumbai",
      rating: 5,
      comment: "Excellent quality and fast delivery. The case fits perfectly and the protection is outstanding.",
    },
    {
      name: "Rajesh Kumar",
      location: "Delhi",
      rating: 5,
      comment: "Great customer service and premium quality. Will definitely order again for my next phone.",
    },
    {
      name: "Priya Patel",
      location: "Bangalore",
      rating: 5,
      comment: "Beautiful design and excellent protection. The case arrived quickly and was exactly as described.",
    },
  ]

  const benefits = [
    "30-day money-back guarantee",
    "Free shipping on all orders",
    "Lifetime warranty included",
    "Premium quality materials",
    "24/7 customer support",
    "Secure payment processing",
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 leading-tight">
                  Premium Phone Cases
                  <span className="block text-primary">Made Just for You</span>
                </h1>
                <p className="text-xl text-slate-600 max-w-lg">
                  Custom-designed phone cases with military-grade protection.
                  Choose from hundreds of designs or create your own unique style.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/generate" className="premium-button text-lg px-8 py-4 flex items-center justify-center gap-2">
                  Design Your Case
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/gallery" className="secondary-button text-lg px-8 py-4 flex items-center justify-center gap-2">
                  Browse Designs
                </Link>
              </div>

              <div className="flex items-center gap-8 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Free Shipping
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  30-Day Guarantee
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Lifetime Warranty
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="group">
                    <div className="bg-slate-100 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                      <Image
                        src="/Anime-Inspired iPhone 12 Pro Case.png"
                        alt="Anime Inspired Phone Case"
                        width={300}
                        height={192}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                        priority={true}
                      />
                    </div>
                  </div>
                  <div className="group">
                    <div className="bg-slate-100 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                      <Image
                        src="/Cosmic Deity iPhone Case Design.png"
                        alt="Cosmic Deity Phone Case"
                        width={300}
                        height={192}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                        priority={true}
                      />
                    </div>
                  </div>
                  <div className="group">
                    <div className="bg-slate-100 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                      <Image
                        src="/Stargazer under the Milky Way.png"
                        alt="Stargazer Phone Case"
                        width={300}
                        height={192}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                        priority={true}
                      />
                    </div>
                  </div>
                  <div className="group">
                    <div className="bg-slate-100 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                      <Image
                        src="/Vibrant Smartphone Case Collection.png"
                        alt="Vibrant Phone Case Collection"
                        width={300}
                        height={192}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                        priority={true}
                      />
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-slate-600 font-medium text-lg">Premium Quality Assured</p>
                  <div className="flex justify-center mt-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold mb-2">{stat.number}</div>
                <div className="text-slate-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Why Choose Our Phone Cases?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Premium quality, perfect protection, and exceptional service
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
                Trusted by Thousands of Customers
              </h2>
              <p className="text-xl text-slate-600 mb-8">
                We're committed to delivering the best phone case experience with unmatched quality and service.
              </p>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-slate-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="text-center">
                <Award className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Quality Guarantee</h3>
                <p className="text-slate-600 mb-6">
                  Every case is crafted with precision and backed by our comprehensive warranty
                </p>
                <div className="flex justify-center mb-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-slate-500">Rated 4.9/5 by 50,000+ customers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-slate-600">
              Real reviews from real customers
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-slate-50 rounded-lg p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                <p className="text-slate-700 mb-6 leading-relaxed">"{testimonial.comment}"</p>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-slate-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{testimonial.name}</p>
                    <p className="text-sm text-slate-500">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Find Your Perfect Case?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of satisfied customers and get premium protection for your phone today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/generate"
              className="bg-white text-primary font-semibold py-4 px-8 rounded-md hover:bg-slate-50 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              Start Designing
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/gallery"
              className="border-2 border-white text-white font-semibold py-4 px-8 rounded-md hover:bg-white hover:text-primary transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Globe className="w-5 h-5" />
              View Gallery
            </Link>
          </div>

          <p className="text-sm mt-6 opacity-75">
            Free shipping • 30-day guarantee • Lifetime warranty
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8 mb-8">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">GenCover</span>
              </div>
              <p className="text-slate-400 mb-4 max-w-md">
                Premium custom phone cases with military-grade protection.
                Trusted by thousands of customers worldwide.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-slate-400">
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
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="hover:text-white transition-colors">
                    Shipping
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

          <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">© 2024 GenCover. All rights reserved.</p>
            <div className="flex gap-6 text-sm text-slate-400 mt-4 sm:mt-0">
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
