const btnShadowMode = document.getElementById("ShadowMode");
const btnRejouer = document.getElementById("rejouer");
const btnRegles = document.getElementById("regles");

// Dark mode

btnShadowMode?.addEventListener("click", () => {
    document.body.classList.toggle("shadowMode");

    // Play again button
    btnRejouer.classList.toggle("shadowModeBtn");

    // Settings button
    btnRegles.classList.toggle("shadowModeBtn");

    if (document.body.classList.contains("shadowMode")) {
        btnShadowMode.src = "./img/soleil.png";
        btnShadowMode.alt = "Light Mode";
        localStorage.setItem("shadowMode", "true");
    } else {
        btnShadowMode.src = "./img/lune.png";
        btnShadowMode.alt = "Dark Mode";
        localStorage.setItem("shadowMode", "false");
    }

    draw();
});

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("shadowMode") === "true") {
        document.body.classList.add("shadowMode");
        btnShadowMode.src = "./img/soleil.png";
        btnShadowMode.alt = "Light Mode";

        // Play again button
        btnRejouer?.classList.add("shadowModeBtnRejouer");

        // Settings button
        btnRegles?.classList.add("shadowModeBtnRegles");
    }
});


// Play Again

btnRejouer?.addEventListener("click", () => {
    location.reload();
});

// Settings

btnRegles?.addEventListener("click", () => {
    if (!document.getElementById("reglesText").classList.contains("reglesShow")) {
        document.getElementById("reglesText").classList.add("reglesShow");
    } else {
        document.getElementById("reglesText").classList.remove("reglesShow");
    }
});


// Difficulty
var difficulty = localStorage.getItem("difficulty") || "easy";

function changeDifficulty (newDifficulty) {
    document.getElementById(difficulty).classList.remove("active");
    document.getElementById(newDifficulty).classList.add("active");
    difficulty = newDifficulty;
    localStorage.setItem("difficulty", difficulty);
}

document.getElementById("easy")?.addEventListener("click", () => {
    changeDifficulty("easy");
});

document.getElementById("medium")?.addEventListener("click", () => {
    changeDifficulty("medium");
});

document.getElementById("hard")?.addEventListener("click", () => {
    changeDifficulty("hard");
});

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById(difficulty)?.classList.add("active");
});