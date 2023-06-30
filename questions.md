# 1. What is the difference between Component and PureComponent?

In a regular `Component`, the `shouldComponentUpdate` method always returns true by default, which means the component will re-render whenever its parent re-renders, regardless of whether the component's props or state have actually changed.

On the other hand, `PureComponent` implements a `shouldComponentUpdate` method with a shallow prop and state comparison. It performs a shallow equality check between the previous and current props and state. If there are no changes detected in the shallow comparison, PureComponent prevents unnecessary re-renders by returning false from `shouldComponentUpdate`.

An example where using `PureComponent` might `break` your app is when the props passed to the component contain complex data structures, such as arrays or objects. Since PureComponent performs a shallow comparison, it might not detect changes within nested elements of these complex data structures. In such cases, the component won't re-render even if the nested data has changed, leading to incorrect rendering of the component.

# 2. Context + ShouldComponentUpdate might be dangerous. Why is that?

Using `Context` together with `shouldComponentUpdate` can be dangerous because `shouldComponentUpdate` does not automatically update when the context changes. By default, `shouldComponentUpdate` does not include context changes in its comparison, so if you rely on context in your component's rendering or logic, using `shouldComponentUpdate` might cause inconsistencies.
If you use `shouldComponentUpdate` with Context, it's crucial to manually check the relevant context values in your `shouldComponentUpdate` implementation and return true when the context changes. Failing to do so can lead to outdated or incorrect data being displayed in your component.

# 3. Describe 3 ways to pass information from a component to its PARENT

`Callback functions`: The parent component passes a callback function as a prop to the child component. The child component calls this function with the necessary information, allowing the parent to handle the data or update its state accordingly.

`Props`: The parent component can pass down props to the child component, and the child component can update those props directly if they are mutable. By updating the props, the child can indirectly communicate with the parent.

`Context`: React's Context API allows you to create a context in a higher-level component and provide it to descendant components. The child component can access the context and update its value, which can be observed by the parent component subscribing to the context changes.

# 4. Give 2 ways to prevent components from re-rendering

Using `shouldComponentUpdate` or `React.memo()`: By implementing the `shouldComponentUpdate` method in a class component or wrapping a functional component with `React.memo()`, you can define custom logic to determine if the component should re-render. Returning false from `shouldComponentUpdate` or `React.memo()` will prevent the component from re-rendering unless its props or state have changed.

Using the React.PureComponent class: As mentioned earlier, PureComponent performs a shallow prop and state comparison and prevents re-rendering if there are no changes. It is an optimized version of Component that can automatically prevent unnecessary re-renders.

# 5. What is a fragment and why do we need it? Give an example where it might break my app

A `fragment` in React is a lightweight syntax that allows you to group multiple elements together without adding an additional node to the DOM. It is useful when you want to return multiple elements from a component's render method without wrapping them in a parent element.

An example where using `fragments` might break your app is when you have components that rely on the parent-child relationship in the DOM structure. For instance, if you have `CSS` selectors targeting specific child elements or you are using libraries that assume a specific DOM structure, using `fragments` to group elements might break the expected behavior.

# 6. Give 3 examples of the HOC pattern

`withRouter`: This HOC is provided by the react-router library. It enhances a component by injecting the history, location, and match objects as props, allowing the component to access routing-related information and react to changes in the URL.

`connect (Redux)`: The connect function from the react-redux library is an HOC that connects a React component to a Redux store. It provides the component with the ability to access the store's state and dispatch actions.

`withStyles`: This HOC is often used with CSS-in-JS libraries like styled-components or emotion. It allows you to pass styles as props to a component, enhancing it with the specified styling.

# 7. What's the difference in handling exceptions in promises, callbacks and async...await?

`Promises`: In promises, you can use the .catch() method to handle any errors that occur during the promise chain. Errors can be caught at any point in the chain using .catch(), and the control flows to the nearest catch block. If a promise is not explicitly handled with .catch(), the error will be propagated to the next catch block in the promise chain.

`Callbacks`: With callbacks, error handling is typically done by passing an error parameter as the first argument in the callback function. If an error occurs, the error parameter is populated, and the developer can check for errors and handle them accordingly within the callback function.

`async/await`: With async/await, error handling is done using `try/catch` blocks. The `await` keyword is used to `await` a promise, and any errors thrown within the try block can be caught in the corresponding catch block.

This provides a more synchronous and structured way of handling errors compared to callbacks or raw promises.

# 8. How many arguments does setState take and why is it async

The setState method in React takes two arguments: an object representing the updated state and an optional callback function to be executed after the state has been updated. The callback function is not always necessary and can be omitted.

The reason setState is asynchronous is to optimize the performance of React. When you call setState, React batches multiple state updates together and performs a single re-render for better efficiency. By batching updates, React avoids unnecessary re-renders and improves the overall performance of the application.

# 9. List the steps needed to migrate a Class to Function Component

1. Rewrite the component as a function using the arrow function syntax or the function keyword.

2. Move any state variables declared using this.state to the useState hook.

3. Replace lifecycle methods like `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` with their equivalent hooks (`useEffect`, `useLayoutEffect`, and `useEffect` with a cleanup function respectively).
Replace class methods with regular functions.

4. Update any references to this.props with the corresponding prop variables received as function arguments.

5. If your component uses context, use the useContext hook to access the context values.

6. Remove the class declaration and export the component as a default function.

# 10. List a few ways styles can be used with components

`Inline styles`: You can apply inline styles directly to an element using the style attribute. Inline styles are defined as JavaScript objects, where the keys represent CSS properties and the values represent their corresponding values.

`<div style={{ color: 'red', fontSize: '16px' }}>Inline styled div</div>.`

`CSS classes`: You can define CSS classes and apply them to components using the className attribute. The classes are defined in external CSS files or within the component using CSS-in-JS libraries.

`<div className="myClass">Component with CSS class</div>.`

`CSS-in-JS libraries`: Libraries like styled-components or emotion allow you to define styles directly in your JavaScript code. These libraries provide a way to write CSS styles using template literals or tagged template syntax, allowing for dynamic styles based on props or state.

`const StyledButton = styled.button background-color: ${props => props.primary ? 'blue' : 'gray'}; color: white;`

# 11. How to render an HTML string coming from the server

To render an HTML string safely, you can use the `dangerouslySetInnerHTML` prop provided by React.

```
function MyComponent({ htmlString }) {
  return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
}
```
