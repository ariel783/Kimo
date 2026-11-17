// ======================================
// 🚕 TAXI RUSH
// ======================================
function unpo(){
window.location="pantalla.html" 
}
const inicio = document.getElementById("inicio");
const subida = document.getElementById("subida");
const juego = document.getElementById("juego");
const final = document.getElementById("final");

const comenzar = document.getElementById("comenzar");

const clienteSubiendo = document.getElementById("clienteSubiendo");
const mensajeSubida = document.getElementById("mensajeSubida");

const taxi = document.getElementById("taxiJugador");

const puntosTexto = document.getElementById("puntos");
const vidasTexto = document.getElementById("vidas");

const clienteFinal = document.getElementById("clienteFinal");
const dinero = document.getElementById("dinero");
const mensajeFinal = document.getElementById("mensajeFinal");
const recompensa = document.getElementById("recompensa");

let posicionTaxi = 215;

// ⭐ Ahora empiezas con 5 vidas
let vidas = 5;

let puntos = 0;
let jugando = false;

let velocidad = 4;


// ======================================
// 👤 CLIENTE SUBE AL TAXI
// ======================================

comenzar.addEventListener("click", function() {

    inicio.classList.add("oculto");

    subida.classList.remove("oculto");

    setTimeout(() => {

        clienteSubiendo.classList.add("subiendo");

        mensajeSubida.textContent =
            "🚕 El cliente está subiendo al taxi...";

    }, 700);


    setTimeout(() => {

        mensajeSubida.textContent =
            "😊 ¡Listo! Comienza el viaje.";

    }, 2600);


    setTimeout(() => {

        subida.classList.add("oculto");

        juego.classList.remove("oculto");

        comenzarJuego();

    }, 3600);

});


// ======================================
// 🎮 COMENZAR JUEGO
// ======================================

function comenzarJuego() {

    jugando = true;

    // Mostrar 5 vidas
    vidasTexto.textContent = vidas;

    requestAnimationFrame(moverCarretera);
}


// ======================================
// 🚕 MOVER TAXI ENTRE 3 CARRILES
// ======================================

const carriles = [50, 185, 320];

let carrilActual = 1;


// Teclado

document.addEventListener("keydown", function(event) {

    if (!jugando) return;


    if (event.key === "ArrowLeft") {

        if (carrilActual > 0) {

            carrilActual--;

            moverAlCarril();

        }

    }


    if (event.key === "ArrowRight") {

        if (carrilActual < 2) {

            carrilActual++;

            moverAlCarril();

        }

    }

});


function moverAlCarril() {

    posicionTaxi = carriles[carrilActual];

    taxi.style.left = posicionTaxi + "px";

}


// Botones

document.getElementById("izquierda")
    .addEventListener("click", function() {

        if (carrilActual > 0) {

            carrilActual--;

            moverAlCarril();

        }

    });


document.getElementById("derecha")
    .addEventListener("click", function() {

        if (carrilActual < 2) {

            carrilActual++;

            moverAlCarril();

        }

    });


// ======================================
// 🚗 CARROS
// ======================================

const carros = document.querySelectorAll(".obstaculo");

let posiciones = [-150, -500, -850];


// Cada carro empieza en un carril diferente

carros[0].style.left = carriles[0] + "px";
carros[1].style.left = carriles[1] + "px";
carros[2].style.left = carriles[2] + "px";


// ======================================
// 🛣️ MOVER CARRETERA
// ======================================

function moverCarretera() {

    if (!jugando) return;


    carros.forEach((carro, index) => {

        posiciones[index] += velocidad;

        carro.style.top =
            posiciones[index] + "px";


        // ==================================
        // 🚗 CARRO ESQUIVADO
        // ==================================

        if (posiciones[index] > 550) {

            // ⭐ GANAS 1 PUNTO
            puntos++;

            puntosTexto.textContent = puntos;


            // Volver a poner el carro arriba

            posiciones[index] =
                -200 - Math.random() * 250;


            // Elegir un carril aleatorio

            const nuevoCarril =
                Math.floor(Math.random() * 3);


            carro.style.left =
                carriles[nuevoCarril] + "px";
        }


        // ==================================
        // 💥 COMPROBAR CHOQUE
        // ==================================

        comprobarChoque(carro);

    });


    // ==================================
    // 🏁 GANAR
    // ==================================

    if (puntos >= 20) {

        terminarJuego();

        return;
    }


    requestAnimationFrame(moverCarretera);
}


// ======================================
// 💥 COMPROBAR CHOQUE
// ======================================

function comprobarChoque(carro) {

    const taxiRect =
        taxi.getBoundingClientRect();

    const carroRect =
        carro.getBoundingClientRect();


    // Un pequeño margen para que sea
    // más fácil esquivar

    const margen = 15;


    if (

        taxiRect.left + margen < carroRect.right &&
        taxiRect.right - margen > carroRect.left &&
        taxiRect.top + margen < carroRect.bottom &&
        taxiRect.bottom - margen > carroRect.top

    ) {

        perderVida(carro);

    }

}


// ======================================
// ❤️ PERDER VIDA
// ======================================

function perderVida(carro) {

    // Evitar que cuente varias veces
    // el mismo choque

    carro.style.top = "-300px";


    vidas--;

    vidasTexto.textContent = vidas;


    // 🚕 Pequeña animación del taxi

    taxi.style.transform = "rotate(-8deg)";

    setTimeout(() => {

        taxi.style.transform = "rotate(0deg)";

    }, 250);


    // ==================================
    // 💔 SIN VIDAS
    // ==================================

    if (vidas <= 0) {

        jugando = false;

        setTimeout(() => {

            alert(
                "🚕 ¡Se terminaron tus vidas!\n\n" +
                "⭐ Puntuación: " + puntos
            );

            location.reload();

        }, 300);

    }

}


// ======================================
// 🏁 TERMINAR VIAJE
// ======================================

function terminarJuego() {

    jugando = false;

    juego.classList.add("oculto");

    final.classList.remove("oculto");


    // Cliente comienza a bajar

    setTimeout(() => {

        mensajeFinal.textContent =
            "👤 El cliente está bajando del taxi...";

        clienteFinal.classList.add(
            "cliente-bajando"
        );

    }, 1000);


    // Cliente entrega dinero

    setTimeout(() => {

        dinero.classList.add(
            "mostrar-dinero"
        );

        mensajeFinal.textContent =
            "💵 ¡El cliente te pagó!";

        recompensa.textContent =
            "⭐ Ganaste $" +
            (puntos * 5) +
            " por el viaje.";

    }, 3200);


    // Mensaje final

    setTimeout(() => {

        mensajeFinal.textContent =
            "🎉 ¡Excelente trabajo, conductor!";

    }, 5000);

}