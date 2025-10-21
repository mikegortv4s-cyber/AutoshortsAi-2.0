async function generateCaptions(){
  const input = document.getElementById('inputText').value;
  const output = document.getElementById('output');
  output.textContent = 'Generating...';

  // Example offline captions
  const sample = [
    `🔥 ${input} — You won't believe the sound!`,
    `POV: ${input} in cinematic slow-mo 🏎️`,
    `Would you drive this beast? ${input} 💥`,
  ];
  output.textContent = sample.join('\n\n');

  // Replace this section later with actual OpenAI API call
}