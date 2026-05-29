function extractJSON(rawText) {
  try {
    return JSON.parse(rawText);
  } catch (_) {}

  const fenceMatch = rawText.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenceMatch) {
    try {
      return JSON.parse(fenceMatch[1].trim());
    } catch (_) {}
  }

  const start = rawText.indexOf("{");
  const end = rawText.lastIndexOf("}");
  if (start !== -1 && end !== -1) {
    try {
      return JSON.parse(rawText.slice(start, end + 1));
    } catch (_) {}
  }

  return null;
}

module.exports = { extractJSON };