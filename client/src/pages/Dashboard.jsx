import { useState } from "react";
import { motion } from "framer-motion";
import MeetingCard from "../components/MeetingCard";

export default function Dashboard({ meetings, onJoin, onOpen }) {
  const [search, setSearch] = useState("");

  const filtered = meetings.filter((m) =>
    m.title.toLowerCase().includes(search.toLowerCase()) ||
    m.participants.some((p) => p.toLowerCase().includes(search.toLowerCase()))
  );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 relative">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      
      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-300">
              Overview
            </span>
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-2">
          Your <span className="text-gradient">Meetings</span>
        </h1>
        <p className="text-gray-400 text-base max-w-xl">
          Review your upcoming and past meetings, complete with AI-generated action items and insights.
        </p>
      </motion.div>

      {/* Stats Bar */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
      >
        {[
          { label: "Total Meetings", value: meetings.length, icon: "🗓️", color: "from-blue-500/20 to-indigo-500/20", textCol: "text-blue-400" },
          {
            label: "Action Items",
            value: meetings.reduce((a, m) => a + m.action_items.length, 0),
            icon: "📌",
            color: "from-amber-500/20 to-orange-500/20",
            textCol: "text-amber-400"
          },
          {
            label: "Decisions Made",
            value: meetings.reduce((a, m) => a + m.decisions.length, 0),
            icon: "✅",
            color: "from-emerald-500/20 to-teal-500/20",
            textCol: "text-emerald-400"
          },
          {
            label: "Open Questions",
            value: meetings.reduce((a, m) => a + m.open_questions.length, 0),
            icon: "❓",
            color: "from-rose-500/20 to-pink-500/20",
            textCol: "text-rose-400"
          },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            variants={item}
            className="glass-card rounded-2xl p-5 flex items-center gap-4 relative overflow-hidden group"
          >
            {/* Subtle gradient background on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
            
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-white/5 border border-white/10 relative z-10 group-hover:scale-110 transition-transform duration-300`}>
              {stat.icon}
            </div>
            <div className="relative z-10">
              <p className="text-3xl font-bold text-white tracking-tight">{stat.value}</p>
              <p className={`text-xs font-medium ${stat.textCol}`}>{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Search */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative mb-8 max-w-md"
      >
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search meetings or participants..."
          className="glass-input pl-11 py-3.5 text-base"
        />
      </motion.div>

      {/* Meeting Cards Grid */}
      {filtered.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-32 gap-6 glass-panel rounded-3xl text-center"
        >
          <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-5xl shadow-[0_0_50px_rgba(255,255,255,0.05)]">
            🗂️
          </div>
          <div>
            <p className="text-xl font-semibold text-white mb-2">No meetings found</p>
            <p className="text-gray-400 max-w-sm mx-auto">We couldn't find any meetings matching your search. Try adjusting your filters.</p>
          </div>
        </motion.div>
      ) : (
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {filtered.map((meeting) => (
            <motion.div key={meeting.id} variants={item}>
              <MeetingCard
                meeting={meeting}
                onJoin={onJoin}
                onOpen={onOpen}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
