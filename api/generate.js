export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ caption: "Method not allowed" });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ caption: "Prompt is required" });
  }

  try {
    const response = await fetch("https://api-inference.huggingface.co/models/gpt2-medium", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: prompt })
    });

    const data = await response.json();

    // Look in both possible places for generated text
    const caption = data[0]?.generated_text || data?.generated_text || "No caption generated";

    return res.status(200).json({ caption });

  } catch (error) {
    return res.status(500).json({ caption: `Error: ${error.message}` });
  }
}
