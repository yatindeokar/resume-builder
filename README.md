# ResumeForge

A free, client-side resume builder. Fill in your details, pick a template, and print or save a polished resume as PDF — no sign-up, no server, no data leaves your browser.

## Features

- **13 Resume Templates** — Classic, Modern, Minimal, Creative, Executive, Compact, Elegant, Tech, Timeline, Professional, Corporate, Polished, and Bold
- **Photo Upload & Crop** — Upload a headshot and adjust zoom/position before applying it to photo-enabled templates (Modern, Professional, Polished)
- **Live Preview** — See your formatted resume before printing
- **Print / Save as PDF** — Uses the browser's native print dialog to export a clean PDF
- **Dummy Data** — One-click fill for quick testing
- **Fully Client-Side** — Zero backend; all data stays in the browser

## Tech Stack

- Vanilla HTML, CSS, JavaScript (no frameworks or build tools)
- Google Fonts (Playfair Display, DM Sans, DM Mono)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/<your-username>/resume-builder.git
   cd resume-builder
   ```

2. Open `index.html` in any modern browser — no install or build step required.

   You can also serve it locally with any static file server, for example:

   ```bash
   npx serve .
   ```

## Project Structure

```
resume-builder/
├── index.html            # Main page (form, template picker, output)
├── css/
│   ├── base.css          # Global variables, resets, layout
│   ├── form.css          # Form and input styles
│   ├── templates.css     # Template card previews
│   ├── output.css        # Generated resume styles
│   └── print.css         # Print-specific overrides
└── js/
    ├── app.js            # Core logic, data collection, resume generation
    ├── form-helpers.js   # Dynamic form sections (add/remove blocks, skills)
    ├── templates.js      # HTML generators for each resume template
    ├── photo-crop.js     # Photo upload, canvas crop & zoom
    └── dummy-data.js     # One-click test data population
```

## Usage

1. Fill in your personal information, experience, education, projects, skills, and technical proficiencies.
2. Click **Generate My Resume**.
3. Choose a template from the horizontal carousel.
4. Click **Build & Preview Resume** to see the final output.
5. Click **Print / Save as PDF** to export.

## License

This project is provided as-is for personal use.
