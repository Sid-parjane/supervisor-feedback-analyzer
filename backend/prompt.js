const KPIS = [
  "Lead Generation - New potential customers identified and contacted",
  "Lead Conversion - Percentage of leads that become paying customers",
  "Upselling - Selling more to existing customers",
  "Cross-selling - Selling additional products to existing customers",
  "NPS - Customer satisfaction and likelihood to recommend",
  "PAT - Profit After Tax, bottom-line profitability",
  "TAT - Turnaround Time, process completion speed",
  "Quality - Defect rates, rejection rates, customer complaints"
];

const RUBRIC = `
NEED ATTENTION (1-3):
- Score 1 (Not Interested): Disengaged, no effort, does not attempt work
- Score 2 (Lacks Discipline): Works only when instructed, no self-initiative
- Score 3 (Motivated but Directionless): Enthusiastic but unfocused, energy without direction

PRODUCTIVITY (4-6):
- Score 4 (Careless and Inconsistent): Output exists but quality varies, sometimes good sometimes sloppy
- Score 5 (Consistent Performer): Reliable task execution, does what is asked, meets standards but doesn't exceed scope
- Score 6 (Reliable and Productive): High trust, supervisor gives task and forgets it, efficient execution, no follow-up needed

PERFORMANCE (7-10):
- Score 7 (Problem Identifier): Spots patterns, flags issues proactively, expands scope beyond assignments
- Score 8 (Problem Solver): Identifies AND fixes problems, builds solutions not just reports, creates tools or processes
- Score 9 (Innovative and Experimental): Tests multiple approaches, builds new tools, creates things that didn't exist
- Score 10 (Exceptional Performer): Flawless execution, others learn from their work, creates replicable systems

CRITICAL BOUNDARY — 6 vs 7:
Score 6 = excellent executor of tasks defined by others ("He does everything I give him. Very reliable.")
Score 7 = identifies problems the supervisor hadn't articulated ("She noticed our rejection rate goes up on Mondays and started tracking why.")
The difference is initiative direction. A 6 takes initiative within assigned scope. A 7 expands the scope.
`;

const ASSESSMENT_DIMENSIONS = `
1. Driving Execution - Does the Fellow get things done on time without reminders?
2. Systems Building - Has the Fellow created trackers, SOPs, or processes that persist after they leave? (SURVIVABILITY TEST: If the Fellow left tomorrow, would any system keep running?)
3. KPI Impact - Does the Fellow's work connect to measurable business outcomes?
4. Change Management - Can the Fellow get experienced floor workers to adopt new processes?
`;

const SUPERVISOR_BIASES = `
Watch for these biases in the supervisor's language:
- Helpfulness bias: "She handles all my calls now" sounds like an 8, but is actually task absorption (score 5-6), not systems building
- Presence bias: "He's always on the floor" gets rated higher than "She builds trackers" — don't fall for this
- Halo effect: One big positive story coloring the whole assessment
- Recency bias: Supervisor remembers last 2 weeks, not full tenure
`;

function buildPrompt(transcript) {
  return `
You are an expert analyst helping DeepThought psychology interns assess Fellow performance.
A Fellow is an early-career professional placed inside a manufacturing company for 3-6 months.
Their job is to build systems (Layer 2), not just execute tasks (Layer 1).

RUBRIC (use this to determine the score):
${RUBRIC}

BUSINESS KPIs (map Fellow's work to these):
${KPIS.join("\n")}

ASSESSMENT DIMENSIONS (check if each is covered):
${ASSESSMENT_DIMENSIONS}

SUPERVISOR BIASES TO WATCH FOR:
${SUPERVISOR_BIASES}

TRANSCRIPT:
"""
${transcript}
"""

Analyze this transcript carefully. Watch for supervisor biases. Distinguish between task execution (Layer 1) and systems building (Layer 2).

Return ONLY a valid JSON object with NO extra text, NO markdown, NO explanation outside the JSON:

{
  "evidence": [
    {
      "quote": "<exact words from transcript>",
      "tag": "<positive|negative|neutral>",
      "dimension": "<execution|systems_building|kpi_impact|change_management>",
      "insight": "<one sentence — is this Layer 1 task execution or Layer 2 systems building? why does it matter for scoring?>"
    }
  ],
  "rubric_score": {
    "score": <number 1-10>,
    "label": "<score label from rubric>",
    "band": "<Need Attention|Productivity|Performance>",
    "justification": "<paragraph citing specific evidence quotes and explaining the 6-vs-7 boundary decision if relevant>",
    "confidence": "<low|medium|high>"
  },
  "kpi_mapping": [
    {
      "kpi": "<KPI name>",
      "evidence": "<what the supervisor said that maps to this KPI>",
      "type": "<personal|system>"
    }
  ],
  "gap_analysis": [
    {
      "dimension": "<execution|systems_building|kpi_impact|change_management>",
      "detail": "<specific description of what was NOT mentioned in this transcript>"
    }
  ],
  "follow_up_questions": [
    {
      "question": "<specific question for next supervisor call>",
      "targets_gap": "<which dimension this targets>",
      "looking_for": "<what a good answer would reveal>"
    }
  ]
}
`;
}

module.exports = { buildPrompt };