import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const avatarColors = [
  "from-indigo-400 to-indigo-600",
  "from-violet-400 to-violet-600",
  "from-blue-400 to-blue-600",
  "from-purple-400 to-purple-600",
  "from-fuchsia-400 to-fuchsia-600",
];

function Avatar({ name, index, size = "md" }) {
  const color = avatarColors[index % avatarColors.length];
  const sz = size === "md" ? "w-10 h-10 text-sm" : "w-8 h-8 text-xs";
  return (
    <div
      className={`${sz} rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white font-bold ring-2 ring-[#05070E] shadow-sm flex-shrink-0`}
    >
      {name[0]}
    </div>
  );
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default function SmartJoinCard({ meeting, userName }) {
  const memory = meeting.per_person_memory?.[userName];
  const myActions = meeting.action_items.filter((a) => a.user === userName);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-4xl mx-auto"
    >
      {/* Hero Welcome Banner */}
      <motion.div variants={item} className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-900/40 via-violet-900/40 to-blue-900/40 border border-white/10 p-8 md:p-10 mb-8 shadow-2xl backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-primary opacity-20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 blur-[80px] rounded-full translate-y-1/3 -translate-x-1/4"></div>

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div>
              <p className="text-indigo-300 text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)] animate-pulse"></span>
                Smart Context Loaded
              </p>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">
                Welcome back, <span className="text-gradient">{userName}</span>
              </h1>
              <p className="text-gray-300 text-base md:text-lg">
                Joining <span className="text-white font-semibold">{meeting.title}</span> &nbsp;·&nbsp; {formatDate(meeting.date)}
              </p>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl shadow-inner backdrop-blur-md">
              🧠
            </div>
          </div>

          <div className="mt-8 flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 inline-flex backdrop-blur-sm">
            <div className="flex -space-x-3">
              {meeting.participants.map((p, i) => (
                <Avatar key={p} name={p} index={i} size="md" />
              ))}
            </div>
            <div className="text-gray-300 text-sm font-medium">
              <span className="text-white font-bold">{meeting.participants.length} participants</span>
              <span className="hidden md:inline"> · {meeting.participants.join(", ")}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Memory Cards Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Last time you said */}
        {memory?.said && (
          <motion.div variants={item} className="glass-card rounded-3xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-xl shadow-inner">
                💬
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Last time you said</h3>
                <p className="text-sm text-gray-400">Your previous contributions</p>
              </div>
            </div>
            <ul className="flex flex-col gap-3">
              {memory.said.map((item, i) => (
                <li key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                  <span className="text-blue-400 text-2xl font-serif leading-none mt-1">"</span>
                  <p className="text-gray-300 italic text-sm leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Action Items */}
        {myActions.length > 0 && (
          <motion.div variants={item} className="glass-card rounded-3xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-xl shadow-inner">
                📌
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Your action items</h3>
                <p className="text-sm text-gray-400">Tasks assigned to you</p>
              </div>
            </div>
            <ul className="flex flex-col gap-3">
              {myActions.map((item, i) => (
                <li key={i} className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors gap-4">
                  <div className="flex items-start md:items-center gap-3">
                    <span className="w-5 h-5 mt-0.5 md:mt-0 rounded-full border-2 border-amber-500 flex-shrink-0"></span>
                    <p className="text-gray-200 text-sm font-medium">{item.task}</p>
                  </div>
                  <span className="text-xs font-bold px-3 py-1.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full whitespace-nowrap self-start md:self-auto">
                    ⏰ {item.deadline}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Relevant Team Decisions */}
        <motion.div variants={item} className="glass-card rounded-3xl p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-xl shadow-inner">
              ✅
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Team decisions</h3>
              <p className="text-sm text-gray-400">Agreements from last session</p>
            </div>
          </div>
          <ul className="flex flex-col gap-3">
            {meeting.decisions.map((d, i) => (
              <li key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xs font-bold flex-shrink-0">
                  ✓
                </span>
                <p className="text-gray-300 text-sm flex-1">{d}</p>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Concerns / Context */}
        {memory?.concerns && (
          <motion.div variants={item} className="glass-card rounded-3xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-xl shadow-inner">
                ⚠️
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Concerns to revisit</h3>
                <p className="text-sm text-gray-400">Things you flagged last time</p>
              </div>
            </div>
            <ul className="flex flex-col gap-3">
              {memory.concerns.map((c, i) => (
                <li key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                  <span className="text-rose-400 mt-0.5 text-base">⚡</span>
                  <p className="text-gray-300 text-sm">{c}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>

      {/* CTA Footer */}
      <motion.div variants={item} className="mt-8 p-6 rounded-[2rem] glass-panel border border-indigo-500/20 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-5"></div>
        <div className="relative z-10 text-center md:text-left">
          <p className="text-white font-bold text-lg mb-1">Ready to join the meeting?</p>
          <p className="text-indigo-300 text-sm">Your AI context is loaded and ready to go.</p>
        </div>
        <button className="relative z-10 w-full md:w-auto px-8 py-4 rounded-xl bg-gradient-primary text-white text-base font-bold shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_40px_rgba(99,102,241,0.6)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3">
          🚀 Enter Meeting Room
        </button>
      </motion.div>
    </motion.div>
  );
}
