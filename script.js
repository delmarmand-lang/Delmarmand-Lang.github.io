/* ==================================================
   1. SÉLECTION DES ÉLÉMENTS
================================================== */

const header = document.querySelector(".header");

const menuToggle = document.querySelector("#menu-toggle");

const navLinks = document.querySelector("#nav-links");

const navItems = document.querySelectorAll(".nav-link");

const typingText = document.querySelector("#typing-text");

const currentYear = document.querySelector("#current-year");


/* ==================================================
   2. MENU MOBILE
================================================== */

function closeMenu() {

    navLinks.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.setAttribute("aria-label", "Ouvrir le menu");

    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';

}


menuToggle.addEventListener("click", () => {

    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Fermer le menu" : "Ouvrir le menu"
    );

    menuToggle.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';

});


/* Fermer le menu après un clic sur un lien */

navItems.forEach((link) => {

    link.addEventListener("click", () => {

        closeMenu();

    });

});


/* Fermer le menu si l'on clique en dehors */

document.addEventListener("click", (event) => {

    const clickedInsideMenu = navLinks.contains(event.target);

    const clickedToggle = menuToggle.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle) {

        closeMenu();

    }

});


/* ==================================================
   3. HEADER AU DÉFILEMENT
================================================== */

function handleHeaderScroll() {

    if (window.scrollY > 30) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}


window.addEventListener(
    "scroll",
    handleHeaderScroll,
    { passive: true }
);


/* État initial */

handleHeaderScroll();


/* ==================================================
   4. ANIMATION DU TEXTE D'ACCUEIL
================================================== */

const phrases = [

    "Futur ingénieur logiciel.",

    "Passionné par la technologie.",

    "Toujours prêt à apprendre.",

    "Construire. Tester. Améliorer."

];


const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;


let phraseIndex = 0;

let characterIndex = 0;

let deleting = false;


function typeEffect() {

    if (!typingText || reducedMotion) {

        return;

    }

    const currentPhrase = phrases[phraseIndex];

    if (deleting) {

        characterIndex--;

    } else {

        characterIndex++;

    }


    typingText.textContent = currentPhrase.slice(
        0,
        characterIndex
    );


    let delay = deleting ? 35 : 65;


    /* Fin de la saisie */

    if (!deleting && characterIndex === currentPhrase.length) {

        deleting = true;

        delay = 1800;

    }


    /* Fin de la suppression */

    else if (deleting && characterIndex === 0) {

        deleting = false;

        phraseIndex = (phraseIndex + 1) % phrases.length;

        delay = 400;

    }


    setTimeout(typeEffect, delay);

}


/* Lancer l'animation */

if (typingText && !reducedMotion) {

    typingText.textContent = "";

    typeEffect();

}


/* ==================================================
   5. ANIMATION D'APPARITION DES SECTIONS
================================================== */

const revealElements = document.querySelectorAll(
    ".section-heading, " +
    ".about-card, " +
    ".skill-card, " +
    ".project-card, " +
    ".timeline-item, " +
    ".contact-card"
);


if ("IntersectionObserver" in window && !reducedMotion) {

    const revealObserver = new IntersectionObserver(

        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12
        }

    );


    revealElements.forEach((element) => {

        element.classList.add("reveal");

        revealObserver.observe(element);

    });

}


/* ==================================================
   6. LIEN ACTIF DANS LA NAVIGATION
================================================== */

const sections = document.querySelectorAll(
    "main section[id]"
);


if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {

                    return;

                }


                const sectionId = entry.target.id;


                navItems.forEach((link) => {

                    const isActive =
                        link.getAttribute("href") === `#${sectionId}`;

                    link.classList.toggle("active", isActive);

                });

            });

        },

        {
            rootMargin: "-35% 0px -55% 0px"
        }

    );


    sections.forEach((section) => {

        sectionObserver.observe(section);

    });

}


/* ==================================================
   7. ANNÉE AUTOMATIQUE DANS LE FOOTER
================================================== */

if (currentYear) {

    currentYear.textContent = new Date().getFullYear();

}


/* ==================================================
   8. LIEN GITHUB À PERSONNALISER
================================================== */

const githubLink = document.querySelector(".github-link");


if (githubLink) {

    githubLink.addEventListener("click", (event) => {

        const destination = githubLink.getAttribute("href");


        if (!destination || destination === "#") {

            event.preventDefault();

            alert(
                "Ajoute l'adresse de ton profil GitHub " +
                "dans le fichier index.html."
            );

        }

    });

}