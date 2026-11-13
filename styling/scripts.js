
// ABOUT PAGE - ANIMATED HEADINGS

// Wait until the webpage has loaded
document.addEventListener("DOMContentLoaded", function () {

    // Enable JavaScript heading animations
    document.body.classList.add("js-enabled");

    // Select all headings with the animated-heading class
    const headings = document.querySelectorAll(".animated-heading");

    // Check whether the browser supports Intersection Observer
    if ("IntersectionObserver" in window) {

        const headingObserver = new IntersectionObserver((entries, observer) => {

            entries.forEach((entry) => {

                // Check when a heading enters the screen
                if (entry.isIntersecting) {

                    entry.target.classList.add("is-visible");

                    // Stop observing once the heading is visible
                    observer.unobserve(entry.target);
                }

            });

        }, {
            threshold: 0.3
        });

        // Observe each heading
        headings.forEach((heading) => {
            headingObserver.observe(heading);
        });

    } else {

        // Fallback for older browsers
        headings.forEach((heading) => {
            heading.classList.add("is-visible");
        });

    }

});

// CONTACT FORM SUBMISSION
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    const formFeedback = document.getElementById("formFeedback");
    const submissionModal = document.getElementById("submissionModal");
    const openEmailApp = document.getElementById("openEmailApp");
    const closeSubmissionModal = submissionModal.querySelector(
        ".submission-modal-close"
    );

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!contactForm.checkValidity()) {
            formFeedback.textContent =
                "Please complete all required fields correctly.";
            formFeedback.className = "form-feedback error";
            contactForm.reportValidity();
            return;
        }

        const visitorName = document.getElementById("contactName").value.trim();
        const visitorEmail = document.getElementById("contactEmail").value.trim();
        const visitorMessage = document.getElementById("contactMessage").value.trim();

        const subject = encodeURIComponent(
            "Adventure Escape SA - Website Enquiry"
        );
        const body = encodeURIComponent(
            "Name: " + visitorName +
            "\nEmail: " + visitorEmail +
            "\n\nMessage:\n" + visitorMessage
        );
        const mailtoLink =
            "mailto:info@adventureescapesa.co.za" +
            "?subject=" + subject +
            "&body=" + body;

        openEmailApp.href = mailtoLink;
        formFeedback.textContent = "";
        formFeedback.className = "form-feedback";
        submissionModal.showModal();
    });

    closeSubmissionModal.addEventListener("click", function () {
        submissionModal.close();
    });
}
