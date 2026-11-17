# 02 - Simple Counter – React

A beginner-friendly counter application built with React to understand state management and event handling.

## Features

- Increment the counter using the Add Value button.
- Decrement the counter using the Remove Value button.
- Counter value cannot go below 0.
- Counter value cannot exceed 20.
- Counter display updates automatically when the state changes.

## Concepts Practised

### 1. useState Hook
- Using the `useState` hook to create state.
- Initializing state with a value of 0.
- Updating state using the state setter function.

### 2. State Management and Re-rendering
- Understanding how React manages component state.
- Learning how state changes trigger component re-rendering.
- Displaying updated state values in the UI.

### 3. Event Handling
- Using the `onClick` event to handle button clicks.
- Connecting button interactions with JavaScript functions.
- Creating separate functions for incrementing and decrementing the counter.

### 4. Conditional Logic
- Using `if-else` statements to control counter values.
- Setting a maximum limit of 20.
- Preventing the counter from becoming negative.

### 5. JSX and Dynamic Rendering
- Displaying JavaScript variables inside JSX using curly braces.
- Dynamically showing the current counter value.

### 6. Functional Components
- Creating the application using a functional component.
- Exporting the component using `export default`.

## Technologies Used

- React
- JavaScript
- JSX
- Vite
- CSS

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## Purpose

This project was created while learning React fundamentals. It helped practise the `useState` hook, state updates, component re-rendering, event handling, and conditional logic.