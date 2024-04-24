const express = require("express");
const { textGeneration } = require("../textGeneration/QAgeneration");
const {urlToAudio} = require("../vidToAudio/freeConvert")

const transcriptRoutes = express.Router();

transcriptRoutes.post('/chat', async (req, res) => {
    // try {
    //   await urlToAudio(req.body.url);
    //   // res.status(200).json({ message: "Here is your filename", fileName });
    // } catch (err) {
    //   console.error('Error:', err);
    //   res.status(500).json({ error: "Internal server error" });
    // }
    try {
      console.log(req.body)
        const aiRes = await textGeneration(req.body.msg, req.body.url);
        res.status(200).json({ message: "Here is your result", aiRes });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// transcriptRoutes.post('/video' , async(req,res) => {
//   try {
//     const fileName = await urlToAudio(req.body.url);
//     res.status(200).json({ message: "Here is your filename", fileName });
//   } catch (err) {
//     console.error('Error:', err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// })

module.exports = transcriptRoutes;