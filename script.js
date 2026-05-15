const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 300;
canvas.height = 300;

let boxSize = 20;

const defaultWordsList = [
    "CHIMPANZEE", "GIRAFFE", "KANGAROO", "PLATYPUS", "ZEBRA", "ALBATROSS", "GALAXY", "VOLCANO", "ARCHIPELAGO", "HORIZON",
    "NEBULA", "ANTARCTICA", "UMBRELLA", "BICYCLE", "REFRIGERATOR", "FACSIMILE", "BULB", "ALGORITHM", "PROCESSOR",
    "MOLECULE", "SATELLITE", "LABORATORY", "MISCHIEVOUS", "XYLOPHONE", "ZIGZAG", "WHISKY", "PHARAOH", "LABYRINTH",
];

// Dictionary management
let currentDictionary = [...defaultWordsList];
const dictionaryBackup = localStorage.getItem("custom_dict");

// Load custom dictionary
if (dictionaryBackup) {
    try {
        currentDictionary = JSON.parse(dictionaryBackup);
    } catch (e) {
        localStorage.removeItem("custom_dict");
    }
}

// Word selection
let word = currentDictionary[Math.floor(Math.random() * currentDictionary.length)];

if (word === "" || word === null || word === undefined) {
    word = "BICYCLE";
}
word = word.toUpperCase();

const wordDiv = document.getElementById("word");
wordDiv.textContent = "";
let wordTab = [];

for (let i = 0; i < word.length; i++) {
    wordTab.push("_");
}

wordDiv.textContent = wordTab.join(" ");


// Click on a letter

let lettersUsed = [];
const lettersUsedDiv = document.getElementById("lettersUsed");
let mistakes = 0;
let isMistakesMessageWasPrint = false;

// Click on keyboard

document.addEventListener("keydown", (event) => {
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        const clickedLetter = event.key.toUpperCase();

        // Disable button
        btnAlreadyDisable = false;

        let btnsletters = document.querySelectorAll(".letterBtn");
        btnsletters.forEach(btn => {
            if (btn.value === clickedLetter && btn.disabled) {
                btnAlreadyDisable = true;
            } else if (btn.value === clickedLetter) {
                btn.disabled = true;
            }
        });

        if (btnAlreadyDisable) {
            return;
        }

        // Add used letter
        const letterUsed = document.createElement("span");
        letterUsed.textContent = clickedLetter;
        lettersUsedDiv.appendChild(letterUsed);

        // Replace letters
        if (word.includes(clickedLetter)) {
            for (let i = 0; i < word.length; i++) {
                if (word[i] === clickedLetter) {
                    wordTab[i] = clickedLetter;
                }
            }
            wordDiv.textContent = wordTab.join(" ");
        } else {
            // If the letter is incorrect
            mistakes++;
            draw();
        }

        // Check if we win

        if (!wordTab.includes("_")) {
            Swal.fire("Victory!\n The word was " + word);
            document.querySelectorAll(".letterBtn").forEach(btn => {
                btn.disabled = true;
            });
        }
    }
})

const useLetter = () => {
    const clickedLetter = event.target.value;

    event.target.disabled = true; // Disable button

    // Add used letter
    const letterUsed = document.createElement("span");
    letterUsed.textContent = clickedLetter;
    lettersUsedDiv.appendChild(letterUsed);

    // Replace letters
    if (word.includes(clickedLetter)) {
        for (let i = 0; i < word.length; i++) {
            if (word[i] === clickedLetter) {
                wordTab[i] = clickedLetter;
            }
        }
        wordDiv.textContent = wordTab.join(" ");
    } else {
        // If the letter is incorrect
        mistakes++;
        draw();
    }

    // Check if we win

    if (!wordTab.includes("_")) {
        Swal.fire("Victory!\n The word was " + word);
        document.querySelectorAll(".letterBtn").forEach(btn => {
            btn.disabled = true;
        });
    }
}

// Draw
const draw = () => {
    if (document.body.classList.contains("shadowMode")) {
        ctx.strokeStyle = "white";
    } else {
        ctx.strokeStyle = "black";
    }

    ctx.lineWidth = 4;
    ctx.lineCap = "round";

    switch (difficulty) {
        case "easy":
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
                ctx.stroke();
            }

            if (mistakes > 7) {
                ctx.beginPath();
                ctx.moveTo(230, 160);
                ctx.lineTo(255, 190);
                ctx.stroke();
            }

            if (mistakes > 8) {
                ctx.beginPath();
                ctx.moveTo(230, 210);
                ctx.lineTo(205, 250);
                ctx.stroke();
            }

            if (mistakes > 9) {
                ctx.beginPath();
                ctx.moveTo(230, 210);
                ctx.lineTo(255, 250);
                ctx.stroke();

                // Defeat
                if (!isMistakesMessageWasPrint) {
                    Swal.fire("Lost!\n The word was " + word);
                    document.querySelectorAll(".letterBtn").forEach(btn => {
                        btn.disabled = true;
                        isMistakesMessageWasPrint = true;

                        // Reveal word
                        wordDiv.textContent = word;
                    });
                }
            }
            break;
        case "medium":
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

                // Defeat
                if (!isMistakesMessageWasPrint) {
                    Swal.fire("Lost!\n The word was " + word);
                    document.querySelectorAll(".letterBtn").forEach(btn => {
                        btn.disabled = true;
                        isMistakesMessageWasPrint = true;

                        // Reveal word
                        wordDiv.textContent = word;
                    });
                }
            }
            break;

        case "hard":
            if (mistakes > 0) {
                ctx.beginPath();
                ctx.moveTo(100, 300);
                ctx.lineTo(200, 300);
                ctx.moveTo(130, 300);
                ctx.lineTo(130, 80);
                ctx.moveTo(130, 80);
                ctx.lineTo(230, 80);
                ctx.moveTo(230, 80);
                ctx.lineTo(230, 110);
                ctx.stroke();
            }

            if (mistakes > 2) {
                ctx.beginPath();
                ctx.arc(230, 130, 20, 0, 2 * Math.PI);
                ctx.stroke();
            }

            if (mistakes > 3) {
                ctx.beginPath();
                ctx.moveTo(230, 150);
                ctx.lineTo(230, 210);
                ctx.stroke();
            }

            if (mistakes > 4) {
                ctx.beginPath();
                ctx.moveTo(230, 160);
                ctx.lineTo(205, 190);
                ctx.moveTo(230, 160);
                ctx.lineTo(255, 190);
                ctx.stroke();
            }

            if (mistakes > 5) {
                ctx.beginPath();
                ctx.moveTo(230, 210);
                ctx.lineTo(205, 250);
                ctx.moveTo(230, 210);
                ctx.lineTo(255, 250);
                ctx.stroke();

                // Defeat
                if (!isMistakesMessageWasPrint) {
                    Swal.fire("Lost!\n The word was " + word);
                    document.querySelectorAll(".letterBtn").forEach(btn => {
                        btn.disabled = true;
                        isMistakesMessageWasPrint = true;

                        // Reveal word
                        wordDiv.textContent = word;
                    });
                }
            }
            break;
    }
};

// Logic to retrieve a custom dictionary

const importInput = document.getElementById("importJson");
const btnResetDico = document.getElementById("btnResetDico");

if (localStorage.getItem("custom_dict")) {
    btnResetDico.style.display = "inline-block";
}

// File loading
importInput?.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const json = JSON.parse(e.target.result);

            // Check if it's an array
            if (Array.isArray(json) && json.length > 0) {
                // Remove spaces and convert to uppercase
                const cleanWords = json.map(m => m.trim().toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""));

                localStorage.setItem("custom_dict", JSON.stringify(cleanWords));

                // Import successful
                Swal.fire({
                    title: "Dictionary imported!",
                    text: cleanWords.length + ' words loaded. The game will restart.',
                    icon: "success"
                }).then(() => {
                    location.reload()
                });

                // Errors
            } else {
                throw new Error("JSON format must be an array of words: ['WORD1', 'WORD2']");
            }
        } catch (err) {
            Swal.fire("Error", "Invalid JSON file. Expected format: ['WORD1', 'WORD2']", "error");
        }
    };
    reader.readAsText(file);
});

// Reset button

btnResetDico?.addEventListener("click", () => {
    localStorage.removeItem("custom_dict");
    Swal.fire("Reset", "Custom dictionary deleted", "info").then(() => {
        location.reload();
    });
});