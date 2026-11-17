# 04 - Background Changer – React

A simple background color changer application built using React and Tailwind CSS. This project demonstrates how React state can be used to manage changing values and dynamically update the user interface based on user interactions.

## Features

- Full-screen background color display.
- Five selectable background colors.
- Instant background updates without page refreshes.
- Interactive color selection buttons.
- Responsive layout using Tailwind CSS utilities.

## Concepts Practised

### 1. React useState Hook

The `useState` hook is used to store and manage the currently selected background color.

```jsx
const [color, setcolor] = useState('#8EC5FF');
```

- `color` stores the current background color.
- `setcolor` is the function used to update the state.
- `'#8EC5FF'` is the initial state value.

When a user selects another color, the state is updated through `setcolor()`. React then re-renders the component with the updated value.

### 2. Dynamic Styling in React

React allows CSS styles to be controlled dynamically using the `style` prop.

```jsx
<div style={{ backgroundColor: color }}>
```

Here, the background color is not hardcoded. Instead, it receives its value from the React state variable `color`.

Whenever the state changes, the background color updates automatically.

This demonstrates how JavaScript values can control the appearance of React elements.

### 3. Event Handling with onClick

The `onClick` event is used to detect when a user clicks a color selection button.

```jsx
onClick={() => setcolor("#FB64B6")}
```

When clicked, the arrow function executes and passes the selected color to the state setter function.

Each color option uses the same approach but provides a different color value.

### 4. State Updates and Component Re-rendering

This project demonstrates the relationship between state changes and React rendering.

The process works as follows:

1. The user clicks a color option.
2. The `onClick` handler executes.
3. The state setter function updates the color.
4. React schedules a component re-render.
5. The updated color value is applied to the background.

This is an example of declarative UI development, where the interface reflects the current application state.

### 5. JSX and JavaScript Expressions

JSX allows JavaScript expressions to be embedded inside markup using curly braces.

This project uses JavaScript expressions in:
- The `style` prop to apply dynamic background colors.
- The `onClick` prop to execute event handlers.

It demonstrates how React combines JavaScript logic with UI elements.

### 6. Tailwind CSS

Tailwind CSS is used to design the application without writing separate CSS rules for every element.

Some utility classes used in this project:

- `h-screen` – Sets the element height to the full viewport height.
- `w-screen` – Sets the element width to the full viewport width.
- `flex` – Creates a flexbox layout.
- `justify-center` – Centers content along the horizontal axis.
- `items-end` – Aligns content at the bottom.
- `rounded-2xl` – Applies rounded corners.
- `shadow-xl` – Adds a large shadow.
- `active:scale-95` – Scales an element slightly when it is pressed.

The application also uses custom background colors through Tailwind's arbitrary value syntax.

## How the Application Works

1. The application initializes the background color with `#8EC5FF`.
2. React renders the full-screen container using the current color state.
3. The user selects one of the available color options.
4. The click event calls `setcolor()` with the selected color.
5. React updates the state and re-renders the component.
6. The background changes to the newly selected color.

## Technologies Used

- React 19
- JavaScript
- JSX
- Tailwind CSS 4
- Vite

## Project Structure

```text
04backgroundchanger/
├── public/
├── src/
│   ├── assets/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## Getting Started

Install project dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## Learning Objective

The main objective of this project was to understand how React state controls the user interface.

It provides practical experience with the `useState` hook, event handling, dynamic inline styling, JSX expressions, and component re-rendering.

The project also introduces Tailwind CSS for building layouts and styling interactive elements.