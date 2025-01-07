// Initialisierung des Swiper-Sliders
const swiper = new Swiper('.swiper-container', {
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    slidesPerView: 3,
    spaceBetween: 20,
});

// Lightbox-Funktionalität
const images = document.querySelectorAll('.swiper-slide img');
let currentIndex = 0;

// Öffne Lightbox
images.forEach((image, index) => {
    image.addEventListener('click', () => {
        currentIndex = index;
        openLightbox(image.src);
    });
});

// Lightbox erstellen und navigieren
function openLightbox(src) {
    // Erstelle Lightbox
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    document.body.appendChild(lightbox);

    // Füge Bild hinzu
    const img = document.createElement('img');
    img.src = src;
    lightbox.appendChild(img);

    // Navigation hinzufügen
    const nav = document.createElement('div');
    nav.className = 'lightbox-nav';

    // Vorheriger Button
    const prevButton = document.createElement('button');
    prevButton.innerHTML = '&#10094;'; // Pfeil nach links
    prevButton.addEventListener('click', () => navigateLightbox(-1));

    // Nächster Button
    const nextButton = document.createElement('button');
    nextButton.innerHTML = '&#10095;'; // Pfeil nach rechts
    nextButton.addEventListener('click', () => navigateLightbox(1));

    nav.appendChild(prevButton);
    nav.appendChild(nextButton);
    lightbox.appendChild(nav);

    // Schließen durch Klick auf den Hintergrund
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) lightbox.remove();
    });
}

// Lightbox-Bild wechseln
function navigateLightbox(direction) {
    currentIndex = (currentIndex + direction + images.length) % images.length; // Zyklisches Blättern
    const newSrc = images[currentIndex].src;
    document.querySelector('.lightbox img').src = newSrc;
}
