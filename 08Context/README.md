# 08 - React Context API (User Login and Profile)

## Overview

This project demonstrates how to use the **React Context API** to share data between components without passing props manually through every component.

The application contains a simple Login component and a Profile component:

- The Login component accepts a username and password.
- When the user clicks Submit, the entered information is stored in shared state.
- The Profile component reads that shared state and displays a welcome message.
- If no user information is available, the Profile component displays "Login please".

The main purpose of this project is to understand how multiple components can access and update the same state using Context API.

## Concepts Covered

- React Context API
- `createContext()`
- `Context.Provider`
- `useContext()`
- `useState()`
- Sharing state between components
- Controlled input fields
- Event handling
- Passing `children` as props
- Conditional rendering
- Component composition

---

## 1. Why Do We Need Context API?

Imagine we have two components:

- `Login` – responsible for receiving user information.
- `Profile` – responsible for displaying user information.

Both components need access to the same user data.

Without Context API, we could store the user state in their common parent component (`App`) and pass it to the children using props.

However, as an application grows, data may need to travel through several components that do not actually need that data themselves. This is called **prop drilling**.

Context API provides another approach: we create a shared context and make its data available to components inside a Provider.

This allows components to access the required data directly without passing it through intermediate components.

## 2. Creating a Context with `createContext()`

**File:** `src/Context/UserContext.js`

```jsx
import React from 'react'

const UserContext = React.createContext()

export default UserContext
```

### What does `createContext()` do?

`createContext()` creates a Context object that can be used to share data between components.

Think of `UserContext` as a shared channel through which components can access common data.

Creating a context alone does not provide any user information. We still need a Provider to supply the actual value.

In this project, `UserContext` is created separately so that different components can import and use the same context.

## 3. Creating the Context Provider

**File:** `src/Context/UserContextProvider.jsx`

```jsx
import React, { useState } from 'react'
import UserContext from './UserContext.js'

const UserContextProvider = ({ children }) => {

    const [user, setUser] = React.useState(null)

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider
```

This is one of the most important parts of the project.

### What is a Provider?

A Provider makes a context value available to the components rendered inside it.

Here, `UserContext.Provider` provides two things:

- `user` – stores the current user information.
- `setUser` – allows components to update that information.

Both are passed through the `value` prop:

```jsx
value={{user, setUser}}
```

### Understanding `useState(null)`

```jsx
const [user, setUser] = React.useState(null)
```

Initially, `user` is `null`, meaning no user information is available.

When the Login component submits the entered information, it calls `setUser()` and updates this state.

For example:

```jsx
setUser({
    username: "Tushar",
    password: "12345"
})
```

React updates the state and re-renders the components that use this context.

### Understanding `children`

```jsx
const UserContextProvider = ({ children }) => {
```

`children` represents whatever components are placed inside `UserContextProvider`.

For example:

```jsx
<UserContextProvider>
    <Login />
    <Profile />
</UserContextProvider>
```

Here, both `Login` and `Profile` become the children of `UserContextProvider`.

Inside the Provider, `{children}` renders those components.

This is how the Provider wraps other components and makes the context available to them.

## 4. Wrapping Components with the Provider

**File:** `src/App.jsx`

```jsx
import Login from './Components/login'
import Profile from './Components/profile'
import UserContextProvider from './Context/UserContextProvider'

function App() {
    return (
        <UserContextProvider>
            <Login />
            <Profile />
        </UserContextProvider>
    )
}

export default App
```

Notice that both components are wrapped inside `UserContextProvider`.

This is important because components can only access this context value when they are rendered inside its Provider.

The relationship looks like this:

```text
App
 └── UserContextProvider
      ├── Login
      └── Profile
```

Both components share the same context value because they are inside the same Provider.

## 5. Accessing Context with `useContext()`

**File:** `src/Components/login.jsx`

```jsx
const { setUser } = useContext(UserContext)
```

`useContext()` allows a component to read the value provided by the nearest matching Context Provider.

In this case, the Provider supplies:

```jsx
value={{user, setUser}}
```

Therefore, Login can extract `setUser` directly from the context.

It does not need to receive `setUser` as a prop from App.

### Login Component State

```jsx
const [username, setUsername] = useState()
const [password, setPassword] = useState()
```

These two state variables store the values entered into the input fields.

The input fields use `value` and `onChange`:

```jsx
<input
    type="text"
    value={username}
    onChange={(e) => {
        setUsername(e.target.value)
    }}
    placeholder="username"
/>
```

Whenever the user types something:

1. The `onChange` event runs.
2. `e.target.value` gets the current input value.
3. `setUsername()` updates the username state.
4. React re-renders the component with the updated value.

This is an example of a **controlled component**, because React state controls the input's value.

The password input follows the same approach.

### Submitting the User Information

```jsx
const handleSubmit = (e) => {
    e.preventDefault()
    setUser({ username, password })
}
```

When Submit is clicked, `handleSubmit()` runs.

It creates an object containing the current username and password and passes it to `setUser()`.

Because `setUser` belongs to the Provider's state, this updates the shared user information.

The important connection is that Login does not own the shared `user` state. It only updates that state through the function received from Context.

## 6. Reading Shared Data in Another Component

**File:** `src/Components/profile.jsx`

```jsx
import React, { useContext } from 'react'
import UserContext from '../Context/UserContext'

function Profile() {
    const { user } = useContext(UserContext)

    if (!user) return <div>Login please</div>

    return <div>Welcome {user.username}</div>
}

export default Profile
```

The Profile component uses `useContext()` to access the same context value.

```jsx
const { user } = useContext(UserContext)
```

It extracts `user` from the object provided by `UserContext.Provider`.

### Understanding Conditional Rendering

```jsx
if (!user) return <div>Login please</div>
```

Initially, `user` is `null`.

Therefore, the condition `!user` is true, and the component displays "Login please".

After Login updates the shared state, `user` contains an object.

Now `!user` becomes false, so React renders:

```jsx
return <div>Welcome {user.username}</div>
```

The Profile component automatically receives the updated context value and displays the username.

This happens because updating the Provider's state causes components consuming that context to re-render.

---

## 7. How Everything Works Together

The complete data flow is:

1. `UserContext.js` creates the context.
2. `UserContextProvider.jsx` creates the shared `user` state.
3. The Provider supplies `user` and `setUser` through its `value` prop.
4. `App.jsx` wraps both Login and Profile inside the Provider.
5. Login uses `useContext()` to access `setUser`.
6. The user enters their details and clicks Submit.
7. Login calls `setUser({ username, password })`.
8. The Provider's state updates.
9. Profile receives the updated context value through `useContext()`.
10. Profile displays the welcome message.

### Data Flow Diagram

```text
             UserContext
                  |
                  |
          UserContextProvider
                  |
          user + setUser
                  |
             App.jsx
                  |
          -----------------
          |               |
        Login           Profile
          |               |
     setUser()          user
          |               |
          |          Reads username
          |               |
          ------> Welcome message
```

The important thing to understand is that both components are communicating through shared context rather than passing data directly between themselves.

---

## 8. Important Files and Their Responsibilities

| File | Responsibility |
|---|---|
| `App.jsx` | Wraps Login and Profile with the Provider |
| `UserContext.js` | Creates the shared context |
| `UserContextProvider.jsx` | Stores and provides shared user state |
| `login.jsx` | Accepts user input and updates shared state |
| `profile.jsx` | Reads shared state and displays the username |
| `main.jsx` | Renders the React application |

## 9. Important Things to Remember

- `createContext()` creates a context object.
- `Context.Provider` supplies a value to its descendant components.
- `useContext()` reads the value from the nearest matching Provider.
- `useState()` stores the shared data inside the Provider.
- `children` allows the Provider to wrap other components.
- Updating the Provider's state causes context-consuming components to re-render.
- Context API helps avoid prop drilling when multiple components need shared data.

## 10. Limitations of This Project

This is a learning example of sharing user data, not a real authentication system.

- There is no backend or database.
- No credentials are verified.
- The user information is not saved permanently.
- Refreshing the page resets the state.
- The password is stored in React state only for demonstration.

## How to Run

```bash
npm install
npm run dev
```

---

**Main Learning:** Context API allows components to access and update shared data without manually passing props through every component. In this project, Login updates the user state through Context, while Profile reads that same state to display the username.