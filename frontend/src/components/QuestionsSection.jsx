export default function QuestionsSection({ questions }) {
  if (!questions || questions.length === 0) {
    return (
      <div style={{ marginTop: 32 }}>
        <h2>❓ Suggested Follow-up Questions</h2>
        <p style={{ color: "#999" }}>No questions generated.</p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: 32 }}>
      <h2>❓ Suggested Follow-up Questions</h2>
      <ol>
        {questions.map((q, i) => (
          <li key={i} style={{ marginBottom: 12 }}>
            <strong>{q.question}</strong>
            <br />
            <span style={{ color: "#777", fontSize: 13 }}>Targets gap: {q.targets_gap}</span>
            {q.looking_for && (
              <p style={{ color: "#999", fontSize: 12, marginTop: 4 }}>Looking for: {q.looking_for}</p>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}