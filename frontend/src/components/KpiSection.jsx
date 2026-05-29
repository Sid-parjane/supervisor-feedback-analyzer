export default function KpiSection({ kpis }) {
  return (
    <div style={{ marginTop: 32 }}>
      <h2>📊 KPI Mapping</h2>
      {kpis.map((k, i) => (
        <div key={i} style={{ borderLeft: "4px solid #1976d2", paddingLeft: 12, marginBottom: 12 }}>
          <strong>{k.kpi}</strong>
          <p style={{ color: "#555" }}>{k.relevance}</p>
        </div>
      ))}
    </div>
  );
}