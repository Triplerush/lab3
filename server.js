const fs = require('fs')
const path = require('path')
const express = require('express')
const bp = require('body-parser')
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
	console.log(namePage)
	let dir = 'text/' + namePage;
	response.setHeader('Content-Type', 'application/json')
	response.end(JSON.stringify({
		text: namePage
	}))
})