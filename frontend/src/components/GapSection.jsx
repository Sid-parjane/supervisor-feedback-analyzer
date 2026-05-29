export default function GapSection({ gaps }) {
  if (!gaps || gaps.length === 0) {
    return (
      <div style={{ marginTop: 32 }}>
        <h2>🕳️ Gap Analysis</h2>
        <p style={{ color: "#999" }}>No gaps identified.</p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: 32 }}>
      <h2>🕳️ Gap Analysis</h2>
      {gaps.map((g, i) => (
        <div key={i} style={{ background: "#fff3e0", border: "1px solid #ffcc80", borderRadius: 8, padding: 12, marginBottom: 8 }}>
          <strong>Gap: {g.dimension || g.gap}</strong>
          <p style={{ color: "#555" }}>{g.detail || g.impact}</p>
        </div>
      ))}
    </div>
  );
}