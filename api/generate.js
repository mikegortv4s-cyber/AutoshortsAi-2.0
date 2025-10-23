// api/generate.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
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

    console.log("Raw HuggingFace Response:", data); // <- Debug

    // GPT2 can return array with generated_text or error message
    let caption = "No caption generated";

    if (Array.isArray(data) && data[0]?.generated_text) {
      caption = data[0].generated_text;
    } else if (data.generated_text) {
      caption = data.generated_text;
    } else if (data.error) {
      caption = `Error: ${data.error}`;
    }

    return res.status(200).json({ caption });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}
