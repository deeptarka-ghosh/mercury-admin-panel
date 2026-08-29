---
version: alpha
name: "Mercury Backoffice"
description: "A calm, textile-aware operating desk for an India-based clothing brand."
colors:
  primary: "#244A3A"
  primaryHover: "#19382B"
  accent: "#C45832"
  accentSoft: "#F7E8E1"
  background: "#F7F7F3"
  surface: "#FFFFFF"
  surfaceMuted: "#EFF1EB"
  text: "#20241F"
  textMuted: "#667066"
  border: "#DDE1D8"
  success: "#2F6B49"
  warning: "#A45E12"
  danger: "#B43B36"
  focus: "#2A6F9B"
typography:
  display:
    fontFamily: "Newsreader, Georgia, serif"
  sans:
    fontFamily: "DM Sans, system-ui, sans-serif"
  mono:
    fontFamily: "ui-monospace, SFMono-Regular, Consolas, monospace"
rounded:
  DEFAULT: "0.75rem"
  sm: "0.5rem"
  md: "0.75rem"
  lg: "1.125rem"
spacing:
  unit: "0.25rem"
  section-gap: "2rem"
  page-max: "100rem"
components:
  button: {}
  card: {}
  dialog: {}
  table: {}
  input: {}
---

# Mercury Backoffice Design System

## Overview

### Creative North Star

The interface takes its cue from a clothing studio's cutting table: pale working surfaces, charcoal annotations, forest-green tools, and one terracotta selvedge thread that helps orient the operator. It should feel precise and tactile, never rustic or decorative.

### Product context and register

- **Audience and primary job:** Owners and operators of one Indian clothing brand managing catalog, stock, orders, customers, and staff.
- **Target market:** India, established by the product brief and Mercury backend roadmap.
- **Locale:** English for India (`en-IN`), INR, and Asia/Kolkata.
- **Usage scene:** Frequent desktop use with occasional tablet or phone access; medium-to-high information density.
- **Register:** Product UI. Task clarity wins over brand theatre.
- **Memorable signature:** A slim terracotta selvedge line anchors the selected navigation item and activity timeline.
- **Restraint:** Tables, forms, dialogs, and permission states remain familiar Material patterns.
- **Anti-references:** Generic cobalt admin templates, gradient KPI tiles, glassmorphism, and fashion-editorial layouts that reduce operational readability.
- **Token ownership:** Runtime MUI theme in `src/theme.ts` is canonical; this document mirrors accepted values and explains their use.

## Colors

Forest green is the primary action and navigation colour. Terracotta is expressive and reserved for orientation, not routine buttons. Off-white separates the working canvas from white data surfaces. Semantic colours always include text or icon support.

## Typography

DM Sans owns controls, prose, and dense data. Newsreader is used sparingly for the wordmark and high-level page statements, adding the clothing-studio character without turning the product into a magazine. Tabular figures use aligned numerals.

## Layout

A 256px persistent rail supports frequent desktop navigation. Main content has a compact top bar and a flexible workspace. At narrow widths the rail becomes a modal drawer. Tables scroll horizontally rather than silently dropping operational columns.

## Elevation & Depth

Borders and tonal surfaces provide most hierarchy. Shadows are reserved for overlays and the login card. Static dashboard and table surfaces remain nearly flat.

## Shapes

Controls use 8–12px radii; larger containers use 18px. Pills are limited to statuses and small filters. Thin dividers reference garment pattern lines.

## Components

### Foundational visual states

All controls define hover, focus-visible, active, disabled, and busy states. Loading uses a stable circular progress region. Reduced motion removes transforms and shortens fades.

### Buttons and actions

Primary safe actions are solid forest. Neutral actions are outlined or text. Archive is warning-toned; irreversible deletion is danger-toned and only appears in confirmation contexts.

### Navigation and data display

The selected navigation item carries the terracotta selvedge line. Data tables use comfortable 52px rows, semantic headers, stable pagination, and horizontal overflow on small screens.

### Forms and overlays

Fields use persistent labels and inline errors. Auth secrets are masked with a reveal control. MUI owns authored selects, dialogs, drawers, tooltips, and toasts.

### Iconography

Material Symbols via MUI icons, outlined by default. Icon-only controls retain accessible names and tooltips.

### Motion

One restrained page entrance may fade and lift the primary content. Routine table refreshes do not reanimate rows. Reduced-motion mode disables transforms.

### Content and data visualization

Use plain operational language: “Add product”, “Save changes”, and “Publish”. Money uses `en-IN` and INR formatting. Charts always provide textual totals.

## Do's and Don'ts

- **Do:** Keep important inventory and order exceptions visible and actionable.
- **Do:** Use the same labels and feedback for equivalent operations.
- **Don't:** use terracotta for every call to action.
- **Don't:** trade data density or accessibility for editorial fashion styling.
