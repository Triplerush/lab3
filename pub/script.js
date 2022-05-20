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
        html += '</ul>'
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
}

document.addEventListener('DOMContentLoaded', function() {
	listar()
	}
)
