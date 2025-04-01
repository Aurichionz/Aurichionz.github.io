document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM totalmente carregado!");

    const menuOptions = document.querySelectorAll(".option");

    // Verifique se existem opções no menu
    if (menuOptions.length > 0) {
        menuOptions.forEach(option => {
            option.addEventListener("click", function() {
                const category = option.getAttribute("data-category"); // Pega a categoria clicada
                if (category) {
                    // Redireciona para a página correta baseada na categoria
                    window.location.href = `${category}.html`; // Vai para carro.html, moto.html ou bike.html
                }
            });
        });
    }
});


function createGame(images) {
    const gameContainer = document.getElementById("game");
    gameContainer.innerHTML = "";
    gameContainer.style.display = "grid";
    gameContainer.style.gridTemplateColumns = "repeat(4, 1fr)";
    gameContainer.style.gap = "20px";
    gameContainer.style.width = "400px";
    gameContainer.style.maxWidth = "90%";
    gameContainer.style.margin = "auto";

    // Criar 8 cartas e adicionar a imagem da categoria
    for (let i = 0; i < 8; i++) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.id = i;

        const img = document.createElement("img");
        img.src = images[i]; // A imagem da carta
        img.alt = `Imagem ${i + 1}`;
        img.classList.add("card-image"); // Adicionando uma classe para manipulação de imagem
        card.appendChild(img);

        // Adiciona o evento de clique para virar a carta
        card.addEventListener("click", () => flipCard(card));

        gameContainer.appendChild(card);
    }
}

function flipCard(card) {
    const img = card.querySelector("img");
    if (card.classList.contains("flipped")) {
        card.classList.remove("flipped"); // Volta a carta ao estado inicial
        img.style.display = "none"; // Esconde a imagem
    } else {
        card.classList.add("flipped"); // Vira a carta
        img.style.display = "block"; // Exibe a imagem
    }
}
