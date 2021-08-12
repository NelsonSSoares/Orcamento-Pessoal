
/*function musica(){
    const musica = new Audio('audios/choose.mp3').
    musica.play();
    musica.loop = true;
}
*/
function scorpion(){
    document.getElementById('escolhido').src = 'img/personagens/scorpion/escolhido1.gif';
    document.getElementById('escolhido').style.transform = 'scale(1.4)';
    let scorpion = document.getElementById('escolhido');
    scorpion.style.paddingBottom = '13px';
}

function subzero(){
    document.getElementById('escolhido2').src = 'img/personagens/subzero/escolhido2.gif';
    let subzero = document.getElementById('escolhido2');
    subzero.style.paddingBottom = '30px';
    document.getElementById('escolhido2').style.transform = 'scale(1.5)';
}

function ermac(){
    document.getElementById('escolhido3').src = 'img/personagens/ermac/escolhido3.gif';
    let ermac = document.getElementById('escolhido3');
    ermac.style.paddingLeft = '18px';
    ermac.style.paddingBottom = '40px';
    document.getElementById('escolhido3').style.transform = 'scale(1.5)';
}