async function generateCaptions() {
  const input = document.getElementById("inputText").value;
  const output = document.getElementById("output");
  output.textContent = "Generating...";

  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: input })
    });

    const data = await res.json();

    if (data.error) {
      output.textContent = "Error: " + data.error;
      return;
    }

    output.textContent = data.captions.join("\n\n");
  } catch (err) {
    output.textContent = "Error: " + err.message;
  }
}
