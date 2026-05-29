export default function TranscriptInput({ value, onChange, onAnalyze, loading }) {
  return (
    <div>
      <textarea
        rows={10}
        style={{ width: "100%", padding: 12, fontSize: 14, borderRadius: 8, border: "1px solid #ccc" }}
        placeholder="Paste supervisor transcript here..."
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      <button
        onClick={onAnalyze}
        disabled={loading || !value.trim()}
        style={{ marginTop: 8, padding: "10px 24px", background: "#1976d2", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 16 }}
      >
        {loading ? "Analyzing... (this may take 30–60s)" : "Run Analysis"}
      </button>
    </div>
  );
}