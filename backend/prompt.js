const CRITICAL_INSTRUCTION = `
BEFORE YOU SCORE ANYTHING, answer these 3 questions about the transcript:

QUESTION 1 — SURVIVABILITY TEST:
List every activity the Fellow does. For each one, ask: 
"If the Fellow was gone tomorrow, would this activity keep happening WITHOUT someone replacing them personally?"
- Anil runs the morning briefing → NO, it stops → Layer 1
- Anil handles retailer calls → NO, it stops → Layer 1  
- Anil does Raghav's planning → NO, it stops → Layer 1
- Meena's dispatch risk email → partially, someone else could send it → Layer 1-2 boundary
If MORE THAN HALF the activities stop when the Fellow leaves → score cannot exceed 6.

QUESTION 2 — WHO BENEFITS TEST:
Did the Fellow reduce the SUPERVISOR'S personal workload by absorbing it themselves?
If yes → helpfulness bias → cap score at 5-6
Did the Fellow build something the TEAM now runs independently?
If yes → genuine systems building → can score 7+

QUESTION 3 — RAGHAV TEST:
Is the Fellow doing work that BELONGS TO SOMEONE ELSE in the organization?
"Anil does Raghav's planning" = Anil absorbed Raghav's job
This is a dependency problem, not a systems building achievement.
It means two people are now dependent on Anil instead of one.
This LOWERS the score, it does not raise it.

Only after answering all 3 questions, proceed to scoring.
`;

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
- Score 4 (Careless and Inconsistent): Output exists but quality varies
- Score 5 (Consistent Performer): Reliable task execution, does what is asked, meets standards
- Score 6 (Reliable and Productive): High trust, supervisor gives task and forgets it, no follow-up needed

PERFORMANCE (7-10):
- Score 7 (Problem Identifier): Spots patterns the supervisor did not ask about, flags issues proactively, expands scope
- Score 8 (Problem Solver): Identifies AND fixes problems, builds tools or processes
- Score 9 (Innovative and Experimental): Tests multiple approaches, builds new tools, creates things that did not exist
- Score 10 (Exceptional Performer): Flawless execution, others learn from their work, creates replicable systems
`;

const LAYER_LOGIC = `
A Fellow's work has two layers. You MUST distinguish between them:

LAYER 1 — Task Execution (necessary but not the mandate):
- Attending meetings, maintaining spreadsheets, handling calls
- Coordinating between departments
- Being physically present and responsive
- Doing what the supervisor assigns

LAYER 2 — Systems Building (the actual mandate):
- Creating SOPs, trackers, or workflows that PERSIST after the Fellow leaves
- Designing accountability structures others can run
- Building something that works WITHOUT the Fellow's daily involvement

SURVIVABILITY TEST (apply this to every transcript):
Ask: "If this Fellow left tomorrow, would anything they built keep running on its own?"
- If YES → evidence of Layer 2 → can score 7+
- If NO → only Layer 1 → score cannot exceed 6
`;

const SCORING_RULES = `
STRICT SCORING RULES — apply these to every transcript regardless of supervisor tone:

RULE 1 — Presence does not equal Performance
"Always on the floor", "very sincere", "comes on time" = personality traits, NOT systems building. Never push score above 6 for these.

RULE 2 — Task Absorption is NOT Systems Building
"She handles all my calls", "he runs my meetings", "she does the planning" = Fellow absorbed supervisor's workload. Score 5-6, NOT 7+.

RULE 3 — A Personally Maintained Sheet is NOT a System
A tracker the Fellow updates every evening is Layer 1. A system is one that others can run without the Fellow.

RULE 4 — Supervisor Tone Does NOT Determine Score
A glowing supervisor can describe a 5. A critical supervisor can describe a 7. Read the EVIDENCE, not the emotion.

RULE 5 — Score 7+ requires this specific evidence
The Fellow must have identified a problem the supervisor did NOT ask them to solve.

RULE 6 — Score 8+ requires this specific evidence
The Fellow must have built something that runs without their personal daily involvement.

RULE 7 — Watch for these supervisor biases
- Helpfulness bias: Supervisor says "she's so helpful" because their own workload dropped
- Presence bias: "Always on the floor" rated higher than "builds trackers on laptop"
- Halo effect: One impressive story colors the whole assessment
- Recency bias: Supervisor remembers last 2 weeks, not full tenure

RULE 8 — KPI Mapping must be grounded in evidence
Only map a KPI if the supervisor's words clearly connect to it.
If no KPI is mentioned or implied, return an empty array.
NEVER guess or hallucinate a KPI. NEVER return placeholder text.
Common mappings:
- "dispatch faster", "missed deadlines", "ship date" = TAT
- "rejection rate", "quality complaints", "defects" = Quality
- "customer satisfaction", "retailer happy" = NPS
- "costs came down", "waste reduced" = PAT

RULE 9 — The 3 AM Hero Test
A Fellow who comes in at 3 AM to personally fix a crisis is demonstrating PERSONAL DEPENDENCY, not systems building.
The right question is: "Why did the night supervisor call Anil instead of following a protocol?"
If no protocol exists that the Fellow built, this is Layer 1 heroism, not Layer 2 systems building.

RULE 10 — Doing Another Person's Job = Task Absorption
"Anil does Raghav's planning for him" = Anil absorbed Raghav's role.
This is a RED FLAG. Score 5, not 8+.

RULE 11 — "Takes so much off my plate" = Helpfulness Bias
When supervisor says Fellow reduced their personal workload, ask:
Did the Fellow build a system anyone could run? Or did they personally absorb the founder's tasks?
Maximum score when task absorption is primary evidence = 5-6.

RULE 12 — "Don't know how we managed without him" = Dependency Signal
This means NOTHING keeps running if Fellow leaves = score cannot exceed 6.
`;

const DIMENSIONS = `
Check if the transcript covers all 4 assessment dimensions. Missing ones become gaps:

1. EXECUTION — Does the Fellow get things done without reminders? Who initiates work?
2. SYSTEMS BUILDING — Has the Fellow built anything that persists without them? (Apply survivability test)
3. KPI IMPACT — Is the Fellow's work connected to any measurable business outcome?
4. CHANGE MANAGEMENT — Can the Fellow get experienced floor workers to adopt new processes?
`;

function buildPrompt(transcript) {
  return `
You are an expert analyst helping DeepThought psychology interns assess Fellow performance.
Fellows are early-career professionals placed inside manufacturing companies for 3-6 months.
Their mandate is to BUILD SYSTEMS, not just execute tasks.

${CRITICAL_INSTRUCTION}

${RUBRIC}

${LAYER_LOGIC}

${SCORING_RULES}

${DIMENSIONS}

BUSINESS KPIs — map the Fellow's work to these only if evidence exists:
${KPIS.join("\n")}

---

TRANSCRIPT TO ANALYZE:
"""
${transcript}
"""

---

INSTRUCTIONS:
1. First answer the 3 questions from CRITICAL_INSTRUCTION explicitly in your reasoning
2. Apply the survivability test
3. Identify which supervisor biases are present
4. Score based on EVIDENCE not supervisor tone
5. Only map KPIs that are explicitly mentioned or clearly implied
6. For gaps, identify dimensions the transcript did NOT cover at all

Return ONLY a valid JSON object. No markdown, no explanation, no text outside the JSON:

{
  "evidence": [
    {
      "quote": "<exact words from transcript>",
      "tag": "<positive|negative|neutral>",
      "dimension": "<execution|systems_building|kpi_impact|change_management>",
      "layer": "<Layer 1 - task execution|Layer 2 - systems building>",
      "insight": "<one sentence explaining what this reveals about the Fellow's actual contribution>"
    }
  ],
  "rubric_score": {
    "score": <number 1-10>,
    "label": "<score label from rubric>",
    "band": "<Need Attention|Productivity|Performance>",
    "survivability_test": "<if Fellow left tomorrow, what stops vs what keeps running>",
    "supervisor_bias_detected": "<which biases are present in this transcript>",
    "justification": "<paragraph citing specific evidence, explaining Layer 1 vs Layer 2, explaining scoring decision>",
    "confidence": "<low|medium|high>"
  },
  "kpi_mapping": [
    {
      "kpi": "<KPI name>",
      "evidence": "<exact supervisor quote or paraphrase>",
      "type": "<personal|system>"
    }
  ],
  "gap_analysis": [
    {
      "dimension": "<execution|systems_building|kpi_impact|change_management>",
      "detail": "<specific description of what was NOT mentioned>"
    }
  ],
  "follow_up_questions": [
    {
      "question": "<specific question for next supervisor call>",
      "targets_gap": "<which dimension this addresses>",
      "looking_for": "<what a good answer would reveal>"
    }
  ]
}
`;
}

module.exports = { buildPrompt };