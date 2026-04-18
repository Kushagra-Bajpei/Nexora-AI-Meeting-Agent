const themeMap = {
  green: {
    wrapper: "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800/50",
    header: "text-emerald-700 dark:text-emerald-400",
    headerBg: "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400",
    dot: "bg-emerald-400",
    badge: "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400",
    itemBg: "bg-emerald-50/50 dark:bg-emerald-900/10",
  },
  yellow: {
    wrapper: "bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-800/50",
    header: "text-amber-700 dark:text-amber-400",
    headerBg: "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400",
    dot: "bg-amber-400",
    badge: "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400",
    itemBg: "bg-amber-50/50 dark:bg-amber-900/10",
  },
  red: {
    wrapper: "bg-rose-50 dark:bg-rose-900/20 border-rose-100 dark:border-rose-800/50",
    header: "text-rose-700 dark:text-rose-400",
    headerBg: "bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-400",
    dot: "bg-rose-400",
    badge: "bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-400",
    itemBg: "bg-rose-50/50 dark:bg-rose-900/10",
  },
  blue: {
    wrapper: "bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800/50",
    header: "text-blue-700 dark:text-blue-400",
    headerBg: "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400",
    dot: "bg-blue-400",
    badge: "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400",
    itemBg: "bg-blue-50/50 dark:bg-blue-900/10",
  },
};

export default function InsightCard({ title, emoji, items, theme = "blue", badgeKey }) {
  const t = themeMap[theme];

  return (
    <div className={`rounded-2xl border ${t.wrapper} p-5 shadow-sm`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">{emoji}</span>
          <h3 className={`text-sm font-semibold ${t.header}`}>{title}</h3>
        </div>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${t.headerBg}`}>
          {items.length} {items.length === 1 ? "item" : "items"}
        </span>
      </div>

      {/* Items */}
      {items.length === 0 ? (
        <p className="text-xs text-gray-400 dark:text-gray-500 italic">Nothing here yet.</p>
      ) : (
        <ul className="flex flex-col gap-2.5">
          {items.map((item, i) => {
            const text = typeof item === "string" ? item : item.task;
            const badge = badgeKey && typeof item === "object" ? item[badgeKey] : null;
            const user = typeof item === "object" && item.user ? item.user : null;

            return (
              <li key={i} className="flex items-start gap-2.5 group/item">
                <span className={`mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 ${t.dot}`}></span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{text}</p>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    {user && (
                      <span className="text-xs text-gray-400 dark:text-gray-500">👤 {user}</span>
                    )}
                    {badge && (
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${t.badge}`}>
                        ⏰ {badge}
                      </span>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
