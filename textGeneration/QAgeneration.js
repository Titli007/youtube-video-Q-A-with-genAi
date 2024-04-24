const OpenAI = require ("openai");
const openai = new OpenAI();
const { getFileName } = require('../audioToText/openAi');

async function textGeneration(msg, url) {
    
  try {
    const userMsg = msg;
    // let userMsg = "explain abstraction"

    const transcriptionPromise = await getFileName(url); // Wait for getFileName to complete
    const transcription = await transcriptionPromise; // Wait for the transcription promise to resolve

    let systemChat = { "role": "system", "content": "You are a helpful assistant." }

    let convoHistory = [
        systemChat,
        { "role": "user", "content": `Please read the following transcription carefully: ${transcription.text}` },
        { "role": "assistant", "content": "OK, I will read the transcription carefully. And answer the following question accordingly. If the answer of the question is not in the provided text then reply with 'now answer found of this question'" },
    ]

    convoHistory.push({ role: "user", content: userMsg });

    const completion = await openai.chat.completions.create({
      messages: convoHistory,

      model: "gpt-3.5-turbo",
    });

    console.log(completion.choices[0]);

    let aiResponse = completion.choices[0]

    convoHistory.push({ role: "assistant", content: aiResponse.message.content });

    console.log(convoHistory)

    return aiResponse.message.content

    
  } catch (err) {
    console.error('Error:', err);
  }
}

module.exports = {textGeneration}
