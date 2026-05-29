# Supervisor Feedback Analyzer

A simple web app that reads a supervisor's call transcript and gives you a structured summary using AI — running completely on your laptop, no internet needed.

Built for DeepThought's psychology interns and HR team to save time when reviewing Fellow feedback.

> ⚠️ The AI gives you a starting point. A human must always review and edit the output before using it.

---

## The Problem It Solves

Right now, analyzing a supervisor transcript takes 45–60 minutes manually. This app brings it closer to 10 minutes by giving you a ready-made draft that you just review and adjust.

---

## What You Get After Pasting a Transcript

- **Evidence** — Direct quotes from the transcript, each labeled as positive, negative, or neutral
- **Score** — A suggested rating from 1 to 10, with a written explanation for why
- **KPI Mapping** — Which of the 8 business goals the Fellow is hitting (or missing)
- **Gaps** — Important things the transcript didn't mention at all
- **Follow-up Questions** — 3 to 5 questions to ask in the next call, based on the gaps

---

## What You Need Before Starting

- A Mac, Windows, or Linux laptop
- Node.js installed (download from nodejs.org if you don't have it)
- Ollama installed (download from ollama.com — this is the AI that runs locally)

---

## How To Run It (Step by Step)

### Step 1 — Download the project

```bash
git clone https://github.com/Sid-parjane/supervisor-feedback-analyzer.git
cd supervisor-feedback-analyzer
```

### Step 2 — Set up the AI (Ollama)

```bash
ollama pull llama3.2
ollama serve
```

Keep this terminal window open. The AI needs to stay running.

### Step 3 — Start the backend (the brain of the app)

Open a new terminal window and run:

```bash
cd backend
npm install
node server.js
```

Keep this open too.

### Step 4 — Start the frontend (what you see in the browser)

Open one more terminal window and run:

```bash
cd frontend
npm install
npm run dev
```

### Step 5 — Open the app

Go to **http://localhost:5173** in your browser. Paste a transcript, hit Run Analysis, and wait about 30–60 seconds.

---

## How It Works (Simple Version)

You paste transcript → App sends it to the AI → AI sends back analysis → App shows it to you

More specifically:

1. You type or paste a transcript in the browser
2. The browser sends it to a small server running on your laptop
3. That server sends it to Ollama (the AI, also on your laptop)
4. Ollama reads the transcript and returns a structured analysis
5. The server cleans up the response and sends it back to your browser
6. You see the full analysis broken into sections

No data ever leaves your laptop. Everything is local.

---

## Why We Chose llama3.2

It's fast, free, and works well on a normal laptop without a powerful GPU. It follows instructions well enough to return structured data consistently. You can swap it for mistral or phi3 by changing one word in the code if you prefer.

---

## Two Technical Problems We Solved

### Problem 1 — The AI doesn't always return clean data

Sometimes the AI wraps its response in extra text or formatting. We wrote a parser that tries three different ways to extract the actual data. If all three fail, it asks the AI again with stricter instructions. If it fails a second time, it shows you a clear error message instead of crashing.

### Problem 2 — People might trust the AI too much

We added a yellow warning banner at the top of every analysis that says "DRAFT — Review Before Using". The score is shown as "Suggested Score" not just "Score". The language throughout is careful to remind you that this is a starting point, not a final answer.

---

## Things I Would Add With More Time

1. Show the transcript and analysis side by side so you can see exactly which line each quote came from
2. Let you edit the analysis directly in the browser before saving it
3. Add a button to export the final analysis as a PDF
4. Add a dropdown to switch between different AI models without touching the code
5. Save past analyses so you can look back at previous calls

---

## Test Data

The file `sample-transcripts.json` has 3 example transcripts you can paste in to test the app right away.