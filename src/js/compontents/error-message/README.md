# ErrorMessage Component

The `ErrorMessage` is a Web Component designed to display error messages in a consistent and clear manner.

## Features

- Reusable across different projects.
- Provides a clear visual cue for errors.
- Flexible with content - can accept text, HTML, or other components.
- Easy to show or hide programmatically.

## Installation

1. Include the `error-message` component script in your project.
2. Use the `<error-message></error-message>` HTML tag in your markup wherever you wish to place the error message.

## Attributes

There are no specific attributes for this component. However, you can pass any text or HTML content between the opening and closing tags to be displayed as the error message.

## Usage

Here's a simple example of how to use the `ErrorMessage` component:

```html
<error-message>Your error message here!</error-message>
```

Or with HTML content:

```html
<error-message> <strong>Error:</strong> Invalid input provided. </error-message>
```

## Methods

- `show()`: Makes the error message visible.
- `hide()`: Hides the error message.

## Styling

The error message comes with a predefined style, which highlights errors in red. If you need to customize its appearance further, you can do so by overriding the provided CSS:

```css
error-message .error-container {
  /* your custom styles here */
}
```
