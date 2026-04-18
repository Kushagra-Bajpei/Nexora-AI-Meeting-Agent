import { useState } from "react";

const analyzeTranscript = (text) => {
  if (!text.trim()) return null;

  const lines = text.split(/[.!?]/).map((l) => l.trim()).filter(Boolean);

  const decisions = lines.filter((l) =>
    /\b(decided|agreed|will|going to|commit|finalized|confirmed)\b/i.test(l)
  ).slice(0, 4);

  const actions = lines.filter((l) =>
    /\b(need to|should|must|action|follow up|assign|owner|responsible)\b/i.test(l)
  ).slice(0, 3).map((task, i) => ({
    user: ["John", "Alice", "Bob"][i % 3],
    task,
    deadline: ["Friday", "Monday", "EOD"][i % 3],
  }));

  const questions = lines.filter((l) =>
    /\b(what|when|who|how|why|should we|do we|will we|can we|\?)\b/i.test(l)
  ).slice(0, 3);

  return {
    decisions: decisions.length > 0 ? decisions : ["Team will proceed with the current roadmap"],
    actions: actions.length > 0 ? actions : [{ user: "John", task: "Review and share notes with the team", deadline: "Friday" }],
    questions: questions.length > 0 ? questions : ["What are the next steps?"],
  };
};

export default function TranscriptInput({ onAnalyze }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    const result = analyzeTranscript(text);
    onAnalyze(result);
    setLoading(false);
  };

  const placeholder = `Paste your meeting transcript here...

Example:
"We decided to delay the launch to Q3 due to API readiness. John will need to finish the integration by Friday. Alice should redesign the onboarding flow. What is the timeline for QA? The team agreed to adopt the new CI/CD pipeline..."`;

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex items-center gap-2">
        <span className="text-lg">🎙️</span>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Meeting Transcript</h2>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        className="flex-1 min-h-[340px] w-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-5 text-sm text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-600 resize-none outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-700 focus:border-blue-300 dark:focus:border-blue-700 transition-all duration-200 leading-relaxed font-mono"
      />

      <div className="flex items-center justify-between gap-4">
        <p className="text-xs text-gray-400 dark:text-gray-500">
          {text.length > 0 ? `${text.split(/\s+/).filter(Boolean).length} words` : "Start typing or paste transcript"}
        </p>
        <div className="flex gap-2">
          {text && (
            <button
              onClick={() => setText("")}
              className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200 transition-all"
            >
              Clear
            </button>
          )}
          <button
            onClick={handleAnalyze}
            disabled={!text.trim() || loading}
            className={`px-6 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all duration-200 ${
              text.trim() && !loading
                ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:from-blue-700 hover:to-violet-700 hover:shadow-lg hover:shadow-blue-200 dark:hover:shadow-blue-900/40"
                : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"
            }`}
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Analyzing...
              </>
            ) : (
              <>🧠 Analyze Meeting</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
