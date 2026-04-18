export const meetings = [
  {
    id: "m1",
    title: "Sprint Planning",
    date: "2026-04-17",
    participants: ["John", "Alice", "Bob"],
    decisions: ["Launch delayed to Q3", "Adopted new CI/CD pipeline"],
    action_items: [
      { user: "John", task: "Finish API integration", deadline: "Friday" },
      { user: "Alice", task: "Design new onboarding flow", deadline: "Monday" },
    ],
    open_questions: [
      "Should we migrate to microservices?",
      "Who owns the QA process?",
    ],
    per_person_memory: {
      John: {
        said: ["We should delay the launch", "The API needs more testing"],
        concerns: ["Budget is tight", "Team capacity is limited"],
      },
      Alice: {
        said: ["Onboarding UX needs a full redesign", "Users are dropping off at step 3"],
        concerns: ["Timeline is aggressive"],
      },
    },
  },
  {
    id: "m2",
    title: "Design Review",
    date: "2026-04-15",
    participants: ["Alice", "Carol", "John"],
    decisions: ["Adopt the new color system", "Remove legacy button variants"],
    action_items: [
      { user: "Carol", task: "Update Figma component library", deadline: "Wednesday" },
      { user: "John", task: "Audit existing components", deadline: "Thursday" },
    ],
    open_questions: ["Do we need a dark mode?", "Who reviews the final designs?"],
    per_person_memory: {
      John: {
        said: ["I prefer the minimal layout", "We should align with the brand guide"],
        concerns: ["Too many edge cases in mobile"],
      },
      Alice: {
        said: ["The new color palette tests well", "Accessibility scores improved"],
        concerns: ["Need designer sign-off"],
      },
    },
  },
  {
    id: "m3",
    title: "Investor Sync",
    date: "2026-04-10",
    participants: ["John", "David"],
    decisions: ["Targeting Series A in Q4", "Expand to 3 new markets"],
    action_items: [
      { user: "John", task: "Prepare pitch deck v2", deadline: "Next Tuesday" },
      { user: "David", task: "Connect with 5 potential VCs", deadline: "End of month" },
    ],
    open_questions: ["What is our burn rate projection?", "Which market do we enter first?"],
    per_person_memory: {
      John: {
        said: ["ARR is growing at 20% MoM", "We need $2M to reach profitability"],
        concerns: ["Investor sentiment is mixed on our sector"],
      },
    },
  },
  {
    id: "m4",
    title: "Q2 Roadmap Planning",
    date: "2026-04-08",
    participants: ["John", "Alice", "Bob", "Eve"],
    decisions: ["Ship AI features in May", "Deprecate v1 API by June"],
    action_items: [
      { user: "Eve", task: "Write migration guide for v1 → v2", deadline: "May 1st" },
      { user: "Bob", task: "Set up feature flag system", deadline: "April 25th" },
    ],
    open_questions: ["Will the AI features require new infra?"],
    per_person_memory: {
      John: {
        said: ["We should prioritize retention over acquisition", "AI is our biggest differentiator"],
        concerns: ["Engineering is stretched thin"],
      },
    },
  },
];

export const currentUser = "John";
