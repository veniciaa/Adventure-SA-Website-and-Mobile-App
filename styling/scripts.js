
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

// =========================================
// CONTACT PAGE FORM VALIDATION
// =========================================

document.addEventListener("DOMContentLoaded", function () {

    // Get the contact form
    const contactForm = document.getElementById("contactForm");

    // Get the feedback paragraph
    const feedback = document.getElementById("formFeedback");

    // Check that the contact form exists
    if (!contactForm) return;

    contactForm.addEventListener("submit", function (event) {

        // Prevent the default form submission
        event.preventDefault();

        // Check that all required fields are valid
        if (!contactForm.checkValidity()) {

            contactForm.reportValidity();

            feedback.textContent =
                "Please complete all required fields correctly.";

            return;
        }

        // Collect visitor information
        const visitorName =
            document.getElementById("contactName").value.trim();

        const visitorEmail =
            document.getElementById("contactEmail").value.trim();

        const visitorMessage =
            document.getElementById("contactMessage").value.trim();

        // Check that the message contains meaningful content
        if (visitorMessage.length < 10) {

            feedback.textContent =
                "Please enter a message of at least 10 characters.";

            return;
        }

        // Prepare the email subject and body
        const subject = encodeURIComponent(
            "Adventure Escape SA - Website Enquiry"
        );

        const body = encodeURIComponent(
            "Name: " + visitorName +
            "\nEmail: " + visitorEmail +
            "\n\nMessage:\n" + visitorMessage
        );

        // Open the visitor's default email application
        const mailtoLink =
            "mailto:info@adventureescapesa.co.za" +
            "?subject=" + subject +
            "&body=" + body;

        feedback.textContent =
            "Your email application will open with your message ready to send.";

        // Open email application
        window.location.href = mailtoLink;

    });

});
