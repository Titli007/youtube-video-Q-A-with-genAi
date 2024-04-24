const express = require('express')
const cors = require('cors')
require('dotenv').config();

// const {urlToAudio} = require('./vidToAudio/freeConvert')
// const {textGeneration} = require('./textGeneration/QAgeneration')
const {connectDB} = require('./db/mongoConfig')
const transcriptRoutes = require('./routes/transcriptRoutes')

const app = express()
const port = process.env.PORT || 4000;
app.use(express.json())
app.use(cors())
app.use(transcriptRoutes)


connectDB()

app.listen(port, ()=>{
    console.log('app listening to the port', port)
})