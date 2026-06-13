const express = require('express');
const router = express.Router();
const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

router.post('/', async (req, res) => {
  const { code, language = 'javascript' } = req.body;

  console.log('Language received:', language);

  if (!code) {
    return res.status(400).json({ error: 'No code provided' });
  }

  try {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: `You are an expert ${language} code analyzer. When given ${language} code, respond ONLY with a valid JSON object in this exact format:
{
  "hasError": true or false,
  "errorType": "name of error specific to ${language} or null",
  "errorExplanation": "simple plain English explanation of the error specific to ${language} or null",
  "errorLine": "the exact line with error or null",
  "howToFix": "simple fix explanation for ${language} or null",
  "fixedCode": "corrected ${language} code or null",
  "steps": [
    { "step": 1, "line": "code line", "explanation": "what happens in ${language}", "variables": {} }
  ],
  "flowSummary": "one sentence summary of what the ${language} code does"
}
Do not add any text outside the JSON. Be specific to ${language} syntax and error types.`
        },
        {
          role: 'user',
          content: `Analyze this ${language} code:\n\n${code}`
        }
      ]
    });

    const raw = completion.choices[0].message.content;
    const cleaned = raw.replace(/```json|```/g, '').trim();
    const result = JSON.parse(cleaned);
    res.json(result);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Analysis failed', details: err.message });
  }
});

module.exports = router;