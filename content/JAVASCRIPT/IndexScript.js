$(document).ready(() => {
    const urlImagens = [
        'cv-elden-ring.svg',
        'cv-minecraft.svg',
        'cv-hollow-knight.svg',
        'cv-palworld.svg',
        'cv-rdr2.svg',
        'cv-tlou.svg'
    ];

    async function inserirCapa(){

    // Carregar todas as imagens usando Fetch
    Promise.all(urlImagens.map(url => fetch(`../images/index-games/Cover/${url}`)))
        .then(responses => Promise.all(responses.map(res => res.blob())))
        .then(blobs => { //blobs é um objeto binário para armazenar as imagens
            const i = Math.floor(Math.random() * blobs.length);
            const urlImagemAleatoria = URL.createObjectURL(blobs[i]);

            $('#cover').css("background-image", `url(${urlImagemAleatoria})`);
        })
        .catch(error => {
            console.error('Erro ao carregar as imagens:', error);
        }); }

        inserirCapa()
})

//depos fazer um código onde as urls estão em json e o fetc pega apenas UMA aleatóriamente, e caso não consiga tente novamente algumas vezes, e se não der certo tentar outra imagem