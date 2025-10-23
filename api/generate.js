// api/generate.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "No prompt provided" });
  }

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/gpt2-medium",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: prompt }),
      }
    );

    const data = await response.json();

    // GPT-2 returns an array of objects with 'generated_text'
    const caption =
      data?.[0]?.generated_text ||
      data?.generated_text ||
      "No caption generated";

    return res.status(200).json({ caption });
  } catch (error) {
    console.error("HuggingFace API error:", error);
    return res.status(500).json({ caption: "No caption generated" });
  }
}
