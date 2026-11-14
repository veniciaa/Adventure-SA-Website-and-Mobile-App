
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

/* =========================================
   BOOKING QUOTATION REQUEST
========================================= */

const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {

    const nameInput = document.getElementById("bookingName");
    const emailInput = document.getElementById("bookingEmail");
    const adventureOptions = Array.from(
        bookingForm.querySelectorAll('input[name="adventure"]')
    );
    const feedback = document.getElementById("bookingFeedback");
    const emailLink = document.getElementById("bookingEmailLink");

    function validateBookingName() {
        const name = nameInput.value.trim();
        nameInput.setCustomValidity(
            nameInput.value && name.length < 2
                ? "Enter at least two non-space characters for your name."
                : ""
        );
    }

    function updateAdventureSelectionValidity() {
        const hasSelection = adventureOptions.some(option => option.checked);
        adventureOptions[0].setCustomValidity(
            hasSelection ? "" : "Select at least one adventure."
        );
    }

    function clearBookingFeedback() {
        feedback.textContent = "";
        feedback.className = "booking-feedback";
        emailLink.hidden = true;
    }

    nameInput.addEventListener("input", () => {
        validateBookingName();
        clearBookingFeedback();
    });

    emailInput.addEventListener("input", clearBookingFeedback);

    adventureOptions.forEach(option => {
        option.addEventListener("change", () => {
            updateAdventureSelectionValidity();
            clearBookingFeedback();
        });
    });

    bookingForm.addEventListener("submit", event => {
        event.preventDefault();

        validateBookingName();
        updateAdventureSelectionValidity();

        if (!bookingForm.checkValidity()) {
            feedback.textContent =
                "Check your name and email, and select at least one adventure.";
            feedback.className = "booking-feedback error";
            bookingForm.reportValidity();
            return;
        }

        const selectedAdventures = adventureOptions
            .filter(option => option.checked)
            .map(option => option.value);
        const subject = encodeURIComponent(
            "Adventure Escape SA - Quotation Request"
        );
        const body = encodeURIComponent(
            `Name: ${nameInput.value.trim()}\n` +
            `Email: ${emailInput.value.trim()}\n\n` +
            `Selected adventures:\n- ${selectedAdventures.join("\n- ")}`
        );

        emailLink.href =
            `mailto:info@adventureescapesa.co.za?subject=${subject}&body=${body}`;
        emailLink.hidden = false;
        feedback.textContent =
            "Your request is ready. Open your email app using the link below to send it.";
        feedback.className = "booking-feedback";
    });

}

/* =========================================
   ADVENTURE ESCAPE SA - CART SYSTEM
========================================= */

if (document.getElementById("cart-content")) {

// CONFIGURATION
const VAT_RATE = 0.15;
const SERVICE_FEE = 50;

// Change to false if your business is not VAT registered.
// Only VAT-registered vendors should charge VAT.
const VAT_REGISTERED = true;

const CART_STORAGE_KEY = "adventureEscapeCart";

// CART ARRAY
let cart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];

// FORMAT CURRENCY
function formatCurrency(amount) {
    return new Intl.NumberFormat("en-ZA", {
        style: "currency",
        currency: "ZAR"
    }).format(amount);
}

// SAVE CART
function saveCart() {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

// DISCOUNT ARRAY
const discountRates = [
    { packages: 1, discount: 0 },
    { packages: 2, discount: 0.05 },
    { packages: 3, discount: 0.10 },
    { packages: 4, discount: 0.15 }
];

// GET DISCOUNT
function getDiscount(packageCount) {
    if (packageCount >= 4) return 0.15;
    if (packageCount === 3) return 0.10;
    if (packageCount === 2) return 0.05;
    return 0;
}

// ADD PRODUCT TO CART
document.querySelectorAll(".add-cart").forEach(button => {

    button.addEventListener("click", () => {

        const name = button.dataset.name;
        const price = Number(button.dataset.price);
        const image = button.dataset.image;

        const existingProduct = cart.find(item => item.name === name);

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({
                name: name,
                price: price,
                image: image,
                quantity: 1
            });
        }

        saveCart();
        displayCart();
        showCartMessage(`${name} added to your cart!`);
    });

});

// DISPLAY CART
function displayCart() {

    const cartContent = document.getElementById("cart-content");
    const emptyCart = document.getElementById("empty-cart");

    cartContent.innerHTML = "";

    emptyCart.style.display = cart.length === 0 ? "block" : "none";

    cart.forEach((item, index) => {

        const cartBox = document.createElement("div");
        cartBox.className = "cart-box";

        cartBox.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-img">

            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <p class="cart-price">${formatCurrency(item.price)}</p>

                <div class="cart-quantity">
                    <button type="button" class="decrease"
                        aria-label="Decrease quantity">−</button>

                    <span>${item.quantity}</span>

                    <button type="button" class="increase"
                        aria-label="Increase quantity">+</button>
                </div>
            </div>

            <div class="cart-item-right">
                <strong>${formatCurrency(item.price * item.quantity)}</strong>

                <button type="button" class="remove-item"
                    aria-label="Remove ${item.name}">
                    <i class="ri-delete-bin-line"></i>
                </button>
            </div>
        `;

        cartBox.querySelector(".decrease").addEventListener("click", () => {
            item.quantity--;

            if (item.quantity <= 0) {
                cart.splice(index, 1);
            }

            updateCart();
        });

        cartBox.querySelector(".increase").addEventListener("click", () => {
            item.quantity++;
            updateCart();
        });

        cartBox.querySelector(".remove-item").addEventListener("click", () => {
            cart.splice(index, 1);
            updateCart();
        });

        cartContent.appendChild(cartBox);
    });

    calculateTotals();
}

// UPDATE CART
function updateCart() {
    saveCart();
    displayCart();
}

// CALCULATE TOTALS
function calculateTotals() {

    // Total quantity of packages
    const packageCount = cart.reduce(
        (total, item) => total + item.quantity, 0
    );

    // Original subtotal
    const subtotal = cart.reduce(
        (total, item) => total + (item.price * item.quantity), 0
    );

    // Package discount
    const discountRate = getDiscount(packageCount);
    const discountAmount = subtotal * discountRate;

    // Amount after discount
    const discountedSubtotal = subtotal - discountAmount;

    // Charge service fee only when cart has items
    const serviceFee = packageCount > 0 ? SERVICE_FEE : 0;

    // VAT calculation
    // VAT is applied to the discounted subtotal plus the service fee.
    const taxableAmount = discountedSubtotal + serviceFee;

    const vatAmount = VAT_REGISTERED
        ? taxableAmount * VAT_RATE
        : 0;

    // Final total
    const finalTotal = taxableAmount + vatAmount;

    // Display calculations
    document.getElementById("package-count").textContent = packageCount;

    document.getElementById("subtotal").textContent =
        formatCurrency(subtotal);

    document.getElementById("discount").textContent =
        `${discountRate * 100}%`;

    document.getElementById("discount-amount").textContent =
        formatCurrency(discountAmount);

    document.getElementById("service-fee").textContent =
        formatCurrency(serviceFee);

    document.getElementById("vat-amount").textContent =
        formatCurrency(vatAmount);

    document.getElementById("final-total").textContent =
        formatCurrency(finalTotal);

    // Prevent checkout with an empty cart
    document.getElementById("checkout-btn").disabled =
        packageCount === 0;

    return {
        packageCount,
        subtotal,
        discountRate,
        discountAmount,
        discountedSubtotal,
        serviceFee,
        vatAmount,
        finalTotal
    };
}

// CART MESSAGE
function showCartMessage(message) {
    const summary = document.querySelector(".cart-summary");

    summary.classList.remove("cart-updated");

    // Restart animation
    void summary.offsetWidth;

    summary.classList.add("cart-updated");

    const liveMessage = document.getElementById("form-message");
    liveMessage.textContent = message;
}

// CHECKOUT BUTTON
document.getElementById("checkout-btn").addEventListener("click", () => {

    if (cart.length === 0) {
        alert("Please add an adventure package first.");
        return;
    }

    document.getElementById("customer-details").scrollIntoView({
        behavior: "smooth"
    });

});

// SET MINIMUM BOOKING DATE TO TODAY
const bookingDate = document.getElementById("booking-date");

const today = new Date();
const localToday = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
).toISOString().split("T")[0];

bookingDate.min = localToday;

// GENERATE INVOICE
document.getElementById("checkout-form").addEventListener("submit", event => {

    event.preventDefault();

    if (cart.length === 0) {
        alert("Your cart is empty. Please add a package.");
        return;
    }

    const form = event.target;

    if (!form.reportValidity()) {
        return;
    }

    const customer = {
        name: document.getElementById("customer-name").value.trim(),
        email: document.getElementById("customer-email").value.trim(),
        phone: document.getElementById("customer-phone").value.trim(),
        date: document.getElementById("booking-date").value,
        address: document.getElementById("customer-address").value.trim(),
        notes: document.getElementById("customer-notes").value.trim()
    };

    if (!/^(?:\+27|0)[0-9]{9}$/.test(customer.phone)) {
        alert("Please enter a valid South African contact number.");
        return;
    }

    const totals = calculateTotals();

    const invoiceNumber =
        "AES-" + Date.now().toString().slice(-8);

    const invoiceDate = new Date().toLocaleDateString("en-ZA");

    // CREATE INVOICE HTML
    const invoiceItems = cart.map(item => `
        <tr>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${formatCurrency(item.price)}</td>
            <td>${formatCurrency(item.price * item.quantity)}</td>
        </tr>
    `).join("");

    const invoice = `
        <div class="invoice-header">
            <div>
                <span class="eyebrow">ADVENTURE ESCAPE SA</span>
                <h2>Booking Invoice</h2>
                <p>Adventures Await!</p>
            </div>

            <div class="invoice-number">
                <strong>Invoice: ${invoiceNumber}</strong>
                <p>Date: ${invoiceDate}</p>
            </div>
        </div>

        <hr>

        <div class="invoice-customer">
            <h3>Customer Information</h3>
            <p><strong>Name:</strong> ${escapeHTML(customer.name)}</p>
            <p><strong>Email:</strong> ${escapeHTML(customer.email)}</p>
            <p><strong>Phone:</strong> ${escapeHTML(customer.phone)}</p>
            <p><strong>Adventure Date:</strong> ${escapeHTML(customer.date)}</p>
            <p><strong>Address:</strong> ${escapeHTML(customer.address || "Not provided")}</p>
            <p><strong>Additional Requests:</strong> ${escapeHTML(customer.notes || "None")}</p>
        </div>

        <h3>Package Details</h3>

        <div class="invoice-table-wrapper">
            <table class="invoice-table">
                <thead>
                    <tr>
                        <th>Package</th>
                        <th>Qty</th>
                        <th>Unit Price</th>
                        <th>Total</th>
                    </tr>
                </thead>

                <tbody>
                    ${invoiceItems}
                </tbody>
            </table>
        </div>

        <div class="invoice-totals">
            <p><span>Subtotal:</span> <strong>${formatCurrency(totals.subtotal)}</strong></p>
            <p><span>Discount (${totals.discountRate * 100}%):</span>
                <strong>-${formatCurrency(totals.discountAmount)}</strong></p>
            <p><span>Service Fee:</span> <strong>${formatCurrency(totals.serviceFee)}</strong></p>
            <p><span>VAT (${VAT_REGISTERED ? "15%" : "Not charged"}):</span>
                <strong>${formatCurrency(totals.vatAmount)}</strong></p>

            <h3><span>Final Total:</span>
                <strong>${formatCurrency(totals.finalTotal)}</strong></h3>
        </div>

        <p class="invoice-thankyou">
            Thank you for choosing Adventure Escape SA!
            We look forward to your adventure.
        </p>
    `;

    document.getElementById("invoice-content").innerHTML = invoice;

    document.getElementById("invoice-section").hidden = false;

    document.getElementById("invoice-section").scrollIntoView({
        behavior: "smooth"
    });

    document.getElementById("form-message").textContent =
        "Your booking invoice has been generated successfully.";

});

// ESCAPE CUSTOMER INPUT BEFORE INSERTING INTO INVOICE HTML
function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[character]);
}

// PRINT INVOICE
document.getElementById("print-invoice").addEventListener("click", () => {

    const invoiceContent =
        document.getElementById("invoice-content").innerHTML;

    const printWindow = window.open("", "_blank");

    if (!printWindow) {
        alert("Please allow pop-ups to print your invoice.");
        return;
    }

    printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Adventure Escape SA Invoice</title>

            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 35px;
                    color: #26352b;
                }

                h2, h3 {
                    color: #3A5204;
                }

                .invoice-header {
                    display: flex;
                    justify-content: space-between;
                    gap: 20px;
                }

                .invoice-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 20px 0;
                }

                .invoice-table th,
                .invoice-table td {
                    border: 1px solid #ddd;
                    padding: 12px;
                    text-align: left;
                }

                .invoice-table th {
                    background: #3A5204;
                    color: white;
                }

                .invoice-totals {
                    max-width: 400px;
                    margin-left: auto;
                }

                .invoice-totals p,
                .invoice-totals h3 {
                    display: flex;
                    justify-content: space-between;
                }

                .invoice-thankyou {
                    margin-top: 35px;
                    text-align: center;
                }

                @media print {
                    body { padding: 10px; }
                }
            </style>
        </head>

        <body>
            ${invoiceContent}
            <script>
                window.onload = function() {
                    window.print();
                };
            <\/script>
        </body>
        </html>
    `);

    printWindow.document.close();

});

// INITIALISE CART
displayCart();

}
