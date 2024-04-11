
const swiper = new Swiper('.swiper', {
    freeMode: true,
    
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });

  const gerarGrafico = (user) => {
    const ctx = document.getElementById('myChart');

  Chart.defaults.font.size = 25;
  Chart.defaults.color = 'white'; //cor da fonte
  
  new Chart(ctx, {
    type: 'bar', //tipode gráfico
    
    data: {
      labels: ['★', '★', '★', '★', '★'],
      datasets: [{
        label: '',
        data: [user.usuario[index].avaliacoes.star1, user.usuario[index].avaliacoes.star2, user.usuario[index].avaliacoes.star3, user.usuario[index].avaliacoes.star4, user.usuario[index].avaliacoes.star5], //o número de vezes em que o usuário avaliou com cada quantidade de estrela

        borderWidth: 1,
        backgroundColor:[
          'rgb(8, 255, 111)'
        ]
      }]
    },
options: {

      plugins: { 
        legend: { display: false, }, // Oculta a legenda
                }, 

      scales: {
        y: { display: false, grid:{ display: false }}, 
        x: { grid: {display: false} } //ambos usados para ocultar as grades
              }   
  }
  });
  }

 
  const FormatarData = (dataString) => {
    return moment(dataString, "DD-MM-YYYY").format("DD MMM YYYY");
  }

  const  gerarReview = (user) =>{ 
    let AllReviews = user.usuario[index].review_list

  for (let key in AllReviews){

    let reviewDiv = document.createElement('div')
      reviewDiv.setAttribute("class", "game-review border-bottom border-secondary") 
    //---------criando uma div para cada review --------------\\

      let rvImg = document.createElement('img') 
      rvImg.setAttribute("class", "img-game-review rounded float-start")
      rvImg.setAttribute("src", `${AllReviews[key].gamePicture}`) 
    //----------criando e inserindo o caminho da imagem ------------------------\\

      let rvh1 = document.createElement("H1")
      rvh1.setAttribute("class", "text-light")
      $(rvh1).text(AllReviews[key].gameName) 
    //---------criando título (nome do jogo) e inserindo texto e classe--------------\\

      let rate = document.createElement("span")
      rate.setAttribute("class", "text-success rating")

      let stars =  AllReviews[key].rating

      for(let i = 0; i < stars; i++) $(rate).text($(rate).text() + "★") 

      //---------------Inserindo as estrelas-----------------------\\

      let dma = document.createElement('span')
      dma.setAttribute("class", "text-light-emphasis date-rate")

      $(dma).text(FormatarData(AllReviews[key].PlayedData))

      //------------Adicionando data------------------\\

      let textRv = document.createElement("p")
      textRv.setAttribute("class", "text-light")
      $(textRv).text(AllReviews[key].review_idv)

      reviewDiv.append(rvImg) //adcionado imagem na div

      reviewDiv.append(rvh1) //adicionado título na div

      reviewDiv.append(rate) //adicionando estrelas da avaliação

      reviewDiv.append(dma)

      reviewDiv.append(textRv)
      $("div#review-list").append(reviewDiv)

  }


  }

  const gerarFavoritos = (user) => {
    
    let fvr = user.usuario[index].fvr_games

    for(let key in fvr) {

      console.log()
      let DivFvr = document.createElement("div")
      DivFvr.setAttribute("class", "favorite-game") //criando div para as imagens

      let imgFvr = document.createElement('img')
      imgFvr.setAttribute("src", fvr[key]) //criando imagens
      
      DivFvr.append(imgFvr)
      $('div#favorite-list').append(DivFvr)

    }
    
  }
 
  let urlParams = new URLSearchParams(window.location.search)
  let index = urlParams.get('value')
  
  console.log(index) //localiza o valor da url que é passado de acordo com qual perfil o usuário escolheu para olhar

$(document).ready( () => {
  fetch("../javascript/users.json") //localiza o arquivo onde constam todos os usuários
  .then(response => response.json())
  .then(data => {
    $("img.Profile-picture").attr("src", data.usuario[index].foto_perfil)
    $("span#nickname").text(data.usuario[index].nome) 
    
    $("div#cover").css("background-image", `url(${data.usuario[index].wallpaper})`)

    if(data.usuario[index].streamer == true) {
      $("button.stamp").css("display", "block")
      $('#lives-tab').parent("li").css("display", "flex")
  }
    $('p#bio').text(data.usuario[index].bio)
    $("span#seguidores").text(`Seguidores: ${data.usuario[index].seguidores}`)
    $("span#horasJogadas").text(`Horas jogadas: ${data.usuario[index].horas_jogadas}h`)
    $("span#generosFavoritos").text(`Gêneros favoritos: ${data.usuario[index].generos_favoritos}`)
    
    gerarGrafico(data)
    gerarReview(data)
    gerarFavoritos(data)
    
    
    console.log(data.usuario[index].avaliacoes)
  })

  .catch(error => console.error("Erro:", error))
})



