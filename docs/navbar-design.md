# Navigation Bar Design

**Last Updated:** 2025-12-29

---

## Design Philosophy

Inspired by **Instrument.com** and **Metalab.com**:
- **Not a traditional navbar** - more like a horizontal navigation panel
- **Minimal and clean** - let the work speak
- **Sticky on scroll** - always accessible
- **Brand gradient integration** - subtle active state highlighting

---

## Desktop Navigation (>= 1024px)

### Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  [01 LOGO]           WORK   IN-HOUSE▾   ABOUT   CONTACT        │
└─────────────────────────────────────────────────────────────────┘
```

### Structure

**Left Side:**
- **Logo**: Logo 3 - Stylized "01" mark on gradient background
- Image path: `/logos/zero-to-one/logo 3.png`
- Links to homepage (/)

**Right Side (Horizontal links):**
- **WORK** → `/work`
- **IN-HOUSE** (with dropdown) → `/in-house`
  - Dropdown on hover:
    - Products → `/in-house/products`
    - Companies → `/in-house/companies`
- **ABOUT** → `/about`
- **CONTACT** → `/contact`

### Styling

**Container:**
- Background: White with subtle shadow on scroll
- Height: 72px
- Padding: 0 48px
- Sticky position (top: 0)
- z-index: 100

**Logo:**
- Image: `/logos/zero-to-one/logo 3.png`
- Display size: 48px height (auto width to maintain aspect ratio)
- Hover: Slight scale (1.05) with smooth transition

**Navigation Links:**
- Font: Inter, 15px, 600 weight
- Color: #1a1a1a (default)
- Hover: Brand gradient text
- Active page: Gradient underline (2px thick)
- Letter spacing: 0.5px
- Uppercase

**Dropdown (IN-HOUSE):**
- Appears on hover with 200ms fade
- Background: White
- Border: 1px solid #e5e5e5
- Shadow: 0 4px 12px rgba(0,0,0,0.08)
- Padding: 12px 0
- Min-width: 180px
- Items:
  - Padding: 12px 20px
  - Hover: Light gray background (#f8f8f8)
  - Font: Inter, 14px, 500 weight

---

## Mobile Navigation (<= 1023px)

### Layout (Closed)

```
┌─────────────────────────────────────┐
│  [01 LOGO]                    [☰]  │
└─────────────────────────────────────┘
```

### Layout (Open)

```
┌─────────────────────────────────────┐
│  [01 LOGO]                    [✕]  │
├─────────────────────────────────────┤
│                                     │
│          WORK                       │
│                                     │
│          IN-HOUSE        [▾]        │
│            → Products               │
│            → Companies              │
│                                     │
│          ABOUT                      │
│                                     │
│          CONTACT                    │
│                                     │
└─────────────────────────────────────┘
```

### Structure

**Top Bar (always visible):**
- Logo (left)
- Hamburger menu icon (right)

**Full-screen Overlay (when open):**
- White background
- Centered navigation links (large touch targets)
- IN-HOUSE is collapsible (chevron indicates state)

### Styling

**Hamburger Icon:**
- Size: 24px × 24px
- 3 lines, 2px thick
- Color: #1a1a1a
- Animated to X when open

**Overlay:**
- Background: White
- Height: 100vh
- Width: 100vw
- Slide in from right (300ms ease)

**Mobile Links:**
- Font: Inter, 18px, 600 weight
- Color: #1a1a1a
- Padding: 20px 32px
- Touch target: Minimum 48px height
- Active page: Gradient background (subtle, 10% opacity)

**IN-HOUSE Submenu:**
- Initially collapsed
- Tap to expand/collapse
- Indented 24px when expanded
- Submenu items: 16px font, 500 weight

---

## Scroll Behavior

### Default State (Top of page)
- Background: Transparent or white (depends on hero design)
- No shadow
- Logo and links visible

### Scrolled State (After 50px scroll)
- Background: White (opaque)
- Shadow: 0 2px 8px rgba(0,0,0,0.06)
- Slight height reduction (from 80px to 64px) - optional

---

## Active State Indicators

### Current Page Highlighting

**Desktop:**
- Gradient underline (2px)
- Colors: #F11759 → #8333C5
- Width: 100% of link text
- Positioned 2px below text

**Mobile:**
- Gradient background (10% opacity)
- Full width of link container

---

## Accessibility

- **Keyboard navigation**: Tab through all links
- **Focus states**: 2px outline with brand gradient
- **Screen reader**: Proper aria labels for hamburger menu
- **Skip to content**: Hidden link for keyboard users

---

## Implementation Notes

### Component Structure (SvelteKit)

```
/src/lib/components/navigation/
├── Navigation.svelte          # Main component
├── DesktopNav.svelte         # Desktop-specific
├── MobileNav.svelte          # Mobile-specific
└── Dropdown.svelte           # IN-HOUSE dropdown
```

### CSS Organization

- Use Tailwind utilities for layout
- Custom CSS for animations and transitions
- Brand gradient as CSS variable
- Responsive breakpoints: 1024px

### State Management

- Track current route for active state
- Mobile menu open/closed state
- IN-HOUSE dropdown open state (desktop)
- IN-HOUSE collapsed/expanded state (mobile)

---

## Animation Details

### Desktop Dropdown
- Fade in: opacity 0 → 1 (200ms ease)
- Slight slide down: transform translateY(-8px) → translateY(0)

### Mobile Menu
- Slide from right: transform translateX(100%) → translateX(0) (300ms ease-out)
- Stagger link appearance: Each link fades in with 50ms delay

### Scroll Animation
- Shadow fade in: 200ms ease
- Height transition: 200ms ease (if implementing height reduction)

---

**Last Updated:** 2025-12-29
