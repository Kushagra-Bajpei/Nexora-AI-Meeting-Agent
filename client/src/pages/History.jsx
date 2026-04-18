import { useState } from "react";
import InsightCard from "../components/InsightCard";

const allParticipants = ["All", "John", "Alice", "Bob", "Carol", "David", "Eve"];

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function History({ meetings }) {
  const [search, setSearch] = useState("");
  const [participant, setParticipant] = useState("All");
  const [expandedId, setExpandedId] = useState(null);

  const filtered = meetings.filter((m) => {
    const matchesSearch =
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.decisions.some((d) => d.toLowerCase().includes(search.toLowerCase()));
    const matchesParticipant =
      participant === "All" || m.participants.includes(participant);
    return matchesSearch && matchesParticipant;
  });

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2.5 py-1 rounded-full">
            📚 History
          </span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Meeting History</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1.5 text-sm">
          Search past decisions, actions, and context from all your meetings.
        </p>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search decisions, meetings..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-600 outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-700 focus:border-blue-300 dark:focus:border-blue-700 transition-all shadow-sm"
          />
        </div>

        {/* Participant Filter */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {allParticipants.map((p) => (
            <button
              key={p}
              onClick={() => setParticipant(p)}
              className={`px-3.5 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 border flex-shrink-0 ${
                participant === p
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                  : "bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              {p === "All" ? "👥 All" : p}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <p className="text-xs text-gray-400 dark:text-gray-500 mb-4 font-medium">
        {filtered.length} {filtered.length === 1 ? "meeting" : "meetings"} found
      </p>

      {/* Meeting List */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div className="w-20 h-20 rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-4xl">
            📭
          </div>
          <div className="text-center">
            <p className="font-semibold text-gray-700 dark:text-gray-300">No meetings match</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Try a different search or filter.</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map((meeting) => (
            <div
              key={meeting.id}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
            >
              {/* Meeting Header */}
              <button
                onClick={() => setExpandedId(expandedId === meeting.id ? null : meeting.id)}
                className="w-full text-left p-6 flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-xl flex-shrink-0">
                    📋
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition-colors">
                      {meeting.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-xs text-gray-400 dark:text-gray-500">📅 {formatDate(meeting.date)}</span>
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        👥 {meeting.participants.join(", ")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="hidden md:flex items-center gap-2">
                    <span className="text-xs px-2.5 py-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full font-medium">
                      ✅ {meeting.decisions.length} decisions
                    </span>
                    <span className="text-xs px-2.5 py-1 bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full font-medium">
                      📌 {meeting.action_items.length} actions
                    </span>
                  </div>
                  <span
                    className={`text-gray-400 dark:text-gray-500 transition-transform duration-200 ${
                      expandedId === meeting.id ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </div>
              </button>

              {/* Expanded Content */}
              {expandedId === meeting.id && (
                <div className="px-6 pb-6 border-t border-gray-50 dark:border-gray-800 pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InsightCard
                    title="Decisions"
                    emoji="✅"
                    items={meeting.decisions}
                    theme="green"
                  />
                  <InsightCard
                    title="Action Items"
                    emoji="📌"
                    items={meeting.action_items}
                    theme="yellow"
                    badgeKey="deadline"
                  />
                  <InsightCard
                    title="Open Questions"
                    emoji="❓"
                    items={meeting.open_questions}
                    theme="red"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
