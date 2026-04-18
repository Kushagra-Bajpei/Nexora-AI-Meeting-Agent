import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, LogOut, ChevronDown } from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: "🏠", page: "dashboard" },
  { label: "Join", icon: "✨", page: "smart-join" },
  { label: "Room", icon: "🎙️", page: "meeting-room" },
  { label: "History", icon: "📚", page: "history" },
];

function LogoutIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16 17 21 12 16 7"/>
      <line x1="21" x2="9" y1="12" y2="12"/>
    </svg>
  );
}

export default function Navbar({ currentPage, onNavigate, theme, toggleTheme }) {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 glass-panel border-x-0 border-t-0 border-black/5 dark:border-white/5 shadow-lg transition-colors">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between relative z-10">
        {/* Logo */}
        <button
          onClick={() => onNavigate("dashboard")}
          className="flex items-center group relative"
        >
          <img src="/Nexora.png" alt="Nexora" className="h-11 w-auto object-contain relative z-10 transition-transform duration-300 group-hover:brightness-110" />
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-2 bg-slate-200/50 dark:bg-white/[0.03] p-1.5 rounded-2xl border border-black/5 dark:border-white/5 transition-colors">
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => onNavigate(item.page)}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                currentPage === item.page
                  ? "text-slate-900 dark:text-white"
                  : "text-slate-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-white"
              }`}
            >
              {currentPage === item.page && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-xl bg-white dark:bg-white/10 border border-black/5 dark:border-white/10 shadow-sm dark:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 text-base">{item.icon}</span>
              <span className="relative z-10">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-center text-slate-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-white hover:bg-slate-300 dark:hover:bg-white/10 transition-all relative overflow-hidden group"
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
          {/* User Menu */}
          {user ? (
            <div className="relative hidden md:block">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2.5 pl-1.5 pr-3 py-1.5 rounded-xl hover:bg-slate-200 dark:hover:bg-white/5 transition-all border border-black/5 dark:border-transparent hover:border-black/10 dark:hover:border-white/10 group glass-card shadow-sm dark:shadow-none"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold shadow-sm flex-shrink-0">
                  {user.avatar}
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-gray-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                  {user.name.split(" ")[0]}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`text-gray-500 group-hover:text-white transition-all duration-300 ${userMenuOpen ? "rotate-180" : ""}`}>
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>

              {/* Dropdown */}
              {userMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="absolute right-0 top-full mt-2 w-56 glass-panel rounded-2xl overflow-hidden"
                >
                  <div className="px-4 py-3 border-b border-black/5 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02]">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{user.name}</p>
                    <p className="text-xs text-slate-500 dark:text-gray-400 truncate">{user.email}</p>
                  </div>
                  <div className="p-2">
                    <button
                      onClick={() => { logout(); setUserMenuOpen(false); }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-all font-medium"
                    >
                      <LogoutIcon />
                      Sign out
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          ) : (
             <div className="hidden md:block">
               {/* Skeleton or Auth buttons if needed */}
             </div>
          )}

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-colors border border-transparent hover:border-white/10"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <div className={`w-5 h-0.5 bg-current transition-all ${mobileOpen ? "rotate-45 translate-y-1.5" : "mb-1"}`}></div>
            <div className={`w-5 h-0.5 bg-current transition-all ${mobileOpen ? "opacity-0" : "mb-1"}`}></div>
            <div className={`w-5 h-0.5 bg-current transition-all ${mobileOpen ? "-rotate-45 -translate-y-1.5" : ""}`}></div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden border-t border-white/5 bg-[#05070E]/90 backdrop-blur-xl px-4 py-3 flex flex-col gap-1"
        >
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => { onNavigate(item.page); setMobileOpen(false); }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                currentPage === item.page
                  ? "bg-white/10 text-white border border-white/10"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </button>
          ))}
          {user && (
            <button
              onClick={() => { logout(); setMobileOpen(false); }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-all mt-2 border-t border-white/5 pt-3"
            >
              <LogoutIcon />
              Sign out
            </button>
          )}
        </motion.div>
      )}

      {/* Backdrop for user menu */}
      {userMenuOpen && (
        <div className="fixed inset-0 z-[-1]" onClick={() => setUserMenuOpen(false)} />
      )}
    </nav>
  );
}
