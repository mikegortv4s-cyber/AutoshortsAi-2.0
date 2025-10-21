import OpenAI from "openai";
console.log("API Key:", process.env.OPENAI_API_KEY ? "FOUND" : "MISSING");
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Missing prompt" });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a creative YouTube Shorts caption generator for car videos." },
        { role: "user", content: prompt }
      ],
      max_tokens: 150
    });

    const captions = response.choices[0].message.content
      .split("\n")
      .filter(line => line.trim() !== "");

    res.status(200).json({ captions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
