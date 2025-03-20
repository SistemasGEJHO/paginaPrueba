// Seleccionamos los botones de navegación y el contenedor del slider
const btnleft = document.querySelector(".btn-left"),
      btnright = document.querySelector(".btn-right"),
      slider = document.querySelector("#slider"),
      sliderSection = document.querySelectorAll(".slider-section");

// Variables necesarias para el funcionamiento del carrusel
let operacion = 0, // Guarda la posición de desplazamiento del slider
    counter = 0, // Contador para saber en qué imagen estamos
    widthImg = 100 / sliderSection.length, // Calcula el ancho de cada imagen en porcentaje
    interval; // Variable para almacenar el intervalo del auto-slide

// Función que inicia o reinicia el auto-slide cada 3 segundos
function startAutoSlide() {
    clearInterval(interval); // Detiene el intervalo anterior para evitar solapamientos
    interval = setInterval(() => {
        moveToRight(); // Mueve el slider a la derecha automáticamente
    }, 3000); // Tiempo de espera en milisegundos (3 segundos)
}

// Inicia el carrusel en modo automático al cargar la página
startAutoSlide();

// Agregamos eventos a los botones para mover el slider manualmente
btnleft.addEventListener("click", () => {
    moveToLeft(); // Llama a la función para moverse a la izquierda
    startAutoSlide(); // Reinicia el temporizador para evitar movimientos inesperados
});

btnright.addEventListener("click", () => {
    moveToRight(); // Llama a la función para moverse a la derecha
    startAutoSlide(); // Reinicia el temporizador
});

// Función para mover el slider hacia la derecha
function moveToRight() {
    if (counter >= sliderSection.length - 1) { // Si estamos en la última imagen...
        counter = 0; // Reiniciamos el contador para volver a la primera imagen
        operacion = 0; // Volvemos al inicio
        slider.style.transform = `translate(-${operacion}%)`; // Aplicamos el desplazamiento
        return; // Salimos de la función para evitar seguir ejecutándola
    } 
   
    counter++; // Aumentamos el contador en 1
    operacion = operacion + widthImg; // Calculamos la nueva posición
    slider.style.transform = `translate(-${operacion}%)`; // Aplicamos el desplazamiento al slider
    slider.style.transition = "all ease .6s"; // Agregamos una animación suave
}

// Función para mover el slider hacia la izquierda
function moveToLeft() {
    counter--; // Disminuimos el contador en 1
    if (counter < 0) { // Si estamos en la primera imagen y queremos ir hacia atrás...
        counter = sliderSection.length - 1; // Nos movemos a la última imagen
        operacion = widthImg * (sliderSection.length - 1); // Calculamos la posición
        slider.style.transform = `translate(-${operacion}%)`; // Aplicamos el desplazamiento
        return; // Salimos de la función
    } 
        
    operacion = operacion - widthImg; // Calculamos la nueva posición
    slider.style.transform = `translate(-${operacion}%)`; // Aplicamos el desplazamiento
    slider.style.transition = "all ease .6s"; // Agregamos una animación suave
}
