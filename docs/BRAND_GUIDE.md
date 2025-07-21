# Linkify AI Brand Guide

## Brand Identity

**Name:** Linkify AI  
**Tagline:** Transform your content with AI-powered blog generation  
**Description:** Convert your video or audio into a Blog Post in seconds with the power of AI!

## Logo Usage

### Primary Logo

- **File:** `/icons/linkify-logo.svg`
- **Usage:** Primary brand mark for most applications
- **Minimum Size:** 24px
- **Clear Space:** 16px on all sides

### Wordmark

- **File:** `/icons/linkify-wordmark.svg`
- **Usage:** Horizontal layouts, headers, and navigation
- **Minimum Size:** 120px width
- **Clear Space:** 16px on all sides

### Favicon

- **File:** `/favicon.svg`
- **Usage:** Browser tabs, bookmarks, and app icons
- **Size:** 32x32px (scalable SVG)

## Color Palette

### Primary Colors

```css
/* Linkify Blue */
--linkify-50: #f0f9ff
--linkify-100: #e0f2fe
--linkify-200: #bae6fd
--linkify-300: #7dd3fc
--linkify-400: #38bdf8
--linkify-500: #0ea5e9  /* Primary Brand Color */
--linkify-600: #0284c7
--linkify-700: #0369a1
--linkify-800: #075985
--linkify-900: #0c4a6e
--linkify-950: #082f49
```

### Secondary Colors

```css
/* Neutral Grays */
--secondary-50: #f8fafc
--secondary-100: #f1f5f9
--secondary-200: #e2e8f0
--secondary-300: #cbd5e1
--secondary-400: #94a3b8
--secondary-500: #64748b
--secondary-600: #475569  /* Secondary Brand Color */
--secondary-700: #334155
--secondary-800: #1e293b
--secondary-900: #0f172a
--secondary-950: #020617
```

### Semantic Colors

- **Success:** #10b981 (Green)
- **Warning:** #f59e0b (Orange)
- **Error:** #ef4444 (Red)
- **Info:** #0ea5e9 (Linkify Blue)

## Typography

### Font Families

- **Headings:** Aeonik Pro, Inter, system-ui, sans-serif
- **Body Text:** Inter, system-ui, sans-serif
- **Monospace:** JetBrains Mono, Menlo, Monaco, monospace

### Font Weights

- **Thin:** 100
- **Light:** 300
- **Normal:** 400
- **Medium:** 500
- **Semibold:** 600
- **Bold:** 700
- **Extrabold:** 800
- **Black:** 900

### Font Sizes

- **xs:** 0.75rem (12px)
- **sm:** 0.875rem (14px)
- **base:** 1rem (16px)
- **lg:** 1.125rem (18px)
- **xl:** 1.25rem (20px)
- **2xl:** 1.5rem (24px)
- **3xl:** 1.875rem (30px)
- **4xl:** 2.25rem (36px)
- **5xl:** 3rem (48px)
- **6xl:** 3.75rem (60px)
- **7xl:** 4.5rem (72px)

## Component Usage

### Buttons

```tsx
// Primary button with brand styling
<BrandButton brandVariant="primary">Get Started</BrandButton>

// Secondary button with brand styling
<BrandButton brandVariant="secondary">Learn More</BrandButton>

// Gradient button for special actions
<BrandButton brandVariant="gradient">Start Creating</BrandButton>
```

### Cards

```tsx
// Default card
<BrandCard brandVariant="default">Content</BrandCard>

// Elevated card with shadow
<BrandCard brandVariant="elevated">Content</BrandCard>

// Branded card with gradient
<BrandCard brandVariant="branded">Content</BrandCard>
```

### Logo

```tsx
// Primary logo with text
<BrandLogo size="md" showText />

// Wordmark for headers
<BrandLogo variant="wordmark" />

// Small logo for compact spaces
<BrandLogo size="sm" />
```

## CSS Utility Classes

### Gradients

- `.linkify-gradient` - Primary brand gradient background
- `.linkify-gradient-text` - Gradient text effect
- `.linkify-border-gradient` - Gradient border

### Shadows

- `.linkify-shadow` - Subtle brand-colored shadow
- `.linkify-glow` - Glowing effect for emphasis

### Colors

- `.text-linkify-500` - Primary brand text color
- `.bg-linkify-500` - Primary brand background
- `.border-linkify-500` - Primary brand border

## Brand Guidelines

### Do's

✅ Use the primary logo on light backgrounds  
✅ Use the wordmark for horizontal layouts  
✅ Maintain minimum clear space around logos  
✅ Use consistent color palette across all materials  
✅ Follow typography hierarchy guidelines  
✅ Ensure proper contrast ratios for accessibility

### Don'ts

❌ Don't modify logo colors or proportions  
❌ Don't use logos smaller than minimum size  
❌ Don't place logos on busy backgrounds without proper contrast  
❌ Don't mix different font families within the same context  
❌ Don't use colors outside the defined palette  
❌ Don't ignore accessibility guidelines

## Implementation

### Using Brand Components

```tsx
import { BrandLogo, BrandButton, BrandCard } from "@/components/brand";
import { LINKIFY_BRAND, brandClasses } from "@/utils/constants/brand";

// Access brand information
const brandName = LINKIFY_BRAND.name;
const brandTagline = LINKIFY_BRAND.tagline;

// Use brand utility classes
<div className={brandClasses.gradient.primary}>
  <BrandLogo showText />
</div>;
```

### CSS Variables

The brand colors are available as CSS variables:

```css
.my-component {
  background-color: hsl(var(--linkify-primary));
  color: hsl(var(--linkify-primary-foreground));
}
```

### Tailwind Classes

Brand colors are integrated into Tailwind:

```html
<div class="bg-linkify-500 text-white">
  <h1 class="text-linkify-600">Heading</h1>
</div>
```

## Accessibility

### Color Contrast

- Primary blue (#0ea5e9) meets WCAG AA standards on white backgrounds
- Secondary gray (#475569) meets WCAG AAA standards for body text
- Always test color combinations for proper contrast ratios

### Typography

- Minimum font size: 14px for body text
- Maintain proper line height (1.5 for body text)
- Use semantic HTML elements for proper structure

### Interactive Elements

- Ensure focus states are visible and accessible
- Provide sufficient touch target sizes (minimum 44px)
- Use proper ARIA labels and descriptions

## File Structure

```
components/brand/
├── brand-logo.tsx      # Logo component
├── brand-button.tsx    # Button component
├── brand-card.tsx      # Card component
└── index.ts           # Exports

utils/constants/
├── brand.ts           # Brand configuration
├── design-tokens.ts   # Design system tokens
└── theme.ts          # Theme configuration

public/icons/
├── linkify-logo.svg      # Primary logo
├── linkify-wordmark.svg  # Wordmark
└── favicon.svg          # Favicon
```

## Contact

For questions about brand usage or to request brand assets, please contact the design team or refer to the brand component documentation in the codebase.
