# CustomButton Component

The `CustomButton` is a Web Component that provides a reusable and stylized button, allowing for dynamic text and event assignment.

## Features

- Reusable across different projects.
- Provides a consistent and elegant design.
- Easily customizable text label.
- Assignable actions on button click.

## Installation

1. Include the `custom-button` component script in your project.
2. Use the `<custom-button></custom-button>` HTML tag in your markup wherever you wish to place the button.

## Attributes

- `label`: Specifies the text to display on the button.
- `id`: Sets the ID for the button, useful for querying and other DOM-related operations.
- `classes`: Assigns additional CSS classes to the button.
- `action`: Specifies the name of a function present in the custom-button component to be executed on a button click.

## Usage

Here's a simple example of how to use the `CustomButton` component:

```html
<custom-button label="Click Me!" action="yourFunctionName"></custom-button>
```

## Styling

The button comes with a predefined style, ensuring a consistent look and feel. However, you can easily customize its appearance by overriding the provided CSS:

```css
custom-button button {
    /* your custom styles here */
}
```

## Note

Make sure the function you're trying to call with the `action` attribute exists within the `CustomButton` class.
