# Personal Portfolio Website

A modern, responsive, and visually appealing developer portfolio website crafted with **semantic HTML5**, **CSS3**, **Vanilla JavaScript (ES6+)**, and **Tailwind CSS**, following a sleek **Modern Dark Developer Theme**.

---

## 🚀 Live Preview / How to Open

No build steps or package installations are required!

1. **Directly in Browser**: Double-click or open `index.html` in any modern web browser (Google Chrome, Microsoft Edge, Firefox, Safari).
2. **With VS Code Live Server**: Right-click `index.html` and select **"Open with Live Server"**.
3. **With Python (optional)**:
   ```bash
   python -m http.server 3000
   ```
   Then open `http://localhost:3000` in your browser.

---

## 🎨 Design Theme & Aesthetics

- **Dark Background**: `#0B0F19` with subtle ambient radial gradients and glowing highlights.
- **Accents**: Modern Indigo (`#6366F1`), Violet (`#8B5CF6`), Purple (`#A855F7`), and Cyan (`#22D3EE`).
- **Typography**: Inter (body text), Poppins (headings), and JetBrains Mono (code blocks & tech tags).
- **Glassmorphism**: Translucent card surfaces with `backdrop-filter: blur()`, subtle borders, and glowing hover states.
- **Micro-Interactions**: Smooth scrolling, floating badges, card lifts, active navbar indicators, and toast alerts.

---

## 📂 Project Structure

```text
task-1/
├── index.html                  # Semantic HTML5 single-page application structure
├── css/
│   └── style.css               # Custom theme styles, glassmorphism, animations & scrollbar
├── js/
│   └── script.js               # Vanilla JavaScript: Nav spy, mobile drawer, form validation, filter & toast
├── assets/
│   └── images/
│       ├── avatar.svg          # Stylized developer portrait illustration
│       ├── project-portfolio.svg   # Portfolio website mockup preview
│       ├── project-taskmanager.svg # Task management Kanban dashboard mockup
│       ├── project-ecommerce.svg   # E-commerce store mockup preview
│       └── project-weather.svg     # Weather dashboard mockup preview
└── README.md                   # Project documentation & usage guide
```

---

## ✨ Features & Sections

### 1. Navigation Bar
- Brand logo: `<Nebyou.dev />` with subtle gradient borders.
- Navigation links: **Home**, **About**, **Skills**, **Projects**, and **Contact**.
- **Smooth Scrolling** with sticky header height compensation.
- **Scroll Spy**: Automatically detects the section in viewport and updates active link indicators.
- **Responsive Mobile Menu**: Hamburger menu toggle with accessible ARIA attributes and auto-close behavior.

### 2. Hero Section
- Welcoming greeting with animated status badge (*"Available for freelance & full-time roles"*).
- Bold gradient headline: *"Frontend Developer & Software Engineer"*.
- Call-to-action buttons: *"View My Projects"* and *"Contact Me"*.
- Interactive creative visual: macOS-style IDE window with syntax-highlighted TypeScript developer profile object and floating badges.
- Direct social links: GitHub, LinkedIn, and Email.

### 3. About Me Section
- Personal introduction and background narrative.
- Stylized developer portrait with glowing ambient ring.
- Quick stats counter (Experience, Projects, Commitment).
- Three core highlight cards:
  - **Passionate Developer**
  - **Problem Solver**
  - **Continuous Learner**

### 4. Skills & Technologies Section
- Categorized technical stack cards with proficiency meters and category tags:
  - **HTML5** (Advanced)
  - **CSS3** (Advanced)
  - **JavaScript ES6+** (Proficient)
  - **Tailwind CSS** (Advanced)
  - **Bootstrap** (Proficient)
  - **Git & GitHub** (Proficient)
  - **Responsive Design** (Advanced)
  - **Developer Tools / VS Code** (Proficient)
  - **REST APIs** (Proficient)
- **Interactive Category Filter**: Switch between *All Skills*, *Frontend Development*, and *Tools & Workflow*.

### 5. Projects Section
- Responsive 3-column project grid with hover zoom effects.
- Realistic sample projects:
  1. **Personal Portfolio Website** (HTML5, Tailwind CSS, JavaScript, CSS3)
  2. **Task Management Application** (JavaScript ES6, Tailwind CSS, CSS Grid, LocalStorage)
  3. **E-Commerce Storefront** (HTML5, Bootstrap, JavaScript, REST API)
- Each project card includes:
  - Scalable vector mockup image.
  - Project title & descriptive summary.
  - Technology badges.
  - Working **Live Demo** and **GitHub** simulation buttons with toast feedback.

### 6. Contact Section & Form Validation
- Contact information: Direct email, location, response window, and social channels.
- **Interactive Contact Form**:
  - Full Name (required, min 2 chars)
  - Email Address (required, regex validation)
  - Subject (required, min 3 chars)
  - Message (required, min 10 chars)
- **Real-Time Validation**:
  - Validates fields on blur and real-time input.
  - Highlights invalid fields with red borders and clear error messages.
  - Prevents submission when any field fails validation.
  - Displays loading spinner upon valid submission.
  - Displays a personalized success banner and floating toast notification.
  - Automatically resets form after simulated sending.

### 7. Footer
- Developer branding and quick navigation links.
- Social media icon shortcuts.
- **Dynamic Copyright Year** auto-generated using JavaScript (`new Date().getFullYear()`).
- Floating **Back-to-Top Button** that smoothly reveals when scrolling down and returns to the top with one click.

---

## 📱 Responsiveness

Fully responsive and tested across standard viewport breakpoints:
- **Mobile Phones**: 320px – 640px
- **Tablets**: 641px – 1024px
- **Laptops & Desktops**: 1025px and above
- Zero horizontal overflow, fluid typography, and adaptive flex/grid columns.

---

## 🛠️ Built With

- **HTML5** (Semantic structure)
- **CSS3** (Custom properties, keyframes, scrollbar)
- **Tailwind CSS** (Play CDN)
- **Vanilla JavaScript** (Modern ES6+)
