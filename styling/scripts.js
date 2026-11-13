
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
