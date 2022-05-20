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

function viewPages(name){
    console.log('Hello ' + name) 
}


document.addEventListener('DOMContentLoaded', function() {
	listar()
	}
)
