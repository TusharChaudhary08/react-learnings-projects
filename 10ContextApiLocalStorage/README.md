# 10 - React Context API with Local Storage (Todo App)

## Overview

This project is a Todo application built using React, Context API, and Local Storage.

It allows users to add, edit, delete, and mark todos as completed. The application uses Context API to share todo data and functions between components, while Local Storage is used to save the todos in the browser.

The main purpose of this project is to understand how to manage shared application state using Context API and how to persist that state using Local Storage.

### Features

- Add new todos.
- Edit existing todos.
- Delete todos.
- Mark todos as completed or incomplete.
- Save todos in Local Storage.
- Restore saved todos when the application loads.
- Disable editing for completed todos.

## Concepts Covered

- React Context API
- `createContext()`
- `useContext()`
- Context Provider
- Custom hooks
- `useState()`
- `useEffect()`
- Local Storage
- `JSON.stringify()` and `JSON.parse()`
- CRUD operations
- Array methods: `map()`, `filter()`
- Spread operator
- Controlled components
- Conditional rendering
- Event handling
- Passing props between components

---

## 1. Understanding the Project Structure

The project is divided into three main parts:

```text
src/
│
├── Components/
│   ├── TodosForm.jsx
│   └── TodosItem.jsx
│
├── Context/
│   ├── TodoContext.js
│   └── index.js
│
├── App.jsx
├── main.jsx
└── index.css
```

**Responsibilities:**

| File | Responsibility |
|---|---|
| `App.jsx` | Manages todo state and operations |
| `TodoContext.js` | Creates Context, custom hook, and Provider |
| `index.js` | Re-exports Context-related items |
| `TodosForm.jsx` | Takes input and adds new todos |
| `TodosItem.jsx` | Displays, edits, completes, and deletes individual todos |
| `main.jsx` | Renders the React application |

## 2. Creating the Todo Context

**File:** `src/Context/TodoContext.js`

```jsx
import { createContext, useContext } from "react";

export const TodoContext = createContext({
    todos: [
        {
            id: 1,
            todo: "Todo msg",
            completed: false
        }
    ],
    addTodo: (todo) => {},
    updateTodo: (id, todo) => {},
    deleteTodo: (id) => {},
    toggleComplete: (id) => {}
});

export const useTodo = () => {
    return useContext(TodoContext);
};

export const TodoContextProvider = TodoContext.Provider;
```

This file creates the Context through which components can access todo data and functions.

### Understanding `createContext()`

```jsx
export const TodoContext = createContext({...})
```

`createContext()` creates a Context object.

The object passed to it acts as a default context value. It contains the expected structure of our context:

- `todos` – an array of todo objects.
- `addTodo` – function for adding a todo.
- `updateTodo` – function for updating a todo.
- `deleteTodo` – function for deleting a todo.
- `toggleComplete` – function for changing completion status.

These are default values. The actual application values are supplied later through the Provider in `App.jsx`.

The empty functions are placeholders; they don't perform any operation.

### Understanding the Custom Hook

```jsx
export const useTodo = () => {
    return useContext(TodoContext);
};
```

Normally, every component that needs the context would write:

```jsx
const context = useContext(TodoContext);
```

Instead, this project creates a custom hook called `useTodo()`.

Now components can simply write:

```jsx
const { addTodo } = useTodo();
```

This makes the code cleaner and avoids repeating the same `useContext()` expression in different components.

### Understanding the Provider

```jsx
export const TodoContextProvider = TodoContext.Provider;
```

Here, we are exporting the Provider belonging to `TodoContext` under a different name.

Instead of writing:

```jsx
<TodoContext.Provider value={...}>
```

We can write:

```jsx
<TodoContextProvider value={...}>
```

Both refer to the same Provider.

---

## 3. Managing Todo State and Operations

**File:** `src/App.jsx`

```jsx
const [todos, setTodos] = useState([])
```

The main todo state is maintained inside the App component.

Initially, it is an empty array because there are no todos.

Each todo is represented by an object:

```jsx
{
    id: 123456,
    todo: "Learn React",
    completed: false
}
```

- `id` uniquely identifies the todo.
- `todo` stores its text.
- `completed` stores whether it is completed.

The App component also contains four functions that perform operations on the todo array.

### A. Adding a Todo

```jsx
const addTodo = (todo) => {
    setTodos((prev) => [
        { id: Date.now(), ...todo },
        ...prev
    ])
}
```

This function receives a todo object from the TodosForm component.

For example:

```jsx
addTodo({
    todo: "Learn React",
    completed: false
})
```

The function uses the previous state to create a new array.

**Understanding the spread operator:**

```jsx
{ id: Date.now(), ...todo }
```

This creates a new object containing a unique ID and the properties received in the `todo` object.

The second spread:

```jsx
...prev
```

copies all existing todos into the new array.

The new todo is placed at the beginning of the array, so the latest todo appears first.

Using the previous state is useful because the new state is calculated from the existing todos.

### B. Updating a Todo

```jsx
const updateTodo = (id, todo) => {
    setTodos((prev) =>
        prev.map((prevTodo) =>
            prevTodo.id === id ? todo : prevTodo
        )
    )
}
```

This function receives the ID of the todo that needs to be updated and the updated todo object.

The `map()` method creates a new array by checking every todo.

- If the current todo's ID matches the given ID, it returns the updated object.
- Otherwise, it returns the existing todo object.

This ensures that only the selected todo is replaced.

We use `map()` instead of directly modifying the existing array because React state should be updated immutably.

### C. Deleting a Todo

```jsx
const deleteTodo = (id) => {
    setTodos((prev) =>
        prev.filter((todo) => todo.id !== id)
    )
}
```

This function removes a todo using its ID.

The `filter()` method creates a new array containing only the todos that satisfy the condition.

```jsx
todo.id !== id
```

This means:

- Keep todos whose IDs are different from the given ID.
- Exclude the todo whose ID matches.

### D. Toggling Completion

```jsx
const toggleComplete = (id) => {
    setTodos((prev) =>
        prev.map((prevTodo) =>
            prevTodo.id === id
                ? {
                    ...prevTodo,
                    completed: !prevTodo.completed
                }
                : prevTodo
        )
    )
}
```

This function changes a todo's completion status.

The important part is:

```jsx
completed: !prevTodo.completed
```

The `!` operator reverses the Boolean value.

- If `completed` is `false`, it becomes `true`.
- If `completed` is `true`, it becomes `false`.

We use the spread operator to preserve the other properties of the todo object while changing only its completion status.

---

## 4. Providing Data Through Context API

Inside the App component:

```jsx
<TodoContextProvider
    value={{
        todos,
        addTodo,
        updateTodo,
        deleteTodo,
        toggleComplete
    }}
>
    {/* Components */}
</TodoContextProvider>
```

This is where the actual application data and functions are supplied to Context.

The Provider makes the following available to its descendant components:

- The current todo array.
- The function for adding todos.
- The function for updating todos.
- The function for deleting todos.
- The function for changing completion status.

Both `TodosForm` and `TodosItem` can access these values using `useTodo()`.

This is the main advantage of Context API in this project: components do not need to receive all these functions through props.

## 5. Adding Todos Through TodosForm

**File:** `src/Components/TodosForm.jsx`

```jsx
const [todo, setTodo] = useState("")
const { addTodo } = useTodo()
```

This component has its own local state for the text currently being typed.

It also accesses `addTodo()` from Context.

### Controlled Input

```jsx
<input
    type="text"
    value={todo}
    onChange={(e) => setTodo(e.target.value)}
/>
```

The input value is controlled by React state.

Whenever the user types:

1. The `onChange` event runs.
2. `e.target.value` gets the current input value.
3. `setTodo()` updates the state.
4. The input displays the updated value.

### Submitting the Form

```jsx
const add = (e) => {
    e.preventDefault()

    if (!todo) return

    addTodo({
        todo,
        completed: false
    })

    setTodo("")
}
```

When the form is submitted:

1. `preventDefault()` prevents the browser from refreshing the page.
2. The condition checks whether the input is empty.
3. `addTodo()` sends the new todo to the App component through Context.
4. The input is cleared using `setTodo("")`.

Notice the connection: TodosForm does not directly modify the main `todos` state. It calls the function provided by Context, and that function updates the state inside App.

---

## 6. Managing Individual Todos

**File:** `src/Components/TodosItem.jsx`

This component receives an individual todo through props:

```jsx
function TodosItem({ todo }) {
```

App renders this component using:

```jsx
{todos.map((todo) => (
    <div key={todo.id}>
        <TodosItem todo={todo} />
    </div>
))}
```

The `map()` method creates one TodosItem component for every todo in the array.

The `todo` prop contains the data of that particular item.

### Local State for Editing

```jsx
const [isTodoEditable, setIsTodoEditable] = useState(false);
const [todoMsg, setTodoMsg] = useState(todo.todo);
```

These two states handle editing.

- `isTodoEditable` determines whether the input can be edited.
- `todoMsg` stores the text being edited.

The original todo is used as the initial value of `todoMsg`.

### Editing a Todo

```jsx
const editTodo = (e) => {
    updateTodo(todo.id, {
        ...todo,
        todo: todoMsg
    })

    setIsTodoEditable(false);
}
```

When the user saves an edited todo:

1. The component calls `updateTodo()` from Context.
2. It passes the selected todo's ID.
3. It creates an updated object using the spread operator.
4. The `todo` property is replaced with the edited text.
5. Editing mode is turned off.

The actual array update happens inside the `updateTodo()` function in App.

### Switching Between Edit and Save

```jsx
onClick={() => {
    if (todo.completed) return;

    if (isTodoEditable) {
        editTodo();
    } else {
        setIsTodoEditable((prev) => !prev);
    }
}}
```

This button performs two different operations depending on the current state.

- If editing is disabled, it enables editing.
- If editing is enabled, it saves the changes.

The button is also disabled when the todo is completed.

### Making the Input Read-Only

```jsx
readOnly={!isTodoEditable}
```

When `isTodoEditable` is false, the input becomes read-only.

When it is true, the user can edit the text.

### Completing a Todo

```jsx
<input
    type="checkbox"
    checked={todo.completed}
    onChange={toggleCompleted}
/>
```

The checkbox is controlled by the `completed` property of the todo.

When the checkbox changes, `toggleCompleted()` calls the `toggleComplete()` function from Context.

The todo's completion status is updated in the main App state.

The UI also uses conditional styling to show completed todos with a different background and a line through their text.

### Deleting a Todo

```jsx
onClick={() => deleteTodo(todo.id)}
```

The delete button calls the context function and passes the ID of the selected todo.

The `deleteTodo()` function then removes that item from the main array.

---

## 7. Understanding Local Storage

One of the important additions in this project is Local Storage.

Normally, React state exists in memory. If the browser page is refreshed, the state is initialized again.

Local Storage allows us to save data in the browser so that it can remain available after refreshing the page.

### A. Loading Todos from Local Storage

Inside App:

```jsx
useEffect(() => {
    const todos = JSON.parse(
        localStorage.getItem("todos")
    );

    if (todos && todos.length > 0) {
        setTodos(todos);
    }
}, []);
```

The empty dependency array means this effect runs after the component's initial render.

**Understanding `localStorage.getItem()`:**

```jsx
localStorage.getItem("todos")
```

This retrieves the value stored under the key `"todos"`.

However, Local Storage stores values as strings.

**Understanding `JSON.parse()`:**

```jsx
JSON.parse(...)
```

Converts the stored JSON string back into a JavaScript value, in this case, an array of todo objects.

After retrieving the todos, `setTodos()` updates the React state.

### B. Saving Todos to Local Storage

```jsx
useEffect(() => {
    localStorage.setItem(
        "todos",
        JSON.stringify(todos)
    );
}, [todos]);
```

This effect runs whenever the `todos` state changes.

**Understanding `JSON.stringify()`:**

```jsx
JSON.stringify(todos)
```

Converts the JavaScript array into a JSON string.

**Understanding `localStorage.setItem()`:**

```jsx
localStorage.setItem("todos", ...)
```

Stores that string in Local Storage under the key `"todos"`.

For example, when a todo is added:

1. `addTodo()` updates the React state.
2. React re-renders the component.
3. The `todos` dependency changes.
4. The saving effect runs.
5. The updated array is converted into a string and saved.

The same process happens when a todo is edited, deleted, or marked completed.

---

## 8. How the Entire Application Works Together

The complete data flow looks like this:

```text
                  App.jsx
                     |
               useState(todos)
                     |
          CRUD functions are created
                     |
             Context Provider
                     |
        ---------------------------
        |                         |
    TodosForm                  TodosItem
        |                         |
    Adds a todo              Edit / Delete /
        |                    Complete a todo
        |                         |
        -------- Context ----------
                     |
              Updates todos
                     |
                App re-renders
                     |
             useEffect([todos])
                     |
              Local Storage
                     |
              Saves the todos
```

When the application loads, the loading effect retrieves saved todos from Local Storage and updates the state.

After that, the user can perform operations through the components. Every change updates the central state, and the saving effect keeps Local Storage synchronized with it.

## 9. Important Concepts to Remember

| Concept | Purpose in this project |
|---|---|
| `createContext()` | Creates a shared context |
| Provider | Makes todo data and functions available to child components |
| `useContext()` | Allows components to access shared values |
| Custom hook | Makes context access cleaner through `useTodo()` |
| `useState()` | Stores todos and local input/editing state |
| `useEffect()` | Loads and saves todos |
| `map()` | Updates todos and renders the todo list |
| `filter()` | Deletes a selected todo |
| Spread operator | Creates updated objects and arrays |
| `JSON.stringify()` | Converts JavaScript data into a JSON string |
| `JSON.parse()` | Converts stored JSON back into JavaScript data |
| Local Storage | Persists todos in the browser |

## 10. Important Improvements to Know

This project demonstrates the concepts well, but there are a few implementation details worth improving.

### 1. Initial Local Storage loading

The current code has two effects:

- The first loads todos from Local Storage.
- The second saves todos whenever the state changes.

Both effects run after the initial render. Because the initial state is an empty array, the saving effect can write that empty array before the loaded state is applied.

A safer approach is to initialize the state directly from Local Storage:

```jsx
const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
});
```

Then keep the saving effect:

```jsx
useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
}, [todos]);
```

This reads the saved data during state initialization and avoids the initial loading/saving conflict.

### 2. Validate whitespace-only input

The current condition:

```jsx
if (!todo) return
```

does not prevent a user from entering only spaces.

A stronger check is:

```jsx
if (!todo.trim()) return
```

### 3. Remove unused imports

`App.jsx` imports `TodoContext` but does not use it. `TodosItem.jsx` also imports `use` without using it.

These unused imports can be removed.

### 4. Use a unique ID

`Date.now()` is convenient for this learning project, but it is not guaranteed to produce unique IDs if multiple todos are created within the same millisecond. A dedicated ID-generation approach is more reliable in larger applications.

---

## How to Run

```bash
npm install
npm run dev
```

---

**Main Learning:** Context API allows multiple components to access shared application state and operations. Local Storage adds persistence, allowing the application to restore saved todos even after the browser page is refreshed.
