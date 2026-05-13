const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 300;
canvas.height = 300;

let boxSize = 20;

const listeMots = [
    "CHIMPANZE", "GIRAFE", "KANGOUROU", "ORNITHORYNQUE", "ZEBRE", "ALBATROS", "GALAXIE", "VOLCAN", "ARCHIPEL", "HORIZON", 
    "NEBULEUSE", "ANTARCTIQUE", "PARAPLUIE", "BICYCLETTE", "REFRIGERATEUR", "TELECOPIE", "AMPOULE", "ALGORITHME", "PROCESSEUR", 
    "MOLECULE", "SATELLITE", "LABORATOIRE", "ESPIEGLE", "XYLOPHONE", "ZIGZAG", "WHISKY", "PHARAON", "LABYRINTHE",
];

// Création du mot en underscores

let word = listeMots[Math.floor(Math.random() * listeMots.length)];

if (word === "" || word === null) {
    word = "BICYCLETTE";
}

const wordDiv = document.getElementById("word");

wordDiv.textContent = "";

let wordTab = [];

for (let i = 0; i < word.length; i++) {
    wordTab.push("_");
}

wordDiv.textContent = wordTab.join(" ");


// Cliquer sur une lettre

let lettersUsed = [];
const lettersUsedDiv = document.getElementById("lettersUsed");
let mistakes = 0;
let isMistakesMessageWasPrint = false;

// Clique sur le clavier

document.addEventListener("keydown", (event) => {
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        const lettreCliquee = event.key.toUpperCase();

        // Désactiver bouton
        btnAlreadyDisable = false;

        let btnsletters = document.querySelectorAll(".letterBtn");
        btnsletters.forEach(btn => {
            if (btn.value === lettreCliquee && btn.disabled) {
                btnAlreadyDisable = true;
            } else if (btn.value === lettreCliquee) {
                btn.disabled = true;
            }
        });

        if (btnAlreadyDisable) {
            return;
        }

        // Ajout de lettre utilisée
        const letterUsed = document.createElement("span");
        letterUsed.textContent = lettreCliquee;
        lettersUsedDiv.appendChild(letterUsed);

        // Remplacer les lettres
        if (word.includes(lettreCliquee)) {
            for (let i = 0; i < word.length; i++) {
                if (word[i] === lettreCliquee) {
                    wordTab[i] = lettreCliquee;
                }
            }
            wordDiv.textContent = wordTab.join(" ");
        } else {
            // Si la lettre est incorrecte
            mistakes++;
            draw();
        }

        // Vérif si on gagne

        if (!wordTab.includes("_")) {
            Swal.fire("Victoire!\n Le mot était " + word);
            document.querySelectorAll(".letterBtn").forEach(btn => {
                btn.disabled = true;
            });
        }
    }
})

const useLetter = () => {
    const lettreCliquee = event.target.value;

    event.target.disabled = true; // Désactiver btn

    // Ajout de lettre utilisée
    const letterUsed = document.createElement("span");
    letterUsed.textContent = lettreCliquee;
    lettersUsedDiv.appendChild(letterUsed);

    // Remplacer les lettres
    if (word.includes(lettreCliquee)) {
        for (let i = 0; i < word.length; i++) {
            if (word[i] === lettreCliquee) {
                wordTab[i] = lettreCliquee;
            }
        }
        wordDiv.textContent = wordTab.join(" ");
    } else {
        // Si la lettre est incorrecte
        mistakes++;
        draw();
    }

    // Vérif si on gagne

    if (!wordTab.includes("_")) {
        Swal.fire("Victoire!\n Le mot était " + word);
        document.querySelectorAll(".letterBtn").forEach(btn => {
            btn.disabled = true;
        });
    }
}

// Dessin
const draw = () => {
    if (document.body.classList.contains("shadowMode")) {
        ctx.strokeStyle = "white";
    } else {
        ctx.strokeStyle = "black";
    }

    ctx.lineWidth = 4;
    ctx.lineCap = "round";

    if (mistakes > 0) {
        ctx.beginPath();
        ctx.moveTo(100, 300);
        ctx.lineTo(200, 300);
        ctx.stroke();
    }

    if (mistakes > 1) {
        ctx.beginPath();
        ctx.moveTo(130, 300);
        ctx.lineTo(130, 80);
        ctx.stroke();
    }

    if (mistakes > 2) {
        ctx.beginPath();
        ctx.moveTo(130, 80);
        ctx.lineTo(230, 80);
        ctx.stroke();
    }

    if (mistakes > 3) {
        ctx.beginPath();
        ctx.moveTo(230, 80);
        ctx.lineTo(230, 110);
        ctx.stroke();
    }

    if (mistakes > 4) {
        ctx.beginPath();
        ctx.arc(230, 130, 20, 0, 2 * Math.PI);
        ctx.stroke();
    }

    if (mistakes > 5) {
        ctx.beginPath();
        ctx.moveTo(230, 150);
        ctx.lineTo(230, 210);
        ctx.stroke();
    }

    if (mistakes > 6) {
        ctx.beginPath();
        ctx.moveTo(230, 160);
        ctx.lineTo(205, 190);
        ctx.moveTo(230, 160);
        ctx.lineTo(255, 190);
        ctx.stroke();
    }

    if (mistakes > 7) {
        ctx.beginPath();
        ctx.moveTo(230, 210);
        ctx.lineTo(205, 250);
        ctx.moveTo(230, 210);
        ctx.lineTo(255, 250);
        ctx.stroke();

        // Défaite
        if (!isMistakesMessageWasPrint) {
            Swal.fire("Perdu!\n Le mot était " + word);
            document.querySelectorAll(".letterBtn").forEach(btn => {
                btn.disabled = true;
                isMistakesMessageWasPrint = true;

                // Révéler mot
                wordDiv.textContent = word;
            });
        }
    }
};