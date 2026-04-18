import { motion } from "framer-motion";

const avatarColors = [
  "from-blue-400 to-indigo-600",
  "from-violet-400 to-purple-600",
  "from-rose-400 to-pink-600",
  "from-emerald-400 to-teal-600",
  "from-amber-400 to-orange-500",
];

function Avatar({ name, index }) {
  const color = avatarColors[index % avatarColors.length];
  return (
    <div
      title={name}
      className={`w-8 h-8 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white text-xs font-bold ring-2 ring-[#05070E] shadow-sm`}
    >
      {name[0]}
    </div>
  );
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function MeetingCard({ meeting, onJoin, onOpen }) {
  return (
    <div className="group glass-card rounded-2xl p-6 flex flex-col gap-5 relative overflow-hidden h-full">
      {/* Decorative hover glow */}
      <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none"></div>
      
      {/* Header */}
      <div className="flex items-start justify-between relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)] animate-pulse"></span>
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">Meeting</span>
          </div>
          <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors duration-300 leading-tight mb-1">
            {meeting.title}
          </h3>
          <p className="text-sm text-gray-400 flex items-center gap-1.5 font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            {formatDate(meeting.date)}
          </p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-inner">
          🧠
        </div>
      </div>

      {/* Stats Row */}
      <div className="flex gap-4 py-3 border-y border-white/5 relative z-10">
        <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/5">
          <span className="text-emerald-400">✅</span>
          <span>{meeting.decisions.length} decisions</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/5">
          <span className="text-amber-400">📌</span>
          <span>{meeting.action_items.length} tasks</span>
        </div>
      </div>

      {/* Participants */}
      <div className="flex items-center gap-3 relative z-10">
        <div className="flex -space-x-3">
          {meeting.participants.slice(0, 4).map((p, i) => (
            <Avatar key={p} name={p} index={i} />
          ))}
          {meeting.participants.length > 4 && (
             <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white text-xs font-bold ring-2 ring-[#05070E] backdrop-blur-md">
               +{meeting.participants.length - 4}
             </div>
          )}
        </div>
        <span className="text-xs font-medium text-gray-500 truncate flex-1">
          {meeting.participants.join(", ")}
        </span>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2 relative z-10 mt-auto">
        <button
          onClick={() => onJoin(meeting)}
          className="flex-[2] py-3 rounded-xl bg-gradient-primary text-white text-sm font-bold shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          <span>✨</span> Join Context
        </button>
        <button
          onClick={() => onOpen(meeting)}
          className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-sm font-semibold hover:bg-white/10 hover:text-white transition-all duration-300 flex items-center justify-center"
        >
          Open
        </button>
      </div>
    </div>
  );
}
