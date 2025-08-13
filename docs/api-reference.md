# API Reference

This document covers all public, globally available functions and UI components provided by this project. It includes descriptions, parameters, return values, side-effects, required HTML/CSS hooks, and usage examples.

- Source files:
  - `js/main.js` (Core UI, utilities, accessibility, notifications)
  - `js/animations.js` (Advanced/visual animations, effects, and utilities)

- Script includes:
  - Core features are initialized automatically on `DOMContentLoaded` when `js/main.js` is included.
  - Advanced animations initialize automatically when `js/animations.js` is included. Optional AOS integration is supported if the AOS library is present.

- Important HTML hooks used by the scripts are noted per function. Ensure your markup matches the required selectors.

## Module: js/main.js (Core)

### initNavigation()
- Description: Initializes responsive navigation, scroll-based active link highlighting, smooth scrolling, and mobile menu toggling.
- Side effects: Adds scroll listeners, click handlers, toggles `active` and `menu-open` classes.
- Requires HTML:
  - A container `nav` with `id="navbar"`
  - A toggle button with `id="hamburger"` (or adapt the code to your toggle's id)
  - A links container with `id="nav-links"`
  - Links with class `.nav-link` and `href="#section-id"`
- Example HTML:
  ```html
  <nav id="navbar">
    <button id="hamburger" aria-label="Menu"><i class="fas fa-bars"></i></button>
    <ul id="nav-links">
      <li><a class="nav-link" href="#home">Home</a></li>
      <li><a class="nav-link" href="#about">About</a></li>
    </ul>
  </nav>
  ```
- Example: Automatically called on DOMContentLoaded; you can call it manually if needed:
  ```html
  <script>initNavigation();</script>
  ```

### initScrollEffects()
- Description: Fades elements in when scrolled into view and applies a parallax translate to `.hero-background`. Triggers counter animations via `animateCounters()`.
- Side effects: Adds IntersectionObserver and scroll listeners.
- Requires HTML: Elements with any of `.fade-in`, `.slide-in-left`, `.slide-in-right`; optional `.hero-background` for parallax.
- Example:
  ```html
  <div class="fade-in">This will fade in.</div>
  <div class="hero-background"></div>
  ```

### animateCounters()
- Description: Counts up numeric content for `.stat-number` and `.impact-number` when visible.
- Behavior: Detects `+` and `%` formats.
- Requires HTML: Elements with initial numeric text.
- Example:
  ```html
  <span class="stat-number">100+</span>
  <span class="impact-number">75%</span>
  ```

### initContactForm()
- Description: Attaches validation and simulated submit behavior to a contact form.
- Side effects: Shows notifications via `showNotification`, disables/enables submit button during simulation.
- Requires HTML: A form element with `id="contactForm"` containing `name`, `email`, `subject`, `message` fields and a submit button.
- Example HTML:
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
  ```

### validateForm(data)
- Description: Validates `{ name, email, subject, message }`.
- Parameters:
  - `data.name: string` (min length: 2)
  - `data.email: string` (must be valid email)
  - `data.subject: string` (non-empty)
  - `data.message: string` (min length: 10)
- Returns: `boolean` (true if valid)
- Side effects: On error, calls `showNotification(message, 'error')`.
- Example:
  ```js
  const isValid = validateForm({ name: 'Ada', email: 'ada@ex.com', subject: 'Hi', message: 'Hello world!' });
  ```

### isValidEmail(email)
- Description: Email regex validation.
- Returns: `boolean`
- Example:
  ```js
  isValidEmail('user@example.com'); // true
  ```

### showNotification(message, type = 'info')
- Description: Renders a floating notification and auto-dismisses after 5s.
- Parameters:
  - `message: string`
  - `type: 'info' | 'success' | 'error'`
- Side effects: Appends a `.notification.notification-{type}` element to `document.body` and injects styles via `initAnimations()`.
- Example:
  ```js
  showNotification('Saved successfully', 'success');
  showNotification('Something went wrong', 'error');
  ```

### initScrollToTop()
- Description: Creates a floating “scroll to top” button that appears after scrolling.
- Side effects: Appends a `.scroll-to-top` button to `document.body` and binds its events.
- Example:
  ```js
  initScrollToTop();
  ```

### initAnimations()
- Description: Injects CSS keyframes and helper classes for notifications and utility animations.
- Example: Called automatically on load.

### initTypingEffect()
- Description: Typewriter effect for a subtitle element.
- Requires HTML: Element with class `.title-subtitle` (or update to your class).
- Example:
  ```html
  <h2 class="title-subtitle">This will be typed out</h2>
  ```

### initLazyLoading()
- Description: Lazy loads images using `IntersectionObserver`.
- Requires HTML: `img` tags with `data-src` and optional `class="lazy"`.
- Example:
  ```html
  <img data-src="assets/images/photo.jpg" class="lazy" alt="..." />
  ```

### initPerformanceMonitoring()
- Description: Logs page load time and removes `.loading-overlay` if present after load.
- Example:
  ```js
  const overlay = showPreloader();
  // after load, overlay will fade and be removed
  ```

### initAccessibility()
- Description: Adds a visually hidden "Skip to main content" link, and sets the hero section to role=main.
- Side effects: Inserts a `.skip-link` at top of `body`. Sets `#home` role to `main` and id to `main` when present.

### initDarkMode()
- Description: Adds a floating dark mode toggle, persists preference via `localStorage`.
- Side effects: Toggles `.dark-mode` class on `body` and updates the toggle icon.
- Example:
  ```js
  // Optional; not auto-enabled
  initDarkMode();
  ```

### debounce(func, wait)
- Description: Returns a debounced wrapper.
- Returns: `Function`
- Example:
  ```js
  window.addEventListener('resize', debounce(() => console.log('resized'), 200));
  ```

### throttle(func, limit)
- Description: Returns a throttled wrapper.
- Returns: `Function`
- Example:
  ```js
  window.addEventListener('scroll', throttle(() => console.log('scroll'), 100));
  ```

### showPreloader()
- Description: Displays a full-screen loading overlay.
- Returns: `HTMLElement` (overlay element appended to `body`).
- Example:
  ```js
  const overlay = showPreloader();
  // remove overlay when ready: overlay.remove();
  ```

### initSocialSharing()
- Description: Opens share dialogs for links/buttons with `.share-btn` and `data-platform`.
- Supported `data-platform`: `twitter`, `linkedin`, `facebook`.
- Example:
  ```html
  <a href="#" class="share-btn" data-platform="twitter">Share on Twitter</a>
  ```

### Node/CommonJS usage (testing, Node-driven builds)
- The following are exported when a CommonJS environment is detected:
  ```js
  const { initNavigation, initScrollEffects, initContactForm, showNotification, validateForm } = require('./js/main.js');
  ```


## Module: js/animations.js (Advanced Animations)

Note: Include `js/animations.js` after your core script to enable these features. AOS support is optional; if present globally as `AOS`, it will be initialized.

### initCustomAnimations()
- Description: Enables floating hero image, pulsing badges, staggered expertise cards, timeline animation, and advanced counters.
- Requires HTML:
  - `.hero-img` (hero image) — optional
  - `.achievement-badge` — optional, will pulse with stagger
  - `.expertise-card` — gets `fade-in-up` with stagger
  - `.timeline-item` — animated via `animateTimeline()`
  - `.stat-number`, `.impact-number` — animated via `initAdvancedCounters()`

### initParticleBackground()
- Description: Adds a decorative particle background to `.hero` section.
- Requires HTML: A section/container with `.hero`.
- Example:
  ```html
  <section class="hero"> ... </section>
  ```

### initGradientAnimation()
- Description: Adds interactive gradient on hover to `.btn-primary`, `.card-icon`, `.logo-text`.

### initTextAnimations()
- Description: Typewriter effect for `.title-main`, text reveal, and split word animation for `.section-title`.
- Calls: `initTextReveal()` and `splitTextAnimation(element)` per `.section-title`.

### initTextReveal()
- Description: Adds `text-reveal` animation class when `.hero-description` and `.about-intro p` enter viewport.

### splitTextAnimation(element)
- Description: Splits text content into span-wrapped words and animates them into view when intersecting.
- Parameters: `element: HTMLElement`

### initImageEffects()
- Description: Parallax on `.hero-img`, `.about-img`; hover scale/brightness on `.image-container img`.

### animateTimeline()
- Description: Slides in `.timeline-item` elements when visible; sets a custom CSS property for pseudo-element timing.

### initAdvancedCounters()
- Description: Alternative counter animation for `.stat-number` and `.impact-number` with pulsing during counting.

### initMouseInteractions()
- Description: Magnetic hover effect for `.btn`; cursor trail on desktop widths.

### initCursorTrail()
- Description: Creates a decorative cursor trail element that follows the mouse.

### initScrollProgress()
- Description: Adds a top-of-page scroll progress bar.

### throttle(func, limit)
- Description: Throttle utility (same behavior as in `js/main.js`).

### addAnimationStyles()
- Description: Injects keyframes and classes used by animations (`float`, `float-particle`, `slideInLeft`, `fadeInUp`, `pulse`, etc.).

### AOS integration
- If `AOS` is present globally, it is initialized with duration 800ms, easing `ease-out-cubic`, and disabled below 768px.


## UI Components and CSS Hooks

### Notification
- Generated by `showNotification(message, type)`.
- Classes: `.notification`, `.notification-{type}`, `.notification-content`, `.notification-close`.

### Scroll To Top Button
- Generated by `initScrollToTop()`.
- Class: `.scroll-to-top`.

### Skip Link
- Generated by `initAccessibility()`.
- Class: `.skip-link`.

### Particle Background
- Generated by `initParticleBackground()`.
- Classes: `.particle-container`, `.particle`.

### Scroll Progress Bar
- Generated by `initScrollProgress()`.
- Class: `.scroll-progress`.


## Usage Notes and Gotchas

- Selector alignment: Ensure your markup matches the selectors used in code. For example, the nav toggle is expected to have `id="hamburger"`, and the contact form is expected to have `id="contactForm"`.
- Duplicate throttle definitions: Both modules define `throttle`. They are equivalent; including both scripts is safe but the last loaded will overwrite the previous definition.
- Reduced Motion: Users with `prefers-reduced-motion: reduce` will see greatly reduced animation durations.
- Performance guard: Advanced animations will skip some effects on devices with `navigator.hardwareConcurrency < 4`.


## Quick Examples

### Include scripts
```html
<link rel="stylesheet" href="css/style.css" />
<script src="js/main.js"></script>
<script src="js/animations.js"></script>
```

### Trigger a success message after form submit
```html
<script>
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      showNotification('Thanks! We\'ll be in touch shortly.', 'success');
    });
  });
</script>
```

### Add counters
```html
<div class="stat-number">100+</div>
<div class="impact-number">75%</div>
```

### Add a hero particle background and animations
```html
<section class="hero">
  <h1 class="title-main">Hello, world</h1>
  <p class="hero-description">A descriptive subheading appears with a reveal.</p>
</section>
<script src="js/animations.js"></script>
```