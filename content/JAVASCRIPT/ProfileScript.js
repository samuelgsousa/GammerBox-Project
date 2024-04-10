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
    type: 'bar',
    
    data: {
      labels: ['★', '★', '★', '★', '★'],
      datasets: [{
        label: '',
        data: [user.usuario[index].avaliacoes.star1, user.usuario[index].avaliacoes.star2, user.usuario[index].avaliacoes.star3, user.usuario[index].avaliacoes.star4, user.usuario[index].avaliacoes.star5],

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

    console.log(data.usuario[index].wallpaper)

    if(data.usuario[index].streamer == true) $("button.stamp").css("display", "block")

    $("span#seguidores").text(`Seguidores: ${data.usuario[index].seguidores}`)
    $("span#horasJogadas").text(`Horas jogadas: ${data.usuario[index].horas_jogadas}h`)
    $("span#generosFavoritos").text(`Gêneros favoritos: ${data.usuario[index].generos_favoritos}`)
    
    gerarGrafico(data)
    
    console.log(data.usuario[index].avaliacoes)
  })

  .catch(error => console.error("Erro:", error))


})



 