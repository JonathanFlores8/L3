# GraphContainer Component

The `GraphContainer` is a Web Component designed to streamline the process of creating and displaying graphs in a web application.

## Features

- Modular design, separating different steps of graph creation.
- Dynamic rendering of forms and graphs based on user input.
- Reusable across various projects and contexts.
- Ensures a consistent and user-friendly experience in graph creation.

## Installation

1. Include the `graph-container` component script in your project.
2. Use the `<graph-container></graph-container>` HTML tag in your markup wherever you wish to integrate the graph creation and display functionality.

## Attributes

The `GraphContainer` component does not require any specific attributes for initialization. However, it interacts internally with other components and attributes as part of the graph creation process.

## Usage

Here's how to integrate the `GraphContainer` component into your web application:

```html
<graph-container></graph-container>
```

Simply including this tag will initiate the graph creation process, guiding the user through the necessary steps.

## Methods

- `resetEverything()`: Resets all forms and clears the rendered graph, allowing the user to start the graph creation process from scratch.

## Events

- `formDataChange`: Dispatched when there is a change in the form data during the graph creation process. The detail of the event contains the updated form data.
- `resetGraph`: Dispatch this custom event to trigger a reset of the entire graph creation and rendering process.

## Styling

The `GraphContainer` component comes with predefined styling ensuring a visually consistent experience. To override or extend these styles, target the internal elements of the component in your CSS:

```css
graph-container .container {
    /* your custom styles here */
}
```