
/* =========================================
   ADVENTURE ESCAPE SA
   SHARED JAVASCRIPT FUNCTIONALITY
========================================= */


/* =========================================
   ANIMATED HEADINGS - ALL PAGES
========================================= */

// Wait until the webpage has loaded
document.addEventListener("DOMContentLoaded", function () {

    // Enable JavaScript heading animations
    document.body.classList.add("js-enabled");

    // Select all headings with the animated-heading class
    const headings = document.querySelectorAll(".animated-heading");

    // Check whether the browser supports Intersection Observer
    if ("IntersectionObserver" in window) {

        const headingObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    // Check when a heading enters the screen
                    if (entry.isIntersecting) {

                        entry.target.classList.add("is-visible");

                        // Stop observing once the heading is visible
                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.3
            }
        );

        // Observe each animated heading
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


/* =========================================
   CONTACT FORM SUBMISSION
========================================= */

// Select the contact form
const contactForm = document.getElementById("contactForm");

if (contactForm) {

    const formFeedback = document.getElementById("formFeedback");
    const submissionModal = document.getElementById("submissionModal");
    const openEmailApp = document.getElementById("openEmailApp");

    const closeSubmissionModal = submissionModal
        ? submissionModal.querySelector(".submission-modal-close")
        : null;


    // Handle contact form submission
    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        // Validate the form
        if (!contactForm.checkValidity()) {

            if (formFeedback) {
                formFeedback.textContent =
                    "Please complete all required fields correctly.";

                formFeedback.className = "form-feedback error";
            }

            contactForm.reportValidity();
            return;
        }


        // Collect visitor information
        const visitorName =
            document.getElementById("contactName").value.trim();

        const visitorEmail =
            document.getElementById("contactEmail").value.trim();

        const visitorMessage =
            document.getElementById("contactMessage").value.trim();


        // Prepare email subject
        const subject = encodeURIComponent(
            "Adventure Escape SA - Website Enquiry"
        );


        // Prepare email message
        const body = encodeURIComponent(
            "Name: " + visitorName +
            "\nEmail: " + visitorEmail +
            "\n\nMessage:\n" + visitorMessage
        );


        // Create email application link
        const mailtoLink =
            "mailto:info@adventureescapesa.co.za" +
            "?subject=" + subject +
            "&body=" + body;


        // Check that the required modal elements exist
        if (!submissionModal || !openEmailApp) {
            if (formFeedback) {
                formFeedback.textContent =
                    "Your email is ready to be prepared. Please try again.";

                formFeedback.className = "form-feedback error";
            }
            return;
        }


        // Attach email link to the modal button
        openEmailApp.href = mailtoLink;


        // Clear previous feedback
        if (formFeedback) {
            formFeedback.textContent = "";
            formFeedback.className = "form-feedback";
        }


        // Display submission modal
        submissionModal.showModal();

    });


    // Close submission modal
    if (closeSubmissionModal) {

        closeSubmissionModal.addEventListener("click", function () {
            submissionModal.close();
        });

    }

}
