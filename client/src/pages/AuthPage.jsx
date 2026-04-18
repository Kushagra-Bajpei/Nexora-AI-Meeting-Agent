import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, ArrowLeft, CheckCircle2, Shield, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AuthPage({ initialMode = 'signup', onBack }) {
  const [mode, setMode] = useState(initialMode); // 'login' or 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (email && password) {
        login({ email, name: mode === 'signup' ? name : 'User' });
      } else {
        throw new Error('Please fill in all required fields');
      }
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white flex overflow-hidden selection:bg-indigo-500/30">
      
      {/* ── LEFT PANEL (INFO & BRAND) ── */}
      <div className="hidden lg:flex w-[45%] relative flex-col justify-between p-12 bg-[#0a0c14] border-r border-white/5 overflow-hidden">
        {/* Animated Glow Background */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
           <motion.div 
             animate={{ 
               scale: [1, 1.2, 1],
               opacity: [0.3, 0.5, 0.3],
             }}
             transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
             className="absolute -top-1/4 -left-1/4 w-[150%] h-[150%] bg-gradient-to-br from-indigo-900/40 via-purple-900/20 to-transparent blur-[120px] rounded-full"
           />
        </div>

        <div className="relative z-10">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors w-fit group mb-16"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to website
          </button>
          
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.5)]">
              <BrainCircuit className="text-white" size={20} />
            </div>
            <span className="text-2xl font-bold tracking-tight">MeetMind</span>
          </div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold tracking-tight leading-[1.2] mb-6"
          >
            Your meetings, <br/><span className="text-gradient">crystallized.</span>
          </motion.h1>
          
          <p className="text-gray-400 text-lg max-w-md">
            Join the smartest teams in the world who rely on MeetMind for perfect context, every time.
          </p>
        </div>

        {/* Floating Feature Cards */}
        <div className="relative z-10 flex flex-col gap-4 mt-12">
           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.2 }}
             className="glass-card p-4 rounded-xl flex items-center gap-4 max-w-sm"
           >
             <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
               <CheckCircle2 size={18} className="text-emerald-400" />
             </div>
             <div>
               <h4 className="text-sm font-semibold text-white">Zero setup required</h4>
               <p className="text-xs text-gray-400">Connects instantly to Google Calendar</p>
             </div>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.3 }}
             className="glass-card p-4 rounded-xl flex items-center gap-4 max-w-sm ml-8"
           >
             <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
               <Shield size={18} className="text-blue-400" />
             </div>
             <div>
               <h4 className="text-sm font-semibold text-white">Enterprise security</h4>
               <p className="text-xs text-gray-400">Your data is encrypted and private</p>
             </div>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.4 }}
             className="glass-card p-4 rounded-xl flex items-center gap-4 max-w-sm"
           >
             <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
               <Zap size={18} className="text-purple-400" />
             </div>
             <div>
               <h4 className="text-sm font-semibold text-white">Instant context</h4>
               <p className="text-xs text-gray-400">Sub-second search across all meetings</p>
             </div>
           </motion.div>
        </div>
      </div>

      {/* ── RIGHT PANEL (FORM) ── */}
      <div className="flex-1 flex flex-col relative">
        {/* Mobile Nav */}
        <div className="lg:hidden flex items-center justify-between p-6 absolute top-0 left-0 right-0 z-10">
          <button onClick={onBack} className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)]">
            <BrainCircuit className="text-white" size={16} />
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold tracking-tight mb-2">
                {mode === 'login' ? 'Welcome back' : 'Create an account'}
              </h2>
              <p className="text-gray-400">
                {mode === 'login' 
                  ? 'Enter your details to access your dashboard.' 
                  : 'Get started with your 14-day free trial.'}
              </p>
            </div>

            {/* Error Banner */}
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 bg-rose-500/10 border border-rose-500/20 rounded-xl p-4 flex items-center gap-3 text-sm text-rose-400"
                >
                  <Shield size={16} />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatePresence mode="popLayout">
                {mode === 'signup' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Full Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="glass-input"
                      placeholder="John Doe"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Work Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="glass-input"
                  placeholder="john@company.com"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-medium text-gray-300">Password</label>
                  {mode === 'login' && (
                    <a href="#" className="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
                      Forgot password?
                    </a>
                  )}
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="glass-input"
                  placeholder="••••••••"
                  minLength={8}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full relative group mt-6"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-primary opacity-80 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute inset-0 rounded-xl bg-gradient-primary blur-md opacity-40 group-hover:opacity-60 transition-opacity"></div>
                <div className="relative px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500/0 via-white/5 to-purple-500/0 border border-white/10 flex items-center justify-center font-medium shadow-lg transition-transform active:scale-[0.98]">
                  {isLoading ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    mode === 'login' ? 'Sign In' : 'Create Account'
                  )}
                </div>
              </button>
            </form>

            <div className="mt-8 text-center text-sm text-gray-400">
              {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
              <button 
                onClick={() => {
                  setMode(mode === 'login' ? 'signup' : 'login');
                  setError('');
                }}
                className="font-medium text-white hover:text-indigo-300 transition-colors"
              >
                {mode === 'login' ? 'Sign up' : 'Log in'}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
