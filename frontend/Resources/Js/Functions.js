// Enviar info duos
function sendMessage(cardId) {
    const card = document.getElementById(cardId);
    const paquete = card.querySelector('#paquete').textContent;
    const velocidad = card.querySelector('#velocidad').textContent;
    const cable = card.querySelector('#cable').textContent;
    const precio = card.querySelector('#precio').textContent;

    const message = `¡Hola! Estoy interesado en el paquete de ${paquete}. Con ${velocidad} de velocidad y ${cable}.\nPrecio: ${precio}`;

    const phoneNumber = "51962624690";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
}

// Desplazamiento a secciones
function smoothScrollTo(sectionId, offset = 128) {
    const target = document.getElementById(sectionId);
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000;
    let start = null;
    function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    requestAnimationFrame(animation);
};

// Annimacion de carga
window.addEventListener("load", () => {
    const loading = document.getElementById("loading");
    const content = document.getElementById("content");

    setTimeout(() => {
        loading.style.display = "none";
        content.style.display = "block";
    }, 1000);
});