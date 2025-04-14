# Modern Footwear Design System v2.1

## Typography Hierarchy
```css
:root {
  /* Cấp 1 - Heading */
  --font-size-h1: 3rem;
  --font-size-h2: 2.25rem;
  --font-size-h3: 1.75rem;
  
  /* Cấp 2 - Subheading */
  --font-size-subtitle: 1.5rem;
  
  /* Cấp 3 - Body */
  --font-size-body: 1rem;
  --font-size-small: 0.875rem;
}
```

## Color System
```css
:root {
  /* Primary */
  --nike-black: #111111;
  --nike-white: #ffffff;
  
  /* Accent */
  --nike-orange: #ff6b35;
  
  /* Neutrals */
  --nike-gray-800: #2d2d2d;
  --nike-gray-500: #757575;
  --nike-gray-100: #f5f5f5;
  
  /* Semantic */
  --nike-error: #dc2626;
  --nike-success: #16a34a;
}
```

## Breakpoints
```css
:root {
  --screen-mobile: 375px;
  --screen-tablet: 768px;
  --screen-desktop: 1440px;
}
```

## Interaction Patterns

### Loading States
- Sử dụng component SkeletonLoader cho các trạng thái tải
- Animation: Pulse effect với duration 300ms

### Hover Effects
- HoverCard implementation cho product previews
- Transition timing: ease-in-out 300ms

## Radix Components Checklist
- [x] DropdownMenu
- [x] Accordion
- [x] AspectRatio
- [ ] ScrollArea
- [x] Skeleton
- [x] HoverCard
- [x] Avatar
- [ ] Dialog
- [ ] Popover
- [ ] Alert Dialog
- [ ] Toast
- [ ] Checkbox
- [x] Navigation Menu
- [ ] Progess
- [ ] Radio Group
- [ ] Slider
- [ ] Switch
- [ ] Tabs
- [ ] Tooltip
- [x] Select

