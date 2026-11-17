
// ===================================
// KIDS MONEY 💗
// SISTEMA DE GUARDADO AUTOMÁTICO
// ===================================

const canvas = document.getElementById("ci");
const ctx = canvas.getContext("2d");

const GF = document.getElementById("GF");
const PD = document.getElementById("PD");

// ===================================
// DINERO GUARDADO
// ===================================

let dineroGuardado = localStorage.getItem("dinero");

if (dineroGuardado !== null) {
    GF.value = dineroGuardado;
} else {
    GF.value = 2000;
    localStorage.setItem("dinero", 2000);
}

PD.innerHTML = GF.value;


// ===================================
// PRODUCTOS GUARDADOS
// ===================================

let productosGuardados = JSON.parse(
    localStorage.getItem("productos") || "[]"
);


// ===================================
// POSICIONES
// ===================================

let posX = 50;
let posY = 50;


// ===================================
// DIBUJAR TODOS LOS PRODUCTOS
// ===================================

function dibujarTodosLosProductos() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    posX = 50;
    posY = 50;

    let indice = 0;

    function siguienteProducto() {

        if (indice >= productosGuardados.length) {
            return;
        }

        let nombreImagen = productosGuardados[indice];

        let img = new Image();

        img.onload = function() {

            ctx.drawImage(img, posX, posY, 100, 100);

            posX += 120;

            if (posX > canvas.width - 120) {
                posX = 50;
                posY += 120;
            }

            indice++;

            siguienteProducto();
        };

        img.onerror = function() {
            console.error("No se encontró la imagen:", nombreImagen);
            indice++;
            siguienteProducto();
        };

        img.src = nombreImagen;
    }

    siguienteProducto();
}


// ===================================
// GUARDAR PRODUCTO
// ===================================

function guardarProducto(nombreImagen) {

    productosGuardados.push(nombreImagen);

    localStorage.setItem(
        "productos",
        JSON.stringify(productosGuardados)
    );

    dibujarTodosLosProductos();
}


// ===================================
// COMPRAR PRODUCTOS
// ===================================

function comprarProducto(nombreImagen, precio) {

    let dineroActual = parseInt(GF.value);

    if (dineroActual < precio) {
        alert("¡No tienes suficiente dinero! 💰");
        return;
    }

    // Restar dinero
    dineroActual -= precio;

    GF.value = dineroActual;

    PD.innerHTML = dineroActual;

    localStorage.setItem("dinero", dineroActual);

    // Guardar el producto comprado
    guardarProducto(nombreImagen);
}


// ===================================
// BOTONES DE LA TIENDA
// ===================================

function q7() {
    comprarProducto("Ropa item.jpg", 133);
}

function r8() {
    comprarProducto("KPOP itmes.png", 220);
}

function s9() {
    comprarProducto("Sultana item.png", 130);
}

function t10() {
    comprarProducto("Vestido item.png", 189);
}

function u11() {
    comprarProducto("Video juegos item.png", 215);
}

function w12() {
    comprarProducto("carrito control remoto item.jpg", 199);
}

function x13() {
    comprarProducto("set dibujo item.jpg", 200);
}

function y14() {
    comprarProducto("furreal item.jpg", 230);
}

function z15() {
    comprarProducto("Bicicleta item.jpg", 359);
}


// ===================================
// BOTÓN PARA CONTINUAR
// ===================================

function UN() {

    localStorage.setItem("dinero", GF.value);

    localStorage.setItem(
        "productos",
        JSON.stringify(productosGuardados)
    );

    window.location.href = "pantalla.html";
}


// ===================================
// CARGAR OBJETOS AL ABRIR EL PROYECTO
// ===================================

window.addEventListener("load", function() {

    dibujarTodosLosProductos();

});
