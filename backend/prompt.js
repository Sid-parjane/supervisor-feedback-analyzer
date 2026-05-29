const KPIS = [
  "On-time delivery",
  "Quality of work",
  "Communication",
  "Initiative & ownership",
  "Team collaboration",
  "Systems building",
  "Learning & adaptability",
  "Stakeholder management"
];

const RUBRIC_SUMMARY = `
Score 1-2: Fellow is disengaged, missing deadlines, poor communication.
Score 3-4: Fellow is inconsistent, needs significant hand-holding.
Score 5-6: Fellow meets basic expectations, some independent work.
Score 7-8: Fellow is proactive, reliable, good communicator, adds value.
Score 9-10: Fellow is exceptional, leads initiatives, builds systems.
`;

function buildPrompt(transcript) {
  return `
You are an expert analyst helping psychology interns assess DeepThought Fellows.
Analyze the supervisor transcript below and return ONLY a valid JSON object.
Do NOT add any explanation, markdown, or text outside the JSON.

RUBRIC (use this to determine the score):
${RUBRIC_SUMMARY}

BUSINESS KPIs TO MAP (only include KPIs that are mentioned or implied):
${KPIS.join(", ")}

TRANSCRIPT:
"""
${transcript}
"""

Return this EXACT JSON structure (no extra fields, no missing fields):
{
  "evidence": [
    {
      "quote": "<exact words from transcript>",
      "tag": "<positive|negative|neutral>",
      "insight": "<one sentence why this matters>"
    }
  ],
  "rubric_score": {
    "score": <number 1-10>,
    "justification": "<paragraph that cites specific quotes from evidence>"
  },
  "kpi_mapping": [
    {
      "kpi": "<KPI name from the list>",
      "relevance": "<how the transcript shows this KPI>"
    }
  ],
  "gap_analysis": [
    {
      "gap": "<something important NOT mentioned in the transcript>",
      "impact": "<why this gap matters>"
    }
  ],
  "follow_up_questions": [
    {
      "question": "<specific question for next call>",
      "targets_gap": "<which gap this addresses>"
    }
  ]
}
`;
}

module.exports = { buildPrompt };