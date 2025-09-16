# Typography System Documentation

This directory contains the complete typography system for the Gault&Millau website, organized according to Next.js best practices.

## Structure

```
app/styles/typography/
├── index.css           # Main typography file with utility classes
├── bottle.css          # Bottle/wine card typography
├── buttons.css         # Button typography variants
├── cards.css           # Card component typography
├── filters.css         # Filter and search typography
├── footer.css          # Footer typography
├── navigation.css      # Menu and navigation typography
├── news.css            # News and blog typography
├── pages.css           # Page layout typography
├── products.css        # Product and recipe typography
├── ratings.css         # Rating and notation typography
├── specialty.css       # Specialty sections typography
```

## Font Families Used

- **Montserrat**: Primary sans-serif font for most UI elements
- **Source Serif 4**: Primary serif font for headings and titles
- **Arial**: Fallback and specific external integrations
- **Roboto**: External integrations (TheFork)

## Usage

### CSS Variables
All typography variables are available globally and follow the naming convention:
```css
--{component}-{element}-{property}
```

Examples:
```css
--card-title-font-family
--button-text-font-size
--page-detail-title-line-height
```

### Utility Classes
Pre-built utility classes are available for common typography patterns:

```css
.text-card-title        /* Card titles */
.text-page-title        /* Page main titles */
.text-news-title        /* News article titles */
.text-button            /* Button text */
.text-filter-title      /* Filter section titles */
.text-footer-link       /* Footer links */
.text-search-box        /* Search input text */
```

### Custom Component Usage
For React components, you can use the CSS variables directly:

```tsx
// Using CSS variables in styled components
const Title = styled.h1`
  font-family: var(--card-title-font-family);
  font-size: var(--card-title-font-size);
  font-weight: var(--card-title-font-weight);
  line-height: var(--card-title-line-height);
`;

// Using utility classes
<h1 className="text-card-title">My Title</h1>

// Using CSS modules with variables
.title {
  font: var(--card-title-font-weight) var(--card-title-font-size)/var(--card-title-line-height) var(--card-title-font-family);
}
```

## Typography Categories

### Cards
- Card titles (Source Serif 4, 24px, 900 weight)
- Card details and values (Montserrat, various sizes)
- Card horizontal layouts
- Small map cards

### Buttons
- Button labels and text (Montserrat, 13px, various weights)
- Establishment and people buttons
- Category buttons

### News & Content
- News titles (Source Serif 4, 27px, 900 weight)
- Article text (Montserrat, 14px, 500 weight)
- Categories and themes

### Page Elements
- Main page titles (Source Serif 4, 40px, 900 weight)
- Sub-titles and descriptions
- Vertical labels and values

### Filters & Search
- Filter titles and labels (Montserrat, various sizes)
- Search input text
- Filter counts and values

### Ratings & Notations
- Rating text and legends (Montserrat, various sizes)
- Toque ratings
- Hotel notes

## Responsive Considerations

The typography system uses fixed pixel values as defined in the design system. For responsive designs, consider:

1. Using CSS clamp() for fluid typography
2. Creating responsive variants of utility classes
3. Implementing breakpoint-specific overrides

## Maintenance

When adding new typography styles:

1. Add CSS variables to the appropriate category file
2. Update the utility classes in `index.css` if needed
3. Update this documentation
4. Test across different components and pages
