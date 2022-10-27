const express = require('express')
const ytdl = require('ytdl-core')
const { getInfo } = require('ytdl-getinfo')
const cors = require('cors')
const fs = require('fs')
const { resolve } = require('path')

const PORT = process.env.PORT || 3000

const app = express()

app.use(cors())

//TODO: remove unnecessary comments

// app.get('/', async (req, res) => {
// 	const url = req.query.URL
// 	console.log(url)
// 	await new Promise(resolve => {
// 		ytdl(url)
// 			.pipe(fs.createWriteStream('video.mp4'))
// 			.on('close', () => {
// 				resolve()
// 			})
// 	})
// 	console.log('JEKa')
// 	res.download(__dirname + '/video.mp4')
// })


//TODO: add router
app.get('/', async (req, res) => {
	const url = req.query.URL
	let obj = {}
	getInfo(url)
		.then(info => {
			info.items[0].formats.forEach(format => {
				if (format.format_note > '0' && format.format_note < '9') {
					obj[format.format_note] = true
				}
			})

			delete obj['tiny']
			res.send([obj, info.items[0].webpage_url])
		})
		.catch(err => res.status(500).send('error: ' + err))
})

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`)
})
