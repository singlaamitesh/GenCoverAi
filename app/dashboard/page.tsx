"use client"

import { useState, useEffect } from "react"
import { User, Package, Palette, LogOut, Search, ArrowLeft, CreditCard, MapPin, Trash2, ShoppingCart } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { supabase } from "@/lib/supabase/client"
import { signOut } from "@/hooks/useAuth"

type TabType = "designs" | "orders" | "profile"

interface Design {
  id: string
  image_url: string
  prompt: string | null
  created_at: string
  style: string
  price: number
  user_id: string
  name: string
  description?: string | null
  // Add saved property to match usage in the component
  saved?: boolean
}

interface OrderItem {
  id: string
  order_id: string
  design_id: string | null
  quantity: number
  price: number
  case_type: string
  phone_model: {
    brand: string
    model: string
  }
}

interface Order {
  id: string
  status: string
  total: number
  created_at: string
  user_id: string
  shipping_address: any
  payment_method: string
  payment_status: string
  order_items: OrderItem[]
  // Add legacy fields for backward compatibility
  coverImage?: string
  phoneModel?: string
  amount?: number
  createdAt?: string
}

interface Profile {
  full_name: string
  email: string
  avatar_url?: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<TabType>("designs")
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [designs, setDesigns] = useState<Design[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [filterStatus, setFilterStatus] = useState("all")
  const [cartItemCount, setCartItemCount] = useState(0)
  
  // Fetch cart items count from localStorage
  useEffect(() => {
    const updateCartCount = () => {
      if (typeof window !== 'undefined') {
        const cart = JSON.parse(localStorage.getItem('cart') || '{}')
        const count = Object.values(cart).reduce((total: number, item: any) => total + (item.quantity || 0), 0)
        setCartItemCount(count)
      }
    }
    
    // Initial count
    updateCartCount()
    
    // Listen for cart updates
    window.addEventListener('storage', updateCartCount)
    return () => window.removeEventListener('storage', updateCartCount)
  }, [])

  const handleBackToHome = () => {
    router.push('/')
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Get current user
        const { data: { session } } = await supabase.auth.getSession()

        if (!session?.user) {
          router.push('/auth/login')
          return
        }        // Fetch user profile
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()

        setProfile({
          full_name: profileData?.full_name || session.user.email?.split('@')[0] || 'User',
          email: session.user.email || '',
          avatar_url: profileData?.avatar_url
        })

        // Fetch user's designs
        const { data: designsData } = await supabase
          .from('designs')
          .select('*')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false })

        setDesigns(designsData || [])

        // Fetch user's orders
        const { data: ordersData } = await supabase
          .from('orders')
          .select(`
            *,
            order_items (*)
          `)
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false })

        setOrders(ordersData || [])
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        toast.error('Failed to load dashboard data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [router])

  // Filter designs based on search term and filter status
  const filteredDesigns = designs.filter((design) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      (design.prompt?.toLowerCase().includes(searchLower) ||
       design.style?.toLowerCase().includes(searchLower) ||
       design.name?.toLowerCase().includes(searchLower) ||
       false);
    
    const isRecent = design.created_at && 
      new Date(design.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    
    const matchesFilter = 
      filterStatus === "all" || 
      (filterStatus === "recent" && isRecent);
    
    return matchesSearch && matchesFilter;
  })

  const tabs = [
    { id: "designs", label: "My Designs", icon: Palette, emoji: "🎨" },
    { id: "orders", label: "My Orders", icon: Package, emoji: "📦" },
    { id: "profile", label: profile?.full_name || "Profile", icon: User, emoji: "👤" },
  ]

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-turmeric-100 text-turmeric-800"
      case "processing":
      case "in_progress":
        return "bg-royalblue-100 text-royalblue-800"
      case "shipped":
      case "in_transit":
        return "bg-peacock-100 text-peacock-800"
      case "delivered":
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusDisplayName = (status: string) => {
    if (!status) return 'Pending';
    return status
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  // Calculate total amount for orders
  const totalOrdersAmount = orders.reduce(
    (sum, order) => sum + (order?.total || 0), 
    0
  )

  // Filter orders based on status
  const filteredOrders = orders.filter((order) => {
    if (filterStatus === "all") return true
    return order.status.toLowerCase() === filterStatus.toLowerCase()
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  // Get first order item's phone model for display
  const getOrderPhoneModel = (order: Order) => {
    try {
      if (!order?.order_items?.length) return 'Phone Case';
      const item = order.order_items[0];
      if (!item) return 'Phone Case';
      
      // Handle case where phone_model is a string
      if (typeof item.phone_model === 'string') {
        return item.phone_model;
      }
      
      // Handle case where phone_model is an object with brand and model
      if (item.phone_model && typeof item.phone_model === 'object') {
        const phoneModel = item.phone_model as { brand?: string; model?: string };
        return [phoneModel.brand, phoneModel.model].filter(Boolean).join(' ');
      }
      
      return 'Phone Case';
    } catch (error) {
      console.error('Error getting phone model:', error);
      return 'Phone Case';
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push('/auth/login')
    } catch (error) {
      console.error('Error signing out:', error)
      toast.error('Failed to sign out')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-turmeric-50 via-peacock-50 to-royalblue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">My Dashboard</h1>
              <p className="text-gray-600">Manage your designs, orders, and profile</p>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => router.push('/cart')}
                className="relative p-2 text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {Math.min(cartItemCount, 9)}
                  </span>
                )}
              </button>
              <button
                onClick={handleBackToHome}
                className="flex items-center text-gray-600 hover:text-gray-900 bg-white px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </button>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-blue-50 text-blue-600 mr-4">
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Orders</p>
                  <p className="text-xl font-bold text-gray-800">{orders.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-green-50 text-green-600 mr-4">
                  <Palette className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Saved Designs</p>
                  <p className="text-xl font-bold text-gray-800">{designs.filter(d => d.saved).length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-purple-50 text-purple-600 mr-4">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Spent</p>
                  <p className="text-xl font-bold text-gray-800">₹{totalOrdersAmount}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl p-1 mb-8 shadow-sm border border-gray-100 animate-slide-up">
          <div className="flex flex-wrap gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.emoji}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in">
          {activeTab === "designs" && (
            <div className="space-y-6">
              {/* Search and Filter */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Search your designs..."
                    />
                  </div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="all">All Designs</option>
                    <option value="saved">Saved Only</option>
                    <option value="recent">Recent</option>
                  </select>
                </div>
              </div>

              {/* Orders Table */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Model</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {order.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex items-center">
                              <img 
                                src={order.coverImage} 
                                alt={order.phoneModel} 
                                className="w-10 h-10 rounded-md object-cover mr-3"
                              />
                              {order.phoneModel}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ₹{order.amount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                              order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-indigo-600 hover:text-indigo-900 mr-4">View</button>
                            <button className="text-gray-600 hover:text-gray-900">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {orders.length === 0 && (
                  <div className="text-center py-12 bg-gray-50">
                    <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No orders found</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="space-y-6">
              {/* Orders List */}
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="w-20 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={order.coverImage || "/placeholder.svg"}
                          alt="Order"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                          <h3 className="font-semibold text-gray-800">Order #{order.id}</h3>
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                              order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                              order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-2">{order.phoneModel}</p>
                        <p className="text-sm text-gray-500">
                          Ordered on {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                        </p>
                        <p className="text-lg font-semibold text-gray-900 mt-2">₹{order.amount}</p>
                        <div className="mt-4 flex gap-2">
                          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                            Track Order
                          </button>
                          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {orders.length === 0 && (
                  <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
                    <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No orders found</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile Settings</h2>
              <div className="space-y-6 max-w-2xl">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    defaultValue="user@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    defaultValue="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    defaultValue="+91 98765 43210"
                  />
                </div>
                <div className="pt-2">
                  <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:shadow-md transition-all">
                    Update Profile
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
