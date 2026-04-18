import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring, useMotionValue, animate, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowRight, BrainCircuit, Search, ListTodo, Users, BarChart3, Shield, Zap, Sparkles, Code, Play, Home, Calendar, Bell, Sun, Moon } from 'lucide-react';

const testimonials = [
  { name: "Sarah Chen", role: "Engineering Manager @ Stripe", avatar: "S", color: "from-violet-400 to-violet-600", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200", quote: "MeetMind saved us hours every week. I never walk into a meeting blind anymore — my context is always ready." },
  { name: "Marcus Reid", role: "Product Lead @ Notion", avatar: "M", color: "from-blue-400 to-blue-600", image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200", quote: "The Smart Join feature is magic. It knows exactly what I cared about last time and brings it front and center." },
  { name: "Priya Kapoor", role: "CTO @ Linear", avatar: "P", color: "from-emerald-400 to-emerald-600", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200", quote: "Our team made better decisions after adopting MeetMind. Every action item gets tracked automatically." },
  { name: "Tom Walsh", role: "CEO @ Loom", avatar: "T", color: "from-rose-400 to-rose-500", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200", quote: "I was skeptical at first, but MeetMind is genuinely the best tool we've added to our stack this year." },
  { name: "Aisha Johnson", role: "Head of Design @ Figma", avatar: "A", color: "from-amber-400 to-amber-500", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200", quote: "Finally a tool that understands meetings are about people, not just notes. The per-person memory is incredible." },
  { name: "David Kim", role: "VP Engineering @ Vercel", avatar: "D", color: "from-teal-400 to-teal-600", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200", quote: "Onboarding new engineers went from painful to seamless. They catch up on past decisions instantly." },
];

const features = [
  { icon: <BrainCircuit size={20} className="text-indigo-400" />, title: "AI Meeting Memory", desc: "MeetMind automatically captures and remembers everything said, decided, and assigned across every meeting.", image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&auto=format&fit=crop" },
  { icon: <Sparkles size={20} className="text-blue-400" />, title: "Smart Join", desc: "Get a personalized briefing before you join — what you said last time, your tasks, and key decisions.", image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=800&auto=format&fit=crop" },
  { icon: <ListTodo size={20} className="text-purple-400" />, title: "Action Tracking", desc: "Every task automatically gets an owner and deadline. Nothing slips through the cracks again.", image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop" },
  { icon: <Search size={20} className="text-indigo-400" />, title: "Intelligent Search", desc: "Find any decision, quote, or action item across months of meetings in seconds.", image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop" },
  { icon: <Users size={20} className="text-blue-400" />, title: "Team Context", desc: "See what each teammate said, flagged, or committed to — across all meetings.", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop" },
  { icon: <BarChart3 size={20} className="text-purple-400" />, title: "Meeting Analytics", desc: "Understand meeting health, participation trends, and decision velocity over time.", image: "https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=800&auto=format&fit=crop" },
];

const steps = [
  { 
    num: "01", 
    title: "Connect Calendar", 
    desc: "MeetMind securely connects to Google or Outlook to auto-join your scheduled meetings. No manual bot invites required.",
    image: "https://images.unsplash.com/photo-1506784951206-3962201a52e0?q=80&w=800&auto=format&fit=crop"
  },
  { 
    num: "02", 
    title: "Automated Analysis", 
    desc: "Our AI processes transcripts in real-time, extracting decisions, tasks, and context into structured memory.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"
  },
  { 
    num: "03", 
    title: "Personalized Memory", 
    desc: "Access your tailored insights before your next meeting starts via the dashboard. Always arrive fully prepared.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop"
  }
];

// --- Subcomponents ---

const StepGraphic = ({ num }) => {
  if (num === "01") {
     return (
       <div className="w-full h-[350px] rounded-2xl relative z-10 border border-white/10 bg-white dark:bg-[#0B0F1A] overflow-hidden flex items-center justify-center transition-colors duration-300">
          {/* Ambient colorful glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 blur-[60px] rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 blur-[60px] rounded-full"></div>
          
          <div className="glass-card w-72 h-80 rounded-2xl border-white/10 p-5 flex flex-col gap-4 relative z-10 shadow-2xl">
             <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                   <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                      {/* Fake Google Calendar Icon */}
                      <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                         <div className="bg-blue-500 rounded-sm"></div>
                         <div className="bg-red-500 rounded-sm"></div>
                         <div className="bg-yellow-400 rounded-sm"></div>
                         <div className="bg-green-500 rounded-sm"></div>
                      </div>
                   </div>
                   <span className="text-base font-bold text-slate-900 dark:text-white tracking-wide">Calendar</span>
                </div>
                <div className="w-10 h-5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center p-0.5 justify-end shadow-[0_0_10px_rgba(99,102,241,0.5)]">
                   <div className="w-4 h-4 rounded-full bg-white shadow-sm"></div>
                </div>
             </div>
             
             {/* Colorful Events */}
             <div className="space-y-3">
                <div className="rounded-xl bg-gradient-to-r from-blue-500/20 to-blue-500/5 border border-blue-500/30 p-3 flex gap-4 items-center group hover:bg-blue-500/30 transition-colors">
                   <div className="w-1.5 h-10 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
                   <div className="flex-1">
                      <div className="text-sm font-bold text-blue-100 mb-1">Product Sync</div>
                      <div className="text-[10px] text-blue-300 font-medium">10:00 AM - 11:00 AM</div>
                   </div>
                </div>
                
                <div className="rounded-xl bg-gradient-to-r from-purple-500/20 to-purple-500/5 border border-purple-500/30 p-3 flex gap-4 items-center group hover:bg-purple-500/30 transition-colors">
                   <div className="w-1.5 h-10 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></div>
                   <div className="flex-1">
                      <div className="text-sm font-bold text-purple-100 mb-1">Design Review</div>
                      <div className="text-[10px] text-purple-300 font-medium">2:00 PM - 3:30 PM</div>
                   </div>
                </div>

                <div className="rounded-xl bg-gradient-to-r from-rose-500/20 to-rose-500/5 border border-rose-500/30 p-3 flex gap-4 items-center group hover:bg-rose-500/30 transition-colors">
                   <div className="w-1.5 h-10 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]"></div>
                   <div className="flex-1">
                      <div className="text-sm font-bold text-rose-100 mb-1">Q3 Roadmap</div>
                      <div className="text-[10px] text-rose-300 font-medium">4:00 PM - 5:00 PM</div>
                   </div>
                </div>
             </div>
          </div>
       </div>
     );
  } else if (num === "02") {
     return (
       <div className="w-full h-[350px] rounded-2xl relative z-10 border border-white/10 bg-white dark:bg-[#0B0F1A] overflow-hidden flex items-center justify-center transition-colors duration-300">
          {/* Ambient colorful glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/20 blur-[80px] rounded-full"></div>
          
          <div className="glass-card w-80 h-72 rounded-2xl border-white/10 p-6 flex flex-col relative z-10 shadow-2xl">
             <div className="flex items-center gap-3 text-purple-400 mb-6 border-b border-white/10 pb-4">
                <div className="p-2 rounded-lg bg-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                   <BrainCircuit size={20} className="animate-pulse text-purple-300" />
                </div>
                <span className="text-sm font-bold uppercase tracking-widest text-purple-200">AI Analysis Active</span>
             </div>
             
             {/* Colorful Audio Waveform / Processing */}
             <div className="flex items-end justify-center gap-1.5 h-20 mb-6">
                {[40, 70, 45, 90, 65, 30, 85, 50, 75, 35, 60, 40].map((h, i) => (
                   <motion.div 
                     key={i} 
                     animate={{ height: [`${h}%`, `${Math.max(20, h - 30)}%`, `${h}%`] }}
                     transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                     className="w-2 rounded-full bg-gradient-to-t from-indigo-500 via-purple-500 to-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.5)]"
                   ></motion.div>
                ))}
             </div>
             
             <div className="space-y-4 mt-auto">
                <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                      <span className="text-xs font-semibold text-emerald-200">Decisions Extracted</span>
                   </div>
                   <span className="text-sm font-black text-emerald-400">4</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.8)]"></div>
                      <span className="text-xs font-semibold text-amber-200">Action Items Created</span>
                   </div>
                   <span className="text-sm font-black text-amber-400">7</span>
                </div>
             </div>
          </div>
       </div>
     );
  } else {
     return (
       <div className="w-full h-[350px] rounded-2xl relative z-10 border border-white/10 bg-white dark:bg-[#0B0F1A] overflow-hidden flex items-center justify-center transition-colors duration-300">
          {/* Ambient colorful glow */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/20 blur-[70px] rounded-full"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/20 blur-[70px] rounded-full"></div>
          
          <div className="glass-card w-80 h-72 rounded-2xl border-white/10 p-5 flex flex-col gap-4 relative z-10 shadow-2xl">
             <div className="flex gap-4">
                <div className="flex-1 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/5 border border-blue-500/30 p-4 flex flex-col items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.15)] relative overflow-hidden group">
                   <div className="absolute inset-0 bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors"></div>
                   <span className="text-xs font-semibold text-blue-200 mb-1 relative z-10">Time Saved</span>
                   <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-200 to-blue-500 relative z-10">12h</span>
                </div>
                <div className="flex-1 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/5 border border-emerald-500/30 p-4 flex flex-col items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.15)] relative overflow-hidden group">
                   <div className="absolute inset-0 bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors"></div>
                   <span className="text-xs font-semibold text-emerald-200 mb-1 relative z-10">Open Tasks</span>
                   <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-200 to-emerald-500 relative z-10">5</span>
                </div>
             </div>
             
             {/* Colorful Bar Chart */}
             <div className="flex-1 rounded-xl bg-white/5 border border-white/10 p-4 flex flex-col">
                <span className="text-xs font-semibold text-gray-300 mb-3">Participation Trends</span>
                <div className="flex-1 flex items-end justify-between gap-2 px-2">
                   {[
                     { h: '60%', c: 'from-blue-400 to-blue-600' },
                     { h: '80%', c: 'from-indigo-400 to-indigo-600' },
                     { h: '40%', c: 'from-purple-400 to-purple-600' },
                     { h: '90%', c: 'from-rose-400 to-rose-600' },
                     { h: '70%', c: 'from-amber-400 to-amber-600' },
                   ].map((bar, i) => (
                      <motion.div 
                        key={i}
                        initial={{ height: 0 }}
                        whileInView={{ height: bar.h }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className={`w-full rounded-t-md bg-gradient-to-t ${bar.c} shadow-[0_0_10px_rgba(255,255,255,0.1)]`}
                      ></motion.div>
                   ))}
                </div>
                <div className="flex justify-between mt-2 px-2">
                   {['M', 'T', 'W', 'T', 'F'].map((day, i) => (
                     <span key={i} className="text-[9px] font-bold text-gray-500">{day}</span>
                   ))}
                </div>
             </div>
          </div>
       </div>
     );
  }
}

const Counter = ({ from, to, duration = 2 }) => {
  const nodeRef = useRef(null);
  const inView = useInView(nodeRef, { once: true, margin: "-100px" });
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString());

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, { duration: duration, ease: "easeOut" });
      return controls.stop;
    }
  }, [inView, count, to, duration]);

  return <motion.span ref={nodeRef}>{rounded}</motion.span>;
};

// --- Main Page Component ---

export default function LandingPage({ setScreen, onLegal, theme, toggleTheme }) {
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F1A] text-slate-900 dark:text-white selection:bg-indigo-500/30 font-sans overflow-x-hidden transition-colors duration-300">
      {/* ── NAVBAR ── */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/5 border-t-0 border-x-0"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center cursor-pointer group relative" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <img src="/Nexora.png" alt="Nexora" className="h-11 w-auto object-contain relative z-10 transition-transform duration-300 group-hover:brightness-110" />
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['Home', 'Features', 'How it works', 'Testimonials'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(/ /g, '-')}`} 
                className="text-sm font-medium text-slate-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all relative overflow-hidden group"
              title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </motion.div>
              </AnimatePresence>
            </button>
            <button 
              onClick={() => setScreen('auth')}
              className="group relative px-5 py-2 rounded-lg text-sm font-medium text-white shadow-lg transition-all hover:scale-105"
            >
              <div className="absolute inset-0 rounded-lg bg-gradient-primary opacity-80 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute inset-0 rounded-lg bg-gradient-primary blur-md opacity-40 group-hover:opacity-70 transition-opacity"></div>
              <span className="relative z-10 flex items-center gap-2">
                Get Started
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── HERO ── */}
      <section id="home" className="relative min-h-[90vh] pt-32 pb-20 flex items-center justify-center overflow-hidden">
        {/* Background glow blob */}
        <div className="absolute top-1/4 -left-64 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-8 max-w-xl"
            style={{ opacity: opacityHero }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-black/5 dark:border-white/10 bg-white/50 dark:bg-white/5 w-fit backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
              <span className="text-xs font-medium text-indigo-600 dark:text-indigo-300">Nexora 2.0 is now live</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              Your meetings, <br/>
              <span className="text-gradient">remembered forever</span>
            </h1>
            
            <p className="text-lg text-slate-600 dark:text-gray-400 leading-relaxed">
              The AI-powered command center for your video meetings. Record, transcribe, and remember everything.
            </p>
            
            <div className="flex items-center gap-4 pt-4">
              <button 
                onClick={() => setScreen('auth')}
                className="group relative px-8 py-4 rounded-xl text-base font-bold text-white transition-all hover:scale-105"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-primary"></div>
                <div className="absolute inset-0 rounded-xl bg-gradient-primary blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="relative z-10 flex items-center gap-2">
                  Start for free
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <button 
                className="px-8 py-4 rounded-xl text-base font-bold text-slate-900 dark:text-white bg-slate-200 dark:bg-white/5 hover:bg-slate-300 dark:hover:bg-white/10 border border-black/5 dark:border-white/10 hover:border-black/10 dark:hover:border-white/20 transition-all flex items-center gap-2"
              >
                <Play size={16} className="text-slate-600 dark:text-gray-300" />
                Watch Demo
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative h-[600px] hidden lg:block rounded-3xl overflow-hidden glass-panel"
            style={{ opacity: opacityHero }}
          >
            {/* Ambient glowing background inside the right panel */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-[#0B0F1A] to-purple-900/30"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/20 blur-[80px] rounded-full"></div>
            
            {/* Faux App Interface */}
            <div className="absolute inset-6 rounded-2xl border border-black/5 dark:border-white/5 bg-white/80 dark:bg-[#0B0F1A]/80 backdrop-blur-md overflow-hidden flex flex-col shadow-2xl z-0 transition-colors duration-300">
              {/* Header */}
              <div className="h-14 border-b border-white/5 flex items-center px-4 justify-between bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-rose-500/10 border border-rose-500/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></div>
                    <span className="text-[10px] font-medium text-rose-400 uppercase tracking-wider">Live</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-900 dark:text-gray-300">Q3 Planning Sync</span>
                </div>
                <div className="flex -space-x-2">
                  {['S', 'M', 'P'].map((initial, i) => (
                     <div key={i} className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold ring-2 ring-[#0B0F1A] text-white ${i === 0 ? 'bg-indigo-500' : i === 1 ? 'bg-blue-500' : 'bg-emerald-500'}`}>
                       {initial}
                     </div>
                  ))}
                </div>
              </div>
              
              {/* Body */}
              <div className="flex-1 p-5 flex flex-col gap-4 relative overflow-hidden">
                {/* Abstract AI processing visual in background */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-[60px] pointer-events-none"></div>
                
                <motion.div 
                   animate={{ opacity: [0, 1], y: [20, 0] }}
                   transition={{ delay: 0.5, duration: 0.8 }}
                   className="glass-card p-3.5 rounded-xl border border-white/5 w-[85%] self-start relative"
                >
                   <div className="flex gap-3">
                     <div className="w-7 h-7 rounded-full bg-indigo-500 flex flex-shrink-0 items-center justify-center text-[11px] font-bold text-white ring-2 ring-indigo-500/30 animate-pulse">S</div>
                     <div>
                       <p className="text-xs font-medium text-gray-400 mb-1">Sarah Chen</p>
                       <p className="text-sm text-gray-200 leading-relaxed">We need to finalize the Q3 roadmap by this Friday so marketing can start their prep.</p>
                     </div>
                   </div>
                </motion.div>

                <motion.div 
                   animate={{ opacity: [0, 1], scale: [0.9, 1] }}
                   transition={{ delay: 1.5, duration: 0.5 }}
                   className="self-center flex items-center gap-2 text-indigo-400 bg-indigo-500/10 px-4 py-2 rounded-full border border-indigo-500/20 my-2 shadow-[0_0_15px_rgba(99,102,241,0.2)]"
                >
                   <BrainCircuit size={14} className="animate-pulse" />
                   <span className="text-xs font-semibold tracking-wide">MeetMind AI Listening...</span>
                </motion.div>

                <motion.div 
                   animate={{ opacity: [0, 1], y: [20, 0] }}
                   transition={{ delay: 2.5, duration: 0.8 }}
                   className="glass-card p-3.5 rounded-xl border border-white/5 w-[85%] self-end relative"
                >
                   <div className="flex gap-3 flex-row-reverse text-right">
                     <div className="w-7 h-7 rounded-full bg-blue-500 flex flex-shrink-0 items-center justify-center text-[11px] font-bold text-white">M</div>
                     <div>
                       <p className="text-xs font-medium text-gray-400 mb-1">Marcus Reid</p>
                       <p className="text-sm text-gray-200 leading-relaxed">Agreed. I'll get the pricing tier updates done before then.</p>
                     </div>
                   </div>
                </motion.div>
              </div>
            </div>

            {/* Floating Glass Panels */}
            <motion.div 
              animate={{ y: [0, -10, 0] }} 
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-12 -left-6 z-10 glass-card p-4 rounded-xl shadow-2xl flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
                <ListTodo size={16} className="text-indigo-400" />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-gray-400">Action Item Extracted</p>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Update pricing tier by Friday</p>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 10, 0] }} 
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-16 -right-6 z-10 glass-card p-4 rounded-xl shadow-2xl flex items-center gap-3"
            >
               <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Sparkles size={16} className="text-purple-400" />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-gray-400">Smart Join Briefing</p>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Last time you discussed Q3 Roadmap</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── TRUST / STATS ── */}
      <section className="py-12 border-y border-black/5 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.01] transition-colors">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Minutes saved per week", value: 340, suffix: "m" },
            { label: "Action items tracked", value: 125000, suffix: "+" },
            { label: "Active teams", value: 4500, suffix: "+" },
            { label: "Meeting clarity score", value: 99, suffix: "%" }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2 font-mono tracking-tight">
                <Counter from={0} to={stat.value} duration={2.5} />
                <span className="text-indigo-400">{stat.suffix}</span>
              </h3>
              <p className="text-sm text-slate-500 dark:text-gray-500 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── PRODUCT PREVIEW ── */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center mb-16">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Designed for <span className="text-gradient">deep work</span></h2>
            <p className="text-xl text-slate-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">A command center for all your meeting intelligence. Beautifully crafted to stay out of your way until you need it.</p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50, rotateX: 10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ perspective: "1000px" }}
          className="max-w-5xl mx-auto px-6 relative z-10"
        >
          <div className="glass-panel rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(99,102,241,0.15)] border border-white/10 ring-1 ring-white/5">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
              <div className="w-3 h-3 rounded-full bg-rose-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500/50"></div>
            </div>
            <div className="bg-[#0B0F1A] grid md:grid-cols-4 h-[550px]">
               {/* Sidebar */}
               <div className="col-span-1 hidden md:flex flex-col items-center py-6 gap-8 border-r border-white/5 bg-[#0a0c10]">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                     <BrainCircuit size={20} className="text-white" />
                  </div>
                  <div className="flex flex-col gap-4 mt-8 w-full px-4">
                     <div className="w-full h-10 rounded-xl bg-white/10 flex items-center gap-3 px-3 text-white"><Home size={16} /> <span className="text-xs font-semibold">Home</span></div>
                     <div className="w-full h-10 rounded-xl flex items-center gap-3 px-3 text-gray-500 hover:text-white transition-colors"><Calendar size={16} /> <span className="text-xs font-semibold">Meetings</span></div>
                     <div className="w-full h-10 rounded-xl flex items-center gap-3 px-3 text-gray-500 hover:text-white transition-colors"><BarChart3 size={16} /> <span className="text-xs font-semibold">Analytics</span></div>
                  </div>
                  <div className="mt-auto flex items-center gap-3 px-4 w-full">
                     <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-400 to-orange-400 border border-white/10 shrink-0"></div>
                     <div className="flex flex-col">
                        <span className="text-[10px] text-white font-bold">Alex Chen</span>
                        <span className="text-[9px] text-gray-500">Pro Plan</span>
                     </div>
                  </div>
               </div>

               {/* Main Body */}
               <div className="col-span-4 md:col-span-3 flex flex-col relative overflow-hidden bg-[#0B0F1A]">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none"></div>

                  {/* Top Header */}
                  <div className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-white/[0.01]">
                     <div className="flex items-center gap-2 w-64 h-8 rounded-md bg-white/5 border border-white/5 px-3">
                        <Search size={12} className="text-gray-400" />
                        <span className="text-[10px] text-gray-500 font-medium">Search transcripts...</span>
                     </div>
                     <div className="flex items-center gap-3">
                        <div className="relative">
                           <Bell size={16} className="text-gray-400" />
                           <div className="absolute top-0 right-0 w-1.5 h-1.5 rounded-full bg-rose-500"></div>
                        </div>
                     </div>
                  </div>

                  {/* Dashboard Content */}
                  <div className="p-6 flex gap-6 h-full text-left">
                     
                     {/* Left Area (Meetings & Transcript) */}
                     <div className="flex-[2] flex flex-col gap-6">
                        <div className="flex items-end justify-between">
                           <div>
                              <h3 className="text-xl font-bold text-white mb-1">Good morning, Alex</h3>
                              <p className="text-xs text-gray-400">You have 2 meetings today. 1 action item is due.</p>
                           </div>
                        </div>

                        {/* Meeting Cards */}
                        <div className="grid grid-cols-2 gap-3">
                           {/* Card 1 */}
                           <div className="glass-card rounded-xl p-4 border border-white/10 relative overflow-hidden group hover:border-indigo-500/50 transition-colors">
                              <div className="flex justify-between items-start mb-3 relative z-10">
                                 <div className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[9px] font-bold uppercase tracking-wider">Product</div>
                                 <span className="text-[10px] text-gray-400 font-medium">10:00 AM</span>
                              </div>
                              <h4 className="text-sm font-bold text-white mb-1 relative z-10">Q3 Roadmap</h4>
                              <p className="text-[10px] text-gray-400 mb-3 relative z-10">Feature prioritization sync.</p>
                              <div className="flex items-center gap-2 relative z-10">
                                 <div className="flex -space-x-1.5">
                                    <div className="w-5 h-5 rounded-full bg-blue-500 border border-[#0B0F19]"></div>
                                    <div className="w-5 h-5 rounded-full bg-emerald-500 border border-[#0B0F19]"></div>
                                    <div className="w-5 h-5 rounded-full bg-rose-500 border border-[#0B0F19]"></div>
                                 </div>
                              </div>
                           </div>
                           
                           {/* Card 2 */}
                           <div className="glass-card rounded-xl p-4 border border-white/10 relative overflow-hidden group hover:border-purple-500/50 transition-colors">
                              <div className="flex justify-between items-start mb-3 relative z-10">
                                 <div className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[9px] font-bold uppercase tracking-wider">Design</div>
                                 <span className="text-[10px] text-gray-400 font-medium">2:30 PM</span>
                              </div>
                              <h4 className="text-sm font-bold text-white mb-1 relative z-10">Landing Page Revamp</h4>
                              <p className="text-[10px] text-gray-400 mb-3 relative z-10">Finalizing hero assets.</p>
                              <div className="flex items-center gap-2 relative z-10">
                                 <div className="flex -space-x-1.5">
                                    <div className="w-5 h-5 rounded-full bg-amber-500 border border-[#0B0F19]"></div>
                                    <div className="w-5 h-5 rounded-full bg-purple-500 border border-[#0B0F19]"></div>
                                 </div>
                              </div>
                           </div>
                        </div>

                        {/* Live Transcript Snippet */}
                        <div className="flex-1 glass-card rounded-xl border border-white/5 p-4 flex flex-col relative overflow-hidden mt-2">
                           <div className="flex items-center gap-2 mb-4 relative z-10">
                              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Live Processing</h4>
                           </div>
                           <div className="space-y-3 relative z-10">
                              <div className="flex gap-2">
                                 <div className="w-5 h-5 rounded-full bg-blue-500 shrink-0"></div>
                                 <div className="bg-white/5 rounded-lg rounded-tl-none p-2 text-[10px] text-gray-300 leading-relaxed border border-white/5">
                                    "Let's move the launch date to Thursday."
                                 </div>
                              </div>
                              <div className="flex gap-2">
                                 <div className="w-5 h-5 rounded-full bg-rose-500 shrink-0"></div>
                                 <div className="bg-indigo-500/20 rounded-lg rounded-tl-none p-2 text-[10px] text-indigo-200 leading-relaxed border border-indigo-500/30 relative shadow-[0_0_15px_rgba(99,102,241,0.1)]">
                                    <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-0.5 h-3 bg-indigo-500 rounded-full"></div>
                                    "I can get the copy updated by tomorrow."
                                 </div>
                              </div>
                           </div>
                           <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-[#0f111a] to-transparent z-20"></div>
                        </div>
                     </div>

                     {/* Right Area (Smart Join & Tasks) */}
                     <div className="flex-1 flex flex-col gap-4">
                        {/* Smart Join Briefing */}
                        <div className="rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/10 border border-indigo-500/30 p-4 relative overflow-hidden shadow-lg shadow-indigo-500/10">
                           <div className="flex items-center gap-1.5 mb-2 relative z-10">
                              <Sparkles size={12} className="text-indigo-400" />
                              <span className="text-[9px] font-bold text-indigo-300 uppercase tracking-widest">Smart Briefing</span>
                           </div>
                           <h4 className="text-sm font-bold text-white mb-1.5 relative z-10">Ready for Roadmap Sync</h4>
                           <p className="text-[10px] text-indigo-200/80 mb-3 relative z-10 leading-relaxed">Last met Oct 12. You promised to deliver updated user flows.</p>
                           <button className="w-full py-1.5 rounded-md bg-indigo-500 hover:bg-indigo-600 transition-colors text-white text-[10px] font-bold shadow-lg shadow-indigo-500/20 relative z-10 flex items-center justify-center gap-1.5">
                              <BrainCircuit size={12} /> Auto-Join Meeting
                           </button>
                        </div>

                        {/* Action Items */}
                        <div className="flex-1 glass-card rounded-xl border border-white/5 p-4 flex flex-col">
                           <div className="flex items-center justify-between mb-3">
                              <h4 className="text-xs font-bold text-white">Action Items</h4>
                              <span className="text-[9px] bg-white/10 px-1.5 py-0.5 rounded text-gray-400">3 Due</span>
                           </div>
                           <div className="space-y-2">
                              {[
                                { text: "Update pricing copy", tag: "Marketing", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
                                { text: "Fix auth token bug", tag: "Eng", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
                                { text: "Draft Q4 investor update", tag: "Strategy", color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" }
                              ].map((task, i) => (
                                <div key={i} className="flex gap-2 items-start p-1.5 rounded hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-white/5">
                                   <div className="mt-0.5 w-3 h-3 rounded-[3px] border border-white/20 flex-shrink-0"></div>
                                   <div>
                                      <p className="text-[10px] text-gray-200 font-medium mb-1 line-clamp-1">{task.text}</p>
                                      <span className={`text-[8px] font-bold px-1 py-0.5 rounded ${task.color} ${task.bg} ${task.border} border`}>{task.tag}</span>
                                   </div>
                                </div>
                              ))}
                           </div>
                        </div>
                     </div>

                  </div>
               </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Unfair advantages for your team</h2>
            <p className="text-slate-600 dark:text-gray-400 text-lg leading-relaxed">Everything you need to turn talk into actionable progress.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="group glass-card rounded-2xl relative overflow-hidden flex flex-col h-full border border-black/5 dark:border-white/5 shadow-sm dark:shadow-none transition-all duration-300"
              >
                {/* Image Header */}
                <div className="relative h-48 w-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A] to-transparent z-10"></div>
                  <img src={feature.image} alt={feature.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out opacity-80 group-hover:opacity-100" />
                  
                  <div className="absolute bottom-4 left-6 z-20 w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg">
                    {feature.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 pt-2 flex flex-col flex-1 relative z-10">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-500 dark:text-gray-400 leading-relaxed text-sm flex-1">{feature.desc}</p>
                </div>
                
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-32 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">How it works</h2>
            <p className="text-slate-600 dark:text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">From chaotic conversation to structured clarity in 3 simple steps.</p>
          </div>

          <div className="relative">
            {/* Vertical Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent -translate-x-1/2"></div>

            <div className="space-y-24">
              {steps.map((step, i) => (
                <div key={i} className={`flex flex-col md:flex-row items-center gap-12 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Content */}
                  <motion.div 
                    initial={{ opacity: 0, x: i % 2 !== 0 ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className={`flex-1 flex flex-col ${i % 2 !== 0 ? 'md:items-start text-left' : 'md:items-end md:text-right text-left'} relative`}
                  >
                    {/* Connecting Dot */}
                    <div className={`hidden md:flex absolute top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-panel items-center justify-center z-10 shadow-[0_0_20px_rgba(99,102,241,0.2)] ${i % 2 !== 0 ? '-left-[4.5rem]' : '-right-[4.5rem]'}`}>
                       <div className="w-3 h-3 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]"></div>
                    </div>

                    <span className="text-6xl font-black text-slate-900/5 dark:text-white/5 mb-4 font-mono tracking-tighter">{step.num}</span>
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">{step.title}</h3>
                    <p className="text-slate-500 dark:text-gray-400 text-lg leading-relaxed max-w-md">{step.desc}</p>
                  </motion.div>

                  {/* Image/Graphic */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex-1 w-full"
                  >
                    <div className="glass-panel p-2 rounded-3xl group relative">
                       {/* Glow effect behind image */}
                       <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 rounded-3xl"></div>
                       <StepGraphic num={step.num} />
                    </div>
                  </motion.div>
                  
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS (MARQUEE) ── */}
      <section id="testimonials" className="py-24 px-0 bg-slate-50/50 dark:bg-white/[0.01] overflow-hidden border-y border-black/5 dark:border-white/5 transition-colors">
        <style>{`
            @keyframes marqueeScroll {
                0% { transform: translateX(0%); }
                100% { transform: translateX(-50%); }
            }
            .marquee-inner {
                animation: marqueeScroll 35s linear infinite;
            }
            .marquee-reverse {
                animation-direction: reverse;
            }
            .marquee-inner:hover {
                animation-play-state: paused;
            }
        `}</style>
        <div className="max-w-6xl mx-auto px-6 mb-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Loved by top teams</h2>
        </div>

        <div className="marquee-row w-full mx-auto max-w-[100rem] overflow-hidden relative">
            <div className="absolute left-0 top-0 h-full w-32 z-10 pointer-events-none bg-gradient-to-r from-slate-50 dark:from-[#0B0F1A] to-transparent"></div>
            <div className="marquee-inner flex transform-gpu min-w-[200%] pb-6">
                {[...testimonials, ...testimonials, ...testimonials].map((t, index) => (
                    <div key={index} className="p-6 rounded-2xl mx-4 glass-card w-80 shrink-0 flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            {t.image ? (
                                <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-white/10 flex-shrink-0" />
                            ) : (
                                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-sm shadow-sm flex-shrink-0`}>
                                    {t.avatar}
                                </div>
                            )}
                            <div className="flex flex-col">
                                <div className="flex items-center gap-1">
                                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{t.name}</p>
                                    <Shield size={12} className="text-blue-400 mt-0.5" />
                                </div>
                                <span className="text-xs text-slate-500 dark:text-gray-400">{t.role}</span>
                            </div>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-gray-300 leading-relaxed flex-1">"{t.quote}"</p>
                    </div>
                ))}
            </div>
            <div className="absolute right-0 top-0 h-full w-32 z-10 pointer-events-none bg-gradient-to-l from-slate-50 dark:from-[#0B0F1A] to-transparent"></div>
        </div>

        <div className="marquee-row w-full mx-auto max-w-[100rem] overflow-hidden relative mt-4">
            <div className="absolute left-0 top-0 h-full w-32 z-10 pointer-events-none bg-gradient-to-r from-slate-50 dark:from-[#0B0F1A] to-transparent"></div>
            <div className="marquee-inner marquee-reverse flex transform-gpu min-w-[200%] pb-6">
                {[...testimonials.slice(3), ...testimonials.slice(0, 3), ...testimonials, ...testimonials].map((t, index) => (
                    <div key={index} className="p-6 rounded-2xl mx-4 glass-card w-80 shrink-0 flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            {t.image ? (
                                <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-white/10 flex-shrink-0" />
                            ) : (
                                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-sm shadow-sm flex-shrink-0`}>
                                    {t.avatar}
                                </div>
                            )}
                            <div className="flex flex-col">
                                <div className="flex items-center gap-1">
                                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{t.name}</p>
                                    <Shield size={12} className="text-blue-400 mt-0.5" />
                                </div>
                                <span className="text-xs text-slate-500 dark:text-gray-400">{t.role}</span>
                            </div>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-gray-300 leading-relaxed flex-1">"{t.quote}"</p>
                    </div>
                ))}
            </div>
            <div className="absolute right-0 top-0 h-full w-32 z-10 pointer-events-none bg-gradient-to-l from-slate-50 dark:from-[#0B0F1A] to-transparent"></div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto relative overflow-hidden rounded-[2.5rem] glass-card p-12 md:p-16 text-center border border-black/5 dark:border-white/10 shadow-2xl transition-all"
        >
          {/* Noise texture overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="mb-6 w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-xl shadow-indigo-500/30"
            >
              <Zap size={24} className="text-white fill-white" />
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tighter leading-tight">
              Ready to upgrade <br /> your <span className="text-gradient">memory?</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-gray-400 mb-10 max-w-2xl leading-relaxed">
              Join 10,000+ teams who have already switched to Nexora. <br className="hidden md:block" />
              Start capturing every insight today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setScreen('auth')}
                className="group relative px-8 py-4 rounded-xl text-base font-bold text-white transition-all hover:scale-105"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-primary"></div>
                <div className="absolute inset-0 rounded-xl bg-white blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                <span className="relative z-10 flex items-center gap-2">
                  Get Started for Free
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <button className="px-8 py-4 rounded-xl text-base font-bold text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
                Book a Demo
              </button>
            </div>

            <div className="mt-12 flex items-center gap-6 text-slate-500 dark:text-gray-500 text-sm font-medium">
                <span className="flex items-center gap-1.5"><Shield size={14} className="text-indigo-500 dark:text-indigo-400" /> Enterprise Ready</span>
                <span className="flex items-center gap-1.5"><Zap size={14} className="text-indigo-500 dark:text-indigo-400" /> Instant Setup</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative bg-slate-100 dark:bg-[#080a11] border-t border-black/5 dark:border-white/5 pt-24 pb-12 overflow-hidden transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
            {/* Brand Col */}
            <div className="col-span-2 lg:col-span-2">
              <div className="flex items-center mb-6">
                <img src="/Nexora.png" alt="Nexora" className="h-10 w-auto object-contain" />
              </div>
              <p className="text-slate-500 dark:text-gray-500 text-base max-w-xs leading-relaxed mb-8">
                The AI-powered command center for your video meetings. Record, transcribe, and remember everything.
              </p>
              <div className="flex gap-4">
                {['Twitter', 'LinkedIn', 'Github'].map((s) => (
                  <div key={s} className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-center text-slate-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-white hover:bg-white transition-all cursor-pointer">
                    <span className="text-xs font-bold">{s[0]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Links Col 1: Platform */}
            <div>
              <h4 className="text-white font-bold mb-6">Platform</h4>
              <ul className="space-y-4">
                {['Video Recording', 'Live Transcripts', 'AI Summaries', 'Action Items', 'Smart Briefing'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-slate-500 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Links Col 2: Integrations */}
            <div>
              <h4 className="text-white font-bold mb-6">Integrations</h4>
              <ul className="space-y-4">
                {['Google Meet', 'Zoom', 'Microsoft Teams', 'Slack', 'Notion'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-slate-500 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Links Col 3: Resources */}
            <div>
              <h4 className="text-white font-bold mb-6">Resources</h4>
              <ul className="space-y-4">
                {['Best Practices', 'Remote Guide', 'Help Center', 'API Docs', 'Security'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-500 hover:text-indigo-400 transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-500 text-sm">
            <div className="flex items-center gap-8">
              <span>&copy; 2026 Nexora Inc. All rights reserved.</span>
              <div className="flex gap-6">
                <button onClick={() => onLegal('privacy')} className="hover:text-white transition-colors">Privacy Policy</button>
                <button onClick={() => onLegal('terms')} className="hover:text-white transition-colors">Terms of Service</button>
                <button onClick={() => onLegal('cookies')} className="hover:text-white transition-colors">Cookies</button>
                <button onClick={() => onLegal('trust')} className="hover:text-white transition-colors">Trust Center</button>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
               <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest">System Operational</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
