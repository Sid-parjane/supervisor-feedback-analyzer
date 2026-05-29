export default function GapSection({ gaps }) {
  return (
    <div style={{ marginTop: 32 }}>
      <h2>🕳️ Gap Analysis</h2>
      {gaps.map((g, i) => (
        <div key={i} style={{ background: "#fff3e0", border: "1px solid #ffcc80", borderRadius: 8, padding: 12, marginBottom: 8 }}>
          <strong>Gap: {g.gap}</strong>
          <p style={{ color: "#555" }}>{g.impact}</p>
        </div>
      ))}
    </div>
  );
}