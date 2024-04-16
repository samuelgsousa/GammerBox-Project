const colors = ['#e74c3c', '#8e44ad', '#3498db', '#e67e22', '#2ecc71']

const setGrid = () => {
    const container = document.querySelector('div#magic-grid')
    
    const SQUARES = 800
    
    for(let i = 0; i < SQUARES; i++) {
        const square = document.createElement('div')
        square.classList.add('square')
    
        square.addEventListener('mouseover', () => setColor(square))
    
        square.addEventListener('mouseout', () => removeColor(square))
    
        container.appendChild(square)
    }
    }

function setColor(element) {
   const color = getRandomColor()
   element.style.background = color
   element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
}

function removeColor(element) {
   element.style.background = '#1d1d1d'
   element.style.boxShadow = '0 0 2px #000'
}

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)]
}

//Adicionando cabeçalho//
const body = document.body

const head = document.createElement('nav')
head.setAttribute("class", "navbar")

fetch("header.html")
.then(res => res.text())
.then(res =>{
    head.innerHTML = res
    body.prepend(head)
    setGrid()
})

//adicionando flaticon
const flaticon = document.createElement('link')
flaticon.setAttribute("rel", "shortcut icon")
flaticon.setAttribute("href", "../images/icons/gamerboxicon.svg")
flaticon.setAttribute("type", "image/x-icon")
document.head.append(flaticon)


//Adicionando Rodapé//

//??//