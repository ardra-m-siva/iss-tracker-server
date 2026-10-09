require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
require('./dbConfig/config')
require('./utils/fetchSpaceStationLocCron')
const spaceStationRouter = require('./routes/spaceStationRouter')

const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json())
app.use(cors({
    origin: '*'
}))
app.use(morgan('dev'))
app.set('trust proxy', 1)
app.use('/api/iss', spaceStationRouter)

app.listen(PORT, () => {
    console.log("server started at port", PORT);
})

app.get('/', (req, res) => {
    res.send("Server started")
})
