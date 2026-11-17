# 05 - Password Generator (React Hooks)

## Overview

This project is a Password Generator built using React and Tailwind CSS.

It generates random passwords based on user-selected options. Users can control the password length, include numbers, include special characters, and copy the generated password to the clipboard.

The main purpose of this project is to understand how React Hooks work together to manage state, optimize functions, perform side effects, and interact with DOM elements.

## Features

- Generate random passwords.
- Change password length from 8 to 100 characters.
- Include numbers in the password.
- Include special characters in the password.
- Automatically regenerate the password when settings change.
- Copy the generated password to the clipboard.
- Display a confirmation message after copying.

## Concepts Covered

- `useState()`
- `useEffect()`
- `useRef()`
- `useCallback()`
- React Hooks and dependency arrays
- Function memoization
- DOM element references
- Clipboard API
- Controlled and uncontrolled inputs
- Event handling
- Random number generation
- `Math.random()`, `Math.floor()`, and `charAt()`
- JavaScript string concatenation
- Tailwind CSS

---

## 1. Understanding `useState()`

The application uses multiple state variables:

```jsx
const [length, setLength] = useState(8);

const [numAllowed, setNumAllowed] = useState(false);

const [charAllowed, setCharAllowed] = useState(false);

const [password, setPassword] = useState("");

const [message, setMessage] = useState("");
```

`useState()` allows a component to store data that can change over time.

Each state variable has a particular responsibility:

| State | Purpose | Initial value |
|---|---|---|
| `length` | Controls password length | `8` |
| `numAllowed` | Determines whether numbers are included | `false` |
| `charAllowed` | Determines whether special characters are included | `false` |
| `password` | Stores the generated password | `""` |
| `message` | Displays the copy confirmation | `""` |

### Why do we use separate state variables?

Each variable represents a different piece of information.

For example, changing `length` should update the password length, while changing `numAllowed` should control whether numbers are included.

When any of these states changes, React re-renders the component and updates the UI.

---

## 2. Understanding `useCallback()`

This is one of the most important concepts in this project.

Before understanding the code, we need to understand a small problem.

### The problem with normal functions in React

Consider a normal function inside a component:

```jsx
function passwordGenerator() {
    // Generate password
}
```

Whenever a React component re-renders, its function component executes again.

As a result, this function is created again on every render.

This is not necessarily a problem for every function. However, sometimes we want to preserve the same function reference between renders unless its dependencies change.

This is where `useCallback()` helps.

### What does `useCallback()` do?

`useCallback()` memoizes a function.

It returns the same function reference between renders as long as its dependencies remain unchanged.

When a dependency changes, React returns a new function using the updated values.

**Important:** `useCallback()` does not automatically execute the function. It only memoizes the function definition.

### A. Using `useCallback()` for Password Generation

Your code:

```jsx
const passwordGenerator = useCallback(() => {

    let pass = "";

    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numAllowed) {
        str += "0123456789";
    }

    if (charAllowed) {
        str += "!@#$%^&*()_+={}`~";
    }

    for (let i = 0; i < length; i++) {
        let index = Math.floor(Math.random() * str.length);

        pass += str.charAt(index);
    }

    setPassword(pass);

}, [length, numAllowed, charAllowed, setPassword]);
```

This function generates a password using the current settings.

Let's understand its working.

**Step 1: Initialize an empty password**

```jsx
let pass = "";
```

We start with an empty string because the generated characters will be added to it one by one.

**Step 2: Create the character pool**

```jsx
let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
```

Initially, the character pool contains uppercase and lowercase English letters.

**Step 3: Include numbers if allowed**

```jsx
if (numAllowed) {
    str += "0123456789";
}
```

If the user enables the Number checkbox, numbers are added to the character pool.

**Step 4: Include special characters if allowed**

```jsx
if (charAllowed) {
    str += "!@#$%^&*()_+={}`~";
}
```

If the user enables Characters, special characters are added.

**Step 5: Generate random characters**

```jsx
for (let i = 0; i < length; i++) {
    let index = Math.floor(Math.random() * str.length);

    pass += str.charAt(index);
}
```

The loop runs according to the selected password length.

Inside the loop:

- `Math.random()` generates a random decimal between 0 (inclusive) and 1 (exclusive).
- Multiplying it by `str.length` gives a random decimal within the character pool's index range.
- `Math.floor()` rounds it down to an integer.
- `charAt(index)` retrieves the character at that index.
- `pass +=` adds the selected character to the password.

After the loop finishes, we have a complete password.

**Step 6: Update password state**

```jsx
setPassword(pass);
```

This stores the generated password in React state, causing the input field to display the new value.

### Understanding the Dependency Array

```jsx
[length, numAllowed, charAllowed, setPassword]
```

These are the dependencies of the callback.

The password generator uses `length`, `numAllowed`, and `charAllowed`, so it needs the latest values of these states.

If one of these dependencies changes, React creates a new callback using the updated values.

`setPassword` is a state setter, and React guarantees that its identity remains stable, so it normally does not cause the callback to change.

---

## 3. Understanding `useEffect()`

`useEffect()` is used to perform side effects in a React component.

A side effect is an operation that happens outside the normal process of calculating and returning JSX.

Examples include:

- Fetching data from an API.
- Updating the document title.
- Setting up subscriptions.
- Running logic when certain state values change.

In this project, `useEffect()` is used to automatically generate a new password whenever the password settings change.

### Your Code

```jsx
useEffect(() => {
    passwordGenerator();
    setMessage("");
}, [length, numAllowed, charAllowed, passwordGenerator]);
```

### Understanding how it works

The first argument is a function that React runs after rendering.

The second argument is the dependency array.

React compares the dependencies between renders. When one of them changes, the effect runs again.

In this project:

1. The component renders.
2. React runs the effect after the render.
3. `passwordGenerator()` generates a password.
4. `setMessage("")` clears the previous copy confirmation.
5. If a password setting changes, the component renders again and the effect runs again.

### Why do we need `useEffect()` here?

Without `useEffect()`, we would need to call `passwordGenerator()` separately inside every event handler:

- When password length changes.
- When numbers are enabled or disabled.
- When special characters are enabled or disabled.

Instead, we have one effect that watches all these dependencies.

Whenever one of them changes, the effect runs and generates a new password automatically.

### Why is `passwordGenerator` also a dependency?

Notice that the effect uses the `passwordGenerator` function.

React's dependency rules require values used inside an effect to be included in its dependency array when they are reactive.

Because `passwordGenerator` is memoized with `useCallback()`, its reference stays the same while its own dependencies remain unchanged.

This connects the two hooks:

- `useCallback()` controls when the password generator function gets a new reference.
- `useEffect()` watches that function and runs when its reference or another dependency changes.

### Understanding the Initial Render

The effect also runs after the initial render because no previous dependency values exist to compare against.

This means the application generates its first password automatically using the default settings:

- Length: 8
- Numbers: disabled
- Special characters: disabled

---

## 4. Understanding `useRef()`

`useRef()` is a React Hook that allows us to store a mutable value between renders.

Unlike state, updating a ref does not cause the component to re-render.

In this project, `useRef()` is used to access the password input element directly.

### Your Code

```jsx
const passwordRef = useRef(null);
```

Initially, `passwordRef.current` is `null`.

Now look at the password input:

```jsx
<input
    type="text"
    value={password}
    readOnly
    ref={passwordRef}
/>
```

The `ref` prop connects the actual input DOM element to `passwordRef`.

After React mounts the input, we can access that element through:

```jsx
passwordRef.current
```

This gives us a reference to the actual input element.

### Why do we need this?

The application has a Copy button.

When the user clicks it, we want to select the password text before copying it.

Normally, React handles UI updates through state and props. However, selecting text is an operation that needs access to the actual DOM element.

This is where refs are useful.

### Important Difference Between `useState()` and `useRef()`

| `useState()` | `useRef()` |
|---|---|
| Stores component state | Stores a mutable reference |
| Updating state triggers a re-render | Updating `.current` does not trigger a re-render |
| Used to update the UI | Often used to access DOM elements or retain values |
| State updates are managed by React | Ref value can be changed directly |

In this project, `password` uses state because the displayed password must update.

`passwordRef` uses a ref because we only need to access the input element.

---

## 5. Understanding the Clipboard API

Your project also uses the browser's Clipboard API.

```jsx
const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();

    window.navigator.clipboard.writeText(password);

}, [password]);
```

This function copies the generated password to the clipboard.

Let's understand the two important operations.

### A. Selecting the Password

```jsx
passwordRef.current?.select();
```

`passwordRef.current` accesses the input element.

The `select()` method selects the text inside that input.

The `?.` operator is called optional chaining.

It checks whether `passwordRef.current` is not `null` or `undefined` before calling `select()`.

This avoids an error if the input element is not available.

### B. Copying to the Clipboard

```jsx
window.navigator.clipboard.writeText(password);
```

The Clipboard API provides access to the browser's clipboard.

`writeText()` writes the supplied string into the clipboard.

Here, the generated password is copied.

### Why use `useCallback()` again?

```jsx
}, [password]);
```

The copy function depends on the current password.

When the password changes, the callback is recreated so that it uses the latest password value.

When the password remains unchanged, React can reuse the same function reference.

---

## 6. Understanding Event Handling

The application uses event handlers to respond to user interactions.

### A. Changing Password Length

```jsx
<input
    type="range"
    min={8}
    max={100}
    value={length}
    onChange={(e) => {
        setLength(e.target.value);
    }}
/>
```

This range input allows the user to select the password length.

Whenever the slider changes, `onChange` runs and updates the `length` state.

The displayed label also updates:

```jsx
<label>Length : {length}</label>
```

The updated state triggers a render, and the `useEffect()` hook generates a new password.

### B. Enabling Numbers

```jsx
<input
    type="checkbox"
    defaultChecked={numAllowed}
    onChange={() => {
        setNumAllowed((prev) => !prev);
    }}
/>
```

When the checkbox changes, the state is toggled.

The functional state update:

```jsx
setNumAllowed((prev) => !prev);
```

uses the previous state and reverses its Boolean value.

### C. Enabling Special Characters

```jsx
<input
    type="checkbox"
    defaultChecked={charAllowed}
    onChange={() => {
        setCharAllowed((prev) => !prev);
    }}
/>
```

This follows the same logic as the Number checkbox.

It controls whether special characters are included in the password.

### Controlled vs Uncontrolled Inputs

The range input uses:

```jsx
value={length}
```

This makes it a controlled input because React state determines its value.

The checkboxes use:

```jsx
defaultChecked={numAllowed}
```

and:

```jsx
defaultChecked={charAllowed}
```

These are uncontrolled inputs with an initial checked value. Their later changes are tracked through the event handlers and React state.

For fully controlled checkboxes, we could instead use:

```jsx
checked={numAllowed}
```

and:

```jsx
checked={charAllowed}
```

---

## 7. Understanding the Copy Button

```jsx
<button
    onClick={() => {
        copyPasswordToClipboard();
        setMessage("* password copied to clipboard");
    }}
>
    Copy
</button>
```

When the user clicks Copy:

1. `copyPasswordToClipboard()` is called.
2. The password input text is selected.
3. The Clipboard API attempts to copy the password.
4. `setMessage()` updates the message state.
5. React displays the confirmation message.

The message is cleared whenever the password settings change because of:

```jsx
setMessage("");
```

inside the `useEffect()`.

**Note:** The current code does not wait for the clipboard operation to succeed before displaying the confirmation message. A more reliable implementation would handle the Promise returned by `writeText()` and display success or failure accordingly.

---

## 8. How All Three Hooks Work Together

This is the most important part of the project.

The three hooks have different responsibilities:

| Hook | Responsibility |
|---|---|
| `useCallback()` | Memoizes the password generator and copy functions |
| `useEffect()` | Runs password generation when its dependencies change |
| `useRef()` | Provides access to the password input DOM element |

### Complete Password Generation Flow

```text
User changes a setting
        |
        v
React State Updates
        |
        v
Component Re-renders
        |
        v
useCallback checks dependencies
        |
        v
Password Generator gets updated
        |
        v
useEffect detects dependency change
        |
        v
passwordGenerator() executes
        |
        v
setPassword() updates state
        |
        v
New password appears in input
```

### Complete Copy Flow

```text
User clicks Copy
        |
        v
copyPasswordToClipboard()
        |
        v
passwordRef.current
        |
        v
Select input text
        |
        v
Clipboard API copies password
        |
        v
setMessage()
        |
        v
Confirmation message appears
```

---

## 9. Important Things to Remember

| Concept | What to remember |
|---|---|
| `useState()` | Stores values that affect the UI |
| `useEffect()` | Runs side effects after rendering |
| Dependency array | Controls when an effect runs again |
| `useRef()` | Holds a reference without triggering re-renders |
| `.current` | Accesses the value stored in a ref |
| `useCallback()` | Memoizes a function reference |
| `useCallback` dependencies | Determine when a new callback is created |
| Optional chaining | Safely accesses a property or method |
| Clipboard API | Allows copying text to the browser clipboard |
| `Math.random()` | Generates a random decimal |
| `Math.floor()` | Rounds a number down |
| `charAt()` | Gets a character at a particular string index |

## 10. Important Improvements

A few details are worth improving as you revisit this project.

### 1. Convert the slider value to a number

Range input values are received as strings.

Instead of:

```jsx
setLength(e.target.value);
```

You can write:

```jsx
setLength(Number(e.target.value));
```

This ensures that `length` remains a number.

### 2. Use controlled checkboxes

Instead of `defaultChecked`, use `checked`:

```jsx
checked={numAllowed}
```

and:

```jsx
checked={charAllowed}
```

This keeps the checkbox UI directly synchronized with React state.

### 3. Handle clipboard errors

The current code displays a success message immediately.

A better approach is to use `async/await` and handle errors from the Clipboard API.

### 4. Use a cryptographically secure random generator for real passwords

`Math.random()` is suitable for learning basic random selection, but it is not designed for generating secure passwords.

For a real password generator, use the Web Crypto API, such as `crypto.getRandomValues()`.

### 5. Understand that `useCallback()` is not always necessary

Memoizing every function does not automatically make an application faster.

It is useful when preserving function identity matters, such as when a function is a dependency of another hook or is passed to a memoized child component.

In this project, it also helps demonstrate how a memoized function can work with `useEffect()`.

---

## How to Run

```bash
npm install
npm run dev
```

---

## Main Learning

This project demonstrates how different React Hooks solve different problems.

- `useState()` manages changing application data.
- `useCallback()` preserves a function reference until its dependencies change.
- `useEffect()` runs password generation when relevant dependencies change.
- `useRef()` accesses the actual input element to select its text.
  
The most important connection to understand is how `useCallback()` and `useEffect()` work together: the callback uses the latest settings, while the effect executes it whenever those settings change.