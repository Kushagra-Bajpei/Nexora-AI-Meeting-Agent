import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SmartJoinCard from "../components/SmartJoinCard";

export default function SmartJoin({ meetings, currentUser, defaultMeeting }) {
  const [selectedId, setSelectedId] = useState(defaultMeeting?.id || meetings[0]?.id);
  const meeting = meetings.find((m) => m.id === selectedId) || meetings[0];

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 relative">
      {/* Decorative background glow */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-violet-500/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/10 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse"></span>
            <span className="text-xs font-semibold uppercase tracking-widest text-violet-300">
              Smart Join
            </span>
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-2">
          AI-Powered <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">Context</span>
        </h1>
        <p className="text-gray-400 text-base max-w-xl">
          MeetMind surfaces your personalized context before every meeting so you never walk in unprepared.
        </p>
      </motion.div>

      {/* Meeting Selector */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <label className="text-xs font-bold text-gray-500 mb-3 block uppercase tracking-wider">
          Select meeting to join
        </label>
        <div className="flex flex-wrap gap-3">
          {meetings.map((m) => {
            const isSelected = selectedId === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setSelectedId(m.id)}
                className={`relative px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                  isSelected
                    ? "text-white shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                    : "text-gray-400 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white"
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="active-meeting-pill"
                    className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl"
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  />
                )}
                <span className="relative z-10">{m.title}</span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Smart Join Card */}
      <AnimatePresence mode="wait">
        {meeting && (
          <motion.div
            key={meeting.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <SmartJoinCard meeting={meeting} userName={currentUser} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
