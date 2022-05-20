function listar() {
    const url = 'http://localhost:3000/list'

    fetch(url).then(
      response => response.json()
    ).then(
      data => {
        let html = '    <h1>Lista de páginas</h1>\n<ul>';
        for(let i=0; i<data.text.length;i++){
            var name = data.text[i];
          html += '<li onclick=viewPages("'+name+'")>' + name + '</li>'
        }
        html += '</ul>\n<button onclick=formPage()>Crear</button>'
        document.querySelector("#main").innerHTML = html
      }
    )
}

function viewPages(name) {
    const url = 'http://localhost:3000/view'
	const data = {
		text: name
	}
	
	const request = {
		method: 'POST', 
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	}
	fetch(url, request).then(
		response => response.json()
	).then(
		data => {  
			document.querySelector("#main").innerHTML = data.text
		}
	)
}

function formPage(){
	html =  `
			<form id="markupForm">
            
                <input type="text" id="markupTitle" placeholder='Ingrese el titulo'><br>
				<textarea id="markupText" rows="10" cols="50" placeholder='Ingrese el texto'></textarea>
				<input type="submit" id='enviar'>
  			</form>
			<button onclick='listar()'>Lista</button>  

	`
	document.querySelector("#main").innerHTML = html
	noNullForm()
    createMarkdown()
}

function noNullForm(){
	const title = document.querySelector('#markupTitle');
	const text= document.querySelector('#markupText');
	const boton = document.querySelector('#enviar');
	boton.disabled = true;
	title.onkeyup = () =>{
		if(title.value.length > 0 && text.value.length > 0){
			boton.disabled = false;
		}else{
			boton.disabled = true;
		}
	};
	text.onkeyup = () =>{
		if(text.value.length > 0 && title.value.length > 0){
			boton.disabled = false;
		}else{
			boton.disabled = true;
		}
	};
}

function createMarkdown(){
	const text = document.querySelector('#markupText')
    const title = document.querySelector('#markupTitle')

    document.querySelector('#markupForm').onsubmit = () => {
		crearPage(title.value,text.value)
	  	return false;
	}
}

function crearPage(titlePage, textPage) {
    const url = 'http://localhost:3000/create'
	const data = {
		title: titlePage,
        text: textPage
	}
	const request = {
		method: 'POST', // Podría ser GET
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	}
	fetch(url, request).then(
		response => response.json()
	).then(
		data => {  
			console.log(data)
		}
	)
    listar()
}

document.addEventListener('DOMContentLoaded', function() {listar()})
