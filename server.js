const fs = require('fs')
const path = require('path')
const express = require('express')
const bp = require('body-parser')
const MarkdownIt = require('markdown-it'),
	md = new MarkdownIt();
const app = express()

app.use(express.static('pub'))
app.use(bp.json())
app.use(bp.urlencoded({
	extended: true
}))

app.listen(3000, () => {
	console.log("Escuchando en: http://localhost:3000")
})

app.get('/', (request, response) => {
	response.sendFile(path.resolve(__dirname, 'index.html'))
})

app.get('/list', (request, response) => {
	response.json({
		text: fs.readdirSync(path.resolve(__dirname, 'textos/'))
	})
})

app.post('/view', (request, response) => {
    let namePage = request.body.text
	let dir = 'textos/' + namePage;
    fs.readFile(path.resolve(__dirname, dir), 'utf8',
		(err, data) => {
			if (err) {
				console.error(err)
				response.status(500).json({
					error: 'message'
				})
				return
			}
			response.json({
				text: md.render(data)
			})
		})
	response.setHeader('Content-Type', 'application/json')
})

app.post('/create', (request, response) => {
	let markDownText = request.body
    const content = markDownText.text
    const dir = 'textos/' + markDownText.title
	fs.writeFile(path.resolve(__dirname, dir), content, err => {
		if (err) {
		  console.error(err);
		}
	}); 
    response.setHeader('Content-Type', 'application/json')
	response.end(JSON.stringify({
		text: content,
        title: markDownText.title
	}))
})