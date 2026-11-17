// ======================================
// 💇‍♀️ MI PELUQUERÍA
// ======================================
function unbo(){
window.location="pantalla.html" 
}
const pedidos = [
    {
        nombre: "Sofía",
        tipo: "mujer",
        servicio: "Cola de caballo",
        pasos: ["peine", "ligas"],
        dinero: 30
    },

    {
        nombre: "Mateo",
        tipo: "hombre",
        servicio: "Limpieza de cabello",
        pasos: ["regadera", "secadora"],
        dinero: 25
    },

    {
        nombre: "Valentina",
        tipo: "mujer",
        servicio: "Corte de cabello",
        pasos: ["regadera", "secadora", "tijeras"],
        dinero: 50
    },

    {
        nombre: "Diego",
        tipo: "hombre",
        servicio: "Corte de cabello",
        pasos: ["regadera", "secadora", "tijeras"],
        dinero: 50
    }
];


// ======================================
// 🎲 ELEGIR CLIENTE
// ======================================

let clienteActual =
    pedidos[Math.floor(Math.random() * pedidos.length)];

let pasoActual = 0;


// ======================================
// 📋 ELEMENTOS
// ======================================

const nombreCliente =
    document.getElementById("nombreCliente");

const pedidoTexto =
    document.getElementById("pedidoTexto");

const pasosDiv =
    document.getElementById("pasos");

const cabello =
    document.getElementById("cabello");

const terminarBtn =
    document.getElementById("terminarBtn");


// ======================================
// 👤 MOSTRAR CLIENTE
// ======================================

nombreCliente.textContent =
    clienteActual.nombre;

pedidoTexto.textContent =
    clienteActual.servicio;


// Cambiar apariencia según cliente

if (clienteActual.tipo === "hombre") {

    cabello.style.background = "#2b211c";
    cabello.style.height = "100px";
    cabello.style.width = "240px";
    cabello.style.left = "10px";

} else {

    cabello.style.background = "#5a321d";
    cabello.style.height = "150px";
}


// ======================================
// 📋 MOSTRAR PASOS
// ======================================

function mostrarPasos() {

    pasosDiv.innerHTML = "";

    clienteActual.pasos.forEach((paso, index) => {

        const div =
            document.createElement("div");

        div.classList.add("paso");

        const nombres = {

            peine: "🪮 Peinar",
            ligas: "🎀 Poner ligas",
            regadera: "🚿 Lavar cabello",
            secadora: "💨 Secar cabello",
            tijeras: "✂️ Cortar cabello"

        };

        div.textContent =
            nombres[paso];

        if (index < pasoActual) {

            div.classList.add("completado");

        }

        if (index === pasoActual) {

            div.classList.add("actual");

        }

        pasosDiv.appendChild(div);

    });

}

mostrarPasos();


// ======================================
// 🧰 USAR HERRAMIENTA
// ======================================

const herramientas =
    document.querySelectorAll(".herramienta");

herramientas.forEach(herramienta => {

    herramienta.addEventListener("click", function() {

        const herramientaUsada =
            this.dataset.tool;

        const herramientaNecesaria =
            clienteActual.pasos[pasoActual];


        // ==================================
        // ✅ HERRAMIENTA CORRECTA
        // ==================================

        if (herramientaUsada === herramientaNecesaria) {

            pasoActual++;

            // Animaciones según herramienta

            if (herramientaUsada === "peine") {

                cabello.style.transform =
                    "rotate(-5deg)";

                setTimeout(() => {
                    cabello.style.transform =
                        "rotate(0deg)";
                }, 400);

            }


            if (herramientaUsada === "ligas") {

                cabello.style.borderBottom =
                    "8px solid #e91e63";

            }


            if (herramientaUsada === "regadera") {

                cabello.style.opacity = "0.6";

                setTimeout(() => {
                    cabello.style.opacity = "1";
                }, 600);

            }


            if (herramientaUsada === "secadora") {

                cabello.style.transform =
                    "scale(1.05)";

                setTimeout(() => {
                    cabello.style.transform =
                        "scale(1)";
                }, 500);

            }


            if (herramientaUsada === "tijeras") {

                cabello.style.height =
                    "90px";

                cabello.style.borderRadius =
                    "50%";

            }


            mostrarPasos();


            // ==================================
            // 🎉 TERMINÓ
            // ==================================

            if (
                pasoActual >=
                clienteActual.pasos.length
            ) {

                terminarBtn.disabled = false;

            }

        } else {

            alert(
                "❌ Esa herramienta no es la que necesitas ahora.\n\n" +
                "Primero usa la herramienta indicada en amarillo."
            );

        }

    });

});


// ======================================
// 💵 TERMINAR TRABAJO
// ======================================

terminarBtn.disabled = true;

terminarBtn.addEventListener("click", function() {

    if (
        pasoActual <
        clienteActual.pasos.length
    ) {

        return;

    }


    document.querySelector(".salon")
        .classList.add("oculto");


    const resultado =
        document.getElementById("resultado");

    resultado.classList.remove("oculto");


    document.getElementById("clienteFinal")
        .textContent =
        clienteActual.tipo === "mujer"
            ? "👩"
            : "👨";


    document.getElementById("dineroGanado")
        .textContent =
        "$" + clienteActual.dinero;


    document.getElementById("mensajeResultado")
        .textContent =
        "🎉 ¡" +
        clienteActual.nombre +
        " quedó feliz con su cabello!";


    // Animación del dinero

    const dinero =
        document.querySelector(".dinero");

    dinero.style.animation = "none";

    setTimeout(() => {

        dinero.style.animation =
            "dinero 1s ease";

    }, 50);

});


// ======================================
// 🔄 SEGUIR TRABAJANDO
// ======================================

document.getElementById("reiniciarBtn")
    .addEventListener("click", function() {

        location.reload();

    });