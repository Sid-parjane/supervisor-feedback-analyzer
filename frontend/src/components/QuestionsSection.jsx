export default function QuestionsSection({ questions }) {
  return (
    <div style={{ marginTop: 32 }}>
      <h2>❓ Suggested Follow-up Questions</h2>
      <ol>
        {questions.map((q, i) => (
          <li key={i} style={{ marginBottom: 12 }}>
            <strong>{q.question}</strong>
            <br />
            <span style={{ color: "#777", fontSize: 13 }}>Targets gap: {q.targets_gap}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}