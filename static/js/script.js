function appendToDisplay(value) {
    document.getElementById('display').value += value;
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function calculateResult() {
    try {
        document.getElementById('display').value = eval(document.getElementById('display').value);
    } catch (e) {
        document.getElementById('display').value = 'Error';
    }
}

function changeBackground() {
    const body = document.body;
    body.style.backgroundImage = "url('/static/images/background.jpg')";
    body.style.backgroundSize = "cover";
}