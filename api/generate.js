// api/generate.js
export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "No prompt provided" });

    const response = await fetch("https://api-inference.huggingface.co/models/gpt2-medium", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: prompt }),
    });

    const data = await response.json();

    console.log("Hugging Face API response:", data); // <-- debug log

    // Extract generated text safely
    let caption = "No caption generated";

    if (Array.isArray(data)) {
      // Some models return an array
      caption = data[0]?.generated_text || data[0]?.generated_text?.[0] || caption;
    } else if (typeof data === "object") {
      // Some models return an object
      caption = data?.generated_text || caption;
    }

    return res.status(200).json({ caption });
  } catch (error) {
    console.error("Error generating caption:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
}
