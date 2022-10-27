const express = require('express')
const cors = require('cors')
const getInfo = require('./routers/getInfoRouter')
const PORT = process.env.PORT || 3000

const app = express()

app.use(cors())
app.use('/getInfo', getInfo)

app.get('/', async (req, res) => {
	res.send('working')
})

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`)
})
