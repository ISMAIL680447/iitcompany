// ===============================
// DARK / LIGHT MODE
// ===============================

const root = document.documentElement;
const savedTheme = localStorage.getItem("iit-theme");

if (savedTheme === "dark") {
    root.classList.add("dark");
}

const themeToggle = document.getElementById("themeToggle");

function updateThemeIcon() {
    if (!themeToggle) return;

    themeToggle.textContent =
        root.classList.contains("dark") ? "☀️" : "🌙";
}

updateThemeIcon();

if (themeToggle) {
    themeToggle.addEventListener("click", () => {

        root.classList.toggle("dark");

        localStorage.setItem(
            "iit-theme",
            root.classList.contains("dark") ? "dark" : "light"
        );

        updateThemeIcon();
    });
}


// ===============================
// MOBILE MENU
// ===============================

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (menuBtn && mobileMenu) {

    menuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("open");
    });

}

document.querySelectorAll(".mobile-menu a").forEach((a) => {

    a.addEventListener("click", () => {

        if (mobileMenu) {
            mobileMenu.classList.remove("open");
        }

    });

});


// ===============================
// QUOTE / ENQUIRY FORM
// ===============================

const quoteForm = document.getElementById("quoteForm");

if (quoteForm) {

    quoteForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const status = document.getElementById("formStatus");

        // Get form values
        const name = this.name.value.trim();
        const phone = this.phone.value.trim();
        const email = this.email.value.trim();
        const business = this.business.value.trim();
        const service = this.service.value;
        const budget = this.budget.value;
        const message = this.message.value.trim();


        // ===============================
        // VALIDATE PHONE
        // ===============================

        if (!/^[0-9]{10}$/.test(phone)) {

            status.textContent =
                "Please enter a valid 10-digit mobile number.";

            status.style.color = "#b42318";

            return;
        }


        // ===============================
        // CREATE EMAIL SUBJECT
        // ===============================

        const subject =
            "New Project Enquiry - IIT Company";


        // ===============================
        // CREATE EMAIL BODY
        // ===============================

        const body = `Hello IIT Company,

I would like to enquire about a project.

CUSTOMER DETAILS

Name: ${name}
Mobile: ${phone}
Email: ${email}
Business Name: ${business}

Service Required: ${service}
Budget: ${budget}

PROJECT REQUIREMENTS

${message}

------------------------------
IIT COMPANY
Phone: 9390288951
Email: 93902889@gmail.com
Location: Chittinagar, Vijayawada, Andhra Pradesh
------------------------------`;


        // ===============================
        // OPEN GMAIL
        // ===============================

        const gmailUrl =
            "https://mail.google.com/mail/?view=cm&fs=1" +
            "&to=" +
            encodeURIComponent("93902889@gmail.com") +
            "&su=" +
            encodeURIComponent(subject) +
            "&body=" +
            encodeURIComponent(body);


        window.open(gmailUrl, "_blank");


        // ===============================
        // SUCCESS MESSAGE
        // ===============================

        status.textContent =
            "✅ Gmail opened. Please click Send to submit your enquiry.";

        status.style.color = "#067647";


        // Clear form
        this.reset();

    });

}


// ===============================
// SCROLL REVEAL ANIMATION
// ===============================

const observer = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    },

    {
        threshold: 0.12
    }

);

document.querySelectorAll(".reveal").forEach((el) => {

    observer.observe(el);

});


// ===============================
// NUMBER COUNTERS
// ===============================

const counters =
    document.querySelectorAll("[data-count]");

const counterObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (
                entry.isIntersecting &&
                !entry.target.dataset.done
            ) {

                entry.target.dataset.done = "1";

                const target =
                    Number(entry.target.dataset.count);

                let n = 0;

                const step =
                    Math.max(
                        1,
                        Math.ceil(target / 35)
                    );

                const timer = setInterval(() => {

                    n += step;

                    if (n >= target) {

                        n = target;

                        clearInterval(timer);

                    }

                    entry.target.textContent =
                        n + "+";

                }, 30);

            }

        });

    },

    {
        threshold: 0.8
    }

);

counters.forEach((el) => {

    counterObserver.observe(el);

});
// =========================================
// OUR PROCESS - RUN EVERY TIME USER SCROLLS
// =========================================

const processSection = document.querySelector(".process");

if (processSection) {

    const processObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    // Remove animation
                    processSection.classList.remove("animate");

                    // Force browser to reset animation
                    void processSection.offsetWidth;

                    // Start again
                    processSection.classList.add("animate");

                } else {

                    // Reset when user leaves section
                    processSection.classList.remove("animate");

                }

            });

        },
        {
            threshold: 0.35
        }
    );

    processObserver.observe(processSection);
}
