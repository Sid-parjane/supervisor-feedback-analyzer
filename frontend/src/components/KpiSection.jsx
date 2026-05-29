export default function KpiSection({ kpis }) {
  if (!kpis || kpis.length === 0) {
    return (
      <div style={{ marginTop: 32 }}>
        <h2>📊 KPI Mapping</h2>
        <p style={{ color: "#999" }}>No KPIs identified.</p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: 32 }}>
      <h2>📊 KPI Mapping</h2>
      {kpis.map((k, i) => (
        <div key={i} style={{ borderLeft: "4px solid #1976d2", paddingLeft: 12, marginBottom: 12 }}>
          <strong>{k.kpi}</strong>
          <p style={{ color: "#555" }}>{k.evidence || k.relevance}</p>
          {k.type && <span style={{ fontSize: 12, color: "#888" }}>Type: {k.type}</span>}
        </div>
      ))}
    </div>
  );
}