const response = await fetch("https://api-inference.huggingface.co/models/gpt2-medium", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ inputs: prompt })
});

const data = await response.json();
const caption = data?.generated_text || "No caption generated";
