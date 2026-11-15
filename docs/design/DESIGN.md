---
name: Slate
colors:
  surface: '#FFFFFF'
  surface-dim: '#d9d9e0'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3fa'
  surface-container: '#ededf4'
  surface-container-high: '#e8e7ee'
  surface-container-highest: '#e2e2e9'
  on-surface: '#1a1b20'
  on-surface-variant: '#434751'
  inverse-surface: '#2f3036'
  inverse-on-surface: '#f0f0f7'
  outline: '#737782'
  outline-variant: '#c3c6d3'
  surface-tint: '#305da7'
  primary: '#002a5e'
  on-primary: '#ffffff'
  primary-container: '#003f88'
  on-primary-container: '#84adfd'
  inverse-primary: '#acc7ff'
  secondary: '#505f76'
  on-secondary: '#ffffff'
  secondary-container: '#d0e1fb'
  on-secondary-container: '#54647a'
  tertiary: '#4f1b00'
  on-tertiary: '#ffffff'
  tertiary-container: '#732b00'
  on-tertiary-container: '#fb9361'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d7e2ff'
  primary-fixed-dim: '#acc7ff'
  on-primary-fixed: '#001a40'
  on-primary-fixed-variant: '#0d458e'
  secondary-fixed: '#d3e4fe'
  secondary-fixed-dim: '#b7c8e1'
  on-secondary-fixed: '#0b1c30'
  on-secondary-fixed-variant: '#38485d'
  tertiary-fixed: '#ffdbcc'
  tertiary-fixed-dim: '#ffb695'
  on-tertiary-fixed: '#351000'
  on-tertiary-fixed-variant: '#7a3004'
  background: '#F8FAFC'
  on-background: '#1a1b20'
  surface-variant: '#e2e2e9'
  primary-text: '#1E293B'
  secondary-text: '#64748B'
  border: '#E2E8F0'
  primary-hover: '#00336E'
  primary-subtle: '#EAF1F9'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 16px
  margin: 24px
  space-xs: 4px
  space-sm: 8px
  space-md: 16px
  space-lg: 24px
  space-xl: 32px
---

## Brand & Style

This design system establishes a clean, professional, and highly functional environment tailored for productivity applications. The guiding north star is "Clarity Over Decoration," prioritizing information hierarchy, readability, and functional efficiency above all aesthetic ornamentation. 

The visual style is grounded in **Corporate / Modern** principles with a restrained, neutral-first approach. It rejects artificial complexity, gradients, and decorative noise in favor of dependable utility, predictable interactions, and high information density suited for real-world professional tasks.

## Colors

The color architecture is neutral-first and blue-accented, using deliberate contrast to guide user attention without overwhelming the interface. White and cool neutral grays form the canvas and structural surfaces, while deep blue (`#003F88`) is strictly reserved for primary actions, active navigation states, and crucial interactive elements. 

- **Primary (`#003F88`):** Deep blue for core actions and active states.
- **Background (`#F8FAFC`):** Soft neutral gray canvas.
- **Surface (`#FFFFFF`):** Pure white for cards, tables, and content containers.
- **Primary Text (`#1E293B`):** Dark slate for high-readability headings and essential content.
- **Secondary Text (`#64748B`):** Muted slate for metadata and descriptions.
- **Border (`#E2E8F0`):** Precise light gray for subtle component separation.

## Typography

Typography relies entirely on **Inter** to deliver a neutral, highly legible, and systematic reading experience. Headings utilize Semibold (600) weights for clear structural hierarchy, while body text and labels rely on Regular (400) and Medium (500) weights. 

Font sizes are kept within a functional 14–16px body range to optimize information density. Avoid oversized headings, decorative fonts, unnecessary uppercase labels, and excessive bold styling.

## Layout & Spacing

The layout model is built on a strict **8px spacing system**, ensuring consistent vertical and horizontal rhythms across all screens. A structured grid approach is paired with fixed sidebars and headers for authenticated productivity views. 

Information density is prioritized to keep important actions and records immediately visible without excessive empty whitespace or decorative padding. Group related information logically using clean borders and structured tables rather than isolated floating cards.

## Elevation & Depth

Elevation is handled with extreme restraint, relying on crisp 1px borders (`#E2E8F0`) and background separation rather than heavy or colorful shadows. 

When absolute separation is required—such as for floating dropdowns or active modals—apply a minimal, highly diffused shadow (`0 2px 8px rgba(15, 23, 42, 0.04)`). Avoid glassmorphism, blur effects, glowing borders, and layered decorative surfaces entirely.

## Shapes

The shape language favors subtle, professional rounding to soften rectangular boundaries without sacrificing structural rigidity. 

UI elements such as inputs, buttons, and small containers utilize a tight 6px to 8px border radius (`rounded-md`). Avoid pill-shaped components, overly exaggerated curves, or sharp 0px corners unless mandated by specific data-grid layouts.

## Components

Components are built for directness, predictability, and rapid task execution.

- **Buttons:** Primary buttons feature a solid `#003F88` background with white text and a hover state of `#00336E`. Secondary buttons use a white background with a 1px neutral border. Border-radius is strictly 6–8px.
- **Cards:** Constructed with a pure white background, subtle 1px border, 8px radius, and 16–20px internal padding.
- **Input Fields:** White background, 1px neutral border (`#E2E8F0`), 6px radius, and a subtle blue focus ring.
- **Tables:** Feature clean rows, subtle horizontal separators, and restrained header styling. Avoid colored cells unless communicating critical status.
- **Sidebar:** Simple, predictable navigation featuring consistent outline icons and a pale blue active state (`#EAF1F9`).
- **Modals:** Contain focused content, a clear title, necessary form fields, and explicit primary/secondary action buttons.
- **Badges:** Small, muted indicators used strictly for meaningful statuses without loud background fills.