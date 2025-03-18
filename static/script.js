document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;

    // Cambio de modo oscuro/claro
    themeToggle.addEventListener("change", function () {
        body.classList.toggle("dark-mode");
    });
});

function appendCharacter(character) {
    const display = document.getElementById("display");
    if (display.innerText === "0") {
        display.innerText = character;
    } else {
        display.innerText += character;
    }
}

function clearDisplay() {
    document.getElementById("display").innerText = "0";
}

function deleteLast() {
    const display = document.getElementById("display");
    display.innerText = display.innerText.slice(0, -1) || "0";
}

function calculateResult() {
    const display = document.getElementById("display");
    fetch("/calculate", {
        method: "POST",
        body: JSON.stringify({ expression: display.innerText }),
        headers: { "Content-Type": "application/json" },
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.error) {
                display.innerText = "Error";
            } else {
                display.innerText = data.result;
            }
        });
}
