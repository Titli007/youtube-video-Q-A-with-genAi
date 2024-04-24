// openAi.js

const fs = require("fs");
const OpenAI = require("openai");
const { urlToAudio } = require('../vidToAudio/freeConvert.js');
const path = require('path');

const openai = new OpenAI();

let fileName = '';

async function getFileName(url) {
  try {
    fileName = await urlToAudio(url);
    console.log('Result:', fileName); // Handle the resolved value here
    return createTranscript(); // Return the promise returned by createTranscript
  } catch (err) {
    console.error('Error:', err); // Handle the rejected error here
    throw err; // Rethrow the error to propagate it
  }
}

async function createTranscript() {
  try {
    console.log("filename:", fileName);
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(path.join(__dirname, '..', 'vidToAudio', fileName)),
      model: "whisper-1",
    });

    if (transcription !== undefined) {
      // console.log(transcription);
      return transcription;
    } else {
      console.error('Transcription is undefined.');
      return null; // Return null or handle the case appropriately
    }
  } catch (error) {
    console.error('Error creating transcription:', error);
    throw error; // Rethrow the error to propagate it
  }
}


module.exports = { getFileName };
