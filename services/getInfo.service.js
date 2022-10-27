const { getInfo } = require('ytdl-getinfo')

class getInfoService {
	async getInfo(req, res) {
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
	}
}

module.exports = new getInfoService()
