function animar(){
    const btn = document.getElementById('btn-menu');
    btn.classList.toggle('ativar');
}

function TrocarIMG() {
    var troca = document.getElementById('trocarImagem');
    if (troca.src.includes("2151683052.jpg")) {
        troca.src = "IMG/breathtaking-view-natural-beach-landscape.jpg";
    } else {
        troca.src = "IMG/2151683052.jpg";
    }
}
