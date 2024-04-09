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
        data: [user.usuario.avaliacoes.star1, user.usuario.avaliacoes.star2, user.usuario.avaliacoes.star3, user.usuario.avaliacoes.star4, user.usuario.avaliacoes.star5],

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

  

$(document).ready( () => {
  fetch("../javascript/users.json")
  .then(response => response.json())
  .then(data => {
    $("img.Profile-picture").attr("src", data.usuario.foto_perfil)
    $("span#nickname").text(data.usuario.nome)

    if(data.usuario.streamer == true) $("button.stamp").css("display", "block")

    $("span#seguidores").text(`Seguidores: ${data.usuario.seguidores}`)
    $("span#horasJogadas").text(`Horas jogadas: ${data.usuario.horas_jogadas}h`)
    $("span#generosFavoritos").text(`Gêneros favoritos: ${data.usuario.generos_favoritos}`)
    
    gerarGrafico(data)
    
    console.log(data.usuario.avaliacoes)
  })

  .catch(error => console.error("Erro:", error))


})



 