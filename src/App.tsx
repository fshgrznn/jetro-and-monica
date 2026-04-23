import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Heart, 
  MessageSquare, 
  X, 
  Send, 
  Quote, 
  Camera, 
  Menu,
  ChevronRight,
  Church,
  Mic,
  Utensils,
  PartyPopper,
  Music,
  Gift,
  Smartphone,
  Share2,
  Phone,
  QrCode,
  Users,
  GlassWater
} from "lucide-react";
import { GoogleGenAI } from "@google/genai";

// Initialize Gemini (will be used lazily)
const getAi = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not defined");
  }
  return new GoogleGenAI({ apiKey });
};

// --- Animation Configs ---
const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 1, delay, ease: [0.22, 1, 0.36, 1] }
});

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1
    }
  },
  viewport: { once: true }
};

// --- SVGs & Decorative Components ---

const FloralDecoration = ({ className = "" }) => (
  <svg viewBox="0 0 200 200" className={`fill-pink/20 ${className}`} xmlns="http://www.w3.org/2000/svg">
    <path d="M100 0C100 0 110 50 150 50C190 50 200 100 200 100C200 100 150 110 150 150C150 190 100 200 100 200C100 200 90 150 50 150C10 150 0 100 0 100C0 100 50 90 50 50C50 10 100 0 100 0Z" />
  </svg>
);

const FloralDivider = () => (
  <div className="flex items-center justify-center gap-4 my-6 opacity-30">
    <div className="h-[1px] w-24 bg-pink" />
    <Heart className="w-5 h-5 text-pink fill-pink" />
    <div className="h-[1px] w-24 bg-pink" />
  </div>
);

// --- Components ---

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-[100] bg-navy flex flex-col items-center justify-center text-white"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="text-center relative"
      >
        <h1 className="font-serif text-4xl md:text-6xl mb-4 italic tracking-widest text-pink">
          Jetro & Monica
        </h1>
        <div className="w-12 h-[1px] bg-pink/30 mx-auto mb-4" />
        <p className="font-sans text-[10px] uppercase tracking-[0.5em] text-white/70">
          Our Journey Begins
        </p>
        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink/5 blur-3xl rounded-full" />
      </motion.div>
    </motion.div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Our Story", href: "#story" },
    { name: "Details", href: "#details" },
    { name: "Entourage", href: "#entourage" },
    { name: "Gallery", href: "#gallery" },
    { name: "RSVP", href: "#rsvp" }
  ];

  const scrollTo = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-white/90 backdrop-blur-md py-4 shadow-sm" : "bg-transparent py-8"}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <button onClick={() => scrollTo("#home")} className={`font-serif text-2xl transition-colors italic font-semibold ${scrolled ? "text-navy" : "text-white"}`}>J&M</button>
        
        <div className="hidden lg:flex gap-8 items-center">
          {navItems.map((item) => (
            <button 
              key={item.name} 
              onClick={() => scrollTo(item.href)}
              className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-colors relative group ${scrolled ? "text-navy/70" : "text-white/80"}`}
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-pink transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </div>

        <button className={`lg:hidden p-2 transition-colors ${scrolled ? "text-navy" : "text-white"}`} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center lg:hidden overflow-y-auto"
          >
            <FloralDecoration className="absolute top-[-10%] right-[-10%] w-64 h-64 opacity-5 rotate-45" />
            <FloralDecoration className="absolute bottom-[-10%] left-[-10%] w-64 h-64 opacity-5 -rotate-45" />
            
            <button 
              onClick={() => setIsOpen(false)} 
              className="absolute top-8 right-8 text-navy p-2 bg-pink/10 rounded-full hover:bg-pink hover:text-white transition-all duration-300 shadow-sm"
              aria-label="Close menu"
            >
              <X size={28} />
            </button>
            
            <div className="flex flex-col items-center gap-10 py-20 translate-y-[-20px]">
              {navItems.map((item, idx) => (
                <motion.button 
                  key={item.name} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => scrollTo(item.href)}
                  className="text-2xl md:text-3xl uppercase tracking-[0.3em] font-light text-navy hover:text-pink transition-all duration-300 relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-pink transition-all duration-300 group-hover:w-8" />
                </motion.button>
              ))}
            </div>
            
            <div className="mt-12">
               <Heart className="w-6 h-6 text-pink fill-pink opacity-20 animate-pulse" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([
    { role: "bot", text: "Hello! May I assist you with Jetro and Monica's wedding details?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input.toLowerCase();
    const originalMsg = input;
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: originalMsg }]);
    setIsLoading(true);

    // Offline / Local Fallback Logic
    const localResponses: Record<string, string> = {
      date: "The wedding is on October 24, 2026.",
      when: "The ceremony starts at 1:00 PM, followed by the reception at 5:00 PM on October 24, 2026.",
      where: "The ceremony is at the National Shrine of Our Lady of Fatima, and the reception is at Casa de Aurora.",
      location: "Ceremony: National Shrine of Our Lady of Fatima (Valenzuela). Reception: Casa de Aurora.",
      dress: "The dress code is Formal/Semi-formal. Our palette includes Blush Pink, Dusty Rose, Sky Blue, Steel Blue, and Navy Blue.",
      wear: "We suggest Formal or Semi-formal attire in Blush Pink, Dusty Rose, Sky Blue, Steel Blue, or Navy Blue.",
      gift: "Your presence is our best gift! If you'd like to honor us with a contribution, monetary gifts are appreciated as we start our home.",
      hashtag: "Our official wedding hashtag is #JetroMonica.",
      parking: "Yes, ample parking is available at both the church and the reception hall.",
      rsvp: "You can RSVP using the form in the RSVP section of this site by October 20th.",
      kids: "While we love children, our celebration will be an adults-only event.",
      plus: "Due to limited seating, we can only accommodate guests named on the invitation."
    };

    const matchedKey = Object.keys(localResponses).find(key => userMsg.includes(key));

    if (matchedKey) {
      setTimeout(() => {
        setMessages(prev => [...prev, { role: "bot", text: localResponses[matchedKey] }]);
        setIsLoading(false);
      }, 500);
      return;
    }

    try {
      const ai = getAi();
      const result = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [{ role: "user", parts: [{ text: userMsg }] }],
        config: {
          systemInstruction: `You are an elegant wedding concierge for Jetro and Monica's wedding. 
          Theme: Navy Blue and Pink. 
          Date: October 24, 2026. 
          Ceremony: 1:00 PM at National Shrine of Our Lady of Fatima. 
          Dress Code: Formal/Semi-formal (Blush Pink, Dusty Rose, Sky Blue, Steel Blue, Navy Blue).
          Note on Gifts: Monetary gifts are appreciated.
          Unplugged Ceremony: No phones during the service.
          Hashtag: #JetroMonica.
          FAQ: Parking is available at both venues. Arrival suggested at 12:30 PM. No kids (adults-only). No plus-ones unless named. 
          Tone: Very polite, warm, and romantic. Keep answers helpful and brief.`
        }
      });
      
      const botResponse = result.text || "I'm here to help, but having trouble finding the right words. Could you ask again?";
      setMessages(prev => [...prev, { role: "bot", text: botResponse }]);
    } catch (error) {
      console.error("ChatBot error:", error);
      const errorMsg = error instanceof Error && error.message.includes("GEMINI_API_KEY") 
        ? "The wedding concierge is currently unavailable (API Key missing). Please check your configuration."
        : "My connection seems a bit fluttery. Please try again in a moment.";
      setMessages(prev => [...prev, { role: "bot", text: errorMsg }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[60]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-[280px] sm:w-[320px] md:w-[380px] bg-white rounded-3xl shadow-2xl border border-navy/5 overflow-hidden flex flex-col h-[450px] md:h-[500px]"
          >
            <div className="bg-navy p-4 md:p-5 flex justify-between items-center text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-pink/20 flex items-center justify-center border border-pink/30">
                  <Heart className="w-4 h-4 text-pink fill-pink" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold tracking-wider">Wedding Concierge</h4>
                  <p className="text-[10px] text-white/50">Online to help you</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:text-pink transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 p-4 md:p-5 overflow-y-auto space-y-4 bg-blush/10">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-[11px] leading-relaxed ${m.role === "user" ? "bg-navy text-white rounded-tr-none" : "bg-white text-navy shadow-sm rounded-tl-none border border-navy/5"}`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white text-navy px-4 py-3 rounded-2xl border border-navy/5 shadow-sm rounded-tl-none flex gap-1">
                    <span className="w-1 h-1 bg-pink rounded-full animate-bounce" />
                    <span className="w-1 h-1 bg-pink rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1 h-1 bg-pink rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            <div className="p-3 md:p-4 border-t border-navy/5 bg-white">
              <div className="flex gap-2 p-1 bg-blush/30 rounded-full border border-navy/5">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="How can I help you?..."
                  className="flex-1 bg-transparent border-none px-3 py-1.5 md:px-4 md:py-2 text-[11px] outline-none placeholder:text-navy/30"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading}
                  className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-pink flex items-center justify-center text-white hover:bg-navy transition-colors disabled:opacity-50"
                >
                  <Send className="w-3 h-3 md:w-3.5 md:h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-navy shadow-xl flex items-center justify-center text-white hover:bg-pink transition-all duration-500 group relative"
      >
        <MessageSquare className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
        {!isOpen && <span className="absolute top-0 right-0 w-3 h-3 bg-pink rounded-full border-2 border-white animate-pulse" />}
      </button>
    </div>
  );
};

// --- Sections ---

const SectionTitle = ({ title, subtitle, pink = false, white = false, compact = false }: { title: string, subtitle: string, pink?: boolean, white?: boolean, compact?: boolean }) => (
  <motion.div {...fadeIn()} className={`text-center ${compact ? "mb-4" : "mb-8 md:mb-12"} relative`}>
    <span className={`text-[10px] uppercase tracking-[0.4em] font-bold ${pink ? "text-pink" : (white ? "text-white/60" : "text-navy/60")} mb-2 block`}>
      {subtitle}
    </span>
    <h2 className={`text-2xl md:text-4xl font-serif italic ${white ? "text-white" : "text-navy"}`}>
      {title}
    </h2>
    <div className="w-12 h-[1px] bg-pink mx-auto mt-4 opacity-40 shadow-[0_0_8px_rgba(235,120,153,0.3)]" />
  </motion.div>
);

const EntourageList = ({ title, members, columns = 1 }: { title: string, members: string[], columns?: number }) => (
  <motion.div {...fadeIn()} className="mb-8">
    <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-pink mb-3 text-center">{title}</h4>
    <div className={`grid grid-cols-1 ${columns > 1 ? `md:grid-cols-${columns}` : ""} gap-3 text-center`}>
      {members.map((m, i) => (
        <p key={i} className="text-sm text-navy/70 font-light">{m}</p>
      ))}
    </div>
  </motion.div>
);

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date("October 24, 2026 13:00:00").getTime();
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const TimeUnit = ({ value, label }: { value: number, label: string }) => (
    <div className="flex flex-col items-center">
      <div className="text-2xl md:text-3xl font-serif text-pink mb-0.5">
        {value.toString().padStart(2, '0')}
      </div>
      <div className="text-[8px] uppercase tracking-widest text-white/40 font-medium">{label}</div>
    </div>
  );

  return (
    <div className="flex gap-4 md:gap-8 justify-center mt-6">
      <TimeUnit value={timeLeft.days} label="Days" />
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <TimeUnit value={timeLeft.minutes} label="Min" />
      <TimeUnit value={timeLeft.seconds} label="Sec" />
    </div>
  );
};

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 800);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-20 right-4 md:bottom-24 md:right-6 z-[60] w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-2xl flex items-center justify-center text-navy hover:text-pink transition-colors border border-navy/5"
        >
          <ChevronRight className="-rotate-90 w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Jetro & Monica | Wedding Invitation";
    
    // Set Heart Favicon Dynamically
    const link = document.querySelector("link[rel~='icon']") || document.createElement('link');
    (link as any).rel = 'icon';
    link.setAttribute('href', 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💖</text></svg>');
    document.getElementsByTagName('head')[0].appendChild(link);
  }, []);

  if (loading) return <Preloader onComplete={() => setLoading(false)} />;

  return (
    <div className="relative">
      <Navbar />
      <ChatBot />
      <BackToTop />

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden bg-navy border-b border-white/5">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop" 
            alt="Wedding background" 
            className="w-full h-full object-cover opacity-30 scale-105 animate-pulse-slow"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-transparent to-navy/90" />
        </div>

        <FloralDecoration className="absolute top-[-5%] left-[-5%] w-96 h-96 opacity-10 animate-flower z-10" />
        <FloralDecoration className="absolute bottom-[-5%] right-[-5%] w-96 h-96 opacity-10 animate-flower [animation-delay:2s] z-10" />
        
        <motion.div {...fadeIn()} className="relative z-10 w-full max-w-[90vw]">
          <p className="uppercase tracking-[0.5em] text-[8px] md:text-[10px] text-pink font-bold mb-6 italic">You are invited</p>
          <div className="relative mb-6">
            <h1 className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-white mb-3 tracking-tighter relative leading-none flex flex-col sm:inline-block">
              <span>Jetro</span> <span className="text-pink sm:inline">&</span> <span>Monica</span>
            </h1>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-[0.06] select-none pointer-events-none">
              <Heart className="w-32 h-32 md:w-[240px] md:h-[240px]" fill="currentColor" />
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-[1px] w-10 bg-pink/50" />
            <p className="text-base md:text-xl font-serif italic text-pink/90">October 24, 2026</p>
            <div className="h-[1px] w-10 bg-pink/50" />
          </div>
          
          <CountdownTimer />
          
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/50 font-medium mt-12">at 1:00 PM</p>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-12 z-10"
        >
          <ChevronRight size={24} className="rotate-90 text-pink/80" />
        </motion.div>
      </section>

      {/* Our Story / Intro Redesign */}
      <section id="story" className="section-padding bg-white relative overflow-hidden border-y border-navy/5">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blush/30 -z-10" />
        <div className="absolute top-1/2 left-0 -translate-y-1/2 opacity-[0.05] select-none pointer-events-none -z-10">
          <p className="text-[20rem] font-serif leading-none italic font-bold text-navy">J&M</p>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-32 relative z-10">
          {/* Layered Image Composition */}
          <div className="flex-1 relative order-2 lg:order-1">
            <motion.div 
              {...fadeIn(0.1)}
              className="relative z-20 w-3/4 ml-auto"
            >
              <div className="absolute -inset-4 border-2 border-pink/10 rounded-[3rem] -z-10 animate-pulse-slow" />
              <img 
                src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop" 
                alt="The Couple"
                className="w-full h-[320px] md:h-[450px] object-cover rounded-[2rem] shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </motion.div>
            
            <motion.div 
              {...fadeIn(0.4)}
              className="absolute -bottom-10 -left-6 md:-left-12 z-30 w-1/2 group"
            >
              <div className="bg-white p-4 rounded-[2rem] shadow-2xl transform -rotate-3 group-hover:rotate-0 transition-transform duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1591604466107-ec97de577aff?q=80&w=2071&auto=format&fit=crop" 
                  alt="Couple Detail"
                  className="w-full aspect-square object-cover rounded-2xl mb-4"
                />
                <p className="text-[10px] uppercase tracking-widest text-center text-navy/40 font-bold">2018 — Present</p>
              </div>
            </motion.div>
            
            {/* Floral Floating Detail */}
            <div className="absolute -top-10 -right-10 opacity-20">
              <FloralDecoration className="w-48 h-48 rotate-45" />
            </div>
          </div>

          {/* Story Content */}
          <div className="flex-1 text-center lg:text-left order-1 lg:order-2">
            <SectionTitle title="The Story of Us" subtitle="Our Beginning" />
            
            <motion.div {...fadeIn(0.2)} className="space-y-10">
              <div className="relative">
                <Quote className="absolute -top-8 -left-8 text-pink/10 w-16 h-16" />
                <p className="text-2xl md:text-3xl font-serif italic text-navy/90 leading-tight">
                  "Life’s most beautiful moments are those shared with the one you love."
                </p>
              </div>
              
              <div className="space-y-6">
                <p className="text-navy/60 font-light leading-loose text-sm md:text-md">
                  Together with their families, <span className="font-bold text-navy uppercase tracking-widest text-xs">Jetro & Monica</span> invite you to witness the beginning of their new journey as one. We've spent our days building dreams and our nights planning a future that starts with you by our side.
                </p>
                
                <div className="flex justify-center lg:justify-start pt-4">
                  <div className="h-[1px] w-24 bg-pink/30 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-pink rounded-full" />
                  </div>
                </div>
              </div>

              {/* Milestone Timeline cards - Redesigned */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                {[
                  { label: "First Met", date: "June 2018", icon: "✨", color: "bg-blush" },
                  { label: "First Date", date: "July 2018", icon: "☕", color: "bg-pink/5" },
                  { label: "The Proposal", date: "Dec 2024", icon: "💍", color: "bg-navy text-white" }
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ y: -3 }}
                    className={`text-center p-4 rounded-2xl border border-pink/5 shadow-sm ${item.color} transition-all duration-300 group`}
                  >
                    <div className="text-xl mb-2 group-hover:scale-110 transition-transform">{item.icon}</div>
                    <p className={`text-[9px] uppercase tracking-[0.2em] font-bold mb-0.5 ${item.color.includes('navy') ? 'text-pink' : 'text-navy'}`}>{item.label}</p>
                    <p className={`text-[10px] ${item.color.includes('navy') ? 'text-white/50' : 'text-navy/50'}`}>{item.date}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Details Section Redesign (Where & When) */}
      <section id="details" className="section-padding bg-white relative overflow-hidden border-y border-navy/5">
        {/* Artistic Background Elements */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-pink/5 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-navy/5 rounded-full blur-[100px] -z-10" />

        <div className="max-w-7xl mx-auto">
          <SectionTitle title="The Celebration" subtitle="Where & When" pink />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Ceremony - Artistic Card */}
            <motion.div 
              {...fadeIn(0.1)} 
              className="group"
            >
              <div className="relative rounded-[2rem] overflow-hidden bg-navy/20 text-white shadow-lg h-[320px] md:h-[420px]">
                <img 
                  src="https://storage.googleapis.com/fetch-ais-artifacts/jtzzgt3lqy4cjpnahq33n3/ee3b6a90-be95-4672-8703-a18ba2813df9.png" 
                  alt="National Shrine of Our Lady of Fatima Altar" 
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover opacity-100 group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent" />
                
                <div className="absolute inset-0 p-5 md:p-8 flex flex-col justify-end">
                  <div className="mb-2 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-pink/20 backdrop-blur-md flex items-center justify-center text-pink">
                      <Church size={16} />
                    </div>
                    <span className="text-[8px] uppercase tracking-[0.3em] font-bold text-pink/80">The Sacred Vows</span>
                  </div>
                  
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-serif italic mb-3 leading-tight">National Shrine of Our Lady of Fatima</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative z-10 border-t border-white/10 pt-3 mt-1">
                    <div className="space-y-0.5">
                       <p className="flex items-center gap-2 text-pink text-[8px] uppercase tracking-widest font-bold">Location</p>
                       <p className="text-white/80 font-light leading-relaxed text-[10px]">Fatima Avenue, Marulas, Valenzuela City</p>
                    </div>
                    <div className="space-y-0.5">
                       <p className="flex items-center gap-2 text-pink text-[8px] uppercase tracking-widest font-bold">Schedule</p>
                       <p className="text-white/80 font-light leading-relaxed text-[10px]">One O'Clock in the Afternoon<br/><span className="text-pink/60 text-[8px] text-nowrap">October 24, 2026</span></p>
                    </div>
                  </div>

                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=National+Shrine+of+Our+Lady+of+Fatima+Valenzuela" 
                    target="_blank" 
                    rel="noreferrer"
                    className="mt-5 self-start px-5 py-2 bg-white text-navy rounded-full font-bold uppercase text-[8px] tracking-widest hover:bg-pink hover:text-white transition-all duration-300 shadow-md"
                  >
                    Open in Maps
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Reception - Artistic Card */}
            <motion.div 
              {...fadeIn(0.3)} 
              className="group"
            >
              <div className="relative rounded-[2rem] overflow-hidden bg-navy text-white shadow-lg h-[320px] md:h-[420px]">
                <img 
                  src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2074&auto=format&fit=crop" 
                  alt="Reception Venue" 
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />
                
                <div className="absolute inset-0 p-5 md:p-8 flex flex-col justify-end">
                  <div className="mb-2 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-pink/20 backdrop-blur-md flex items-center justify-center text-pink">
                      <Utensils size={16} />
                    </div>
                    <span className="text-[8px] uppercase tracking-[0.3em] font-bold text-pink/80">The Banquet</span>
                  </div>
                  
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-serif italic mb-3 leading-tight">Reception Dinner & Celebration</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative z-10 border-t border-white/10 pt-3 mt-1">
                    <div className="space-y-0.5">
                       <p className="flex items-center gap-2 text-pink text-[8px] uppercase tracking-widest font-bold">Venue</p>
                       <p className="text-white/80 font-light leading-relaxed text-[10px]">Casa de Aurora Reception Hall</p>
                    </div>
                    <div className="space-y-0.5">
                       <p className="flex items-center gap-2 text-pink text-[8px] uppercase tracking-widest font-bold">Schedule</p>
                       <p className="text-white/80 font-light leading-relaxed text-[10px]">Five O'Clock in the Afternoon<br/><span className="text-pink/60 text-[8px] text-nowrap">October 24, 2026</span></p>
                    </div>
                  </div>

                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=Casa+de+Aurora+Valenzuela" 
                    target="_blank" 
                    rel="noreferrer"
                    className="mt-5 self-start px-5 py-2 bg-white text-navy rounded-full font-bold uppercase text-[8px] tracking-widest hover:bg-pink hover:text-white transition-all duration-300 shadow-md"
                  >
                    Open in Maps
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="section-padding bg-white relative overflow-hidden border-y border-navy/5">
        <div className="max-w-7xl mx-auto">
          <SectionTitle title="The Wedding Schedule" subtitle="Moments to Cherish" pink />
          
          <div className="relative pt-12">
            {/* Center Line */}
            <div className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-pink/10 to-transparent md:-translate-x-1/2" />
            
            <div className="space-y-6 md:space-y-16 relative">
              {[
                { time: "1:00 PM", title: "Ceremony", desc: "Witness the sacred exchange of vows as we become one.", icon: "⛪" },
                { time: "2:00 PM", title: "Photos", desc: "A time for family and friends to capture everlasting memories.", icon: "📸" },
                { time: "3:00 PM", title: "Programme", desc: "The official celebration begins with heartfelt moments and joy.", icon: "✨" },
                { time: "5:00 PM", title: "Dinner", desc: "A celebratory banquet shared with our dearest family and friends.", icon: "🍽️" },
                { time: "7:00 PM", title: "Party", desc: "Laughter, toasts, and dancing the night away.", icon: "🕺" }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  {...fadeIn()}
                  className={`flex items-center gap-6 md:gap-0 ${i % 2 === 0 ? "flex-row-reverse" : "flex-row-reverse md:flex-row"}`}
                >
                  {/* Content Container */}
                  <div className={`flex-1 text-left ${i % 2 === 0 ? "md:text-left md:pl-16" : "md:text-right md:pr-16"}`}>
                    <motion.div 
                      whileHover={{ y: -5 }}
                      className="p-6 md:p-8 rounded-[2rem] bg-blush/20 border border-pink/5 hover:border-pink/20 transition-all duration-500 shadow-sm group hover:shadow-xl hover:bg-white"
                    >
                      <p className="text-pink font-bold text-[10px] uppercase tracking-[0.2em] mb-2 italic">{item.time}</p>
                      <h4 className="text-xl md:text-2xl font-serif italic text-navy mb-2">{item.title}</h4>
                      <p className="text-sm text-navy/50 leading-relaxed font-light">{item.desc}</p>
                    </motion.div>
                  </div>

                  {/* Icon Node */}
                  <div className="relative z-10 w-[60px] md:w-32 flex justify-center shrink-0">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white border-4 border-blush flex items-center justify-center shadow-lg text-xl md:text-2xl hover:scale-125 transition-transform duration-500 z-10 relative">
                      <span className="relative z-10">{item.icon}</span>
                      <div className="absolute inset-0 rounded-full bg-pink/5 animate-ping opacity-20" />
                    </div>
                  </div>

                  {/* Empty Spacer for Desktop */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dress Code Section */}
      <section className="section-padding bg-navy text-white text-center relative overflow-hidden border-y border-white/5">
        <FloralDecoration className="absolute top-[-10%] right-[-5%] w-64 h-64 opacity-5 rotate-180" />
        <div className="max-w-4xl mx-auto">
          <SectionTitle title="Dress Code" subtitle="Color Theme & Attire Guide" white />
          <motion.div {...fadeIn()} className="mb-12">
             <p className="text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
               We kindly encourage our guests to wear formal or semi-formal attire in the following color palette as we celebrate our special day together:
             </p>
             <div className="flex flex-wrap justify-center gap-6 mb-12">
               {[
                 { name: "Blush Pink", color: "bg-[#f4d3d3]" },
                 { name: "Dusty Rose", color: "bg-[#d6a4a4]" },
                 { name: "Sky Blue", color: "bg-[#87ceeb]" },
                 { name: "Steel Blue", color: "bg-[#4682b4]" },
                 { name: "Navy Blue", color: "bg-[#0a192f]" }
               ].map((c, i) => (
                 <div key={i} className="flex flex-col items-center gap-3">
                   <div className={`w-12 h-12 rounded-full ${c.color} border border-white/20 shadow-xl`} />
                   <span className="text-[10px] uppercase tracking-widest text-white/50">{c.name}</span>
                 </div>
               ))}
             </div>
             <p className="text-[11px] font-medium text-pink italic tracking-wider">
               (Kindly avoid wearing colors outside this palette to maintain the harmony of the event.)
             </p>
          </motion.div>
          
          <FloralDivider />
          
          <motion.div {...fadeIn()} className="mt-16">
            <h4 className="font-serif text-2xl italic mb-10">Guest Etiquette</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20 max-w-4xl mx-auto">
              {[
                { icon: Clock, title: "Be on Time", desc: "The ceremony starts promptly at 1:00 PM." },
                { icon: Users, title: "Finish the Event", desc: "We would love for you to stay until the end of our program." },
                { icon: GlassWater, title: "Enjoy & Have Fun", desc: "Celebrate with us! Good food and music await." }
              ].map((item, i) => (
                <motion.div key={i} {...fadeIn(i * 0.1)} className="flex flex-col items-center group">
                  <div className="w-16 h-16 rounded-full bg-pink/10 flex items-center justify-center text-pink mb-4 group-hover:scale-110 transition-transform duration-500 border border-pink/20">
                    <item.icon size={24} strokeWidth={1.5} />
                  </div>
                  <h5 className="font-serif italic text-lg mb-1 text-white">{item.title}</h5>
                  <p className="text-[9px] uppercase tracking-widest text-white/40">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="max-w-xl mx-auto pt-10 border-t border-white/5">
              <h4 className="font-serif text-xl italic mb-6 text-pink">Unplugged Ceremony</h4>
              <div className="space-y-4">
                <div className="flex flex-col items-center gap-3 text-center">
                  <Smartphone className="text-pink w-6 h-6 mb-1 opacity-50" />
                  <p className="text-xs text-white/70 max-w-sm leading-relaxed italic">
                    Professional photographers will capture the ceremony. We ask you to be fully present with us without devices.
                  </p>
                </div>
                
                <div className="flex flex-col items-center gap-3 text-center mt-8">
                  <Share2 className="text-pink w-6 h-6 mb-1 opacity-50" />
                  <p className="text-xs text-white/70 max-w-sm leading-relaxed italic">
                    You are encouraged to snap and share all the special moments during the reception using our hashtag below.
                  </p>
                  <p className="mt-2 font-bold text-3xl text-pink tracking-[0.2em] font-serif">#JetroMonica</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Entourage Section */}
      <section id="entourage" className="section-padding bg-white relative border-y border-navy/5">
        <div className="max-w-4xl mx-auto">
          <SectionTitle title="The Entourage" subtitle="Our Loved Ones" pink />
          
          <div className="space-y-10">
            {/* Top Part (from first image) */}
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                <EntourageList title="Parents of the Groom" members={["Jenny Escoto", "Ronnie Escoto (Brother)"]} />
                <EntourageList title="Parents of the Bride" members={["Rosalina Nava", "John Nava"]} />
              </div>
              
              <div className="pt-2">
                <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-pink mb-3 text-center">Principal Sponsors</h4>
                <p className="text-[10px] text-center text-navy/40 mb-4 italic">To stand as principal witnesses in our exchange of vows</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-6">
                  <div className="space-y-2 text-center text-sm text-navy/70">
                    <p>Mr. & Mrs. Principal Sponsor</p>
                    <p>Mr. & Mrs. Principal Sponsor</p>
                    <p>Mr. & Mrs. Principal Sponsor</p>
                  </div>
                  <div className="space-y-2 text-center text-sm text-navy/70">
                    <p>Mr. & Mrs. Principal Sponsor</p>
                    <p>Mr. & Mrs. Principal Sponsor</p>
                    <p>Mr. & Mrs. Principal Sponsor</p>
                  </div>
                </div>
              </div>
            </div>

            <FloralDivider />

            {/* Bottom Part (from second image) */}
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <EntourageList title="Best Man" members={["Angelito"]} />
                <EntourageList title="Maid of Honor" members={["Jessa Mae Lumansoc"]} />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <EntourageList title="Candle" members={["1", "2"]} />
                <EntourageList title="Veil" members={["1", "2"]} />
                <EntourageList title="Cord" members={["1", "2"]} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <EntourageList title="Groomsmen" members={["1", "2", "3", "4", "5", "6", "7", "8", "9"]} />
                <EntourageList title="Bridesmaids" members={["1", "2", "3", "4", "5", "6", "7", "8", "9"]} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <EntourageList title="Bearers" members={["Ring Bearer", "Coin Bearer", "Bible Bearer"]} />
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-pink mb-3 text-center">Flower Girl</h4>
                    <p className="text-sm text-navy/70 font-light text-center">Maleiah Ellise Nava</p>
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-pink mb-3 text-center">Flower Boys</h4>
                    <p className="text-sm text-navy/70 font-light text-center">Einnor Briam Escoto</p>
                    <p className="text-sm text-navy/70 font-light text-center">Aries Damien De Vera</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center">
             <p className="italic font-serif text-lg text-navy/50">And many others who assist us in our needs...</p>
          </div>
        </div>
      </section>

      {/* Gallery Section Placeholder */}
      <section id="gallery" className="section-padding overflow-hidden bg-white border-y border-navy/5">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle title="Our Gallery" subtitle="Moments" pink />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mask-fade">
            {[
              "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1974&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?q=80&w=2070&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1465495910483-0d674b078fc6?q=80&w=2070&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1519225497282-d4e3965fc548?q=80&w=2070&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=2070&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1507504031003-b417219a0fde?q=80&w=2070&auto=format&fit=crop"
            ].map((url, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.05 }}
                className={`aspect-square md:aspect-[3/4] bg-blush/50 rounded-2xl md:rounded-3xl overflow-hidden shadow-inner border border-navy/5 ${i % 3 === 0 ? "lg:translate-y-6" : ""}`}
              >
                 <img src={url} alt={`Gallery ${i}`} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RSVP Section Redesign */}
      <section id="rsvp" className="section-padding bg-blush/30 border-y border-pink/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
            
            {/* Left Column: QR & Info */}
            <motion.div {...fadeIn()} className="bg-white p-6 md:p-10 rounded-[2.5rem] shadow-lg text-center flex flex-col items-center justify-center relative overflow-hidden">
               <div className="absolute top-0 right-0 p-6 opacity-5">
                  <Heart size={80} className="text-pink" />
               </div>
               <SectionTitle title="RSVP Online" subtitle="Connect With Us" pink compact />
               
              {/* Simulated QR Code */}
              <div className="group relative cursor-pointer" onClick={() => window.open('https://forms.gle/your-gform-link', '_blank')}>
                <div className="w-36 h-36 bg-navy flex items-center justify-center rounded-2xl relative overflow-hidden ring-4 ring-pink/5">
                   <QrCode className="text-white w-28 h-28 opacity-60" />
                   <div className="absolute inset-0 flex items-center justify-center">
                         <div className="bg-white p-2 rounded-xl shadow-xl scale-110">
                            <Heart className="text-pink fill-pink w-4 h-4 animate-pulse" />
                         </div>
                      </div>
                   </div>
                   <div className="absolute inset-0 bg-pink/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px] rounded-2xl">
                     <p className="text-[8px] font-bold text-white uppercase tracking-widest bg-navy px-3 py-1.5 rounded-full shadow-lg">Scan me</p>
                   </div>
                 </div>

               <p className="text-navy/50 text-[9px] mt-6 mb-6 uppercase tracking-[0.2em] max-w-[240px] mx-auto leading-relaxed">
                 Scan the QR code above or click the button below to confirm your attendance.
               </p>

               <a 
                 href="https://forms.gle/your-gform-link" 
                 target="_blank"
                 rel="noreferrer"
                 className="group inline-flex items-center gap-3 px-8 py-3.5 bg-navy text-white rounded-full font-bold uppercase text-[9px] tracking-[0.2em] hover:bg-pink transition-all duration-500 shadow-xl"
               >
                 <span className="group-hover:scale-125 transition-transform text-sm">💌</span>
                 RSVP HERE
               </a>

               <p className="mt-6 text-[8px] text-pink/40 uppercase tracking-[0.3em] font-medium">Please respond on or before Oct 20th</p>
            </motion.div>

            {/* Right Column: Note & Participation */}
            <motion.div {...fadeIn(0.2)} className="bg-navy p-6 md:p-10 rounded-[2.5rem] shadow-xl text-white flex flex-col justify-center relative overflow-hidden group">
              <FloralDecoration className="absolute bottom-[-10%] right-[-10%] w-48 h-48 opacity-5 rotate-45 group-hover:opacity-10 transition-opacity duration-1000" />
              <SectionTitle title="A Note of Love" subtitle="Guest Information" white compact />
              
              <div className="space-y-6 relative z-10">
                <div className="relative">
                  <div className="absolute -left-4 top-0 bottom-0 w-[1px] bg-pink/30" />
                  <p className="italic font-serif text-xl text-white/90 leading-relaxed pl-4">
                    "Your presence at our wedding is the greatest gift. Should you wish to honor us with a contribution, it will help us build our home as one."
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-[9px] uppercase tracking-[0.2em] font-bold text-pink mb-3">Availability Note</h4>
                    <p className="text-xs text-white/50 leading-relaxed font-light">
                      We kindly ask you to confirm your attendance so we can finalize our guest list. Let us know of any dietary restrictions through the form on the left.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5">
                     <p className="text-pink font-serif italic text-base mb-1">Wishing to see you there,</p>
                     <p className="text-2xl font-serif text-white italic">Jetro & Monica</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 flex justify-start">
                 <div className="h-[1px] w-12 bg-pink opacity-50" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section Moved to End */}
      <section id="faq" className="section-padding bg-white relative overflow-hidden pb-12 border-y border-navy/5">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <SectionTitle title="Common Questions" subtitle="Guest Guide" pink />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mt-16 px-4">
            {[
              { q: "Is there parking at the venue?", a: "Yes, there is ample parking available at both the Church and the Reception venue." },
              { q: "What time should I arrive?", a: "We recommend arriving at least 30 minutes before the ceremony starts (12:30 PM)." },
              { q: "Are kids allowed?", a: "While we love your little ones, our reception will be an adults-only celebration." },
              { q: "Can I bring a plus one?", a: "Due to limited seating, we can only accommodate guests named on the invitation." }
            ].map((faq, i) => (
              <motion.div 
                key={i} 
                {...fadeIn(i * 0.1)}
                className="p-6 md:p-8 bg-blush/30 rounded-3xl border border-pink/5 hover:border-pink/20 transition-all duration-300 group"
              >
                <p className="text-pink font-bold text-sm mb-3 uppercase tracking-widest italic group-hover:translate-x-1 transition-transform">Q: {faq.q}</p>
                <div className="h-[1px] w-8 bg-pink/20 mb-4" />
                <p className="text-navy/60 text-xs leading-relaxed font-light">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <FloralDecoration className="absolute bottom-[-10%] left-[-10%] w-64 h-64 opacity-5 rotate-12" />
      </section>

      {/* Final Footer */}
      <footer className="py-24 text-center bg-navy text-white relative overflow-hidden">
        <FloralDecoration className="absolute bottom-0 left-0 w-64 h-64 opacity-5 rotate-45 translate-y-20 -translate-x-20" />
        <p className="font-display text-5xl md:text-7xl italic text-white mb-8">Jetro <span className="text-pink">&</span> Monica</p>
        <div className="flex items-center justify-center gap-4 mb-8">
           <Heart fill="#eb7899" className="text-pink w-5 h-5 animate-pulse" />
        </div>
        <p className="text-[10px] uppercase tracking-[0.5em] text-white/50 font-medium">Thank you for being part of our beginning</p>
        <p className="mt-16 text-[10px] text-white/20 font-light tracking-widest uppercase">© 2026 Jetro & Monica | Engagement Studio</p>
      </footer>
    </div>
  );
}


