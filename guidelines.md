# Coding Guidelines

### Naming


1. frontend - camelCase for variables, functions etc.
2. database - kebab_case for tables, columns etc.
3. functions - use active names: doSomething over descriptive names (e.g. clickFn)
4. event props - use onEvent (e.g.onClick)

### Rules of thumb


1. API calls should be done from contexts, not components
2. Functions should be kept short (up to 7 operations) and do a single thing
3. Components should be kept short (up to 150 lines of code) and have a single concern
4. Low level functions should be placed in utils

### Styling


1. Use global styles (theme.tsx) for borders, colors, typography, default radius, default component styling
2. Prefer using variants from theme rather than styling every component from scratch
3. Implement styling from Zeplin, not css. In most cases, copying css directly from Zeplin would result in less readable and more complex code
4. colors - prefer using colors from theme in components, e.g. color=”primary”. Don’t fixate component colors in theme.tsx
5. Margins, padding, and spacing - use spacing factor of 4px (i.e. multiples of 4px). Prefer using MUI’s implementation whenever possible. Examples:

   
   1. margin={1}
   2. marginY={1}
   3. spacing={1}
6. Stack - prefer spacing over gap, as it works with MUI’s factor, whereas gap does not
7. Custom styling of component -

   
   1. when there are up to 4 customizations: use sx prop (prefer over style prop)
   2. when there are more than 4 customizations: create a styled component
8. If there are more than 10 customizations - ask yourself if there’s any redundant code or if some styling should be inherited from theme

#### Conflicts with Zeplin


1. Whenever there are conflicts between the guidelines and the Zeplin, there’s room for “hunch”
2. When it comes to spacing: stick to the spacing factor of 4px
3. When it comes to typography:

   
   1. Text styles should be consistent. Hence, prefer using a variant from the theme.
   2. Whenever there’s a recurring text styling that does not exist in the theme - add a new typography variant (maximum 10 variants in the theme)

### Structure


1. Write simple components directly under components or views
2. When a component file gets to long (for example if many styled components are needed), split into separate files and nest under components/MyComponent/


