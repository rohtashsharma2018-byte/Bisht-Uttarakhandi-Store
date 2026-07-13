import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import { 
  Eye, 
  EyeOff, 
  Laptop as LaptopIcon, 
  ShieldCheck, 
  Clock, 
  ChevronDown, 
  ArrowRight, 
  CheckCircle2, 
  FileText, 
  Truck, 
  Info,
  Layers,
  Sparkles,
  Award,
  BookOpen,
  Phone,
  X,
  Search,
  SlidersHorizontal,
  RotateCcw,
  MapPin,
  Mail,
  ExternalLink,
  Heart,
  Menu,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Laptop } from "../types";
import { motion, AnimatePresence } from "motion/react";
import heroBgImage from "../assets/images/uttarakhand_hero_bg_1783837603399.jpg";
import culturalHeritageImage from "../assets/images/uttarakhand_cultural_heritage_1783837429784.jpg";
import { SplashScreen } from "../components/SplashScreen";

// Dynamic SVG representation matching Bisht Uttarakhandi Store's official logo
export const StoreLogo: React.FC<{ className?: string; dark?: boolean; compact?: boolean }> = ({ 
  className = "", 
  dark = false,
  compact = false
}) => {
  if (compact) {
    return (
      <div className={`flex items-center gap-2 select-none ${className}`}>
        <div className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center font-serif text-sm font-bold tracking-tight shadow-md border border-amber-500">
          BUS
        </div>
        <div className="text-left">
          <h1 className="text-sm font-black tracking-[2px] text-slate-900 leading-none">BISHT UTTARAKHANDI STORE</h1>
          <p className="text-[8px] font-medium tracking-[1px] text-amber-600 mt-0.5 uppercase">Handcrafted Elegance</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      {/* Outer elegant decorative ring */}
      <div className="relative flex items-center justify-center p-2 w-[160px] h-[95px]">
        {/* The Registered Mark */}
        <span className={`absolute top-0 right-1 text-[11px] font-bold ${dark ? "text-amber-400" : "text-amber-600"}`}>®</span>
        
        {/* Elegant floral/circular decorative ring */}
        <svg className="absolute inset-0 w-full h-full text-amber-600 animate-spin-slow animate-[spin_30s_linear_infinite]" viewBox="0 0 160 95" fill="none">
          <ellipse cx="80" cy="47.5" rx="72" ry="42" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" />
          <ellipse cx="80" cy="47.5" rx="66" ry="36" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="3 3" />
        </svg>

        {/* Brand Initial Block */}
        <div className="flex gap-4 justify-center items-center relative z-10 -mt-1">
          <div className="w-12 h-12 rounded-full bg-amber-600 text-white flex items-center justify-center font-serif text-xl font-bold tracking-tight shadow-lg border border-amber-500">
            BUS
          </div>
        </div>
      </div>
      
      {/* Brand Corporate Label */}
      <div className="text-center mt-1">
        <h1 className="text-[20px] font-black tracking-[4px] text-slate-900 leading-none">BISHT UTTARAKHANDI STORE</h1>
        <p className="text-[10px] font-medium tracking-[1.5px] text-amber-600 mt-1 uppercase">Handcrafted Elegance</p>
      </div>
    </div>
  );
};

const ProductImageSlider: React.FC<{ laptop: Laptop }> = ({ laptop }) => {
  const images = laptop.image_urls && laptop.image_urls.length > 0 
    ? laptop.image_urls 
    : [laptop.image_url].filter(Boolean) as string[];
  
  if (images.length === 0) images.push("https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&w=400&q=80");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);

  useEffect(() => {
    if (!showGallery) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setCurrentIndex((prev) => (prev + 1) % images.length);
      if (e.key === "ArrowLeft") setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      if (e.key === "Escape") setShowGallery(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showGallery, images.length]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <div className="relative w-full h-full group/slider overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`${laptop.name} - ${currentIndex + 1}`}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="object-cover w-full h-full cursor-zoom-in"
            referrerPolicy="no-referrer"
            onClick={(e) => {
              e.stopPropagation();
              setShowGallery(true);
            }}
            onError={(e)=>{
              (e.target as any).src = "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&w=400&q=80";
            }}
          />
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button 
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 text-slate-800 shadow-lg opacity-0 group-hover/slider:opacity-100 transition-all hover:bg-amber-500 hover:text-white z-10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button 
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 text-slate-800 shadow-lg opacity-0 group-hover/slider:opacity-100 transition-all hover:bg-amber-500 hover:text-white z-10"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 bg-black/20 backdrop-blur-md px-2 py-1 rounded-full">
              {images.map((_, idx) => (
                <div 
                  key={idx}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? "bg-amber-500 w-3" : "bg-white/60"}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Fullscreen Gallery Modal */}
      <AnimatePresence>
        {showGallery && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-900/98 backdrop-blur-xl flex flex-col p-4 md:p-6"
          >
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <div>
                <h3 className="text-white font-bold text-lg md:text-xl">{laptop.name}</h3>
                <p className="text-slate-400 text-xs md:text-sm">{laptop.category} • {currentIndex + 1} / {images.length}</p>
              </div>
              <button 
                onClick={() => setShowGallery(false)}
                className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={currentIndex}
                  src={images[currentIndex]} 
                  alt={laptop.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="max-h-[65vh] md:max-h-[70vh] max-w-full object-contain rounded-xl shadow-2xl shadow-black/50"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
              
              {images.length > 1 && (
                <>
                  <button 
                    onClick={handlePrev} 
                    className="absolute left-0 md:left-4 p-3 md:p-4 rounded-full bg-white/5 text-white hover:bg-white/10 transition-all active:scale-95"
                  >
                    <ChevronLeft className="w-6 h-6 md:w-8 h-8" />
                  </button>
                  <button 
                    onClick={handleNext} 
                    className="absolute right-0 md:right-4 p-3 md:p-4 rounded-full bg-white/5 text-white hover:bg-white/10 transition-all active:scale-95"
                  >
                    <ChevronRight className="w-6 h-6 md:w-8 h-8" />
                  </button>
                </>
              )}
            </div>

            <div className="mt-6 md:mt-8 flex justify-start md:justify-center gap-3 overflow-x-auto pb-4 scrollbar-hide px-4">
              {images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${idx === currentIndex ? "border-amber-500 scale-110 shadow-lg shadow-amber-500/40" : "border-transparent opacity-40 hover:opacity-100"}`}
                >
                  <img src={img} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showHelplineModal, setShowHelplineModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [helphoneNumber, setHelphoneNumber] = useState("+91 87506 00385");
  const [activePolicy, setActivePolicy] = useState<"privacy" | "refund" | "terms" | null>(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (showHelplineModal) {
      setHelphoneNumber("+91 87506 00385");
    }
  }, [showHelplineModal]);
  
  // Real inventory items from DB
  const [dbInventory, setDbInventory] = useState<Laptop[]>([]);
  const [loadingInventory, setLoadingInventory] = useState(true);

  // References for smoother scrolling
  const catalogRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // React Hook Forms
  const { register: registerLogin, handleSubmit: handleLoginSubmit, reset: resetLogin } = useForm();
  const { register: registerSignup, handleSubmit: handleSignupSubmit, formState: { errors: signupErrors }, reset: resetSignup } = useForm();

  // Load inventory on mount
  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoadingInventory(false);
      return;
    }
    const loadInventory = async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("id, name, description, category, sell_price, stock, image_url, image_urls, created_at, product_code")
          .order("created_at", { ascending: false });
        if (error) throw error;
        if (data) {
          console.log("Loaded products:", data);
          setDbInventory(data as Laptop[]);
        }
      } catch (err) {
        console.error("Error loading products details:", JSON.stringify(err, null, 2));
        console.warn("Could not load real hardware inventory for landing page preview, using fallbacks:", err);
      } finally {
        setLoadingInventory(false);
      }
    };
    loadInventory();
  }, []);

  // Standard Login Action
  const onLoginSubmit = async (data: any) => {
    setSubmitting(true);
    try {
      const phone = data.phone.trim();
      const syntheticEmail = `${phone}@user.internal`;

      const { error } = await supabase.auth.signInWithPassword({
        email: syntheticEmail,
        password: data.password,
      });
      if (error) throw error;
      toast.success("Welcome back to Bisht Uttarakhandi Store!");
    } catch (error: any) {
      toast.error(error.message || "Invalid credentials. Please verify your number and password.");
    } finally {
      setSubmitting(false);
    }
  };

  // Standard Signup Action
  const onSignupSubmit = async (data: any) => {
    setSubmitting(true);
    try {
      const phone = data.phone.trim();
      const syntheticEmail = `${phone}@user.internal`;

      // 1. Auth Signup with user meta
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: syntheticEmail,
        password: data.password,
        options: {
          data: {
            full_name: data.name,
            phone_number: phone,
            address: data.address || ""
          }
        }
      });

      if (authError) throw authError;

        if (authData.user) {
          toast.success("Account created successfully! You can now sign in.");
          setActiveTab("signin");
          resetLogin();
        }
    } catch (error: any) {
      toast.error(error.message || "Registration failed. Verify your details.");
    } finally {
      setSubmitting(false);
    }
  };

  // Helper action: Scroll to Ref smoothly
  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Click on a laptop card CTA
  const handleProductAction = (laptopName: string) => {
    toast.info(`Interested in "${laptopName}"? Please log in as an administrator or contact us.`);
    setShowAuthModal(true);
  };


  const displayInventory = dbInventory;

  // Calculate dynamic constraints
  const maxAvailablePrice = displayInventory.length > 0 
    ? Math.max(...displayInventory.map(l => l.sell_price || 0)) 
    : 1000;
  
  const sliderMax = maxAvailablePrice;

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [maxPriceFilter, setMaxPriceFilter] = useState<number>(sliderMax);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Keep price range filter synced to max value when products load
  useEffect(() => {
    if (displayInventory.length > 0) {
      const maxVal = Math.max(...displayInventory.map(l => l.sell_price || 0));
      setMaxPriceFilter(maxVal);
    }
  }, [dbInventory]);

  // Filter items
  const filteredInventory = displayInventory.filter((laptop) => {
    const matchesCategory = selectedCategory === "All" || laptop.category === selectedCategory;
    const matchesPrice = laptop.sell_price <= maxPriceFilter;
    const matchesSearch = !searchQuery || 
      laptop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (laptop.description && laptop.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesPrice && matchesSearch;
  });

  // Extract unique categories dynamically
  const uniqueCategories = ["All", ...Array.from(new Set(displayInventory.map(l => l.category).filter(Boolean)))];

  return (
    <>
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>
      <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800 font-sans selection:bg-slate-900 selection:text-white">
        
        {/* Dynamic Header Navbar Section */}
      <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-slate-100 px-6 py-3 transition-all duration-200 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <StoreLogo compact={true} />
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <button onClick={() => scrollTo(aboutRef)} className="hover:text-amber-600 transition-colors">
              About Us
            </button>
            <span className="text-slate-200">|</span>
            <button onClick={() => scrollTo(catalogRef)} className="hover:text-amber-600 transition-colors">
              Decor Collection
            </button>
            <span className="text-slate-200">|</span>
            <button onClick={() => scrollTo(contactRef)} className="hover:text-amber-600 transition-colors">
              Contact Us
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <Button 
              size="sm" 
              onClick={() => { setShowAuthModal(true); }}
              className="hidden md:flex text-xs font-bold py-2 px-4 bg-amber-600 hover:bg-amber-700 text-white h-9 uppercase tracking-wider shadow-sm rounded-lg"
            >
              Admin Login
            </Button>
            <button 
              className="md:hidden text-slate-600 hover:text-slate-900 transition-colors p-2"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden bg-white/95 backdrop-blur-md border-t border-slate-100"
            >
              <nav className="flex flex-col py-4 px-2 space-y-2">
                <button 
                  onClick={() => { setShowMobileMenu(false); setTimeout(() => scrollTo(aboutRef), 200); }} 
                  className="px-4 py-3 text-sm font-semibold text-slate-700 hover:text-amber-600 hover:bg-amber-50 rounded-lg text-left transition-colors"
                >
                  About Us
                </button>
                <button 
                  onClick={() => { setShowMobileMenu(false); setTimeout(() => scrollTo(catalogRef), 200); }} 
                  className="px-4 py-3 text-sm font-semibold text-slate-700 hover:text-amber-600 hover:bg-amber-50 rounded-lg text-left transition-colors"
                >
                  Decor Collection
                </button>
                <button 
                  onClick={() => { setShowMobileMenu(false); setTimeout(() => scrollTo(contactRef), 200); }} 
                  className="px-4 py-3 text-sm font-semibold text-slate-700 hover:text-amber-600 hover:bg-amber-50 rounded-lg text-left transition-colors"
                >
                  Contact Us
                </button>
                <div className="px-4 pt-2 pb-1 border-t border-slate-100 mt-2">
                  <Button 
                    size="sm" 
                    onClick={() => { setShowAuthModal(true); setShowMobileMenu(false); }}
                    className="w-full text-xs font-bold py-2.5 bg-amber-600 hover:bg-amber-700 text-white h-auto uppercase tracking-wider shadow-sm rounded-lg"
                  >
                    Admin Login
                  </Button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Centered Section */}
      <section className="relative overflow-hidden py-16 lg:py-24 px-6 border-b border-slate-200 text-center">
        
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroBgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />
        {/* Overlay gradient for readability */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/80 via-white/90 to-slate-50/95" />

        {/* Ambient mesh-glow effect */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-amber-100/40 rounded-full blur-[100px] pointer-events-none z-0" />
        <div className="absolute bottom-1/4 left-10 w-[300px] h-[300px] bg-amber-50/50 rounded-full blur-[80px] pointer-events-none z-0" />

        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center space-y-8 relative z-10">
          
          {/* Hero details block */}
          <div className="space-y-6 flex flex-col items-center justify-center animate-in fade-in duration-500">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Exquisite Home Decoration & Handcrafted Artistry
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] text-center">
              <span
                onClick={() => setShowHelplineModal(true)}
                className="bg-amber-600 hover:bg-amber-500 text-white px-5 py-3 rounded-2xl inline-flex items-center gap-3 cursor-pointer shadow-xl transition-all duration-300 hover:shadow-amber-500/30 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] border border-amber-400 select-none group text-base sm:text-2xl font-black text-center align-middle"
              >
                Traditional Jewellery & Cultural Heritage,
                <motion.span 
                  animate={{
                    rotate: [0, -18, 15, -18, 15, -10, 10, -5, 5, 0]
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    repeatDelay: 0.8,
                    ease: "easeInOut"
                  }}
                  className="inline-flex items-center justify-center bg-amber-800 group-hover:bg-amber-700 rounded-full p-2 transition-colors shrink-0 shadow-md shadow-amber-800/35"
                >
                  <Phone className="w-5 h-5 text-white" />
                </motion.span>
              </span>
              <br className="my-2" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-800 via-amber-600 to-slate-800 inline-block mt-2">
                Curated for You.
              </span>
            </h1>
            
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl font-normal leading-relaxed text-center">
              Bisht Uttarakhandi Store is your trusted destination for authentic Uttarakhandi traditional products, dedicated to preserving the rich culture and heritage of the hills with care and craftsmanship.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <Button 
                onClick={() => scrollTo(catalogRef)}
                className="bg-slate-900 text-white hover:bg-slate-800 font-bold px-6 h-12 uppercase tracking-wider text-xs flex items-center gap-2 shadow-md rounded-xl"
              >
                Browse Decor Collection
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Quick trust metrics panel */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200 w-full max-w-lg">
              <div className="space-y-1">
                <div className="text-2xl font-black text-slate-900">100%</div>
                <div className="text-[10px] font-black uppercase text-amber-700 tracking-widest">Handcrafted Art</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-black text-slate-900">Eco</div>
                <div className="text-[10px] font-black uppercase text-amber-700 tracking-widest">Sustainable Material</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-black text-slate-900">Fast</div>
                <div className="text-[10px] font-black uppercase text-amber-700 tracking-widest">Doorstep Dispatch</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Corporate Slogan Banner */}
      <section className="bg-amber-950 text-amber-100 py-10 px-6 font-mono border-y border-amber-950">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-sm font-bold tracking-[3px] text-amber-400 uppercase">OUR PROMISE</h4>
            <p className="text-lg font-bold text-white font-sans">"Preserving heritage, crafting pride. We bring the soul of Uttarakhand to your home."</p>
          </div>
          <div className="flex gap-4 md:gap-8 text-xs select-none">
            <div className="flex items-center gap-1"><CheckCircle2 size={14} className="text-amber-400" /> Authentic Heritage</div>
            <div className="flex items-center gap-1"><CheckCircle2 size={14} className="text-amber-400" /> Traditional Craft</div>
            <div className="flex items-center gap-1"><CheckCircle2 size={14} className="text-amber-400" /> Secure Transit</div>
          </div>
        </div>
      </section>

      {/* Core Services / Highlighted Features Layout */}
      <section className="py-20 px-6 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-14">
          
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <div className="text-[10px] font-black text-amber-600 tracking-[3px] uppercase">EXQUISITE CRAFTSMANSHIP</div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight sm:text-4xl">
              Elevate Your Living Spaces
            </h2>
            <p className="text-sm text-slate-500 leading-normal text-center">
              From authentic Pahadi Jewellery to traditional Uttarakhandi caps and Pichora, we bring the rich cultural heritage of the hills into your celebrations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="p-6 bg-amber-50/20 rounded-2xl border border-amber-100/60 hover:border-amber-200 transition-all hover:shadow-md hover:-translate-y-0.5 duration-200 text-left">
              <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Traditional Jewellery</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Exquisite Pahadi Nath, Galoband, and traditional nose rings crafted with precision to reflect the true elegance of Uttarakhand.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 bg-amber-50/20 rounded-2xl border border-amber-100/60 hover:border-amber-200 transition-all hover:shadow-md hover:-translate-y-0.5 duration-200 text-left">
              <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Cultural Apparel</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Authentic Uttarakhandi caps, Pichora, and traditional attire perfect for weddings, festivals, and cultural gatherings.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 bg-amber-50/20 rounded-2xl border border-amber-100/60 hover:border-amber-200 transition-all hover:shadow-md hover:-translate-y-0.5 duration-200 text-left">
              <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Authentic Quality</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Every product undergoes a rigorous quality check, ensuring authentic craftsmanship and genuine Uttarakhandi heritage.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 bg-amber-50/20 rounded-2xl border border-amber-100/60 hover:border-amber-200 transition-all hover:shadow-md hover:-translate-y-0.5 duration-200 text-left">
              <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Safe Doorstep Delivery</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                We wrap each fragile ornament and delicate craft item in shock-absorbent eco-friendly packaging so it arrives in pristine state.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* LIVE CATALOG SHOWCASE PREVIEW */}
      <section ref={catalogRef} className="py-20 px-6 bg-slate-100/50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div className="space-y-2 text-left">
              <div className="text-[10px] font-black text-amber-600 tracking-[3px] uppercase">ARTISAN DECOR PREVIEW</div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight sm:text-4xl">Featured Handcrafted Items</h2>
              <p className="text-sm text-slate-500 max-w-lg">
                Inspect a fraction of our live active inventory below. Sign in to place orders or view complete collection details.
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-white shadow-sm border border-slate-200/80 px-4 py-2 rounded-full font-semibold">
              <Layers className="w-4 h-4 text-amber-500" />
              Showing {filteredInventory.length} of {displayInventory.length} Curated Masterpieces
            </div>
          </div>

          {/* Dynamic Interactive Filters Panel */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-6 text-left">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
              {/* Search input field */}
              <div className="lg:col-span-5 space-y-1.5">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Search Creations</label>
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by name, category, or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs focus:ring-2 focus:ring-amber-600 focus:bg-white outline-none text-slate-800 placeholder:text-slate-400 transition-all"
                  />
                </div>
              </div>

              {/* Price range filter slider */}
              <div className="lg:col-span-5 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Price Range</label>
                  <span className="text-xs font-black text-amber-700 font-mono">Up to ₹{maxPriceFilter}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold text-slate-400 font-mono">₹0</span>
                  <input
                    type="range"
                    min="0"
                    max={sliderMax}
                    step="25"
                    value={maxPriceFilter}
                    onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
                    className="flex-1 accent-amber-600 h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-[10px] font-bold text-slate-400 font-mono">₹{sliderMax}</span>
                </div>
              </div>

              {/* Reset filter controls */}
              <div className="lg:col-span-2">
                <Button
                  onClick={() => {
                    setSelectedCategory("All");
                    setMaxPriceFilter(sliderMax);
                    setSearchQuery("");
                  }}
                  variant="outline"
                  className="w-full h-10 text-xs font-bold gap-2 text-slate-600 border-slate-200 hover:bg-slate-50 uppercase tracking-wider shadow-sm rounded-xl"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset Filters
                </Button>
              </div>
            </div>

            {/* Dynamic Category Pill selections */}
            <div className="border-t border-slate-100 pt-4 space-y-2.5">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Filter by Category</label>
              <div className="flex flex-wrap gap-2">
                {uniqueCategories.map((category) => {
                  const count = category === "All" 
                    ? displayInventory.length 
                    : displayInventory.filter(l => l.category === category).length;
                  const isActive = selectedCategory === category;
                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border cursor-pointer ${
                        isActive 
                          ? "bg-amber-600 text-white shadow-sm border-amber-500" 
                          : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-850"
                      }`}
                    >
                      <span>{category}</span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-md ${
                        isActive ? "bg-amber-700 text-amber-50" : "bg-slate-100 text-slate-500"
                      }`}>{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {loadingInventory ? (
            <div className="flex items-center justify-center py-20 text-slate-400 font-mono text-xs font-bold tracking-wider uppercase">
              QUERYING LIVE CRAFT SPECS...
            </div>
          ) : filteredInventory.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center max-w-md mx-auto space-y-4 shadow-sm animate-in fade-in duration-300">
              <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
                <SlidersHorizontal className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900">No Masterpieces Found</h4>
                <p className="text-xs text-slate-500 leading-normal">
                  We couldn't find any creations matching your category, price range, or search criteria. Try modifying your filters!
                </p>
              </div>
              <Button
                size="sm"
                onClick={() => {
                  setSelectedCategory("All");
                  setMaxPriceFilter(sliderMax);
                  setSearchQuery("");
                }}
                className="bg-amber-600 hover:bg-amber-700 text-white text-[10px] font-black uppercase tracking-wider py-1.5 px-4 rounded-xl shadow-sm cursor-pointer"
              >
                Clear All Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredInventory.map((laptop) => (
                <div 
                  key={laptop.id} 
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:shadow-lg transition-all duration-300 relative text-left"
                >
                  
                  {/* Category overlay */}
                  {laptop.category && (
                    <span className="absolute top-4 left-4 z-10 bg-amber-600/90 text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md backdrop-blur-sm">
                      {laptop.category}
                    </span>
                  )}

                  {/* Stock status overlay */}
                  <span className={`absolute top-4 right-4 z-10 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md shadow-sm border backdrop-blur-sm ${
                    laptop.stock > 0 
                      ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
                      : "bg-rose-50 text-rose-700 border-rose-100"
                  }`}>
                    {laptop.stock > 0 ? "In Stock" : "Out of Stock"}
                  </span>

                  {/* Laptop image block */}
                  <div className="h-48 bg-slate-100 relative overflow-hidden flex items-center justify-center">
                    <ProductImageSlider laptop={laptop} />
                  </div>

                  {/* Listing details */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="font-sans text-xs font-bold text-slate-400 font-mono tracking-wider">{laptop.product_code || "Product Code"}</div>
                      <h3 className="text-lg font-black text-slate-900 group-hover:text-amber-600 transition-colors leading-tight">{laptop.name}</h3>
                      <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">{laptop.description || "Premium handcrafted decoration item styled and finished with immense precision, using high-quality materials to provide visual warmth and elegance."}</p>
                    </div>

                    {laptop.sell_price && laptop.sell_price > 0 && (
                      <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                        <div className="space-y-0.5">
                          <span className="block text-[9px] text-slate-400 font-bold uppercase tracking-wide">OUTRIGHT PURCHASE</span>
                          <span className="text-base font-black text-slate-950">₹{laptop.sell_price}</span>
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* HOW THE LOGISTICS CHAIN WORKS */}
      <section className="py-20 px-6 bg-white border-b border-slate-200 text-center">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="space-y-3 max-w-xl mx-auto">
            <div className="text-[10px] font-black text-amber-600 tracking-[3px] uppercase">ARTISANAL WORKFLOW</div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight sm:text-4xl">
              Simplifying Decor Access
            </h2>
            <p className="text-sm text-slate-500 leading-normal">
              From our artisan studios straight to your doorstep with minimal effort. Here is our seamless process flow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Step 1 */}
            <div className="space-y-4 relative text-left p-4">
              <div className="w-12 h-12 rounded-full bg-amber-50 border-2 border-amber-200 flex items-center justify-center text-amber-900 font-bold text-lg font-mono shadow-sm">
                01
              </div>
              <h3 className="text-lg font-bold text-slate-900">Select & Order</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Browse our live authentic inventory. Select beautiful Pahadi items, traditional apparel, or indicate direct buyout agreements.
              </p>
            </div>

            {/* Step 2 */}
            <div className="space-y-4 relative text-left p-4">
              <div className="w-12 h-12 rounded-full bg-amber-50 border-2 border-amber-200 flex items-center justify-center text-amber-900 font-bold text-lg font-mono shadow-sm">
                02
              </div>
              <h3 className="text-lg font-bold text-slate-900">Order Preparation</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Our in-house team curates your ordered pieces, runs fine quality inspections, and safely packages the items.
              </p>
            </div>

            {/* Step 3 */}
            <div className="space-y-4 relative text-left p-4">
              <div className="w-12 h-12 rounded-full bg-amber-50 border-2 border-amber-200 flex items-center justify-center text-amber-900 font-bold text-lg font-mono shadow-sm">
                03
              </div>
              <h3 className="text-lg font-bold text-slate-900">Doorstep Handover</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Enjoy hassle-free delivery of your elegant decoration assets. Process rentals or keep bought pieces forever to brighten up your festive spaces.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT US SECTION */}
      <section ref={aboutRef} className="py-24 px-6 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2 space-y-8 text-left">
            <div className="space-y-4">
              <div className="text-[10px] font-black text-amber-600 tracking-[4px] uppercase">OUR HERITAGE</div>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Welcome to Bisht Uttarakhandi Store!
              </h2>
              <div className="w-20 h-1.5 bg-amber-600 rounded-full"></div>
            </div>
            
            <div className="space-y-6 text-slate-600 leading-relaxed text-sm">
              <p className="text-lg font-medium text-slate-900 italic leading-relaxed">
                "Bisht Uttarakhandi Store is your trusted destination for authentic Uttarakhandi traditional products."
              </p>
              <p>
                We are dedicated to preserving the rich culture and heritage of Uttarakhand by offering high-quality traditional items made with care and craftsmanship. Our collection includes a wide range of Pahadi traditional jewellery, Uttarakhandi caps, Pichora, Nath (traditional nose rings), Galoband, customized Appan Name Plates, Appan Pooja Thali, and many more cultural products.
              </p>
              <p>
                We believe that every product reflects the pride, tradition, and beauty of Uttarakhand. Whether you are preparing for a wedding, a cultural event, a festival, or looking for a meaningful gift, we are here to provide authentic and beautifully crafted products.
              </p>
              <p>
                At Bisht Uttarakhandi Store, customer satisfaction, quality, and authenticity are our top priorities. We are proud to serve customers across India with reliable service and genuine Uttarakhandi products. Thank you for choosing Bisht Uttarakhandi Store. We look forward to being a part of your traditions and celebrations.
              </p>
            </div>
          </div>
          
          <div className="lg:w-1/2 relative group">
            <div className="absolute -inset-4 bg-amber-100/50 rounded-[2rem] blur-2xl group-hover:bg-amber-200/50 transition-colors duration-500"></div>
            <img 
              src={culturalHeritageImage} 
              alt="Uttarakhand Cultural Heritage" 
              className="relative rounded-3xl shadow-2xl border border-slate-200 object-cover aspect-[4/3] w-full"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 hidden sm:block">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                  <Heart className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <div className="text-xl font-black text-slate-900 font-sans">Authentic</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Uttarakhandi Pride</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Contact Us Section */}
      <section ref={contactRef} className="py-20 px-6 bg-white border-t border-slate-100" id="contact-us-section">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto animate-in fade-in duration-500">
            <div className="text-[10px] font-black text-amber-600 tracking-[3px] uppercase">CONNECT WITH ARTISANS</div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight sm:text-4xl">Get in Touch</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              Have questions about our custom ornaments, festive rentals, or bulk designs? We're here to help you redefine your spaces. Reach out to our studio directly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Contact Details Column */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-8 bg-slate-50 p-8 rounded-2xl border border-slate-200/60 shadow-sm text-left">
              <div className="space-y-8">
                
                {/* Location Item */}
                <div className="flex gap-4 items-start">
                  <div className="w-11 h-11 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100/80 shadow-sm">
                    <MapPin className="w-4.5 h-4.5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">Studio Location</h4>
                    <p className="text-xs text-slate-700 font-semibold leading-relaxed">
                      SRC 24D, Shipra Riviera, Gyan Khand 3, Indirapuram, Ghaziabad, Uttar Pradesh 201014
                    </p>
                  </div>
                </div>

                {/* Phone Item */}
                <div className="flex gap-4 items-start">
                  <div className="w-11 h-11 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100/80 shadow-sm">
                    <Phone className="w-4.5 h-4.5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">Phone</h4>
                    <p className="text-sm font-black text-slate-900 font-mono">
                      +91 87506 00385
                    </p>
                    <p className="text-[10px] text-slate-500 font-medium">
                      Mon-Sun: 9am - 8pm
                    </p>
                  </div>
                </div>

                {/* Email Item */}
                <div className="flex gap-4 items-start">
                  <div className="w-11 h-11 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100/80 shadow-sm">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">Email</h4>
                    <p className="text-sm font-black text-slate-900 font-mono">
                      mamta.bangari935@gmail.com
                    </p>
                    <p className="text-[10px] text-slate-500 font-medium">
                      We reply within 24 hours.
                    </p>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-slate-200/60 flex flex-wrap gap-3">
                <Button 
                  onClick={() => setShowHelplineModal(true)}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-[10px] uppercase tracking-wider py-2.5 px-5 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Call Support Hotline
                </Button>
                <a 
                  href="https://wa.me/918750600385" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-[#25D366] hover:bg-[#20ba56] text-white font-black text-[10px] uppercase tracking-wider py-2.5 px-5 rounded-xl shadow-md transition-all gap-2 cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.966C16.59 2.016 14.11 1.01 11.999 1.01c-5.45 0-9.88 4.421-9.884 9.8a9.84 9.84 0 0 0 1.511 5.17l-.995 3.637 3.737-.963zm13.725-9.115c-.27-.136-1.6-.788-1.847-.878-.247-.09-.427-.136-.607.136-.18.272-.696.878-.853 1.06-.157.181-.314.204-.584.069-.27-.136-1.14-.42-2.172-1.34-1.03-1.066-1.72-2.385-1.922-2.725-.202-.34-.022-.524.148-.692.153-.151.34-.397.51-.595.17-.198.225-.34.338-.567.112-.227.056-.425-.028-.595-.084-.17-.607-1.464-.83-2.002-.218-.524-.444-.452-.607-.46l-.518-.008c-.18 0-.473.068-.72.34-.247.271-.945.923-.945 2.254 0 1.332.97 2.617 1.104 2.798.135.18 1.91 2.915 4.627 4.088.647.28 1.151.446 1.545.571.65.206 1.24.177 1.707.108.52-.077 1.6-.653 1.826-1.28.225-.627.225-1.163.157-1.28-.067-.118-.247-.205-.517-.341z"/>
                  </svg>
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Map Column */}
            <div className="lg:col-span-7 flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm h-[400px] lg:h-auto min-h-[350px] relative group">
              {/* Active Interactive Iframe Map representing Gyan Khand 3, Indirapuram, Ghaziabad */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.077051493774!2d77.37525387631336!3d28.634947975663558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf537b01d0c81%3A0xe67ca66f4e1950d9!2sShipra%20Riviera%2C%20Gyan%20Khand%20III%2C%20Indirapuram%2C%20Ghaziabad%2C%20Uttar%20Pradesh%20201014!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                className="w-full h-full border-0 absolute inset-0"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Bisht Uttarakhandi Store Location Map"
              ></iframe>

              {/* Float badge or control layer over map to match user style */}
              <div className="absolute top-4 left-4 z-10">
                <a
                  href="https://maps.google.com/?q=SRC+24D+Shipra+Riviera+Gyan+Khand+3+Indirapuram+Ghaziabad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-sm border border-slate-200 px-3.5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider text-slate-800 shadow-sm hover:bg-white transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-amber-600" />
                  <span>Open in Maps</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Premium Footer */}
      <footer className="bg-slate-900 text-slate-500 py-12 px-6 border-t border-slate-950 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          
          <div className="flex flex-col items-center md:items-start gap-2">
            {/* Simple monochrome representation for footer */}
            <div className="flex items-center gap-2 text-white font-black tracking-widest text-sm uppercase">
              Bisht Uttarakhandi Store
            </div>
            <p className="text-[10px] text-slate-500">Elegant Handcrafted Ornaments & Event Decor. Spaces Redefined!</p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-[11px] font-semibold text-slate-400">
            <button onClick={() => scrollTo(catalogRef)} className="hover:text-white transition-colors">Decor Collection</button>
            <button onClick={() => setShowAuthModal(true)} className="hover:text-white transition-colors">Admin Portal</button>
            <button onClick={() => scrollTo(contactRef)} className="hover:text-white transition-colors">Contact Us</button>
          </div>

          <div className="text-center md:text-right space-y-2">
            <p className="text-[10px] text-slate-600">© 2026 Bisht Uttarakhandi Store Inc. Licensed in compliance with local business laws.</p>
            <p className="text-[9px] text-slate-700">All registered marks, craft designs, and pictures remain proprietary brand materials.</p>
          </div>

        </div>
      </footer>

      {/* Helpline modal */}
      <AnimatePresence>
        {showHelplineModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="helpline-modal-overlay">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowHelplineModal(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
              id="helpline-backdrop"
            />
            
            {/* Modal Dialog Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-w-md bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xl p-6 md:p-8 z-10 text-center"
              id="helpline-modal-content"
            >
              {/* Close Button */}
              <button
                id="close-helpline-modal"
                onClick={() => setShowHelplineModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors p-1.5 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mx-auto w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mb-5">
                <Phone className="w-7 h-7 text-amber-600 animate-bounce" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-1" id="helpline-title">
                Bisht Uttarakhandi Store Styling Hotline
              </h3>
              <p className="text-xs text-slate-500 mb-6 px-1">
                Need bespoke designs, festive group bookings, or instant custom craft updates? Connect with our dedicated design helpdesk.
              </p>

              {/* Animated Helpline Display Box */}
              <div className="bg-slate-950 rounded-xl p-5 py-6 border border-slate-800 shadow-inner flex flex-col items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-amber-500/5 pointer-events-none" />
                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-extrabold mb-3">Dial Priority Line</span>
                
                {/* Each character of helpline number is individually animated */}
                <div className="flex items-center justify-center gap-1 sm:gap-1.5" id="animated-phone-digits">
                  {Array.from(helphoneNumber).map((char, index) => {
                    if (char === " ") {
                      return <div key={index} className="w-2.5 sm:w-3" />;
                    }
                    return (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, y: 20, scale: 0.5, rotate: -15 }}
                        animate={{ 
                          opacity: 1, 
                          y: 0, 
                          scale: 1, 
                          rotate: 0,
                          transition: {
                            type: "spring",
                            stiffness: 260,
                            damping: 14,
                            delay: index * 0.04
                          }
                        }}
                        whileHover={{ 
                          scale: 1.3, 
                          color: "#d97706", 
                          y: -5,
                          textShadow: "0 0 10px rgba(217,119,6,0.6)",
                          transition: { duration: 0.1 }
                        }}
                        className="text-xl sm:text-2xl font-black text-white inline-block cursor-pointer tracking-wide"
                        style={{
                          textShadow: "0 0 8px rgba(255,255,255,0.1)"
                        }}
                      >
                        {char}
                      </motion.span>
                    );
                  })}
                </div>

                <div className="mt-4 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
                  <span className="text-[10px] text-green-400 font-bold uppercase tracking-widest">Active Live Support</span>
                </div>
              </div>

              {/* Action options */}
              <div className="mt-6 pt-5 border-t border-slate-100 flex gap-3 justify-center">
                <Button 
                   id="copy-helpline-button"
                  onClick={() => {
                    navigator.clipboard.writeText(helphoneNumber);
                    toast.success("Helpline number copied!");
                  }}
                  variant="outline" 
                   className="font-bold text-[10px] uppercase tracking-wider h-10 px-4 border-slate-200 hover:bg-slate-50 text-slate-700"
                >
                  Copy Number
                </Button>
                <a 
                   id="call-helpline-link"
                  href={`tel:${helphoneNumber.replace(/\s+/g, "")}`}
                  className="inline-flex items-center justify-center font-bold text-[10px] uppercase tracking-wider text-white bg-amber-600 hover:bg-amber-700 h-10 px-5 rounded-lg shadow-md hover:shadow-amber-500/20 active:scale-95 transition-all text-xs"
                >
                  Call Live Agent
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Admin Login Modal Overlay */}
      <AnimatePresence>
        {showAuthModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAuthModal(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
            />
            
            {/* Modal Dialog Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xl p-8 z-10 text-left"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowAuthModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors p-1.5 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <StoreLogo compact={true} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">Admin Portal Login</h3>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">Access the administrative workspace and inventory settings</p>
                  </div>
                </div>

                <form onSubmit={handleLoginSubmit(onLoginSubmit)} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Mobile Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9876543210 (10-digit)"
                      {...registerLogin("phone", { required: true, pattern: /^[0-9]{10}$/ })}
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:ring-2 focus:ring-amber-600 outline-none transition-all placeholder:text-slate-300 bg-white text-slate-900"
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Password Code</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder="Enter password"
                        {...registerLogin("password", { required: true })}
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:ring-2 focus:ring-amber-600 outline-none transition-all placeholder:text-slate-300 pr-10 bg-white text-slate-900"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    disabled={submitting}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black text-xs h-12 uppercase tracking-wider transition-all shadow-sm rounded-xl mt-4"
                  >
                    {submitting ? "Processing..." : "Secure Sign In"}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Indian Standard Legal Policies Modal */}
      <AnimatePresence>
        {activePolicy && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="policy-modal-overlay">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePolicy(null)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
              id="policy-backdrop"
            />
            
            {/* Modal Dialog Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-w-2xl bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xl flex flex-col max-h-[85vh] z-10 text-left"
              id="policy-modal-content"
            >
              {/* Close Button */}
              <button
                id="close-policy-modal"
                onClick={() => setActivePolicy(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors p-1.5 rounded-full hover:bg-slate-100 z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="p-6 border-b border-slate-100 bg-slate-50">
                <div className="flex items-center gap-2 mb-2 text-amber-600">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Legal & Compliance Hub</span>
                </div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">
                  Studio Policies & Legal Agreements
                </h3>
                <p className="text-[11px] text-slate-500 mt-1">
                  Compliance and standards formulated in accordance with the laws of India.
                </p>
              </div>

              {/* Policy Tab Switchers */}
              <div className="flex border-b border-slate-100 bg-white">
                <button
                  onClick={() => setActivePolicy("privacy")}
                  className={`flex-1 py-3 px-4 text-xs font-black uppercase tracking-wider border-b-2 text-center transition-all ${
                    activePolicy === "privacy"
                      ? "border-amber-600 text-amber-700 bg-amber-50/20"
                      : "border-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-50/50"
                  }`}
                >
                  Privacy Policy
                </button>
                <button
                  onClick={() => setActivePolicy("refund")}
                  className={`flex-1 py-3 px-4 text-xs font-black uppercase tracking-wider border-b-2 text-center transition-all ${
                    activePolicy === "refund"
                      ? "border-amber-600 text-amber-700 bg-amber-50/20"
                      : "border-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-50/50"
                  }`}
                >
                  Refund Policy
                </button>
                <button
                  onClick={() => setActivePolicy("terms")}
                  className={`flex-1 py-3 px-4 text-xs font-black uppercase tracking-wider border-b-2 text-center transition-all ${
                    activePolicy === "terms"
                      ? "border-amber-600 text-amber-700 bg-amber-50/20"
                      : "border-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-50/50"
                  }`}
                >
                  Terms & Conditions
                </button>
              </div>

              {/* Scrollable Document Content */}
              <div className="p-6 overflow-y-auto space-y-6 text-slate-650 text-xs leading-relaxed max-h-[50vh] font-sans">
                {activePolicy === "privacy" && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                        <FileText className="w-4 h-4 text-amber-600" />
                        1. Information Technology Act Compliance
                      </h4>
                      <p>
                        This Privacy Policy is compiled and published in compliance with Section 43A of the **Information Technology Act, 2000** of India and the **Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011** (the "SPDI Rules"). It governs the gathering, processing, storage, and security protocols of any user data collected via our digital portal.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-slate-900 mb-1">2. Scope of Collected Information</h4>
                      <p className="mb-2">
                        We limit data collection exclusively to variables required for seamless service provisioning. This includes:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-slate-600">
                        <li><strong>Identification Details:</strong> Full Name, verified mobile phone numbers, and optional login codes.</li>
                        <li><strong>Preferences & Interaction logs:</strong> Product queries, styling interests, categories filtered, and user navigation trails on our craft catalog.</li>
                        <li><strong>Technical Parameters:</strong> IP address, device telemetry, browser configurations, and location metrics parsed during map rendering.</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-slate-900 mb-1">3. Intended Use & Data Processing</h4>
                      <p className="mb-2">
                        Bisht Uttarakhandi Store uses your stored data strictly for legitimate business objectives, including:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-slate-600">
                        <li>Fulfilling orders, managing customized ornament catalogs, and coordinating on-site event décor logistics.</li>
                        <li>Verifying identities of registered administrators and staff.</li>
                        <li>Answering dynamic support tickets initiated via our priorities helpline.</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-slate-900 mb-1">4. No-Share Policy & Security Safeguards</h4>
                      <p>
                        We do not sell, license, or rent user details to third-party advertising companies. Data sharing is strictly restricted to certified logistical partners (delivery couriers, messaging gateways) on a need-to-know basis. All files are hosted on enterprise cloud servers incorporating robust encryption, token-based firewall protection, and restricted session timeouts.
                      </p>
                    </div>

                    <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
                      <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-2">Statutory Grievance Redressal</h4>
                      <div className="space-y-1 text-[11px] text-slate-600">
                        <p><strong>Officer Representative:</strong> Grievance Cell, Bisht Uttarakhandi Store</p>
                        <p><strong>Physical Address:</strong> SRC 24D, Shipra Riviera, Gyan Khand 3, Indirapuram, Ghaziabad, Uttar Pradesh 201014</p>
                        <p><strong>Helpline Contact:</strong> +91 87506 00385</p>
                        <p><strong>Email Address:</strong> compliance@bishtstore.com</p>
                      </div>
                    </div>
                  </div>
                )}

                {activePolicy === "refund" && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div className="border-l-2 border-amber-500 pl-3 py-1 bg-amber-50/40 rounded-r-lg">
                      <h4 className="text-xs font-black text-amber-800 uppercase tracking-wider mb-0.5">Handcrafted Variation Notice</h4>
                      <p className="text-[11px] text-slate-600">
                        Please note that our ornaments, festive backdrops, and decorative articles are individual masterworks handmade by Indian local artisans. Subtle differences in texturing, wood grain, beadings, or pigments are not flaws, but rather the unique signature of bespoke handicrafts.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                        <FileText className="w-4 h-4 text-amber-600" />
                        1. Return and Replacement Guidelines
                      </h4>
                      <p>
                        In adherence to the **Consumer Protection (E-Commerce) Rules, 2020** of India, we offer a hassle-free **7-Day Return / Replacement Policy** starting from the exact date of package delivery. This applicable protection is restricted to circumstances where the item arrives physically broken, damaged, missing integral components, or significantly deviant from the catalog specifications.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-slate-900 mb-1">2. Claims Process & Unboxing Verification</h4>
                      <p>
                        To successfully raise an eligible claim, users must report the issue within 48 hours of receipt. Providing an unedited unboxing video/photo displaying the shipping label and physical condition of the package to our priority WhatsApp (+91 87506 00385) helps expedite validation.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-slate-900 mb-1">3. Refund Settlements & Timeline</h4>
                      <p>
                        Once returned shipments are safely received and vetted at our Ghaziabad sorting warehouse, refunds are initiated immediately. Approved credits will reflect in your original mode of payment (UPI, Net Banking, credit/debit card) within **5 to 7 business days** in complete alignment with standard Indian inter-bank clearing guidelines.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-slate-900 mb-1">4. Cancellations</h4>
                      <p>
                        Orders can be cancelled completely free of charge within **2 hours** of final submission, or before dispatch operations begin, whichever occurs first. However, bespoke products custom-tailored for wedding designs or booked rentals can not be canceled once fabrication begins.
                      </p>
                    </div>
                  </div>
                )}

                {activePolicy === "terms" && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                        <FileText className="w-4 h-4 text-amber-600" />
                        1. Binding Digital Agreement
                      </h4>
                      <p>
                        By accessing, browsing, querying catalog pricing, or logging into the administrative panels of Bisht Uttarakhandi Store, you accept these Terms & Conditions. This constitutes a binding electronic contract between you and Bisht Uttarakhandi Store under the provisions of the **Indian Contract Act, 1872** and the Information Technology Rules.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-slate-900 mb-1">2. Eligible Account Usage</h4>
                      <p>
                        Usage of our portal is limited to individuals who are competent to contract under Section 11 of the Indian Contract Act, 1872 (typically 18 years of age and above). If registering client details or administrative access, you verify that all details provided are complete, accurate, and kept updated.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-slate-900 mb-1">3. Quotations, Pricing & Indian GST</h4>
                      <p>
                        All listed product prices and decoration budgets are quoted in Indian Rupees (INR) and are subject to final GST (Goods and Services Tax) valuations. Prices listed are carefully audited; however, dynamic updates might occur to align with handcrafted supply-chain variations.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-slate-900 mb-1">4. Limitation of Liability</h4>
                      <p>
                        To the maximum extent permitted by Indian jurisprudence, Bisht Uttarakhandi Store and its artisan affiliates shall not be liable for any indirect, circumstantial, or punitive damages. Our cumulative liability for any verified defect, logistical delay, or service dispute shall strictly remain capped at the final amount received by us for that specific transaction.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-slate-900 mb-1">5. Governing Law and Dispute Jurisdiction</h4>
                      <p>
                        These terms, service operations, and customer resolutions are exclusively governed by the laws of the Republic of India. Any litigation, arbitration, or statutory contestation originating from this website or portal operations shall be subject to the exclusive jurisdiction of competent courts located in **Ghaziabad, Uttar Pradesh, India**.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 shrink-0">
                <Button
                  id="close-policy-ack-button"
                  onClick={() => setActivePolicy(null)}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-black text-xs px-6 py-2.5 rounded-xl cursor-pointer uppercase tracking-wider shadow-sm"
                >
                  Close & Acknowledge
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
    </>
  );
};
