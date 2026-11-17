# 11 - Redux Toolkit Todo App

## Overview

This project is a Todo application built using React, Redux Toolkit, React Redux, and Tailwind CSS.

The application demonstrates how to manage shared state using Redux Toolkit instead of React Context API.

Users can:

- Add new todos.
- Edit existing todos.
- Delete todos.
- Mark todos as completed or incomplete.
- Display all todos from the Redux store.

The main purpose of this project is to understand how Redux Toolkit manages application state through a central store, slices, reducers, and actions.

## Concepts Covered

- Redux and Redux Toolkit
- Centralized state management
- `configureStore()`
- `createSlice()`
- Initial state
- Reducers
- Actions and action creators
- `useDispatch()`
- `useSelector()`
- `Provider` from React Redux
- `nanoid()`
- Immutable state updates with Immer
- Controlled components
- Local component state with `useState()`
- Array methods: `map()` and `filter()`

---

## 1. Why Do We Need Redux Toolkit?

In React, we can manage state using `useState()` and share it between components using Context API.

However, when an application becomes larger, many components may need to read and update the same state.

Redux provides a centralized approach to state management.

Instead of keeping shared state inside individual components, Redux stores it in one central location called the **Redux Store**.

Components can:

- Read data from the store.
- Dispatch actions to request changes.
- Receive updated state when the store changes.

### Understanding the Main Redux Flow

```text
Component
    |
    | Dispatch Action
    v
Action
    |
    v
Reducer
    |
    v
Redux Store
    |
    | Updated State
    v
Component Re-renders
```

For example, when the user adds a todo:

1. The TodoForm component dispatches an `addTodo` action.
2. The reducer receives that action.
3. The reducer updates the todo state.
4. Redux stores the updated state.
5. Components reading that state receive the updated value.

## 2. Creating the Redux Store

**File:** `src/app/store.js`

```jsx
import { configureStore } from '@reduxjs/toolkit'
import todoReducer from '../faetures/Todo/TodoSlice'

export const store = configureStore({
    reducer: todoReducer
});
```

The Redux Store is the central place where the application's state is maintained.

### Understanding `configureStore()`

Redux Toolkit provides `configureStore()` to create and configure the Redux store.

```jsx
configureStore({
    reducer: todoReducer
})
```

The `reducer` option tells Redux which reducer should manage the application state.

Here, we import `todoReducer` from `TodoSlice.js` and provide it directly to the store.

Since the slice's initial state is:

```jsx
const initialState = {
    todos: [
        {
            id: 2,
            text: "hello",
            completed: false
        }
    ]
}
```

The root state has this structure:

```jsx
{
    todos: [
        {
            id: 2,
            text: "hello",
            completed: false
        }
    ]
}
```

This is why we can access the todo array using:

```jsx
const todos = useSelector((state) => state.todos);
```

The store is exported so it can be provided to the React application.

## 3. Understanding Redux Slice

**File:** `src/faetures/Todo/TodoSlice.js`

A slice is one of the most important concepts in Redux Toolkit.

A slice contains:

- A name.
- An initial state.
- Reducers that describe how the state changes.
- Automatically generated actions corresponding to those reducers.

Instead of manually creating action types, action creators, and separate reducer logic, Redux Toolkit lets us organize them together using `createSlice()`.

### Creating the Slice

```jsx
import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos: [
        {
            id: 2,
            text: "hello",
            completed: false
        }
    ],
};
```

Here, `initialState` defines the starting state of the application.

Each todo object contains:

- `id` – identifies the todo.
- `text` – stores the todo description.
- `completed` – stores its completion status.

### Using `createSlice()`

```jsx
export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        // Reducers
    }
});
```

**Understanding the properties:**

- `name`: identifies this slice. Here, its name is `todo`.
- `initialState`: defines the initial data.
- `reducers`: contains functions that describe how the state should change.

Now let's understand each reducer.

---

## 4. Adding a Todo

```jsx
addTodo: (state, action) => {
    const todo = {
        id: nanoid(),
        text: action.payload,
        completed: false
    }

    state.todos.push(todo);
}
```

This reducer adds a new todo to the existing array.

### Understanding `state` and `action`

Every Redux reducer receives two important arguments:

**1. state**

Represents the current state managed by the slice.

In this case, it contains the `todos` array.

**2. action**

Represents the action dispatched by a component.

An action contains a `payload` property when data is passed with it.

For example:

```jsx
dispatch(addTodo("Learn Redux"));
```

The string `"Learn Redux"` becomes:

```jsx
action.payload
```

The reducer uses this value to create a new todo.

### Understanding `nanoid()`

```jsx
id: nanoid()
```

`nanoid()` is provided by Redux Toolkit.

It generates a unique ID for each todo so that individual todos can be identified when updating or deleting them.

### Understanding `state.todos.push(todo)`

Normally, directly modifying state in Redux is discouraged.

However, Redux Toolkit uses a library called Immer internally.

Immer allows us to write code that looks like direct state mutation:

```jsx
state.todos.push(todo);
```

Internally, Immer tracks these changes and produces a new immutable state.

Therefore, we get simpler reducer code without directly modifying the original Redux state.

---

## 5. Removing a Todo

```jsx
removeTodo: (state, action) => {
    state.todos = state.todos.filter(
        (todo) => todo.id !== action.payload
    );
}
```

This reducer removes a todo using its ID.

When the component dispatches:

```jsx
dispatch(removeTodo(todo.id));
```

The ID becomes `action.payload`.

The `filter()` method creates a new array containing only the todos whose IDs do not match the given ID.

The resulting array replaces `state.todos`.

---

## 6. Editing a Todo

```jsx
editTodo: (state, action) => {
    state.todos = state.todos.map((todo) =>
        todo.id === action.payload.id
            ? {
                ...todo,
                text: action.payload.text
            }
            : todo
    );
}
```

This reducer updates the text of an existing todo.

The action receives an object containing:

```jsx
{
    id: todo.id,
    text: e.target.value
}
```

The reducer checks every todo using `map()`.

- If the ID matches, it creates an updated todo object.
- Otherwise, it returns the existing todo.

The spread operator preserves the other properties, including `id` and `completed`, while replacing the text.

---

## 7. Toggling Todo Completion

```jsx
toggleComplete: (state, action) => {
    state.todos = state.todos.map((todo) =>
        todo.id === action.payload
            ? {
                ...todo,
                completed: !todo.completed
            }
            : todo
    );
}
```

This reducer changes the completion status of a selected todo.

The component dispatches its ID:

```jsx
dispatch(toggleComplete(todo.id));
```

The reducer finds the matching todo and reverses its Boolean value.

- `false` becomes `true`.
- `true` becomes `false`.

The rest of the todo object remains unchanged.

---

## 8. Understanding Actions and Action Creators

At the bottom of `TodoSlice.js`:

```jsx
export const {
    addTodo,
    removeTodo,
    editTodo,
    toggleComplete
} = todoSlice.actions;
```

This is an important part of Redux Toolkit.

When we define reducers inside `createSlice()`, Redux Toolkit automatically generates corresponding action creators.

For example:

```jsx
addTodo("Learn Redux")
```

creates an action object similar to:

```jsx
{
    type: "todo/addTodo",
    payload: "Learn Redux"
}
```

The action contains:

- `type`: identifies which reducer should handle it.
- `payload`: contains the data passed to the action creator.

The generated action creators are exported so components can import and dispatch them.

### Exporting the Reducer

```jsx
export default todoSlice.reducer;
```

The slice also provides a combined reducer that handles all the reducers defined inside it.

We export this reducer and use it when configuring the Redux store.

Remember the distinction:

- `todoSlice.actions` gives us the action creators.
- `todoSlice.reducer` gives us the reducer used by the store.

---

## 9. Connecting Redux with React

**File:** `src/App.jsx`

```jsx
import { Provider, useSelector } from 'react-redux'
import { store } from './app/store'
```

Redux itself manages the state, but React components need a way to access that store.

React Redux provides the `Provider` component and hooks such as `useSelector()` and `useDispatch()`.

### Understanding Provider

```jsx
function App() {
    return (
        <Provider store={store}>
            <TodoApp />
        </Provider>
    )
}
```

The Provider makes the Redux store available to components inside it.

Here, the store created in `store.js` is passed through the `store` prop.

The component hierarchy is:

```text
App
 |
 Provider
 |
 TodoApp
 ├── TodoForm
 └── TodoItem
```

All these components can access the same Redux store using React Redux hooks.

---

## 10. Reading State with `useSelector()`

Inside `TodoApp`:

```jsx
const todos = useSelector((state) => state.todos);
```

`useSelector()` allows a component to read a selected value from the Redux store.

The callback receives the current root state.

Our root state has this structure:

```jsx
{
    todos: [...]
}
```

Therefore:

```jsx
state.todos
```

returns the todo array.

Whenever the selected state changes, React Redux updates the component so it can display the latest todos.

### Rendering the Todos

```jsx
{todos.map((todo) => (
    <TodoItem todo={todo} />
))}
```

The `map()` method creates a TodoItem component for each todo.

Each component receives one todo object through props.

This is an important distinction:

- Redux provides the shared todo data.
- Props pass an individual todo object from TodoApp to TodoItem.

Redux and props can work together in the same application.

---

## 11. Updating State with `useDispatch()`

**File:** `src/components/TodoFrom.jsx`

```jsx
import { useDispatch } from 'react-redux'
import { addTodo } from '../faetures/Todo/TodoSlice';

const dispatch = useDispatch();
```

`useDispatch()` provides the dispatch function associated with the Redux store.

We use this function to send actions to Redux.

### Adding a Todo from the Form

```jsx
const addTodoHandler = (e) => {
    e.preventDefault()
    dispatch(addTodo(todo));
    setTodo("")
}
```

When the form is submitted:

1. `preventDefault()` prevents the browser's default form submission.
2. `dispatch(addTodo(todo))` creates and dispatches the addTodo action.
3. Redux sends the action to the appropriate reducer.
4. The reducer updates the todo state.
5. The form input is cleared using `setTodo("")`.

### Local State vs Redux State

```jsx
const [todo, setTodo] = useState("");
```

Notice that this component still uses `useState()`.

Why?

Because not all state needs to be stored in Redux.

The `todo` variable only stores the text currently being typed into the input field. It is local to TodoForm.

Once the user submits the form, that value is sent to Redux and becomes part of the shared todo state.

This is a useful principle:

- Use local React state for component-specific data.
- Use Redux for shared application data that multiple components need to access or update.

---

## 12. Managing Individual Todos

**File:** `src/components/TodoItem.jsx`

Each TodoItem component receives a todo object through props:

```jsx
function TodoItem({ todo }) {
```

It also uses:

```jsx
const dispatch = useDispatch();
const [isEditable, setEditable] = useState(false);
```

Here:

- `dispatch` allows the component to send actions to Redux.
- `isEditable` controls whether the input can be edited.

Notice that `isEditable` is local state, not Redux state. There is no need to store this temporary UI condition globally.

### A. Completing a Todo

```jsx
<input
    type="checkbox"
    checked={todo.completed}
    onChange={() => dispatch(toggleComplete(todo.id))}
/>
```

The checkbox is controlled by the `completed` property.

When the user changes it, the component dispatches `toggleComplete()` with the todo ID.

The reducer updates the completion status in Redux.

### B. Editing a Todo

```jsx
<input
    type="text"
    value={todo.text}
    readOnly={!isEditable}
    onChange={(e) =>
        dispatch(editTodo({
            id: todo.id,
            text: e.target.value
        }))
    }
/>
```

The input displays the current todo text.

When editing is enabled, the user can type into it.

Each time the input changes, the component dispatches an `editTodo` action with the todo ID and updated text.

The reducer updates the corresponding todo in the Redux store.

### C. Switching Edit Mode

```jsx
onClick={() => {
    setEditable((prev) => !prev)
}}
```

This changes the local `isEditable` state.

The input becomes editable when the value is `true` and read-only when it is `false`.

The button also becomes disabled for completed todos:

```jsx
disabled={todo.completed}
```

### D. Deleting a Todo

```jsx
onClick={() => {
    dispatch(removeTodo(todo.id))
}}
```

The delete button dispatches the `removeTodo` action with the selected todo's ID.

The reducer removes that todo from the Redux store.

---

## 13. How Everything Works Together

The complete application flow:

```text
                  Redux Store
                       |
                 configureStore()
                       |
                 Todo Reducer
                       |
                ----------------
                |              |
             TodoApp        TodoForm
                |              |
          useSelector()    useDispatch()
                |              |
          Reads todos       addTodo()
                |              |
                |          Action dispatched
                |              |
                |              v
                |          Todo Reducer
                |              |
                |          State updated
                |              |
                <--------------
                |
           Renders TodoItem
                |
         -----------------
         |       |       |
        Edit   Delete  Complete
         |       |       |
         --------|-------
                |
          useDispatch()
                |
          Redux Reducer
                |
          Store updated
```

The important thing to understand is that components do not directly modify the Redux store.

They dispatch actions, and the corresponding reducers handle the state updates.

## 14. Important Concepts to Remember

| Concept | Purpose |
|---|---|
| Redux Store | Central location for application state |
| `configureStore()` | Creates and configures the store |
| `createSlice()` | Defines initial state and reducers |
| Reducer | Describes how state changes |
| Action | Describes an operation to perform |
| Action creator | Creates an action object |
| `action.payload` | Carries data sent with an action |
| `useDispatch()` | Dispatches actions from components |
| `useSelector()` | Reads selected state from the store |
| Provider | Makes the Redux store available to React components |
| `nanoid()` | Generates unique IDs |
| Immer | Allows simpler immutable state updates |

## 15. Important Improvements

The project demonstrates the main Redux Toolkit concepts, but a few improvements are worth making.

### 1. Add a `key` when rendering todos

Currently:

```jsx
{todos.map((todo) => (
    <TodoItem todo={todo} />
))}
```

A better version is:

```jsx
{todos.map((todo) => (
    <TodoItem key={todo.id} todo={todo} />
))}
```

React uses keys to identify individual elements when rendering lists.

### 2. Prevent empty todos

The current form dispatches `addTodo(todo)` without checking whether the input is empty.

You can add:

```jsx
if (!todo.trim()) return;
```

before dispatching the action.

### 3. Editing updates Redux on every keystroke

In TodoItem, every input change dispatches `editTodo()` immediately.

This works, but an alternative is to keep the edited text in local state and dispatch the update only when the user clicks Save.

That reduces unnecessary Redux updates while typing.

### 4. No Local Storage persistence

Unlike the previous Context API Todo project, this project does not save todos in Local Storage.

The Redux store currently exists in memory, so refreshing the page restores the initial state.

### 5. Add a proper folder name

The current folder is named `faetures`. A clearer spelling is `features`.

The component file `TodoFrom.jsx` could also be renamed to `TodoForm.jsx`.

---

## How to Run

```bash
npm install
npm run dev
```

## Main Learning

Redux Toolkit provides a centralized way to manage shared application state.

In this project, the Redux store holds the todos, slices define the operations, components dispatch actions using `useDispatch()`, and components read updated data using `useSelector()`.

The key idea is:

**Components dispatch actions → Reducers update state → Store holds the updated state → Components receive the updated data.**