# 07 - React Router – Multi-Page React Application

A multi-page React application built using React Router and Tailwind CSS. This project demonstrates how to implement client-side routing, nested routes, dynamic URL parameters, shared layouts, and API integration in a React application.

The application contains multiple pages, including Home, About, Contact, GitHub, and a dynamic User page. It also fetches public GitHub profile information using the GitHub API.

## Features

- Navigate between multiple pages without full browser reloads.
- Shared Header and Footer across different pages.
- Active navigation link styling.
- Nested routing with a common parent layout.
- Dynamic user pages using URL parameters.
- Fetch and display GitHub profile information.
- Display GitHub profile picture and follower count.
- Responsive UI built with Tailwind CSS.

## Concepts Practised

### 1. React Router and Client-Side Routing

React Router is used to manage navigation between different pages of the application.

Instead of loading a separate HTML document for every page, React Router matches the current URL with a configured route and renders the corresponding React component.

The project uses routes such as:

- `/` – Home page
- `/about` – About page
- `/contact` – Contact page
- `/github` – GitHub profile page
- `/user/:userid` – Dynamic user page

### 2. createBrowserRouter()

The `createBrowserRouter()` function is used to create the application's router configuration.

It defines the relationship between URL paths and the React components that should be rendered.

The project uses `createRoutesFromElements()` to define routes using JSX syntax.

A parent route renders the main `App` component, while its nested child routes represent individual pages.

### 3. Nested Routing

Nested routing allows multiple routes to exist inside a parent route.

In this project, `App` acts as the parent layout and contains the Header, Outlet, and Footer components.

The child routes render their respective page components inside the parent layout.

This avoids repeating shared components across different pages and keeps the application structure organized.

### 4. Outlet Component

The `Outlet` component from React Router acts as a placeholder for the matching child route.

The `App` component uses it between the Header and Footer.

When a user navigates to a child route, React Router renders the corresponding component inside the Outlet.

For example, visiting `/about` displays the About component while keeping the shared Header and Footer visible.

### 5. Link Component

The `Link` component is used to navigate between routes.

It provides client-side navigation without triggering a complete browser page reload.

The project uses `Link` for navigation in components such as the Header and Footer.

### 6. NavLink Component

The `NavLink` component is used to create navigation links that can identify whether their route is currently active.

It provides an `isActive` value through its className callback.

The project uses this value to dynamically change the text color of the active navigation link.

This provides visual feedback about the user's current location within the application.

### 7. Dynamic Routing

Dynamic routing allows a single route to handle multiple URL values.

The project defines a dynamic route using:

`/user/:userid`

The `userid` segment is dynamic, meaning different values can be supplied through the URL.

Examples:

- `/user/101`
- `/user/202`
- `/user/tushar`

All these URLs render the same User component with different parameter values.

### 8. useParams Hook

The `useParams()` hook from React Router is used to retrieve dynamic parameters from the current URL.

The User component extracts the `userid` parameter using:

`const { userid } = useParams();`

The retrieved value is then displayed inside the component.

This demonstrates how route parameters can be used to create dynamic pages such as user profiles, product details, and individual content pages.

### 9. React useState Hook

The GitHub component uses the `useState` hook to store profile information received from the GitHub API.

Initially, the state is set to `0`.

After the API request completes, the fetched profile information is stored using the state setter function.

React then re-renders the component to display the updated profile information.

### 10. React useEffect Hook

The `useEffect` hook is used to perform the GitHub API request when the GitHub component initially mounts.

The effect uses an empty dependency array, so it does not execute again on every component re-render.

This prevents unnecessary repeated API requests during ordinary state updates.

### 11. Fetch API and Asynchronous JavaScript

The browser's Fetch API is used to retrieve public GitHub profile information.

API endpoint:

`https://api.github.com/users/TusharChaudhary08`

The response is converted into JSON and stored in React state.

The application uses the returned `avatar_url` and `followers` properties to display the GitHub profile picture and follower count.

This demonstrates how external API data can be integrated into a React component.

### 12. Component-Based Architecture

The application is divided into separate components based on their responsibilities.

- `Header` – Displays navigation links.
- `Footer` – Displays footer information and links.
- `Home` – Displays the landing page.
- `About` – Displays informational content.
- `Contact` – Displays the contact page and form layout.
- `Github` – Fetches and displays GitHub profile information.
- `User` – Displays a dynamic user ID received from the URL.

This structure improves code organization and makes individual components easier to maintain.

### 13. RouterProvider

The `RouterProvider` component connects the configured router to the React application.

It receives the router created using `createBrowserRouter()` and enables route matching and navigation throughout the application.

## Application Flow

1. The application starts from `main.jsx`.
2. The router configuration defines the parent route and its child routes.
3. `RouterProvider` makes the router available to the application.
4. The `App` component renders the shared Header and Footer.
5. The `Outlet` displays the page matching the current URL.
6. The Header uses `Link` and `NavLink` to navigate between pages.
7. Dynamic routes use `useParams()` to retrieve values from the URL.
8. The GitHub component uses `useEffect` and Fetch API to retrieve profile information.
9. The fetched information is stored using `useState` and displayed in the UI.

## Technologies Used

- React 19
- JavaScript
- JSX
- React Router DOM
- Tailwind CSS 4
- Vite
- GitHub REST API
- Fetch API

## Project Structure

```text
07reactRouter/
├── public/
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── talking.png
│   │   └── working.png
│   ├── components/
│   │   ├── about/
│   │   │   └── about.jsx
│   │   ├── contactUs/
│   │   │   └── contact.jsx
│   │   ├── footer/
│   │   │   └── footer.jsx
│   │   ├── github/
│   │   │   └── github.jsx
│   │   ├── header/
│   │   │   └── header.jsx
│   │   ├── home/
│   │   │   └── home.jsx
│   │   └── User/
│   │       └── user.jsx
│   ├── App.jsx
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

Start the development server:

```bash
npm run dev
```

## Learning Objective

The main objective of this project was to understand how routing works in React applications.

It provides practical experience with client-side navigation, nested routes, shared layouts, dynamic URL parameters, React Router hooks, and fetching external API data.

These concepts form an important foundation for building larger React applications with multiple pages and dynamic content.