## 1. What is the difference between Component and PureComponent? Give an example where it might break my app.

Component and PureComponent are base classes in React for creating components. The differences lies in how they handle component updates and re-renders.

Component will always re-render whenever its parent component re-renders or when new props are received.

PureComponent performs a shallow comparison of the component props and state. If there are no changes detected in the shallow comparison, the component does not re-render.

PureComponent is based on shallow comparisons and may not be suitable for all scenarios.

## 2. Context + ShouldComponentUpdate might be dangerous. Why is that?

If you need to use context + ShouldComponentUpdate, ShouldComponentUpdate method needs a exhaustive comparison of the equality of the context values to ensures that the component properly re-render. This is more error-prone and more complicated to implement.

## 3. Describe 3 ways to pass information from a component to its PARENT.

- Callback Functions: The parent component defines the callback function and handles the data passed from the child component.

- React Context: The context allows sharing data across multiple components without passing props explicitly at each level.

- Using Ref: Using ref for this purpose goes against the principles of the React component architecture and can lead to code that is harder to understand and maintain.

## 4. Give 2 ways to prevent components from re-rendering.

- Using memorization like React.memo() or useMemo() hook.

- Using shouldComponentUpdate() you can compare the current props and state with the next props and state and return false to prevent re-rendering if they are the same.

## 5. What is a fragment and why do we need it? Give an example where it might break my app.

A fragment allows you to group elements without introducing an additional HTML element in the rendered output and keep the DOM structure cleaner.

In React components, you can only return a single element. With fragments, you can return multiple elements as a single value.

Some libraries or tools may not support fragments.

```jsx
const MyComponent = () => {
  return (
    <>
      <Element1>
      <Element2>
      <Element3>
    </>
  );
}
```

## 6. Give 3 examples of the HOC pattern.

- Authentication Higher Order Component.
- ErrorBoundary Higher Order Component.
- Styling or Theme Higher Order Component.

## 7. What's the difference in handling exceptions in promises, callbacks and async...await?

**promises:** The .catch() method is used to handle errors in promises. It allows you to specify a callback function that will be called if the promise rejects.

```jsx
promise()
  .then(result => {
    // Handle success
  })
  .catch(error => {
    // Handle error
  });
```

**callbacks:** The error handling is typically done by convention. The common practice is to pass an error object as the first argument to the callback function if an error occurs.

```jsx
callbackFunction((error, result) => {
  if (error) {
    // Handle error
  } else {
    // Handle success
  }
});
```

**async/await:** The error handling is done using try-catch blocks. The await keyword is used to wait for a promise to resolve or reject, and any error thrown inside the try block can be caught in the catch block.

```jsx
const asyncFunction = async () => {
  try {
    const result = await promise();
    // Handle success
  } catch (error) {
    // Handle error
  }
}
```

## 8. How many arguments does setState take and why is it async.

2 arguments, the new state and the second argument is a optional callback function that will be called after the state update is completed.

setState is async because React to improve performance handles state updates in batches. This way, React can perform a single re-render after processing all queued state updates, instead of performing multiple re-renders for each individual state change.

## 9. List the steps needed to migrate a Class to Function Component.

- Rewrite the component as a Function component.
- Replace the render method with a return.
- Replace the component state with the useState hook.
- Replace lifecycle methods with their equivalent useEffect hook.
- Convert class methods to regular functions.
Test and verify the functionality.

## 10. List a few ways styles can be used with components.

- CSS Classes
- CSS Modules
- Inline Styles
- Styled Components

## 11. How to render an HTML string coming from the server.

Using dangerouslySetInnerHTML.

```jsx
<div dangerouslySetInnerHTML={{ __html: htmlString }} />
```
To use this method, make sure that the HTML string is trusted and properly sanitized to prevent cross-site scripting attacks.
