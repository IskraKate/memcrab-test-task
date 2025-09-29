# Matrix Builder & Analyzer

An interactive React app for creating and analyzing matrices.  
You can add rows and columns, increment values, highlight nearest cells, and view statistics such as percentiles.

---

## 🚀 Features

- **Dynamic matrix creation**  
  Add/remove rows and columns, and increment cell values with a single click.

- **Highlight nearest cells**  
  Hover over a cell to highlight its nearest neighbors.

- **Row insights**  
  - Row sum  
  - Percentage of each cell relative to row sum  
  - Gradient backgrounds showing percentage of row max

- **Column insights**  
  - 60th percentile values displayed in the footer

- **Delete rows with confirmation**  
  Safe deletion via a confirmation dialog.

---

## 🛠️ Tech Stack

- **React 19**
- **React Compiler**
- **TypeScript**  
- **CSS Modules** for scoped styling  
- **Hooks & Context** for state management (`useMatrix`)

