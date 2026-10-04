// Get elements
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

// Open / Close mobile menu
if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", function () {
        navMenu.classList.toggle("active");
    });
}

// Close menu when a link is clicked
const navLinks = document.querySelectorAll(".nav-menu a");

navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        if (navMenu) {
            navMenu.classList.remove("active");
        }
    });
});

/* HERO SLIDER */
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentSlide = 0;
let slideInterval;

/* SHOW SLIDE */
function showSlide(index) {
    slides.forEach(function (slide) {
        slide.classList.remove("active");
    });

    dots.forEach(function (dot) {
        dot.classList.remove("active");
    });

    slides[index].classList.add("active");
    dots[index].classList.add("active");

    currentSlide = index;
}

/* NEXT SLIDE */
function nextSlide() {
    currentSlide++;

    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }

    showSlide(currentSlide);
}

/* PREVIOUS SLIDE */
function previousSlide() {
    currentSlide--;

    if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }

    showSlide(currentSlide);
}

/* SLIDER EVENTS */
if (slides.length > 0 && prevBtn && nextBtn) {

    nextBtn.addEventListener("click", function () {
        nextSlide();
        restartSlider();
    });

    prevBtn.addEventListener("click", function () {
        previousSlide();
        restartSlider();
    });

    /* DOT CLICK */
    dots.forEach(function (dot, index) {
        dot.addEventListener("click", function () {
            showSlide(index);
            restartSlider();
        });
    });

    /* AUTO SLIDER */
    function startSlider() {
        slideInterval = setInterval(function () {
            nextSlide();
        }, 5000);
    }

    /* RESTART SLIDER */
    function restartSlider() {
        clearInterval(slideInterval);
        startSlider();
    }

    /* START SLIDER */
    startSlider();
}

/* CONTACT FORM VALIDATION */
const contactForm = document.getElementById("contactForm");

if (contactForm) {

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const queryInput = document.getElementById("query");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const queryError = document.getElementById("queryError");

    const successMessage = document.getElementById("successMessage");

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        let isValid = true;

        nameError.textContent = "";
        emailError.textContent = "";
        queryError.textContent = "";
        successMessage.textContent = "";

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const query = queryInput.value.trim();

        /* NAME VALIDATION */
        if (name === "") {
            nameError.textContent = "Please enter your full name.";
            isValid = false;
        } else if (name.length < 3) {
            nameError.textContent = "Name must be at least 3 characters.";
            isValid = false;
        }

        /* EMAIL VALIDATION */
        if (email === "") {
            emailError.textContent = "Please enter your email.";
            isValid = false;
        } else {

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {
                emailError.textContent = "Please enter a valid email.";
                isValid = false;
            }
        }

        /* QUERY VALIDATION */
        if (query === "") {
            queryError.textContent = "Please enter your query.";
            isValid = false;
        } else if (query.length < 8) {
            queryError.textContent = "Query must be at least 8 characters.";
            isValid = false;
        }

        /* SUCCESS */
        if (isValid) {
            successMessage.textContent = "Your message has been submitted successfully.";
            contactForm.reset();
        }
    });
}