import { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import SmartJoin from "./pages/SmartJoin";
import MeetingRoom from "./pages/MeetingRoom";
import History from "./pages/History";
import AuthPage from "./pages/AuthPage";
import LandingPage from "./pages/LandingPage";
import LegalPage from "./pages/LegalPage";
import { meetings } from "./data/mockData";
import { motion, AnimatePresence } from "framer-motion";

function AppShell() {
  const { user } = useAuth();
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === "dark" ? "light" : "dark");

  // screen: 'landing' | 'auth' | 'app' | 'legal'
  const [screen, setScreen] = useState("landing");
  const [authMode, setAuthMode] = useState("login");
  const [legalType, setLegalType] = useState("privacy");

  // inner app page
  const [page, setPage] = useState("dashboard");
  const [joinMeeting, setJoinMeeting] = useState(null);

  // If user is already logged in, jump straight to app
  useEffect(() => {
    if (user) setScreen("app");
  }, [user]);

  // After login/signup, AuthContext sets user → useEffect catches it
  // After logout user becomes null → go back to landing
  useEffect(() => {
    if (!user && screen === "app") setScreen("landing");
  }, [user]);

  const goToAuth = (mode = "login") => {
    setAuthMode(mode);
    setScreen("auth");
  };

  const handleJoin = (meeting) => { setJoinMeeting(meeting); setPage("smart-join"); };
  const handleOpen = (meeting) => { setJoinMeeting(meeting); setPage("smart-join"); };
  const navigate = (p) => { setPage(p); if (p !== "smart-join") setJoinMeeting(null); };

  const goToLegal = (type) => {
    setLegalType(type);
    setScreen("legal");
  };

  /* ── LANDING ── */
  if (screen === "landing") {
    return (
      <LandingPage
        onGetStarted={goToAuth}
        setScreen={setScreen}
        onLegal={goToLegal}
        theme={theme}
        toggleTheme={toggleTheme}
      />
    );
  }

  /* ── LEGAL ── */
  if (screen === "legal") {
    return (
      <LegalPage
        type={legalType}
        onBack={() => setScreen("landing")}
        theme={theme}
        toggleTheme={toggleTheme}
      />
    );
  }

  /* ── AUTH ── */
  if (screen === "auth") {
    return (
      <AuthPage
        initialMode={authMode}
        onBack={() => setScreen("landing")}
      />
    );
  }

  /* ── MAIN APP ── */
  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#05070E] text-slate-900 dark:text-white selection:bg-indigo-500/30 overflow-x-hidden font-sans transition-colors duration-300">
      {/* Animated Background Mesh */}
      <motion.div 
        animate={{ 
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="fixed inset-0 z-0 opacity-20 pointer-events-none bg-[length:100px_100px]"
        style={{ backgroundImage: 'radial-gradient(circle at center, rgba(99,102,241,0.1) 0, transparent 20%)' }}
      />
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar
          currentPage={page}
          onNavigate={navigate}
          theme={theme}
          toggleTheme={toggleTheme}
        />
        <main className="flex-1 pb-16">
          {page === "dashboard" && (
            <Dashboard meetings={meetings} onJoin={handleJoin} onOpen={handleOpen} />
          )}
          {page === "smart-join" && (
            <SmartJoin
              meetings={meetings}
              currentUser={user?.name?.split(" ")[0] || "You"}
              defaultMeeting={joinMeeting}
            />
          )}
          {page === "meeting-room" && <MeetingRoom />}
          {page === "history" && <History meetings={meetings} />}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppShell />
    </AuthProvider>
  );
}
