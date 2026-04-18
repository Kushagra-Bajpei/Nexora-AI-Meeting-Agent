import { useState } from "react";
import TranscriptInput from "../components/TranscriptInput";
import InsightCard from "../components/InsightCard";

export default function MeetingRoom() {
  const [insights, setInsights] = useState(null);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2.5 py-1 rounded-full">
            🎙️ Live Room
          </span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Meeting Room</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1.5 text-sm">
          Paste your transcript and let AI extract decisions, actions, and questions.
        </p>
      </div>

      {/* Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* LEFT: Transcript Input */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 flex flex-col">
          <TranscriptInput onAnalyze={(result) => setInsights(result)} />
        </div>

        {/* RIGHT: Analysis Results */}
        <div className="flex flex-col gap-4">
          {!insights ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-gray-900 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700 gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-3xl">
                ✨
              </div>
              <div className="text-center px-6">
                <p className="font-semibold text-gray-700 dark:text-gray-300">Waiting for analysis</p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                  Paste a transcript and click "Analyze Meeting" to see AI insights.
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Success Banner */}
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-4 flex items-center gap-3 shadow-md shadow-emerald-200 dark:shadow-emerald-900/40">
                <span className="text-2xl">🎉</span>
                <div>
                  <p className="text-white font-semibold text-sm">Analysis complete!</p>
                  <p className="text-emerald-100 text-xs">
                    Found {insights.decisions.length} decisions · {insights.actions.length} actions · {insights.questions.length} questions
                  </p>
                </div>
                <button
                  onClick={() => setInsights(null)}
                  className="ml-auto text-white/70 hover:text-white text-sm font-medium"
                >
                  Reset
                </button>
              </div>

              <InsightCard
                title="Team Decisions"
                emoji="✅"
                items={insights.decisions}
                theme="green"
              />
              <InsightCard
                title="Action Items"
                emoji="📌"
                items={insights.actions}
                theme="yellow"
                badgeKey="deadline"
              />
              <InsightCard
                title="Open Questions"
                emoji="❓"
                items={insights.questions}
                theme="red"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
