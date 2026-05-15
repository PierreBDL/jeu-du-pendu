const btnShadowMode = document.getElementById("ShadowMode");
const btnRejouer = document.getElementById("rejouer");
const btnRegles = document.getElementById("regles");

// Mode sombre

btnShadowMode?.addEventListener("click", () => {
    document.body.classList.toggle("shadowMode");

    // Btn rejouer
    btnRejouer.classList.toggle("shadowModeBtn");

    // Btn règles
    btnRegles.classList.toggle("shadowModeBtn");

    if (document.body.classList.contains("shadowMode")) {
        btnShadowMode.src = "./img/soleil.png";
        btnShadowMode.alt = "Mode clair";
        localStorage.setItem("shadowMode", "true");
    } else {
        btnShadowMode.src = "./img/lune.png";
        btnShadowMode.alt = "Mode sombre";
        localStorage.setItem("shadowMode", "false");
    }

    draw();
});

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("shadowMode") === "true") {
        document.body.classList.add("shadowMode");
        btnShadowMode.src = "./img/soleil.png";
        btnShadowMode.alt = "Mode clair";

        // Btn rejouer
        btnRejouer?.classList.add("shadowModeBtnRejouer");

        // Btn règles
        btnRegles?.classList.add("shadowModeBtnRegles");
    }
});


// Rejouer

btnRejouer?.addEventListener("click", () => {
    location.reload();
});

// Règles

btnRegles?.addEventListener("click", () => {
    if (!document.getElementById("reglesText").classList.contains("reglesShow")) {
        document.getElementById("reglesText").classList.add("reglesShow");
    } else {
        document.getElementById("reglesText").classList.remove("reglesShow");
    }
});


// Difficulté
let difficulty = localStorage.getItem("difficulty") || "facile";

function changeDifficulty (newDifficulty) {
    document.getElementById(difficulty).classList.remove("active");
    document.getElementById(newDifficulty).classList.add("active");
    difficulty = newDifficulty;
    localStorage.setItem("difficulty", difficulty);
}

document.getElementById("facile")?.addEventListener("click", () => {
    changeDifficulty("facile");
});

document.getElementById("moyen")?.addEventListener("click", () => {
    changeDifficulty("moyen");
});

document.getElementById("difficile")?.addEventListener("click", () => {
    changeDifficulty("difficile");
});

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById(difficulty)?.classList.add("active");
});