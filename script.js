addEventListener("DOMContentLoaded", () => {
    const duracionAnimacion = 4000; // Duración total de la animación

    const animarContador = (contador) => {
        const cantidad_maxima = +contador.dataset.cantidadTotal;
        const pasosTotales = duracionAnimacion / 20;
        const incremento = cantidad_maxima / pasosTotales;
        let valor_actual = 0;
        let tiempoTranscurrido = 0;

        const actualizar_contador = () => {
            tiempoTranscurrido += 20;
            if (tiempoTranscurrido <= duracionAnimacion) {
                valor_actual = Math.ceil(incremento * (tiempoTranscurrido / 20));
                contador.innerText = valor_actual;
                setTimeout(actualizar_contador, 20);
            } else {
                contador.innerText = cantidad_maxima > 100 || cantidad_maxima === 10 
                    ? `+${cantidad_maxima}` 
                    : cantidad_maxima;
            }
        };

        actualizar_contador();
    };

    const mostrarContadores = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animar");
                entry.target.classList.remove("ocultar");
                animarContador(entry.target); // Animar solo este contador
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(mostrarContadores, {
        threshold: 0.75,
    });

    const elementosHTML = document.querySelectorAll(".contador_cantidad");
    elementosHTML.forEach(elemento => {
        elemento.classList.add("ocultar"); // Asegúrate de que comienzan ocultos
        observer.observe(elemento);
    });
});
