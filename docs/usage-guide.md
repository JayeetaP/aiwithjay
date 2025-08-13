# Usage Guide

This guide shows how to integrate and use the portfolio site features, including core interactivity and advanced animations.

## Getting Started

1. Include CSS
```html
<link rel="stylesheet" href="css/style.css" />
<link rel="stylesheet" href="css/responsive.css" />
```

2. Include JavaScript at the end of the `<body>`
```html
<script src="js/main.js"></script>
<script src="js/animations.js"></script>
```

3. Ensure the required HTML hooks exist (see below).

## Required HTML Hooks

- Navigation
  - `#navbar`, `#hamburger`, `#nav-links`, `.nav-link`
- Sections to scroll to: `<section id="home">`, `<section id="about">`, etc.
- Contact form: `#contactForm` with fields `name`, `email`, `subject`, `message`.
- Optional animation targets: `.hero`, `.hero-img`, `.hero-description`, `.section-title`, `.expertise-card`, `.timeline-item`, `.stat-number`, `.impact-number`.

## Script Order and Initialization

- `js/main.js` sets up navigation, scroll effects, notifications, typing effect, lazy loading, accessibility, performance monitoring, and social sharing. It runs automatically on `DOMContentLoaded`.
- `js/animations.js` injects animation styles and advanced effects. It runs automatically on `DOMContentLoaded` and defers some heavy effects for performance.

If needed, you can manually call any initializer after the DOM is ready:
```html
<script>
  document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollEffects();
    initScrollToTop();
  });
</script>
```

## Recipes

### 1) Add a responsive navigation with smooth scrolling
```html
<nav id="navbar">
  <button id="hamburger" aria-label="Menu"><i class="fas fa-bars"></i></button>
  <ul id="nav-links">
    <li><a class="nav-link" href="#home">Home</a></li>
    <li><a class="nav-link" href="#about">About</a></li>
    <li><a class="nav-link" href="#contact">Contact</a></li>
  </ul>
</nav>
<section id="home"></section>
<section id="about"></section>
<section id="contact"></section>
```

### 2) Show a success notification
```html
<script>
  document.addEventListener('DOMContentLoaded', () => {
    showNotification('Welcome back!', 'success');
  });
</script>
```

### 3) Validate and submit the contact form
```html
<form id="contactForm">
  <input name="name" required>
  <input name="email" type="email" required>
  <select name="subject" required>
    <option value="">Select</option>
    <option value="mentoring">Mentoring</option>
  </select>
  <textarea name="message" required></textarea>
  <button type="submit">Send</button>
</form>
<script>
  document.addEventListener('DOMContentLoaded', () => {
    initContactForm();
  });
</script>
```

### 4) Add counters that animate on scroll
```html
<div class="stat-number">100+</div>
<div class="impact-number">75%</div>
```

### 5) Enable advanced animations (optional)
```html
<section class="hero">
  <img class="hero-img" src="assets/images/hero.jpg" alt=""/>
  <h1 class="title-main">Building AI for Impact</h1>
  <p class="hero-description">Enterprise AI, responsibly deployed.</p>
</section>
```

### 6) Add social sharing buttons
```html
<a href="#" class="share-btn" data-platform="twitter">Tweet</a>
<a href="#" class="share-btn" data-platform="linkedin">Share</a>
```

## Accessibility Tips

- The script injects a "Skip to main content" link automatically; ensure your main content has an id of `home` to be promoted to `main`.
- Provide `alt` text for all images.
- Ensure sufficient color contrast and focus indicators in your CSS.

## Performance Tips

- Prefer `data-src` with `initLazyLoading()` for images below the fold.
- `js/animations.js` reduces/omits heavy effects on devices with fewer than 4 hardware threads.
- Respect `prefers-reduced-motion`; many animations are minimized automatically for those users.

## Troubleshooting

- Nothing happens on click or scroll: confirm `js/main.js` is included and no console errors.
- Navigation toggle not working: verify element IDs match (`#hamburger`, `#nav-links`).
- Counters not animating: ensure they are visible in the viewport and contain numeric text (e.g., `100+` or `75%`).
- Notification styles missing: ensure `initAnimations()` has run (it runs automatically on load).