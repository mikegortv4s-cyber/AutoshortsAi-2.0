export default async function handler(req, res) {
  console.log("Function reached!");
  console.log("API Key:", process.env.OPENAI_API_KEY ? "FOUND" : "MISSING");

  res.status(200).json({
    message: "Function is running",
    apiKeyStatus: process.env.OPENAI_API_KEY ? "FOUND" : "MISSING"
  });
}
