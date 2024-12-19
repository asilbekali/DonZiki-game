let userBall = 0;
let laptopBall = 0;
let attempts = 0;

function playGame(userChoice) {
    const laptopChoices = ["tosh", "qaychi", "qog'oz"];
    const randomIndex = Math.floor(Math.random() * laptopChoices.length);
    const laptopChoice = laptopChoices[randomIndex];

    if (
        (userChoice === "tosh" && laptopChoice === "qaychi") ||
        (userChoice === "qaychi" && laptopChoice === "qog'oz") ||
        (userChoice === "qog'oz" && laptopChoice === "tosh")
    ) {
        userBall++;
    } else if (
        (laptopChoice === "tosh" && userChoice === "qaychi") ||
        (laptopChoice === "qaychi" && userChoice === "qog'oz") ||
        (laptopChoice === "qog'oz" && userChoice === "tosh")
    ) {
        laptopBall++;
    }

    attempts++;

    const resultDiv = document.querySelector(".txt");
    resultDiv.innerHTML += `
        <p>Siz tanladingiz: ${userChoice}, Laptop tanladi: ${laptopChoice}</p>
        <p>Hozirgi natija: Siz ${userBall} - ${laptopBall} Laptop</p>
    `;

    if (attempts === 3) {
        if (userBall > laptopBall) {
            resultDiv.innerHTML += `<p><strong>Tabriklaymiz! Siz yutdingiz! 🎉</strong></p>`;
        } else if (laptopBall > userBall) {
            resultDiv.innerHTML += `<p><strong>Afsuski, laptop yutdi. 😞</strong></p>`;
        } else {
            resultDiv.innerHTML += `<p><strong>Durrang! Ballar teng. 🤝</strong></p>`;
        }
        disableButtons();
    }
}

function resetGame() {
    userBall = 0;
    laptopBall = 0;
    attempts = 0;
    const resultDiv = document.querySelector(".txt");
    resultDiv.innerHTML = "";
    enableButtons();
}

function disableButtons() {
    document.querySelectorAll(".uchbahodir button").forEach(button => button.disabled = true);
}

function enableButtons() {
    document.querySelectorAll(".uchbahodir button").forEach(button => button.disabled = false);
}
