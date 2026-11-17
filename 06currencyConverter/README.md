# 06 - Currency Converter – React

A currency converter application built using React and Tailwind CSS. It fetches exchange-rate information from an external API and allows users to convert an amount from one currency to another.

This project focuses on understanding React Hooks, custom hooks, reusable components, props, API integration, controlled inputs, and communication between parent and child components.

## Features

- Convert amounts between different currencies.
- Fetch exchange-rate information from an external currency API.
- Select source and destination currencies.
- Dynamically populate currency dropdowns using API data.
- Swap source and destination currencies.
- Automatically update exchange-rate information when the source currency changes.
- Display the converted amount in a disabled input field.
- Reusable input component for both currency fields.

## Concepts Practised

### 1. React useState Hook

The `useState` hook is used to manage the application's changing data.

The application maintains four state variables:

- `amount` – Stores the amount entered by the user.
- `from` – Stores the source currency (initially USD).
- `to` – Stores the destination currency (initially INR).
- `convertedAmount` – Stores the calculated conversion result.

Each state variable has a separate responsibility. When any of these values changes, React updates the component to reflect the latest application state.

### 2. Props and Parent-Child Communication

The application uses a reusable `InputBox` component that receives information from the main `App` component through props.

Important props include:

- `label` – Identifies the input as From or To.
- `amount` – Provides the amount displayed in the input.
- `currencyOption` – Passes the available currency options.
- `onAmountChange` – Allows the child component to send amount changes to the parent.
- `onCurrencyChange` – Allows the child to communicate currency selection changes.
- `selectCurrency` – Specifies the currently selected currency.
- `amountDisabled` – Controls whether the amount input can be edited.

Props can contain values as well as functions. This allows the child component to display parent data and notify the parent about user interactions.

### 3. Reusable Components

The `InputBox` component is created once and reused twice in the application.

- The first instance handles the source amount and currency.
- The second instance handles the destination amount and currency.

Both instances share the same structure but receive different props.

This avoids duplicating JSX and makes the application easier to maintain.

### 4. Controlled Components

The amount input uses the React `value` and `onChange` props.

Its displayed value is controlled by the state maintained in the parent component.

When the user enters an amount:

1. The input's `onChange` handler detects the change.
2. The child calls the `onAmountChange` callback.
3. The parent updates its amount state.
4. React re-renders the component with the updated value.

This approach keeps the input synchronized with React state.

The destination amount input is disabled using the `amountDisabled` prop because its value is calculated by the application.

### 5. Custom Hooks – useCurrencyInfo

A custom hook named `useCurrencyInfo` is created to separate API-fetching logic from the main application component.

It accepts a currency code as an argument and returns exchange-rate information.

The hook:

1. Creates a state variable called `data`.
2. Uses `useEffect` to perform an API request.
3. Fetches exchange-rate information for the selected currency.
4. Converts the response into JSON.
5. Stores the returned currency rates in state.
6. Returns the exchange-rate data to the component.

The main `App` component uses the custom hook:

`const currencyInfo = useCurrencyInfo(from);`

This makes the fetched data available to the conversion logic and currency dropdowns.

### 6. React useEffect Hook

The `useEffect` hook handles the API request inside the custom hook.

Its dependency array contains the selected currency:

`[currency]`

The effect runs after the initial render and whenever the selected source currency changes.

This prevents the API request from running unnecessarily on every component render.

### 7. Fetch API and Asynchronous JavaScript

The project uses JavaScript's built-in `fetch()` method to retrieve exchange-rate information from an external API.

The request returns a Promise, which is handled using `.then()`.

- `fetch()` sends the API request.
- `res.json()` converts the response into JavaScript data.
- `setData()` stores the fetched exchange rates in React state.

This demonstrates how React applications can retrieve external data and use it to update the interface.

### 8. Object.keys() and Array.map()

The application uses `Object.keys(currencyInfo)` to extract the currency codes from the fetched exchange-rate object.

The resulting array is passed to the `InputBox` component.

Inside `InputBox`, the `.map()` method generates dropdown options dynamically.

Each option uses a `key` prop to help React identify individual elements in the rendered list.

### 9. Currency Conversion Logic

The conversion function calculates the destination amount by multiplying the entered amount by the exchange rate of the selected destination currency.

`convertedAmount = amount * currencyInfo[to]`

For example, if the entered amount is 10 USD and the fetched USD-to-INR exchange rate is 88:

`10 × 88 = 880 INR`

The calculated value is stored in `convertedAmount` and displayed in the destination input.

### 10. Swapping Currencies

The `swap()` function exchanges the source and destination currencies.

It also exchanges the entered amount and converted amount.

This demonstrates how multiple state variables can be updated together in response to a single user interaction.

### 11. React useId Hook

The `useId()` hook generates a unique ID for the amount input.

The generated ID is used by both the input element and its associated label through the `id` and `htmlFor` attributes.

This improves accessibility by connecting labels with their corresponding form controls.

### 12. Form Handling and preventDefault()

The conversion interface is wrapped inside a form.

The `onSubmit` event handles form submission and calls the conversion function.

`e.preventDefault()` prevents the browser's default form submission behavior, avoiding an unnecessary page reload.

### 13. Tailwind CSS

Tailwind CSS is used to style the application through utility classes.

Examples include:

- `flex` – Creates a flexbox layout.
- `justify-center` – Centers elements horizontally.
- `items-center` – Aligns elements vertically.
- `max-w-md` – Restricts the maximum width.
- `rounded-lg` – Adds rounded corners.
- `backdrop-blur-sm` – Applies a background blur effect.
- `bg-cover` – Makes the background image cover its container.

## Application Flow

1. The application initializes USD as the source currency and INR as the destination currency.
2. The `useCurrencyInfo` custom hook fetches exchange-rate information for USD.
3. The fetched currency data is converted into an array of available currency codes.
4. The `InputBox` components receive their values and callback functions through props.
5. The user enters an amount and selects the destination currency.
6. When the form is submitted, the conversion function calculates the result using the fetched exchange rate.
7. The converted amount is displayed in the destination input.
8. Users can also swap the source and destination currencies.

## Technologies Used

- React 19
- JavaScript
- JSX
- Tailwind CSS 4
- Vite
- Fetch API
- Custom React Hooks

## Project Structure

```text
06currencyConverter/
├── public/
├── src/
│   ├── assets/
│   │   └── currency.jpg
│   ├── components/
│   │   ├── InputBox.jsx
│   │   └── index.js
│   ├── hooks/
│   │   └── useCurrencyInfo.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## Getting Started

Install the project dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

## Learning Objective

The main objective of this project was to understand how different React concepts work together in a practical application.

It provides experience with managing state, passing props between components, building reusable components, creating custom hooks, fetching external API data, handling controlled inputs, and performing currency conversion using dynamically retrieved exchange rates. 