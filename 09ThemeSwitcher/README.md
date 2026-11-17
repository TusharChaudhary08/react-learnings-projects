# 09 - Theme Switcher – React Context API

A React application that demonstrates how to implement light and dark themes using the Context API, React Hooks and Tailwind CSS.

The application allows users to switch between light and dark themes using a toggle button. The selected theme is managed in the main App component and shared with child components through React Context.

## Features

- Toggle between light and dark themes.
- Manage the selected theme using React state.
- Share theme information across components using Context API.
- Apply theme classes to the root HTML element.
- Use Tailwind CSS dark variants to change component styling.
- Separate application logic into reusable components.

## Concepts Practised

### 1. React Context API

Learned how to create and use Context to share data between components without passing props through every intermediate component.

- Creating a context using `createContext()`.
- Understanding the role of `Context.Provider`.
- Passing shared data through the Provider's `value` prop.
- Understanding how Context helps avoid prop drilling.

### 2. useContext Hook

Practised accessing shared Context values using `useContext()`.

Created a custom `useTheme()` hook to access the theme context from components.

This allows components to access the current theme and theme-changing functions without receiving them through props.

### 3. Context Provider and State Sharing

Managed the theme state in `App.jsx` and shared it with child components through `ThemeContextProvider`.

The Provider shares three values:

- `themeMode`: Current theme.
- `lightTheme`: Function to activate light mode.
- `darkTheme`: Function to activate dark mode.

Understood how a component can update state owned by another component by calling a function shared through Context.

### 4. Custom Hooks

Created a reusable custom hook named `useTheme()`.

- Encapsulated Context access inside a reusable function.
- Used `useContext()` inside a custom hook.
- Accessed shared theme values from different components.

### 5. useState Hook

Used `useState()` to maintain the current theme.

The initial value is `"light"`. The `setThemeMode()` function updates the theme when the user selects a different option.

Learned how state changes trigger React re-renders and how updated state values are shared through Context.

### 6. useEffect Hook and DOM Manipulation

Used `useEffect()` to synchronize React theme state with the actual HTML document.

- Selected the root HTML element using `document.querySelector()`.
- Removed previously applied theme classes using `classList.remove()`.
- Added the current theme class using `classList.add()`.
- Used `themeMode` as a dependency to run the effect whenever the theme changes.

### 7. Controlled Components and Event Handling

Created a checkbox-based theme toggle.

- Used `onChange` to detect user interaction.
- Read the checkbox state using `e.currentTarget.checked`.
- Used the `checked` prop to control the checkbox through React state.
- Called the appropriate theme-changing function based on the checkbox value.

### 8. Tailwind CSS Dark Mode

Configured Tailwind CSS dark mode using a custom dark variant.

```css
@custom-variant dark (&:where(.dark, .dark *));
```

Practised using Tailwind's `dark:` utility classes to change backgrounds, text colors and borders depending on the active theme.

### 9. Component-Based Architecture

Separated the application into smaller components and context logic.

- `App.jsx`: Manages theme state and provides Context.
- `ThemeButton.jsx`: Handles the theme toggle interaction.
- `Card.jsx`: Displays the sample product card.
- `Context/themes.js`: Creates the theme context and custom hook.

## Project Structure

```text
ThemeSwitcher/
├── public/
├── src/
│   ├── Component/
│   │   ├── Card.jsx
│   │   └── ThemeButton.jsx
│   ├── Context/
│   │   └── themes.js
│   ├── assets/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## Technologies Used

- React 19
- JavaScript
- JSX
- Tailwind CSS 4
- Vite

## Getting Started

Install the project dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## Learning Outcome

This project helped me understand how React Context API works and how it can be used to share state and functions between components without prop drilling.

It also provided practical experience with `useState`, `useEffect`, `useContext`, custom hooks, controlled components, DOM manipulation and Tailwind CSS dark mode.

The project demonstrates how a shared state managed in a parent component can control the appearance and behavior of multiple child components.