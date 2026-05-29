import { useState } from "react";
import axios from "axios";
import TranscriptInput from "./components/TranscriptInput";
import EvidenceSection from "./components/EvidenceSection";
import ScoreSection from "./components/ScoreSection";
import KpiSection from "./components/KpiSection";
import GapSection from "./components/GapSection";
import QuestionsSection from "./components/QuestionsSection";

export default function App() {
  const [transcript, setTranscript] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleAnalyze() {
    setLoading(true);
    setError(null);
    setAnalysis(null);
    try {
      const res = await axios.post("http://localhost:3001/api/analyze", { transcript });
      setAnalysis(res.data);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "24px", fontFamily: "sans-serif" }}>
      <h1>🔍 Supervisor Feedback Analyzer</h1>
      <p style={{ color: "#666" }}>Paste a supervisor transcript below. The AI will generate a draft analysis for your review.</p>

      <TranscriptInput value={transcript} onChange={setTranscript} onAnalyze={handleAnalyze} loading={loading} />

      {error && (
        <div style={{ background: "#fdecea", border: "1px solid #f44", padding: 12, borderRadius: 8, marginTop: 16 }}>
          ⚠️ {error}
        </div>
      )}

      {analysis && (
        <>
          {/* Uncertainty banner — design challenge #2 */}
          <div style={{ background: "#fff8e1", border: "1px solid #f9a825", padding: 12, borderRadius: 8, marginTop: 24, fontWeight: "bold" }}>
            ⚠️ DRAFT — This analysis is AI-generated. Review and edit before using.
          </div>
          <EvidenceSection evidence={analysis.evidence} />
          <ScoreSection rubric={analysis.rubric_score} />
          <KpiSection kpis={analysis.kpi_mapping} />
          <GapSection gaps={analysis.gap_analysis} />
          <QuestionsSection questions={analysis.follow_up_questions} />
        </>
      )}
    </div>
  );
}