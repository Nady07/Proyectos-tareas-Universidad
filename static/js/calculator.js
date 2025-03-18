// Elementos DOM
const display = document.getElementById('display');
const calculator = document.getElementById('calculator');
const toggleModeBtn = document.getElementById('toggleMode');
const backgroundImageInput = document.getElementById('background_image');
const uploadButton = document.getElementById('uploadButton');
let isDarkMode = false;

// Funciones de la calculadora
function addToDisplay(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = '';
}

function backspace() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        display.value = eval(display.value) || '';
    } catch (error) {
        display.value = 'Error';
        setTimeout(() => {
            display.value = '';
        }, 1500);
    }
}

// Manejo del modo claro/oscuro
toggleModeBtn.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    calculator.classList.toggle('dark');
    document.body.classList.toggle('dark-mode');
    toggleModeBtn.textContent = isDarkMode ? '☀️' : '🌙';
});

// Manejo de la subida de imágenes
backgroundImageInput.addEventListener('change', () => {
    uploadButton.disabled = !backgroundImageInput.files.length;
});

uploadButton.addEventListener('click', async (e) => {
    e.preventDefault();
    if (!backgroundImageInput.files.length) {
        alert('Por favor, selecciona un archivo primero.');
        return;
    }

    const formData = new FormData();
    formData.append('background_image', backgroundImageInput.files[0]);

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Error al subir la imagen');
        }

        const data = await response.json();
        if (data.filename) {
            calculator.classList.add('with-background');
            calculator.style.backgroundImage = `url('/static/uploads/${data.filename}')`;
            calculator.style.backgroundSize = 'cover';
            calculator.style.backgroundPosition = 'center';
            calculator.style.backgroundRepeat = 'no-repeat';
            uploadButton.disabled = true;
            backgroundImageInput.value = '';
        } else if (data.error) {
            alert(`Error: ${data.error}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema al subir la imagen. Inténtalo de nuevo.');
    }
});

// Limpiar el fondo si se recarga o se desea
document.addEventListener('DOMContentLoaded', () => {
    const calculator = document.querySelector('.calculator');
    if (!calculator.style.backgroundImage) {
        calculator.classList.remove('with-background');
        calculator.style.backgroundImage = 'none';
    }
});