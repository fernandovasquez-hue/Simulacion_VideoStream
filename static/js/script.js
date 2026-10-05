const botonMeGusta = document.querySelector(".grupo-interacciones .interacciones:first-child");
    if (botonMeGusta) {
        let contadorTexto = botonMeGusta.querySelector("p");
        let leDioMeGusta = false;

        botonMeGusta.addEventListener("click", function() {
            if (!leDioMeGusta) {
                contadorTexto.textContent = "4,9K";
                leDioMeGusta = true;
            } else {
                contadorTexto.textContent = "4,8K";
                leDioMeGusta = false;
            }
        });
    }

    /* ==========================================================================
        2. INTERACCIÓN: SUSCRIPCIÓN Y CONTADOR DE SUSCRIPTORES
       ========================================================================== */
    const botonSuscripcion = document.querySelector(".boton-suscribirse");
    const contadorSuscriptores = document.querySelector(".suscriptores-canal");

    if (botonSuscripcion && contadorSuscriptores) {
        let estaSuscrito = false;

        botonSuscripcion.addEventListener("click", function() {
            if (!estaSuscrito) {
                botonSuscripcion.textContent = "Suscrito";
                botonSuscripcion.style.backgroundColor = '#606060';
                estaSuscrito = true;
            } else {
                botonSuscripcion.textContent = "Suscribirse";
                botonSuscripcion.style.backgroundColor = '#ff0000';
                estaSuscrito = false;
            }
        });
    }

    /* ==========================================================================
        3. INTERACCIÓN: AÑADIR VIDEO A LA COLA DE REPRODUCCIÓN
       ========================================================================== */
    const botonesAgregarCola = document.querySelectorAll(".agregar_a_cola");
const contenedorCola = document.querySelector(".fila_cola");

botonesAgregarCola.forEach((boton) => {
    boton.addEventListener("click", function(evento) {
        evento.preventDefault();
        
        const tarjetaVideo = boton.closest(".siguiente_video") || boton.closest(".interacciones");
        
        if (tarjetaVideo && contenedorCola) {
            let tituloVideo = "Video añadido";
            let rutaVideo = "";
            let rutaPoster = "";
            
            const videoOrigen = tarjetaVideo.querySelector("video") || document.querySelector(".contenedor-reproductor video");
            if (videoOrigen) {
                rutaVideo = videoOrigen.getAttribute("src") || "";
                rutaPoster = videoOrigen.getAttribute("poster") || "";
            }

            const elementoTitulo = tarjetaVideo.querySelector("h3");
            if (elementoTitulo) {
                tituloVideo = elementoTitulo.textContent;
            } else {
                const tituloPrincipal = document.querySelector(".nombre_video h1");
                if (tituloPrincipal) tituloVideo = tituloPrincipal.textContent;
            }

            const nuevoVideoCola = document.createElement("div");
            nuevoVideoCola.classList.add("siguiente_video");
            
            // COMENTARIO: Se asignan las propiedades src y poster extraídas al nuevo <video>
            nuevoVideoCola.innerHTML = `
                <div class="contenedor-miniatura-lateral">
                    <video src="${rutaVideo}" poster="${rutaPoster}"></video>
                </div>
                <div class="nombre_video">
                    <h3>${tituloVideo}</h3>
                    <p>VideoStream</p>
                    <p>1 visualización</p>
                </div>
                <button class="boton-eliminar-cola">✕</button>
            `;
            
            alert(`✔ Video añadido a la cola`);
            
            const botonEliminar = nuevoVideoCola.querySelector(".boton-eliminar-cola");
            botonEliminar.addEventListener("click", function() {
                nuevoVideoCola.remove();
            });

            contenedorCola.appendChild(nuevoVideoCola);
        }
    });
});

    // COMENTARIO: Evento para el botón 'Limpiar cola'
    const botonLimpiarCola = document.querySelector(".boton-limpiar-cola");
    if (botonLimpiarCola && contenedorCola) {
        botonLimpiarCola.addEventListener("click", function() {
            const itemsCola = contenedorCola.querySelectorAll(".siguiente_video");
            itemsCola.forEach(item => item.remove());
        });
    }

    // COMENTARIO: Evento para botones de eliminar ('X') preexistentes en la cola
    const botonesEliminarCola = document.querySelectorAll(".boton-eliminar-cola");
    botonesEliminarCola.forEach(function(boton) {
        boton.addEventListener("click", function() {
            const itemCola = boton.closest('.siguiente_video');
            if (itemCola) itemCola.remove();
        });
    });

    /* ==========================================================================
        4. INTERACCIÓN: REPRODUCCIÓN AUTOMÁTICA AL PASAR EL MOUSE POR MINIATURAS
       ========================================================================== */
    // COMENTARIO: Obtener todas las miniaturas que contienen etiqueta <video>
    const miniaturasVideo = document.querySelectorAll(".contenedor-miniatura, .contenedor-miniatura-lateral");

miniaturasVideo.forEach(function(contenedor) {
    const elementoVideo = contenedor.querySelector("img");

    if (elementoVideo) {
        // COMENTARIO: Se cambia a 'mouseenter' para prevenir disparos accidentales con elementos hijos
        contenedor.addEventListener("mouseover", function() {
            elementoVideo.muted = true;
            
            // COMENTARIO: Iniciar reproducción del video al colocar el cursor encima
            const promesaReproduccion = elementoVideo.play();
            
            if (promesaReproduccion !== undefined) {
                promesaReproduccion.catch(function(error) {
                    // Manejo silencioso en caso de que el navegador bloquee el autoplay o no exista src válido
                });
            }
        });

        // COMENTARIO: Se cambia a 'mouseleave' para pausar, reiniciar tiempo y recargar la portada (poster)
        contenedor.addEventListener("mouseout", function() {
            elementoVideo.pause();
            elementoVideo.currentTime = 0;
            
            // COMENTARIO: 'load()' restablece el estado del reproductor para mostrar nuevamente la imagen del poster
            elementoVideo.load();
        });
    }
});
