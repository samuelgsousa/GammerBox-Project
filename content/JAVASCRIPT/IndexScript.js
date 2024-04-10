$(document).ready(() => {

const img = ['cv-Elden-ring.svg', 'cv-Minecraft.svg', "cv-Hollow-Knight.svg", "cv-Palworld.svg", "cv-RDR2.svg", "cv-TLOU.svg" ]
const i = Math.floor(Math.random() * img.length - 1)
const foto = img[i]

$('#cover').css("background-image", `url(../images/index-games/Cover/${foto})`)

})

//depois mudar para fetch