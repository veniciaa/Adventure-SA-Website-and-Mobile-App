# Adventure Escape SA

Adventure Escape SA is a static website for exploring outdoor activities and adventure packages in South Africa. Visitors can learn about the business and its team, browse experiences, request a quotation, contact the business, and use a shopping cart to calculate a package total.

## Pages

- **Home** (`index.html`): Introduces the business and highlights experiences and team members.
- **About** (`about.html`): Shares the business story, mission, vision, approach, and team.
- **Services** (`services.html`): Presents activities, packages, prices, and multi-booking offers.
- **Booking** (`booking.html`): Validates a quotation request and prepares an email for the visitor to send.
- **Gallery** (`gallery.html`): Displays adventure and team photos, with a dropdown menu and team directory table.
- **Cart** (`calculate.html`): Manages selected packages, quantities, totals, and invoice printing.
- **Contact** (`contact.html`): Validates a contact message and prepares an email for the visitor to send.

## Features

- Responsive layouts styled with shared CSS.
- Shared JavaScript for animated headings and page interactions.
- Booking and contact forms with input validation.
- Cart data saved in browser `localStorage`, so it remains available in that browser.
- Cart calculations include quantity-based discounts, a service fee, and VAT; checkout can generate a printable invoice.
- Local image assets used across the Home, About, and Gallery pages.

## Technologies

- HTML5
- CSS3
- JavaScript

No package installation or build step is required.

## Run locally

From the project directory, start Python's built-in static web server:

```powershell
py -m http.server 8080
```

Then open [http://localhost:8080](http://localhost:8080) in a browser. Stop the server with `Ctrl+C` in the terminal.

Alternatively, open the project in Visual Studio Code and use the Live Server extension.

## Main project files

```text
.
├── index.html
├── about.html
├── services.html
├── booking.html
├── gallery.html
├── calculate.html
├── contact.html
├── styling/
│   ├── style.css
│   └── scripts.js
├── images/
└── favicon_io/
```

## Code and image references

The page markup is in the root-level HTML files listed above. Shared behavior and presentation are defined in:

- [`styling/scripts.js`](./styling/scripts.js): animated headings, booking and contact form handling, and cart behavior.
- [`styling/style.css`](./styling/style.css): shared page styles, responsive layouts, and image backgrounds.

Images are stored locally in `images/` and referenced from the HTML using relative `src` paths. The shared stylesheet uses relative `url(...)` paths (for example, `../images/background.jpg`).

| Image purpose | Files referenced by the pages |
| --- | --- |
| Logo and site background | `images/logo.jpeg`, `images/background.jpg` |
| Team portraits reused across Home, About, and Gallery | `images/Ange.jpeg`, `images/Dan.jpeg`, `images/Mbali.jpeg`, `images/Ntombi.jpeg`, `images/Thabiso.jpeg` |
| Home and Gallery adventures | `images/hike.jpg`, `images/hike1.jpg`, `images/hike2.jpg`, `images/kayak.jpg`, `images/zipline2.jpg`, `images/course.jpg`, `images/zipline equipment.jpg`, `images/obstacle course.jpg`, `images/rock climbing.jpg` |
| Services activities and packages | `images/adventure.jpeg`, `images/guided.jpeg`, `images/package.jpeg`, `images/aultimateday.jpeg`, `images/familyexplore.jpeg`, `images/mountain.jpeg`, `images/team.jpeg`, `images/ziplining.jpeg`, `images/kayaking.jpeg`, `images/rock.jpeg` |
| Cart product cards | `images/product hiking.jpg`, `images/product family.jpg`, `images/product mountain.jpg`, `images/product team.jpg`, `images/product ziplining.jpg`, `images/product kayaking.jpg`, `images/product rock climbing.jpg` |

To change an image, replace the asset while keeping its filename, or update the matching `src`, `data-image`, or CSS `url(...)` reference. Keep spaces and capitalization in filenames consistent with the references.

## Notes and limitations

- Booking and contact requests use `mailto:` links. The visitor must send the prepared email from an email application; the site does not submit requests to a server.
- The site has no backend, online payment processing, or database. Cart data is stored only in the visitor's browser.
- The individual activity-card **Book Activity** buttons on the Services page are not currently connected to an action. Use the page's booking links to open the quotation form.

## Published Website

[Published Website](https://veniciaa.github.io/Adventure-SA-Website-and-Mobile-App/)

## Youtube Link

[Powerpoint Presentation](https://www.youtube.com/watch?v=dwoHPAovRdE)

## Repository

[Adventure Escape SA on GitHub](https://github.com/veniciaa/Adventure-SA-Website-and-Mobile-App)
