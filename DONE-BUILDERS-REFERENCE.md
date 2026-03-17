# D One Builders Design Reference — Use This Exactly

## Key Design Patterns

### Overall Feel
- WHITE body, not colored sections. Alternates between `section-white` (#FFFFFF) and `section-gray` (#F9F9F9)
- NO dark hero. Hero is WHITE background with text left + image right (grid layout)
- Very clean, minimal. System font stack (system-ui, -apple-system, sans-serif)
- Max-width: 1280px container
- Section padding: 6rem 0
- Accent color is the ONLY pop — used sparingly on CTAs and eyebrows

### Nav (header)
- `position: sticky` (NOT fixed), white bg
- On scroll: subtle box-shadow + bottom border
- Logo left, nav links center (hidden mobile), CTA right
- Mobile: hamburger opens slide-in panel from RIGHT (not full-screen overlay)
- Pill buttons: `border-radius: 9999px`
- Nav links: 0.875rem, font-weight 500, gray-600 color

### Hero
- WHITE background (not full-bleed image!)
- Two-column grid: text left, image right
- Title: clamp(2.25rem, 5vw, 3.75rem), weight 600, line-height 1.1
- Subtitle in gray-500
- Description: 1.125rem, gray-600
- Pill CTA buttons below text
- Image: 4/3 aspect ratio, border-radius 1rem, overflow hidden
- NO overlay, NO gradient on hero image

### Trust Bar
- Below hero, gray-50 bg with top/bottom borders
- Simple flex row: "Licensed & Insured · 15+ Years · 5 Stars"
- Stars are tiny accent-colored SVGs
- Text: 0.875rem, gray-600

### Sections
- Alternate between section-white and section-gray
- Section header: eyebrow (accent color, 0.875rem, weight 500) → title → description
- section-header-flex: title left, "View All →" link right

### Project Cards (gallery)
- 16/10 aspect ratio images with border-radius 0.75rem
- On hover: image scale(1.05) with 0.5s transition
- Badge overlay top-left (white bg, pill shape, backdrop-filter blur)
- Title below image, location below that in gray-500
- Link appears on hover with arrow

### Testimonial Cards
- White bg, 1px gray-200 border, 0.75rem border-radius
- Star rating (accent-colored SVGs) at top
- Quote text in gray-600, 0.875rem
- Author at bottom with border-top divider
- Name bold, project/role in gray-500

### Process Steps
- 4-column grid on desktop
- Large number (3rem, gray-200 — very light)
- Title below, description below that
- Simple, no fancy effects

### CTA Section
- Dark background (gray-900)
- Centered text + pill buttons
- Clean, minimal

### Footer
- Gray-900 background
- 4-column grid: about/links/services/contact
- Headings: 0.75rem uppercase with letter-spacing
- Links: 0.875rem, gray-300
- Bottom bar: thin border-top, copyright + badges

### Scrolling Photo Bar
- Full-width overflow hidden
- Flex row of image cards (16rem wide, 11rem tall on desktop)
- CSS animation scroll-left 30s linear infinite
- Pause on hover
- Fade mask on edges

## Color System (adapted for Arrow of Light)
Instead of D One's orange accent:
- --accent: #d4a853 (warm gold)
- --accent-hover: #c4982f
- --accent-light: #fdf8ef
- Keep ALL grays the same as D One
- Primary dark for footer: #1a2e1a (forest green) instead of gray-900
