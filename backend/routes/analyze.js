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

  const lineCount = code.split('\n').length;

  try {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 4096,
      messages: [
        {
          role: 'system',
          content: `You are an expert ${language} code analyzer and educator. Your job is to deeply analyze ${language} code and explain it clearly to someone learning programming.

When given ${language} code, respond ONLY with a valid JSON object in this exact format:
{
  "hasError": true or false,
  "errorType": "specific ${language} error name (e.g. ReferenceError, IndentationError, NullPointerException) or null",
  "errorExplanation": "2-3 sentence plain English explanation of exactly what went wrong and why, specific to ${language} — or null",
  "errorLine": "the exact line of code containing the error or null",
  "howToFix": "step-by-step plain English explanation of how to fix the error in ${language}, mentioning what to change and why — or null",
  "fixedCode": "the complete corrected ${language} code with the fix applied or null",
  "steps": [
    {
      "step": 1,
      "line": "exact line of code being executed",
      "explanation": "2-3 sentence explanation of what this line does, what values are involved, and why it matters in the overall program",
      "variables": { "varName": "current value after this step executes" }
    }
  ],
  "flowSummary": "3-5 sentence summary covering: what the code does overall, what inputs it takes, what logic/algorithm it uses, what output or result it produces, and any important edge cases or limitations"
}

IMPORTANT RULES:
- Cover EVERY meaningful line — for code with ${lineCount} lines, return at least ${Math.max(5, Math.floor(lineCount * 0.8))} steps
- For functions: include a step for the function definition AND each line inside it when called
- For loops: include a step for the loop start, one iteration example showing variable changes, and the loop end
- For conditionals (if/else): include a step for the condition check, show which branch executes and why
- For classes/objects: include a step for instantiation and each method call
- In variables{}: track ALL variables that exist at that point in execution, not just the ones on that line
- explanations must be beginner-friendly — avoid jargon, use analogies where helpful
- Be specific to ${language} syntax, conventions, and error types
- Do not add any text outside the JSON object`
        },
        {
          role: 'user',
          content: `Analyze this ${language} code thoroughly. It has ${lineCount} lines so make sure every important part is covered in the steps:\n\n${code}`
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