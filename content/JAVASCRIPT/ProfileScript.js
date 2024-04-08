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


  const ctx = document.getElementById('myChart');

  Chart.defaults.font.size = 25;
  Chart.defaults.color = 'white'; //cor da fonte
  
  new Chart(ctx, {
    type: 'bar',
    
    data: {
      labels: ['★', '★', '★', '★', '★'],
      datasets: [{
        label: '',
        data: [12, 19, 3, 5, 2],
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

  

 
 