// Loader
window.addEventListener("load", function() {
    document.querySelector(".loader-wrapper").classList.add("hidden");
    
    // Initialize EmailJS inside window load event
    emailjs.init("NeUue__k7rbn7JL5e");
});

setTimeout(function() {
    const loader = document.querySelector(".loader-wrapper");
    if(loader) loader.classList.add("hidden");
}, 2000);

// Navbar shadow on scroll
window.addEventListener("scroll", function() {
    document.querySelector(".navbar")
        .classList.toggle("scrolled", window.scrollY > 50);

    revealOnScroll();
});

// Mobile menu
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}

// Smooth Scroll
document.querySelectorAll("a").forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        if (this.hash !== "") {
            e.preventDefault();
            document.querySelector(this.hash)
                .scrollIntoView({ behavior: "smooth" });
        }
    });
});

// Scroll Reveal
function revealOnScroll() {
    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 100;

        if (elementTop < windowHeight - revealPoint) {
            element.classList.add("active");
        }
    });
}

window.addEventListener("DOMContentLoaded", revealOnScroll);

// Active Nav Highlight
const currentLocation = location.href;
const menuItems = document.querySelectorAll(".nav-links a");
menuItems.forEach(link => {
    if (link.href === currentLocation) {
        link.classList.add("active");
    }
});

// Contact Form Validation
const contactForm = document.getElementById("contactForm");

if(contactForm){
    contactForm.addEventListener("submit", function(e){
        e.preventDefault();

        const name = contactForm.querySelector("input[type='text']").value.trim();
        const email = contactForm.querySelector("input[type='email']").value.trim();
        const message = contactForm.querySelector("textarea").value.trim();

        if(name === "" || email === "" || message === ""){
            alert("Please fill in all fields ☕");
        } else {
            alert("Thank you for contacting Café Aroma! We’ll get back to you soon 🤎");
            contactForm.reset();
        }
    });
}

// Reservation Form with WhatsApp + EmailJS
const reservationForm = document.getElementById("reservationForm");

if (reservationForm) {
reservationForm.addEventListener("submit", function(e) {
e.preventDefault();

const name = document.getElementById("resName").value.trim();
const phone = document.getElementById("resPhone").value.trim();
const date = document.getElementById("resDate").value;
const time = document.getElementById("resTime").value;
const guests = document.getElementById("resGuests").value;

if (!name || !phone || !date || !time || !guests) {
alert("Please fill all reservation details ☕");
return;
}

// Date validation
const selectedDate = new Date(date);
const today = new Date();
today.setHours(0,0,0,0);

if (selectedDate < today) {
alert("Please select a valid future date 📅");
return;
}

// -------- WHATSAPP AUTO MESSAGE --------
const cafeNumber = "916376533378"; // Replace with your real WhatsApp number (country code included)

const message = `Hello Café Aroma ☕

I'd like to confirm my reservation:

Name: ${name}
Phone: ${phone}
Date: ${date}
Time: ${time}
Guests: ${guests}

Looking forward to visiting 🤎`;

const whatsappURL = `https://wa.me/${cafeNumber}?text=${encodeURIComponent(message)}`;

window.open(whatsappURL, "_blank");

const email = document.getElementById("email").value;

// 1️⃣ Send Email To Owner
emailjs.send("service_99k4iig", "template_xeiac2b", {
    from_name: name,
    from_phone: phone,
    reservation_date: date,
    reservation_time: time,
    guests: guests,
    email: email
})
.then(function() {
    // 2️⃣ Send Confirmation To Customer
    return emailjs.send("service_99k4iig", "template_n1ogb2r", {
        from_name: name,
        reservation_date: date,
        reservation_time: time,
        guests: guests,
        email: email
    });
})
.then(function() {
    alert("Reservation successful! 🎉 Confirmation email sent. Check WhatsApp to confirm.");
    reservationForm.reset();
})
.catch(function(error) {
    alert("Something went wrong. Please try again.");
    console.log("Email failed...",error);
});


});
}