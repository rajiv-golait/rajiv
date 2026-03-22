# Design System Document

## 1. Overview & Creative North Star
**Creative North Star: The Multiversal Fragment**

This design system is a rejection of the "clean, flat web." It is a high-impact, cinematic framework that treats the digital screen as a multi-layered comic book lithograph. Inspired by the chaotic beauty of the Spider-Verse, the system utilizes **Intentional Fragmentation**—breaking the traditional grid through staggered layouts, 3D extrusions, and Ben-Day dot textures. 

Unlike standard "modern" systems that rely on whitespace to create calm, this system uses **Tonal Depth and Kinetic Energy** to create an immersive experience. We don't just display information; we project it onto a deep-purple void, using neon light and halftone grit to give the UI physical soul and tactile presence.

---

## 2. Colors
The palette is built on a high-contrast relationship between a "void" background and neon-reactive surfaces.

### Core Palette
- **Primary Neon (`primary`):** `#ffb0ca` (Active/Interactive)
- **Secondary Neon (`secondary`):** `#c5c0ff` (Structural/Secondary)
- **Accent (`tertiary`):** `#e9c400` (Callouts/Warnings)
- **Background (`surface`):** `#12121f` (Deep purple-black void)
- **On-Surface (`on_surface`):** `#e3e0f3` (Text/Iconography)

### The "No-Line" Rule
Traditional 1px solid borders are strictly prohibited for sectioning. Structural boundaries must be defined through:
1. **Background Color Shifts:** Use `surface_container_low` vs. `surface_container_high` to define sections.
2. **Textural Halftones:** Use a Ben-Day dot pattern overlay to differentiate a sidebar from the main canvas.
3. **Hard Shadows:** Use the `primary_container` color as a flat, offset "block shadow" (4px-8px) behind containers rather than a line.

### Glass & Gradient Rule
To move beyond a static look, floating elements (like Modals or Nav bars) must use **Glassmorphism**.
- **Token:** `surface_container_highest` at 70% opacity.
- **Effect:** `backdrop-filter: blur(12px)`.
- **Gradients:** Use a subtle linear transition from `primary` to `primary_container` (e.g., `#ffb0ca` to `#ff479c`) for CTAs to simulate the glow of a neon sign.

---

## 3. Typography
Typography is the primary driver of the system's "Cinematic" feel. We use a three-tier hierarchy to balance readability with high-octane branding.

*   **Display & Headlines (Space Grotesk - Black 900):** Used for massive, 3D extruded titles. These should be treated as architectural elements. Set at `display-lg` (3.5rem) with tight letter-spacing.
*   **Comic SFX (Bangers):** Specifically reserved for "Captions," SFX markers, or "Hello my name is" stickers. This font brings the "Beyond the Spider-Verse" personality.
*   **Body & Utility (Inter - Medium/Regular):** The professional anchor. Use `body-md` for all standard reading. It provides a clean, neutral counterpoint to the aggressive headline styles.
*   **Technical Markers (JetBrains Mono):** Used for "metadata" (e.g., timestamps, version numbers, or small graph labels). It emphasizes a "technical/multiversal glitch" aesthetic.

---

## 4. Elevation & Depth
Depth in this system is not about soft lighting; it is about **Layered Physics**.

### The Layering Principle
Hierarchy is achieved by stacking `surface-container` tiers.
- **Base:** `surface` (#12121f)
- **Sectioning:** `surface_container_low` (#1a1a27)
- **Interactive Cards:** `surface_container_high` (#292936)
- **Floating/Active:** `surface_container_highest` (#343341)

### Ambient Shadows & Glitch Glows
When a "floating" effect is required, do not use grey. 
- **Shadow Token:** Use `secondary_container` (#3d06f2) at 15% opacity with a large spread (40px+) to create a "blue ambient glow" rather than a dark shadow.
- **The Ghost Border:** If a boundary is needed for accessibility, use `outline_variant` at 20% opacity. Forbid 100% opaque borders.

---

## 5. Components

### Buttons
- **Primary:** Solid `primary_container` with a `secondary` flat offset shadow (4px). On hover, the shadow "contracts" into the button.
- **Secondary:** Transparent background with a `secondary` "Ghost Border" and `on_surface` text.

### Cards & Panels
- **Standard:** Use `surface_container_low` with a 0px border-radius (`DEFAULT: 0px`).
- **Separation:** Forbid dividers. Use `spacing-8` (2rem) of vertical whitespace or a transition to a halftone texture background to separate content blocks.

### Comic Stickers (Captions)
- High-impact containers using the `tertiary` (Yellow) background with `Bangers` font. These should be rotated at 1-2 degrees to break the horizontal line of the UI.

### Input Fields
- Dark backgrounds (`surface_container_lowest`) with a thick 2px bottom-border using `primary`. No top or side borders. Technical labels in `JetBrains Mono`.

---

## 6. Do's and Don'ts

### Do:
- **Use Halftone Overlays:** Apply subtle dot textures to large background areas to avoid a "flat" digital feel.
- **Embrace Asymmetry:** Offset images and text blocks. If a card is on the left, its caption should be slightly higher and to the right.
- **Duotone Imagery:** All photography should be treated with a `primary` to `secondary` duotone filter to ensure visual integration with the palette.

### Don't:
- **No Rounded Corners:** The `Roundedness Scale` is strictly `0px`. Everything is hard-edged and sharp.
- **No Standard Grey Shadows:** If it needs a shadow, it needs a color. Use tinted blues or pinks.
- **No Generic Dividers:** Never use a horizontal line to separate content. Use a background shift or a "glitch" particle spray effect (using the dissolving particle DNA).
- **No Centered Compositions:** Avoid "Bootstrap-style" centering. Keep layouts leaning to the left or right to maintain a dynamic, comic-panel energy.