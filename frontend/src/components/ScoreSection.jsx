export default function ScoreSection({ rubric }) {
  return (
    <div style={{ marginTop: 32, background: "#e3f2fd", border: "1px solid #90caf9", borderRadius: 8, padding: 16 }}>
      <h2>⭐ Suggested Rubric Score</h2>
      <div style={{ fontSize: 48, fontWeight: "bold" }}>{rubric.score} / 10</div>
      <p style={{ color: "#444", fontStyle: "italic" }}>Suggested score — not final</p>
      <p>{rubric.justification}</p>
    </div>
  );
}