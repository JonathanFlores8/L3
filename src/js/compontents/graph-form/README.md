# GraphForm Component

The `GraphForm` is a Web Component designed to simplify and manage user input for graph creation, tailored to different stages of the process.

## Features

- Modular design, catering to distinct steps of graph creation: title input, graph type selection, and data input.
- Dynamic user interface, providing the relevant form fields based on the type of graph and data required.
- Validation of user input, ensuring the integrity of the data provided for graph generation.

## Installation

1. Include the `graph-form` component script in your project.
2. Use the `<graph-form></graph-form>` HTML tag in your markup, specifying the form type via the `type` attribute.

## Attributes

- `type`: Specifies the type of form to render. Possible values are `"title"`, `"graphType"`, and `"data"`.

## Usage

Here's how to integrate and use the `GraphForm` component in your web application:

### Title Input

```html
<graph-form type="title"></graph-form>
```

This renders an input field for the user to enter the title of the graph.

### Graph Type Selection

```html
<graph-form type="graphType"></graph-form>
```

This renders a dropdown for the user to select the type of graph they want to create.

### Data Input

```html
<graph-form type="data"></graph-form>
```

This renders input fields for the user to enter labels and corresponding data values for the graph.

## Methods

- `handleSubmit()`: Validates the user input and dispatches the `formDataChange` event with the input data.

## Events

- `formDataChange`: Dispatched when the user submits the form, carrying the user input data as event details.

## Styling

The `GraphForm` component comes with predefined styling, ensuring a clean and user-friendly interface. If you need to customize its appearance, you can do so by applying CSS styles to the component in your stylesheet:

```css
graph-form .form-container {
  /* your custom styles here */
}
```
