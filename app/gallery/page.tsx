"use client"

import { Navigation } from "@/components/navigation"
import { useState } from "react"
import { Search, Heart, ShoppingCart } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { toast } from "sonner"

export default function GalleryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const { dispatch } = useCart()

  const categories = [
    { id: "all", name: "All Designs" },
    { id: "abstract", name: "Abstract" },
    { id: "nature", name: "Nature" },
    { id: "geometric", name: "Geometric" },
    { id: "minimalist", name: "Minimalist" },
    { id: "vintage", name: "Vintage" },
  ]

  const designs = [
    {
      id: "1",
      name: "Sunset Mountains",
      category: "nature",
      price: 299,
      image: "/sunset.png",
      likes: 234,
    },
    {
      id: "2",
      name: "Abstract Waves",
      category: "abstract",
      price: 349,
      image: "/abstract.png",
      likes: 189,
    },
    {
      id: "3",
      name: "Geometric Pattern",
      category: "geometric",
      price: 279,
      image: "/geomatric.png",
      likes: 156,
    },
    {
      id: "4",
      name: "Minimal Lines",
      category: "minimalist",
      price: 249,
      image: "/minimalline.png",
      likes: 298,
    },
    {
      id: "5",
      name: "Vintage Floral",
      category: "vintage",
      price: 329,
      image: "/Vintage Floral.png",
      likes: 167,
    },
    {
      id: "6",
      name: "Ocean Depths",
      category: "nature",
      price: 319,
      image: "/Ocean Depth.png",
      likes: 203,
    },
  ]

  const filteredDesigns = designs.filter((design) => {
    const matchesSearch = design.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || design.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const addToCart = (design: any) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: design.id,
        name: design.name,
        price: design.price,
        image: design.image,
        phoneModel: {
          id: "universal",
          name: "Universal",
          image: "/placeholder.svg",
          cases: [],
          brand: "universal",
          model: "universal",
          modelName: "Universal",
          caseType: "standard"
        },
      },
    })
    toast.success("Added to cart!")
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-4 mx-auto">
            Design <span className="gradient-text">Gallery</span>
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Explore our collection of stunning phone case designs created by our community
          </p>
        </div>

        {/* Search and Filter */}
        <div className="modern-card p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="modern-input pl-12"
                placeholder="Search designs..."
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${
                    selectedCategory === category.id
                      ? "bg-brand-500 text-white shadow-medium"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDesigns.map((design, index) => (
            <div
              key={design.id}
              className="modern-card p-6 group animate-scale-in cursor-default"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-[3/4] bg-neutral-100 rounded-xl mb-4 overflow-hidden relative">
                <img
                  src={design.image || "/placeholder.svg"}
                  alt={design.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3">
                  <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-medium hover:shadow-large transition-all duration-300">
                    <Heart className="w-5 h-5 text-neutral-600" />
                  </button>
                </div>
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-sm font-medium text-neutral-700">{design.likes} likes</span>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-xl font-bold text-neutral-900 mb-2">{design.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-brand-600">₹{design.price}</span>
                  <span className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-full capitalize">
                    {design.category}
                  </span>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  addToCart(design)
                }}
                className="w-full premium-button flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {filteredDesigns.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-neutral-400" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">No designs found</h3>
            <p className="text-neutral-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}
