function listar() {
    const url = 'http://localhost:3000/list'

    fetch(url).then(
      response => response.json()
    ).then(
      data => {
        let html = '<ul>';
        for(let i=0; i<data.text.length;i++){
            var name = data.text[i];
          html += '<li onclick=viewPages("'+name+'")>' + name + '</li>'
        }
        html += '</ul>\n<button onclick=formPage()>Crear</button>'
        document.querySelector("#lista").innerHTML = html
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
			document.querySelector("#lista").innerHTML = data.text
		}
	)
}

function formPage(){
	html =  `
			<form id="markupForm">
            
                <input type="text" id="markupTitle" placeholder='Ingrese el titulo'>
				<textarea id="markupText" rows="10" cols="50" placeholder='Ingrese el texto'></textarea>
				<input type="submit" id='enviar'>
  			</form>
			<button onclick='listar()'>Lista</button>  

	`
	document.querySelector("#lista").innerHTML = html
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
		console.log(title.value,text.value)
	  	return false;
	}
}

document.addEventListener('DOMContentLoaded', function() {listar()})
