document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM totalmente carregado!");

    // Função para redirecionar para as páginas com base na categoria escolhida
    const menuOptions = document.querySelectorAll(".option");

    if (menuOptions.length > 0) {
        menuOptions.forEach(option => {
            option.addEventListener("click", function() {
                const category = option.getAttribute("data-category");
                if (category) {

                    window.location.href = `${category}.html`;
                }
            });
        });
    }

    if (document.getElementById("game")) {
        const cards = document.querySelectorAll(".card");


        cards.forEach(card => {
            card.addEventListener("click", function() {
                flipCard(card);
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


    for (let i = 0; i < 8; i++) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.id = i;

        const img = document.createElement("img");
        img.src = images[i];
        img.alt = `Imagem ${i + 1}`;
        img.classList.add("card-image");
        card.appendChild(img);

        card.addEventListener("click", () => flipCard(card));

        gameContainer.appendChild(card);
    }
}

function flipCard(card) {

    if (card.classList.contains("flipped")) {
        card.classList.remove("flipped");
        const img = card.querySelector("img");
        img.style.display = "none";
    } else {

        card.classList.add("flipped");
        const img = card.querySelector("img");
        img.style.display = "block";
    }
}
