const axios = require('axios');
const fs = require('fs');
const path = require('path');

function sanitizeFileName(fileName) {
  // Replace or remove invalid characters in the file name
  return fileName.replace(/[\\/:*?"<>|]/g, '').replace(/ /g, '_');
}

async function urlToAudio(url) {
  return new Promise(async (resolve, reject) => {
    console.log("1")
    //  const url = `https://www.youtube.com/watch?v=m_MQYyJpIjg`;

     const match = url.match(/(?:\?|&)v=([^&]+)/);
     console.log("2")
     const videoId = match ? match[1] : null;
     console.log("3")
     console.log(videoId);
     console.log("4")
 
     const options = {
       method: 'GET',
       url: 'https://youtube-mp36.p.rapidapi.com/dl',
       params: { id: videoId },
       headers: {
         'X-RapidAPI-Key': 'f0f2be9902msh02df0568550c5bbp13cacdjsn61cf4c71eaf9',
         'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
       }
     };
 
     try {
      console.log("5");
       const response = await axios.request(options);
       const downloadLink = response.data.link;
 
       const audioFileResponse = await axios.get(downloadLink, { responseType: 'stream' });
 
       let audioFileName = 'audio.mp3';
       if (audioFileResponse.headers['content-disposition']) {
        console.log("6");
         audioFileName = audioFileResponse.headers['content-disposition'].split('=')[1];
       }

       console.log("7");
 
       const sanitizedFileName = sanitizeFileName(audioFileName);
       console.log("8");
 
       const filePath = path.join(__dirname, sanitizedFileName);
       const writer = fs.createWriteStream(filePath);
       console.log("9");
 
       audioFileResponse.data.pipe(writer);
       console.log("10");

       writer.on('finish', () => {
        console.log("11");
         console.log(`Audio file ${sanitizedFileName} saved successfully.`);
         resolve(sanitizedFileName);
       });
 
       writer.on('error', (err) => {
        console.log("12");
         console.error(`Error saving audio file: ${err}`);
         reject(err);
       });
     } catch (error) {
       console.error(error);
       reject(error);
     }
  });
 }

module.exports = { urlToAudio };