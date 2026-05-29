const express = require("express");
const cors = require("cors");
const { buildPrompt } = require("./prompt");
const { extractJSON } = require("./parser");

const app = express();
app.use(cors());
app.use(express.json());

const OLLAMA_URL = "http://localhost:11434/api/generate";
const MODEL = "llama3.2";

async function callOllama(prompt) {
  const response = await fetch(OLLAMA_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: MODEL,
      prompt: prompt,
      stream: false,      
      format: "json"      
    })
  });

  if (!response.ok) {
    throw new Error(`Ollama error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.response; 
}

app.post("/api/analyze", async (req, res) => {
  const { transcript } = req.body;

  if (!transcript || transcript.trim().length < 20) {
    return res.status(400).json({ error: "Transcript is too short or empty." });
  }

  try {
    const prompt = buildPrompt(transcript);

    let rawText = await callOllama(prompt);
    let parsed = extractJSON(rawText);

    if (!parsed) {
      console.warn("First parse failed, retrying...");
      const retryPrompt = prompt + "\n\nIMPORTANT: Your previous response could not be parsed. Return ONLY the raw JSON object. No markdown, no explanation.";
      rawText = await callOllama(retryPrompt);
      parsed = extractJSON(rawText);
    }

    if (!parsed) {
      return res.status(502).json({
        error: "The model did not return valid JSON after two attempts. Try again."
      });
    }

    return res.json(parsed);

  } catch (err) {
    console.error(err);
    if (err.message.includes("ECONNREFUSED")) {
      return res.status(503).json({ error: "Ollama is not running. Start it with: ollama serve" });
    }
    return res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => {
  console.log("Backend running at http://localhost:3001");
});