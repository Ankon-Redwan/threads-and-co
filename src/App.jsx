import React, { useState, useMemo, useEffect } from "react";
import {
  ShoppingCart,
  Search,
  X,
  Check,
  Menu,
  ShieldAlert,
  Package,
  Phone,
  MapPin,
  Clock,
  ArrowLeft,
  Heart,
  SlidersHorizontal,
  Tag,
  ChevronDown,
  Lock,
  LogOut,
} from "lucide-react";

const PRODUCTS = [
  {
    id: 1,
    name: "প্রিমিয়াম কটন পাঞ্জাবি - নেভি ব্লু",
    category: "panjabi",
    categoryName: "পাঞ্জাবি",
    price: 2450,
    originalPrice: 2950,
    rating: 4.8,
    reviews: 42,
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["#1e293b", "#0f172a"],
    image:
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800",
    description:
      "১০০% প্রিমিয়াম সুতি কাপড়ে তৈরি আভিজাত্যপূর্ণ ডিজাইনের পাঞ্জাবি। ঈদ, উৎসব বা বিশেষ অনুষ্ঠানের জন্য মানানসই।",
    fabric: "১০০% কটন",
  },
  {
    id: 2,
    name: "রেশমি জামদানি শাড়ি - রয়েল ব্লু",
    category: "saree",
    categoryName: "শাড়ি",
    price: 4800,
    originalPrice: 5500,
    rating: 4.9,
    reviews: 38,
    sizes: ["Free Size"],
    colors: ["#1d4ed8", "#1e40af"],
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800",
    description:
      "ঐতিহ্যবাহী জামদানি নকশায় হাতে বোনা অভিজাত শাড়ি। যেকোনো বিশেষ আয়োজনে আপনাকে অনন্য করে তুলবে।",
    fabric: "হাফ-সিল্ক জামদানি",
  },
  {
    id: 3,
    name: "ক্যাজুয়াল ফুল স্লিভ শার্ট - অলিভ গ্রিন",
    category: "shirt",
    categoryName: "শার্ট",
    price: 1350,
    originalPrice: 1650,
    rating: 4.6,
    reviews: 29,
    sizes: ["S", "M", "L", "XL"],
    colors: ["#3f6212", "#15803d"],
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=800",
    description:
      "স্মার্ট ও আরামদায়ক ক্যাজুয়াল শার্ট। অফিসিয়াল কিংবা বন্ধুদের সাথে আড্ডায় ব্যবহারের জন্য উপযুক্ত।",
    fabric: "কটন অক্সফোর্ড",
  },
  {
    id: 4,
    name: "এমব্রয়ডারি ডিজাইন থ্রি-পিস - মেরুন",
    category: "salwar-kameez",
    categoryName: "থ্রি-পিস",
    price: 3200,
    originalPrice: 3800,
    rating: 4.7,
    reviews: 51,
    sizes: ["M", "L", "XL"],
    colors: ["#881337", "#9f1239"],
    image:
      "https://images.unsplash.com/photo-1583391733975-f09b30c14bc2?auto=format&fit=crop&q=80&w=800",
    description:
      "আকর্ষণীয় এমব্রয়ডারি ওয়ার্ক সহ সুতি ড্রেস ও নেট ওড়না। আরামদায়ক ও ট্রেন্ডি ডিজাইন।",
    fabric: "প্রিমিয়াম কটন",
  },
  {
    id: 5,
    name: "সিম্পল এ-লাইন কার্টি কুর্ভি - হোয়াইট",
    category: "kurti",
    categoryName: "কুর্তি",
    price: 1250,
    originalPrice: 1500,
    rating: 4.5,
    reviews: 19,
    sizes: ["S", "M", "L"],
    colors: ["#ffffff", "#f3f4f6"],
    image:
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800",
    description:
      "দৈনন্দিন ব্যবহারের জন্য হালকা ও পাতলা সুতি কাপড়ের চমৎকার ডিজাইনের কুর্তি।",
    fabric: "লিনেন কটন",
  },
  {
    id: 6,
    name: "প্রিমিয়াম কাবলি সেট - ব্ল্যাক",
    category: "panjabi",
    categoryName: "পাঞ্জাবি",
    price: 3100,
    originalPrice: 3600,
    rating: 4.9,
    reviews: 64,
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["#000000"],
    image:
      "https://images.unsplash.com/photo-1583391733975-f09b30c14bc2?auto=format&fit=crop&q=80&w=800",
    description:
      "রয়্যাল লুক ও ক্লাসি ফিনিশিং এর কাবলি সেট। সাথে রয়েছে ম্যাচিং পায়জামা।",
    fabric: "সফট ওয়াশ কটন",
  },
];

export default function App() {
  const [viewMode, setViewMode] = useState("shop");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [shippingLocation, setShippingLocation] = useState("inside-dhaka");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Admin Auth States
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Sort & Size Filter States
  const [sortBy, setSortBy] = useState("default");
  const [selectedSizeFilter, setSelectedSizeFilter] = useState("all");

  // Coupon Code States
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");

  // Customer Form States
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [bkashTrxId, setBkashTrxId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Admin Dashboard States
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  useEffect(() => {
    if (viewMode === "admin" && isAdminLoggedIn) {
      fetchOrders();
    }
  }, [viewMode, isAdminLoggedIn]);

  const fetchOrders = async () => {
    setLoadingOrders(true);
    try {
      const response = await fetch("http://localhost:5000/api/orders");
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleAdminAccess = () => {
    if (isAdminLoggedIn) {
      setViewMode("admin");
    } else {
      setShowLoginModal(true);
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // ডিফল্ট পাসওয়ার্ড: admin123
    if (adminPassword === "admin123") {
      setIsAdminLoggedIn(true);
      setShowLoginModal(false);
      setAdminPassword("");
      setLoginError("");
      setViewMode("admin");
    } else {
      setLoginError("ভুল পাসওয়ার্ড! আবার চেষ্টা করুন।");
    }
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setViewMode("shop");
  };

  const toggleWishlist = (product) => {
    if (wishlist.some((item) => item.id === product.id)) {
      setWishlist(wishlist.filter((item) => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const filteredProducts = useMemo(() => {
    let result = PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesSize =
        selectedSizeFilter === "all" ||
        product.sizes.includes(selectedSizeFilter);
      return matchesCategory && matchesSearch && matchesSize;
    });

    if (sortBy === "low-to-high") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "high-to-low") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [selectedCategory, searchQuery, selectedSizeFilter, sortBy]);

  const addToCart = (product, size) => {
    const chosenSize = size || product.sizes[0];
    const existingIndex = cart.findIndex(
      (item) => item.id === product.id && item.selectedSize === chosenSize,
    );

    if (existingIndex > -1) {
      const updatedCart = [...cart];
      updatedCart[existingIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, selectedSize: chosenSize, quantity: 1 }]);
    }
    setIsCartOpen(true);
    setQuickViewProduct(null);
  };

  const updateQuantity = (id, selectedSize, delta) => {
    setCart(
      cart
        .map((item) => {
          if (item.id === id && item.selectedSize === selectedSize) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean),
    );
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError("");
    if (
      couponCode.toUpperCase() === "EID2026" ||
      couponCode.toUpperCase() === "THREADS10"
    ) {
      const discountAmount = Math.round(subtotal * 0.1);
      setDiscount(discountAmount);
      setCouponApplied(true);
    } else {
      setCouponError("অবৈধ কুপন কোড! (চেষ্টা করুন: EID2026)");
    }
  };

  const shippingCost =
    cart.length === 0 ? 0 : shippingLocation === "inside-dhaka" ? 80 : 150;
  const totalAmount = Math.max(0, subtotal - discount + shippingCost);

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    if (!customerName || !customerPhone || !customerAddress) {
      alert("অনুগ্রহ করে আপনার নাম, মোবাইল নম্বর এবং ঠিকানা পূরণ করুন।");
      return;
    }

    if (paymentMethod === "bkash" && !bkashTrxId) {
      alert("অনুগ্রহ করে বিকাশ Transaction ID প্রদান করুন।");
      return;
    }

    setIsSubmitting(true);

    const orderData = {
      customerName,
      phone: customerPhone,
      address: customerAddress,
      items: cart,
      subtotal,
      discount,
      totalAmount,
      shippingLocation,
      paymentMethod,
      bkashTrxId: paymentMethod === "bkash" ? bkashTrxId : "N/A",
    };

    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (data.success) {
        setOrderPlaced(true);
        setCart([]);
        setCustomerName("");
        setCustomerPhone("");
        setCustomerAddress("");
        setBkashTrxId("");
        setDiscount(0);
        setCouponApplied(false);
        setCouponCode("");
      } else {
        alert("অর্ডার সেভ করতে সমস্যা হয়েছে!");
      }
    } catch (error) {
      console.error("API Error:", error);
      setOrderPlaced(true);
      setCart([]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <div className="bg-emerald-900 text-white text-xs sm:text-sm py-2 px-4 text-center font-medium flex justify-between items-center max-w-7xl mx-auto">
        <span>
          🎉 ১০% ডিসকাউন্ট পেতে কুপন কোড ব্যবহার করুন:{" "}
          <span className="font-extrabold text-yellow-300">EID2026</span>
        </span>
        <span className="hidden md:inline">📞 হটলাইন: +৮৮০ ১৭০০ ০০০০০০</span>
      </div>

      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900"
            >
              <Menu className="w-6 h-6" />
            </button>

            <span
              onClick={() => {
                setViewMode("shop");
                setSelectedCategory("all");
              }}
              className="text-2xl font-black text-emerald-900 tracking-tight cursor-pointer"
            >
              Threads<span className="text-emerald-600">&</span>Co.
            </span>
          </div>

          <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
            <input
              type="text"
              placeholder="পছন্দের কাপড় সার্চ করুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2 text-slate-700 hover:text-red-600 transition"
              title="পছন্দের তালিকা"
            >
              <Heart className="w-6 h-6" />
              {wishlist.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-slate-700 hover:text-emerald-700 transition"
            >
              <ShoppingCart className="w-6 h-6" />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 bg-emerald-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cart.reduce((a, c) => a + c.quantity, 0)}
                </span>
              )}
            </button>

            <button
              onClick={handleAdminAccess}
              className="flex items-center space-x-1 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg transition font-medium border"
            >
              <ShieldAlert className="w-4 h-4 text-emerald-800" />
              <span className="hidden sm:inline">অ্যাডমিন</span>
            </button>
          </div>
        </div>

        <nav className="bg-slate-900 text-white text-sm hidden md:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center space-x-8 h-11">
            <button
              onClick={() => {
                setViewMode("shop");
                setSelectedCategory("all");
              }}
              className={`hover:text-emerald-400 font-bold ${viewMode === "shop" && selectedCategory === "all" ? "text-emerald-400" : ""}`}
            >
              হোম
            </button>

            <div className="relative group">
              <button className="flex items-center space-x-1 hover:text-emerald-400 font-bold py-2">
                <span>কাপড়ের ক্যাটাগরি</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              <div className="absolute left-0 top-full hidden group-hover:block bg-white text-slate-800 shadow-xl rounded-b-lg border w-48 py-2 z-40">
                {[
                  { id: "panjabi", name: "পাঞ্জাবি" },
                  { id: "saree", name: "শাড়ি" },
                  { id: "shirt", name: "শার্ট" },
                  { id: "salwar-kameez", name: "থ্রি-পিস" },
                  { id: "kurti", name: "কুর্তি" },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setViewMode("shop");
                      setSelectedCategory(cat.id);
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-semibold hover:bg-emerald-50 hover:text-emerald-800"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setViewMode("about")}
              className={`hover:text-emerald-400 font-bold ${viewMode === "about" ? "text-emerald-400" : ""}`}
            >
              আমাদের সম্পর্কে
            </button>
            <button
              onClick={() => setViewMode("contact")}
              className={`hover:text-emerald-400 font-bold ${viewMode === "contact" ? "text-emerald-400" : ""}`}
            >
              যোগাযোগ
            </button>
            <button
              onClick={() => setViewMode("policy")}
              className={`hover:text-emerald-400 font-bold ${viewMode === "policy" ? "text-emerald-400" : ""}`}
            >
              রিটার্ন ও পলিসি
            </button>
          </div>
        </nav>
      </header>

      {/* Admin Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-3">
              <Lock className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold text-center text-slate-800">
              অ্যাডমিন লগইন
            </h3>
            <p className="text-xs text-center text-slate-500 mt-1 mb-4">
              ড্যাশবোর্ডে প্রবেশ করতে সিক্রেট পাসওয়ার্ড দিন
            </p>

            <form onSubmit={handleLoginSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  পাসওয়ার্ড
                </label>
                <input
                  type="password"
                  required
                  placeholder="পাসওয়ার্ড লিখুন"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              {loginError && (
                <p className="text-xs text-red-600 font-bold text-center">
                  {loginError}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-emerald-900 hover:bg-emerald-800 text-white py-2.5 rounded-lg text-xs font-bold transition shadow"
              >
                প্রবেশ করুন
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Admin Panel View */}
      {viewMode === "admin" && isAdminLoggedIn && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-black text-slate-900">
                অ্যাডমিন অর্ডারের তালিকা
              </h1>
              <p className="text-slate-500 text-xs mt-1">
                ওয়েবসাইট থেকে প্রাপ্ত কাস্টমারদের সব অর্ডারের সামারি
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={fetchOrders}
                className="bg-emerald-900 text-white text-xs px-4 py-2 rounded-lg hover:bg-emerald-800 font-bold"
              >
                রিফ্রেশ লিস্ট
              </button>
              <button
                onClick={handleAdminLogout}
                className="bg-red-600 text-white text-xs px-3 py-2 rounded-lg hover:bg-red-700 font-bold flex items-center gap-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                লগআউট
              </button>
            </div>
          </div>

          {loadingOrders ? (
            <div className="text-center py-20 text-slate-500 font-medium">
              অর্ডার লোড হচ্ছে...
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-white rounded-xl border p-12 text-center text-slate-500">
              <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              এখনো কোনো অর্ডার জমা পড়েনি!
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order, idx) => (
                <div
                  key={order._id || idx}
                  className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row justify-between gap-6"
                >
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded">
                        অর্ডার #{idx + 1}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(order.orderDate).toLocaleString("bn-BD")}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-800 text-base">
                      {order.customerName}
                    </h3>

                    <div className="text-xs text-slate-600 space-y-1">
                      <p className="flex items-center gap-1 font-semibold text-slate-800">
                        <Phone className="w-3.5 h-3.5 text-emerald-700" />
                        {order.phone}
                      </p>
                      <p className="flex items-start gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5" />
                        {order.address} (
                        {order.shippingLocation === "inside-dhaka"
                          ? "ঢাকার ভেতরে"
                          : "ঢাকার বাইরে"}
                        )
                      </p>
                      <p className="text-emerald-800 font-bold">
                        পেমেন্ট পদ্ধতি:{" "}
                        {order.paymentMethod === "bkash"
                          ? `বিকাশ (TrxID: ${order.bkashTrxId})`
                          : "ক্যাশ অন ডেলিভারি"}
                      </p>
                    </div>
                  </div>

                  <div className="flex-1 max-w-md bg-slate-50 p-4 rounded-lg border border-slate-100">
                    <h4 className="text-xs font-bold text-slate-700 mb-2 border-b pb-1">
                      অর্ডার করা আইটেমসমূহ:
                    </h4>
                    <div className="space-y-1.5 text-xs">
                      {order.items?.map((item, i) => (
                        <div
                          key={i}
                          className="flex justify-between text-slate-600"
                        >
                          <span>
                            {item.name} ({item.selectedSize}) × {item.quantity}
                          </span>
                          <span className="font-bold">
                            ৳{item.price * item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>
                    {order.discount > 0 && (
                      <div className="flex justify-between text-xs text-red-600 mt-2">
                        <span>ডিসকাউন্ট:</span>
                        <span>-৳{order.discount}</span>
                      </div>
                    )}
                    <div className="border-t mt-3 pt-2 flex justify-between font-black text-sm text-emerald-900">
                      <span>সর্বমোট মূল্য:</span>
                      <span>৳{order.totalAmount}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      )}

      {/* Shop View */}
      {viewMode === "shop" && (
        <>
          <section className="bg-emerald-950 text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-xl text-center md:text-left">
                <span className="bg-emerald-800 text-emerald-200 text-xs px-3 py-1 rounded-full uppercase font-bold tracking-wider">
                  নতুন কালেকশন ২০২৬
                </span>
                <h1 className="text-3xl sm:text-5xl font-extrabold mt-4 leading-tight">
                  আভিজাত্য ও ফ্যাশনের সেরা মেলবন্ধন
                </h1>
                <p className="mt-3 text-slate-300 text-sm sm:text-base">
                  প্রিমিয়াম কোয়ালিটি কাপড় ও এক্সক্লুসিভ ডিজাইনের পাঞ্জাবি,
                  শাড়ি ও ক্যাজুয়াল কালেকশন এখন হাতের মুঠোয়।
                </p>
              </div>
              <div className="w-full md:w-1/2 flex justify-center">
                <img
                  src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800"
                  alt="Hero Banner"
                  className="rounded-2xl shadow-2xl max-h-72 object-cover w-full max-w-md"
                />
              </div>
            </div>
          </section>

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex flex-wrap items-center justify-between bg-white p-4 rounded-xl border border-slate-200 gap-4 mb-6">
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-700">
                <SlidersHorizontal className="w-4 h-4 text-emerald-800" />
                <span>ফিল্টার ও ফিল্টারিং:</span>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs">
                <div className="flex items-center space-x-2">
                  <span className="text-slate-500 font-medium">সাইজ:</span>
                  <select
                    value={selectedSizeFilter}
                    onChange={(e) => setSelectedSizeFilter(e.target.value)}
                    className="border border-slate-300 rounded-md p-1.5 bg-white font-semibold text-slate-700"
                  >
                    <option value="all">সব সাইজ</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                    <option value="Free Size">Free Size</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-slate-500 font-medium">সর্ট করুন:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-slate-300 rounded-md p-1.5 bg-white font-semibold text-slate-700"
                  >
                    <option value="default">সাধারণ</option>
                    <option value="low-to-high">দাম: কম থেকে বেশি</option>
                    <option value="high-to-low">দাম: বেশি থেকে কম</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map((product) => {
                const isWishlisted = wishlist.some(
                  (item) => item.id === product.id,
                );
                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between relative"
                  >
                    <button
                      onClick={() => toggleWishlist(product)}
                      className="absolute top-3 right-3 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow hover:bg-white transition"
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          isWishlisted
                            ? "fill-red-500 text-red-500"
                            : "text-slate-400"
                        }`}
                      />
                    </button>

                    <div>
                      <div className="relative group overflow-hidden bg-slate-100 aspect-square">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                          <button
                            onClick={() => {
                              setQuickViewProduct(product);
                              setSelectedSize(product.sizes[0]);
                            }}
                            className="bg-white text-slate-800 px-4 py-2 rounded-lg text-xs font-bold shadow-lg hover:bg-slate-100"
                          >
                            কুইক ভিউ
                          </button>
                        </div>
                      </div>

                      <div className="p-4">
                        <span className="text-xs font-semibold text-emerald-700 uppercase">
                          {product.categoryName}
                        </span>
                        <h3 className="font-bold text-slate-800 mt-1 line-clamp-1">
                          {product.name}
                        </h3>

                        <div className="flex items-center mt-2 space-x-2">
                          <span className="text-lg font-black text-slate-900">
                            ৳{product.price}
                          </span>
                          <span className="text-sm text-slate-400 line-through">
                            ৳{product.originalPrice}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 pt-0">
                      <button
                        onClick={() => addToCart(product, product.sizes[0])}
                        className="w-full bg-emerald-900 hover:bg-emerald-800 text-white py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center space-x-2 transition"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>কার্টে যোগ করুন</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </main>
        </>
      )}

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black/50 transition-opacity"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white shadow-xl flex flex-col">
              <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                <h2 className="text-lg font-bold text-slate-800 flex items-center space-x-2">
                  <ShoppingCart className="w-5 h-5 text-emerald-800" />
                  <span>আপনার শপিং কার্ট ({cart.length})</span>
                </h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 divide-y divide-slate-100">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500 font-medium">
                      আপনার কার্টটি খালি!
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 mb-6">
                      {cart.map((item) => (
                        <div
                          key={`${item.id}-${item.selectedSize}`}
                          className="py-2 flex space-x-4 border-b border-slate-100 pb-3"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg border border-slate-200"
                          />
                          <div className="flex-1">
                            <h4 className="text-sm font-bold text-slate-800 line-clamp-1">
                              {item.name}
                            </h4>
                            <p className="text-xs text-slate-500 mt-0.5">
                              সাইজ: {item.selectedSize}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="font-extrabold text-sm text-slate-900">
                                ৳{item.price * item.quantity}
                              </span>
                              <div className="flex items-center border border-slate-200 rounded-md">
                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      item.id,
                                      item.selectedSize,
                                      -1,
                                    )
                                  }
                                  className="px-2 py-0.5 text-slate-600"
                                >
                                  -
                                </button>
                                <span className="px-2 text-xs font-bold">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      item.id,
                                      item.selectedSize,
                                      1,
                                    )
                                  }
                                  className="px-2 py-0.5 text-slate-600"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <form onSubmit={handleCheckout} className="space-y-3 pt-2">
                      <h3 className="font-bold text-sm text-slate-800 border-b pb-1">
                        ডেলিভারি তথ্য
                      </h3>
                      <input
                        type="text"
                        required
                        placeholder="আপনার নাম লিখুন"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full text-xs p-2 border border-slate-300 rounded"
                      />
                      <input
                        type="tel"
                        required
                        placeholder="০১৭xxxxxxxx"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full text-xs p-2 border border-slate-300 rounded"
                      />
                      <textarea
                        required
                        rows="2"
                        placeholder="বাসা/রোড নম্বর, এরিয়া, জেলা"
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        className="w-full text-xs p-2 border border-slate-300 rounded"
                      ></textarea>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full mt-4 bg-emerald-900 hover:bg-emerald-800 text-white py-3 rounded-lg font-bold text-sm shadow-md transition disabled:bg-slate-400"
                      >
                        {isSubmitting
                          ? "প্রসেসিং হচ্ছে..."
                          : "অর্ডার কনফার্ম করুন"}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Wishlist Drawer */}
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black/50 transition-opacity"
            onClick={() => setIsWishlistOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white shadow-xl flex flex-col">
              <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                <h2 className="text-lg font-bold text-slate-800 flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-red-600 fill-red-600" />
                  <span>পছন্দের তালিকা ({wishlist.length})</span>
                </h2>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {wishlist.length === 0 ? (
                  <div className="text-center py-12">
                    <Heart className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500 font-medium">
                      পছন্দের তালিকায় কোনো প্রোডাক্ট নেই!
                    </p>
                  </div>
                ) : (
                  wishlist.map((product) => (
                    <div
                      key={product.id}
                      className="flex space-x-4 p-3 border rounded-xl items-center justify-between"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-slate-800 line-clamp-1">
                          {product.name}
                        </h4>
                        <p className="text-xs font-black text-emerald-900 mt-1">
                          ৳{product.price}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          addToCart(product, product.sizes[0]);
                          toggleWishlist(product);
                        }}
                        className="bg-emerald-900 text-white text-xs px-2.5 py-1.5 rounded font-bold"
                      >
                        কার্টে নিন
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Order Success Popup */}
      {orderPlaced && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">
              অর্ডার সফল হয়েছে!
            </h3>
            <p className="text-xs text-slate-500 mt-2">
              আপনার অর্ডারটি গ্রহণ করা হয়েছে।
            </p>
            <button
              onClick={() => setOrderPlaced(false)}
              className="mt-5 w-full bg-emerald-900 text-white py-2 rounded-lg font-bold text-sm"
            >
              ধন্যবাদ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
