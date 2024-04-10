$(document).ready(() => {
    const urlImagens = [
        'cv-Elden-ring.svg',
        'cv-Minecraft.svg',
        'cv-Hollow-Knight.svg',
        'cv-Palworld.svg',
        'cv-RDR2.svg',
        'cv-TLOU.svg'
    ];

    // Carregar todas as imagens usando Fetch
    Promise.all(urlImagens.map(url => fetch(`../images/index-games/Cover/${url}`)))
        .then(responses => Promise.all(responses.map(res => res.blob())))
        .then(blobs => { //blobs é um objeto binário para 
            const i = Math.floor(Math.random() * blobs.length);
            const urlImagemAleatoria = URL.createObjectURL(blobs[i]);

            $('#cover').css("background-image", `url(${urlImagemAleatoria})`);
        })
        .catch(error => {
            console.error('Erro ao carregar as imagens:', error);
        });
});
