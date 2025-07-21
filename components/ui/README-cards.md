# Enhanced Card Components System

## Overview

This document outlines the standardized card component system with subtle borders, hover effects, and consistent styling across the entire website.

## Available Card Components

### 1. EnhancedCard (`components/ui/enhanced-card.tsx`)

**Primary unified card component with multiple variants:**

- `variant="default"` - Standard card with medium borders
- `variant="subtle"` - Subtle borders with backdrop blur (recommended)
- `variant="spotlight"` - Mouse tracking spotlight effect
- `variant="gradient"` - Gradient background with enhanced styling
- `hover3d={true}` - Adds 3D tilt effect on hover
- `glowEffect={true}` - Adds subtle glow on hover

### 2. CardFlip (`components/mvpblocks/card-flip.tsx`)

**Enhanced flip card with subtle borders:**

- Semi-transparent borders (`border-border/20`)
- Smooth hover transitions
- Consistent content fitting
- Enhanced visual effects

### 3. DotCard (`components/mvpblocks/dot-card.tsx`)

**Dotted border card with variants:**

- `variant="default"` - Standard styling
- `variant="subtle"` - Recommended for most use cases
- `variant="minimal"` - Minimal styling for clean layouts

### 4. SpotlightCard (`components/ui/spotlight-card.tsx`)

**Mouse tracking spotlight effect:**

- Dynamic spotlight follows mouse movement
- Customizable spotlight color and size
- Subtle border animations

### 5. BentoGrid (`components/ui/bento-grid.tsx`)

**Enhanced bento grid cards:**

- Updated with subtle borders (`border-border/20`)
- Backdrop blur effects
- Smooth hover transitions

### 6. FeatureCard (`components/ui/feature-card.tsx`)

**Feature showcase cards:**

- Consistent with design system
- Primary color accents
- Subtle gradient overlays

## Border Standards

### Border Opacity Levels

- **Default state**: `border-border/20` (very subtle)
- **Hover state**: `border-border/40` (slightly more visible)
- **Active/Focus**: `border-border/60` (clearly visible)

### Background Standards

- **Subtle cards**: `bg-background/60 backdrop-blur-sm`
- **Hover enhancement**: `hover:bg-background/80`
- **Gradient overlays**: `from-primary/5 via-transparent to-primary/5`

## Usage Recommendations

### For Content Cards (Reviews, Features, etc.)

```tsx
<EnhancedCard variant="spotlight" className="p-6">
  {/* Content */}
</EnhancedCard>
```

### For Process/Step Cards

```tsx
<EnhancedCard variant="subtle" className="p-6">
  {/* Content */}
</EnhancedCard>
```

### For Interactive Feature Cards

```tsx
<CardFlip
  title="Feature Title"
  subtitle="Feature Subtitle"
  description="Feature description"
  features={["Feature 1", "Feature 2", "Feature 3", "Feature 4"]}
  icon={<Icon className="h-6 w-6 text-white" />}
/>
```

### For Grid Layouts

```tsx
<DotCard variant="subtle" className="p-6">
  {/* Content */}
</DotCard>
```

## Visual Consistency

All cards now follow these principles:

1. **Subtle borders** - Semi-transparent for modern look
2. **Backdrop blur** - Adds depth and sophistication
3. **Smooth transitions** - 300ms duration for all hover effects
4. **Consistent hover states** - Unified shadow and border changes
5. **Primary color accents** - Used sparingly for highlights
6. **Responsive design** - Works across all screen sizes

## Implementation Status

✅ **Updated Components:**

- EnhancedCard (new unified component)
- CardFlip (enhanced with subtle borders)
- DotCard (existing with variants)
- SpotlightCard (new mouse tracking)
- BentoGrid (enhanced borders)
- FeatureCard (consistent styling)
- GradientCard (subtle border updates)

✅ **Updated Pages:**

- Homepage (`app/page.tsx`)
- Analytics page (`app/(marketing)/features/analytics/page.tsx`)
- QR Codes page (`app/(marketing)/features/qr-codes/page.tsx`)

## Next Steps

1. Apply EnhancedCard to remaining pages
2. Update any remaining hardcoded card styles
3. Ensure all cards use consistent padding and spacing
4. Test across different screen sizes and themes
