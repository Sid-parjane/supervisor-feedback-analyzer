const TAG_COLORS = { positive: "#e8f5e9", negative: "#fdecea", neutral: "#f5f5f5" };
const TAG_EMOJI = { positive: "✅", negative: "❌", neutral: "➖" };

export default function EvidenceSection({ evidence }) {
  return (
    <div style={{ marginTop: 32 }}>
      <h2>📌 Extracted Evidence</h2>
      {evidence.map((e, i) => (
        <div key={i} style={{ background: TAG_COLORS[e.tag], border: "1px solid #ddd", borderRadius: 8, padding: 12, marginBottom: 8 }}>
          <strong>{TAG_EMOJI[e.tag]} {e.tag.toUpperCase()}</strong>
          <p style={{ fontStyle: "italic" }}>"{e.quote}"</p>
          <p style={{ color: "#555" }}>{e.insight}</p>
        </div>
      ))}
    </div>
  );
}