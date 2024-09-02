---
'@subifinancial/subi-connect': patch
---

### TL;DR

- Added a CustomLink component and updated the components map and CSS styles.
- Improved domain input component styling.

### What changed?

- Created a new `CustomLink` component in `custom-link.tsx`
    - Added `CustomLink` to the `otherComponentsMap` in `components-map.tsx`
- Modified the CSS in `index.css` to apply the font-family directly to the `.subi-connect` class instead of all its children
- Modified the styling of the domain input component:
    -  Changed the overflow property from clip to visible for the main container
    - Updated the styling for the subdomain display, improving responsiveness and scroll behaviour