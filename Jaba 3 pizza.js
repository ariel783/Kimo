function CAl(){
let GILa=["Pepperoni","Queso", "Queso extra","Piña","Champiñones","Jamon"]


let VIA= Math.floor(Math.random()*GILa.length)
let Eliza= GILa[VIA]
document.getElementById("random_Ingre").innerHTML= Eliza
}
function Bin(){
window.location="index.Pizza.html"
}
// ========================================
// 🍕 PIZZA MAKER
// ========================================

const pizza = document.getElementById("pizza");
const mensaje = document.getElementById("mensaje");
const servirBtn = document.getElementById("servirBtn");

let ingredientesColocados = 0;


// ========================================
// 🎨 CREAR IMÁGENES DE LOS INGREDIENTES
// ========================================

function crearImagen(svg) {
    return "data:image/svg+xml;charset=UTF-8," +
        encodeURIComponent(svg);
}


// PEPPERONI

document.getElementById("img-pepperoni").src = crearImagen(`
<svg xmlns="http://www.w3.org/2000/svg" width="150" height="120">
    <rect width="150" height="120" fill="#fff5e6"/>
    <circle cx="50" cy="55" r="25" fill="#c62828"/>
    <circle cx="100" cy="40" r="25" fill="#d32f2f"/>
    <circle cx="100" cy="85" r="25" fill="#b71c1c"/>
    <circle cx="50" cy="90" r="20" fill="#e53935"/>
</svg>
`);


// QUESO

document.getElementById("img-queso").src = crearImagen(`
<svg xmlns="http://www.w3.org/2000/svg" width="150" height="120">
    <rect width="150" height="120" fill="#fff5e6"/>
    <path d="M30 25 L120 25 L105 50 L120 65 L100 95 L75 70 L55 100 L30 75 L45 50 Z"
    fill="#ffd54f"/>
    <circle cx="70" cy="45" r="7" fill="#fff"/>
    <circle cx="95" cy="65" r="6" fill="#fff"/>
</svg>
`);


// CHAMPIÑONES

document.getElementById("img-champinones").src = crearImagen(`
<svg xmlns="http://www.w3.org/2000/svg" width="150" height="120">
    <rect width="150" height="120" fill="#fff5e6"/>
    <path d="M30 60 Q75 10 120 60 Z" fill="#d6a66a"/>
    <rect x="52" y="58" width="18" height="35" rx="8" fill="#eee0c0"/>
    <rect x="82" y="58" width="18" height="35" rx="8" fill="#eee0c0"/>
</svg>
`);


// TOMATE

document.getElementById("img-tomate").src = crearImagen(`
<svg xmlns="http://www.w3.org/2000/svg" width="150" height="120">
    <rect width="150" height="120" fill="#fff5e6"/>
    <circle cx="55" cy="60" r="32" fill="#ef5350"/>
    <circle cx="100" cy="65" r="30" fill="#e53935"/>
    <path d="M55 30 L62 42 L75 42 L65 51 L68 63 L55 56 L43 63 L46 50 L36 42 L49 42 Z"
    fill="#4caf50"/>
</svg>
`);


// ACEITUNAS

document.getElementById("img-aceitunas").src = crearImagen(`
<svg xmlns="http://www.w3.org/2000/svg" width="150" height="120">
    <rect width="150" height="120" fill="#fff5e6"/>
    <circle cx="45" cy="55" r="22" fill="#263238"/>
    <circle cx="95" cy="45" r="22" fill="#37474f"/>
    <circle cx="75" cy="85" r="22" fill="#263238"/>
    <circle cx="45" cy="55" r="8" fill="#795548"/>
    <circle cx="95" cy="45" r="8" fill="#795548"/>
</svg>
`);


// PIMIENTO

document.getElementById("img-pimiento").src = crearImagen(`
<svg xmlns="http://www.w3.org/2000/svg" width="150" height="120">
    <rect width="150" height="120" fill="#fff5e6"/>
    <path d="M30 40 L55 25 L65 45 L90 25 L110 45 L90 65 L65 55 L45 80 L25 65 Z"
    fill="#43a047"/>
    <path d="M80 70 L110 55 L125 75 L100 95 Z"
    fill="#66bb6a"/>
</svg>
`);


// ========================================
// 🖱️ ARRASTRAR INGREDIENTES
// ========================================

const ingredientes = document.querySelectorAll(".ingrediente");

ingredientes.forEach(ingrediente => {

    ingrediente.addEventListener("dragstart", function(event) {

        event.dataTransfer.setData(
            "text/plain",
            this.dataset.name
        );

        event.dataTransfer.setData(
            "image",
            this.querySelector("img").src
        );

        pizza.classList.add("arrastrando");
    });

});


// ========================================
// 🍕 SOLTAR SOBRE LA PIZZA
// ========================================

pizza.addEventListener("dragover", function(event) {

    event.preventDefault();

});


pizza.addEventListener("dragleave", function() {

    pizza.classList.remove("arrastrando");

});


pizza.addEventListener("drop", function(event) {

    event.preventDefault();

    pizza.classList.remove("arrastrando");

    const nombre = event.dataTransfer.getData("text/plain");
    const imagen = event.dataTransfer.getData("image");

    if (!imagen) return;


    // Obtener posición del mouse dentro de la pizza

    const rect = pizza.getBoundingClientRect();

    let x = event.clientX - rect.left - 32;
    let y = event.clientY - rect.top - 32;


    // Mantener ingrediente dentro de la pizza

    x = Math.max(25, Math.min(x, rect.width - 90));
    y = Math.max(25, Math.min(y, rect.height - 90));


    // Crear ingrediente

    const nuevoIngrediente = document.createElement("img");

    nuevoIngrediente.src = imagen;
    nuevoIngrediente.classList.add("ingrediente-puesto");

    nuevoIngrediente.alt = nombre;

    nuevoIngrediente.style.left = x + "px";
    nuevoIngrediente.style.top = y + "px";


    pizza.appendChild(nuevoIngrediente);

    ingredientesColocados++;

    mensaje.textContent =
        `¡${nombre} agregado! 🍕`;


    if (ingredientesColocados >= 3) {

        servirBtn.disabled = false;

        mensaje.textContent =
            "🎉 ¡Tu pizza está lista para servir!";
    }

});


// ========================================
// 🍕 SERVIR PIZZA
// ========================================

servirBtn.addEventListener("click", function() {

    if (ingredientesColocados < 3) {

        mensaje.textContent =
            "Agrega por lo menos 3 ingredientes primero 😋";

        return;
    }


    // Ocultar el juego

    document.querySelector(".juego").style.display = "none";


    // Mostrar cliente

    const cliente = document.getElementById("cliente");

    cliente.classList.remove("oculto");


    // Cambiar mensaje

    document.getElementById("estadoCliente").textContent =
        "¡El cliente recibió su pizza! 🍕";


    // Después de un momento comienza a comer

    setTimeout(() => {

        cliente.classList.add("comiendo");

        document.getElementById("estadoCliente").textContent =
            "😋 ¡Está comiendo la pizza!";

    }, 1800);


    // Después de comer

    setTimeout(() => {

        document.getElementById("estadoCliente").textContent =
            "🤩 ¡Le encantó tu pizza!";

    }, 5000);
const reiniciarBtn = document.getElementById("reiniciarBtn");

reiniciarBtn.addEventListener("click", function() {
    location.reload();
});
});


function    Bup(){
window.location.href="pantalla.html"
save
}