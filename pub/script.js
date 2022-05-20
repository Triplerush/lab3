function listar() {
    const url = 'http://localhost:3000/list'

    fetch(url).then(
      response => response.json()
    ).then(
      data => {
        let html = '<ul>';
        for(let i=0; i<data.text.length;i++){
          html += '<li>' + data.text[i] + '</li>'
        }
        html += '</ul>'
        document.querySelector("#lista").innerHTML = html
      }
    )
}

document.addEventListener('DOMContentLoaded', function() {
	listar()
	}
)
