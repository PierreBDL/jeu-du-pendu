const clavierDiv = document.getElementById("clavier");

let alphabet = [
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
];

for (let i = 0; i < alphabet.length; i++) {
  let letter = document.createElement("button");
  letter.textContent = alphabet[i].toUpperCase();
  letter.value = alphabet[i].toUpperCase();
  letter.classList.add("letterBtn");
  letter.addEventListener("click", useLetter);
  clavierDiv.appendChild(letter);
}