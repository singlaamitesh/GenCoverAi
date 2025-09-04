import { Navigation } from "@/components/navigation"
import { Zap, Shield, Heart, Target } from "lucide-react"

export default function AboutPage() {
  const values = [
    {
      icon: Zap,
      title: "Innovation",
      description: "Pushing the boundaries of AI-powered design technology",
    },
    {
      icon: Shield,
      title: "Quality",
      description: "Premium materials and craftsmanship in every product",
    },
    {
      icon: Heart,
      title: "Customer First",
      description: "Your satisfaction is our top priority",
    },
    {
      icon: Target,
      title: "Precision",
      description: "Perfect fit and finish for every phone model",
    },
  ]

  const team = [
    {
      name: "Amitesh Gupta",
      role: "CEO & Founder",
      image: "/2AF91BED-65EC-456B-8133-7ED5CD81794C_1_105_c.jpeg?height=300&width=300",
      bio: "Passionate about combining technology with creativity",
    },
    
    {
      name: "Amitesh Gupta",
      role: "CTO",
      image: "/2AF91BED-65EC-456B-8133-7ED5CD81794C_1_105_c.jpeg?height=300&width=300",
      bio: "Building the future of personalized manufacturing",
    },
  ]

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6 mx-auto">
            About <span className="gradient-text">GenCover</span>
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            We're revolutionizing phone case design with cutting-edge AI technology, making personalized protection
            accessible to everyone across India.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-neutral-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-neutral-600 leading-relaxed">
              <p>
                Founded in 2024, GenCover started with a simple vision: to democratize custom design and make
                personalized phone protection accessible to everyone.
              </p>
              <p>
                Our team of designers, engineers, and AI specialists came together to create the most advanced phone
                case customization platform in India, combining cutting-edge technology with premium manufacturing.
              </p>
              <p>
                Today, we're proud to serve thousands of customers across India, delivering unique, high-quality phone
                cases that reflect individual style and personality.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-brand-100 to-accent-100 rounded-3xl overflow-hidden">
              <img src="/Gemini_Generated_Image_tfvdhjtfvdhjtfvd.png?height=500&width=500" alt="Our story" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-neutral-900 mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="modern-card p-6 text-center animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-brand-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">{value.title}</h3>
                <p className="text-neutral-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-neutral-900 mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="modern-card p-6 text-center animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-32 h-32 bg-neutral-100 rounded-full mx-auto mb-4 overflow-hidden">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-1">{member.name}</h3>
                <p className="text-brand-600 font-medium mb-3">{member.role}</p>
                <p className="text-neutral-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="modern-card p-12 text-center">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8">Our Impact</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold text-brand-600 mb-2">50K+</div>
              <div className="text-neutral-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-brand-600 mb-2">100K+</div>
              <div className="text-neutral-600">Designs Created</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-brand-600 mb-2">500+</div>
              <div className="text-neutral-600">Phone Models</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-brand-600 mb-2">99.9%</div>
              <div className="text-neutral-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
