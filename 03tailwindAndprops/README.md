# 03 - Tailwind CSS and React Props – React 

## Overview

This project introduces two important React concepts:

1. **Tailwind CSS** – A utility-first CSS framework used to style React components directly through class names.
2. **Props** – A way to pass data from a parent component to a child component.

The project demonstrates how to apply Tailwind CSS classes to JSX elements and how to reuse a component by passing different values through props.

## Concepts Covered

- Tailwind CSS
- Utility-first CSS
- Styling JSX elements
- React components
- Props in React
- Passing props from parent to child
- Default prop values
- Component reusability
- `useState()` (imported and initialized, but not used in the displayed UI)

---

## 1. Understanding Tailwind CSS

Tailwind CSS is a utility-first CSS framework.

Normally, when styling an element using traditional CSS, we create a CSS class and write its styles separately.

For example:

```css
.heading {
    background-color: green;
    color: black;
    padding: 16px;
    border-radius: 12px;
    margin-bottom: 16px;
}
```

Then we apply that class to an element:

```jsx
<h1 className="heading">Tailwind test</h1>
```

With Tailwind CSS, we can apply these styles directly using predefined utility classes.

```jsx
<h1 className='bg-green-400 text-black p-4 rounded-xl mb-4'>
    Tailwind test
</h1>
```

### Understanding the classes

| Class | Purpose |
|---|---|
| `bg-green-400` | Sets the background color |
| `text-black` | Sets the text color to black |
| `p-4` | Adds padding on all sides |
| `rounded-xl` | Adds rounded corners |
| `mb-4` | Adds bottom margin |

The main advantage is that we don't need to write separate CSS rules for every small styling requirement.

### Why do we use `className` instead of `class`?

In React JSX, we use `className` to assign CSS classes to elements.

```jsx
<h1 className="bg-green-400">Tailwind test</h1>
```

This is because `class` is a reserved JavaScript keyword, so JSX uses `className` for the HTML class attribute.

---

## 2. Understanding Props in React

Props stands for **properties**.

Props allow a parent component to pass data to a child component.

For example, in this project, the `App` component renders the `Card` component:

```jsx
<Card username="chaiaurcode" btnText="click me" />
<Card username="hitesh" />
```

Here, `App` is the parent component and `Card` is the child component.

The parent passes two different sets of data to the same component.

### Understanding the first Card

```jsx
<Card username="chaiaurcode" btnText="click me" />
```

This passes two props:

- `username` with the value `"chaiaurcode"`.
- `btnText` with the value `"click me"`.

### Understanding the second Card

```jsx
<Card username="hitesh" />
```

This passes only one prop:

- `username` with the value `"hitesh"`.

Notice that we are using the same Card component twice but passing different values.

This is what makes components reusable.

---

## 3. How Props Work

When a parent component passes props to a child component, React makes those values available to the child through its function parameters.

For example, a Card component could receive them like this:

```jsx
function Card({ username, btnText }) {
    return (
        <div>
            <h2>{username}</h2>
            <button>{btnText}</button>
        </div>
    );
}
```

This is an illustrative example of receiving props; the actual implementation of your Card component needs to be checked separately.

### Understanding Props Destructuring

Instead of writing:

```jsx
function Card(props) {
    return <h2>{props.username}</h2>;
}
```

We can destructure the properties directly:

```jsx
function Card({ username }) {
    return <h2>{username}</h2>;
}
```

Both approaches access the same prop.

Destructuring simply makes the code shorter and easier to read.

### Understanding Default Prop Values

Look at the second component usage:

```jsx
<Card username="hitesh" />
```

Here, we don't pass `btnText`.

If the Card component needs a default button label, it can define one:

```jsx
function Card({ username, btnText = "Visit" }) {
    return (
        <div>
            <h2>{username}</h2>
            <button>{btnText}</button>
        </div>
    );
}
```

Now, when `btnText` is not provided, it uses `"Visit"`.

This is called a default parameter value.

The actual default behavior depends on how your Card component is written.

---

## 4. Understanding `useState()`

Your App component contains:

```jsx
const [count, setCount] = useState(0)
```

`useState()` is a React Hook used to create and manage state inside a functional component.

Here:

- `count` stores the current value.
- `setCount` updates that value.
- `0` is the initial value.

However, in the current project code, neither `count` nor `setCount` is used in the JSX.

So this project does not actually demonstrate state updates or counter functionality.

The `useState` import and state declaration are currently unnecessary and can be removed.

---

## 5. Understanding JavaScript Objects and Arrays

Your App component also contains:

```jsx
let myObj = {
    username: "hitesh",
    age: 21
}

let newArr = [1, 2, 3]
```

These demonstrate basic JavaScript data structures.

### Object

An object stores data using key-value pairs.

Here:

- `username` is a key with the value `"hitesh"`.
- `age` is a key with the value `21`.

### Array

An array stores multiple values in an ordered collection.

Here, `newArr` contains three numbers.

Both variables are currently unused in the displayed JSX. They do not participate in passing props because the Card components receive their values directly through JSX attributes.

---

## 6. Understanding Component Reusability

One important lesson from this project is that we don't need to create separate components for every card.

Instead, we create one reusable component and pass different data to it.

```jsx
<Card username="chaiaurcode" btnText="click me" />
<Card username="hitesh" />
```

The component structure remains the same, but the supplied props can change.

This approach is useful when building:

- Product cards
- User profile cards
- Blog cards
- Navigation items
- Repeated UI elements

---

## 7. How Everything Connects

```text
                 App Component
                       |
              Renders Card Component
                       |
              ---------------------
              |                   |
           Card 1               Card 2
              |                   |
       username:             username:
       chaiaurcode            hitesh
       btnText:               btnText:
       click me               Not provided
              |                   |
              ---------------------
                       |
                Same reusable
                Card component
```

The parent component decides what data each Card receives.

The child component can then use those props to display dynamic content.

## 8. Important Things to Remember

| Concept | What to remember |
|---|---|
| Tailwind CSS | Styles elements using utility classes |
| `className` | Applies CSS classes in JSX |
| Props | Pass data from parent to child |
| Destructuring | Makes accessing props easier |
| Default values | Provide fallback values when props are missing |
| Component reusability | Allows the same component to display different data |
| `useState()` | Manages component state, though it is unused in this example |

## How to Run

```bash
npm install
npm run dev
```

---

**Main Learning:** Tailwind CSS makes styling easier through utility classes, while React props allow us to reuse components by passing different data from parent components to child components.