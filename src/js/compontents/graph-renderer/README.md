# GraphRenderer Component

The `GraphRenderer` is a Web Component designed for rendering and managing graphs in your web application. It utilizes the `MyChart` library from "testgraphifyjs" for creating and manipulating the graphs.

## Features

- Seamless integration of `MyChart` library for graph rendering.
- User-friendly interface with buttons for downloading the graph and starting a new one.
- Support for customizing the type of graph, its data, labels, and colors through attributes.
- Error handling and display.

## Installation

1. Ensure that "testgraphifyjs" and its `MyChart` library are installed and properly configured in your project.
2. Include the `graph-renderer` component script in your project.
3. Use the `<graph-renderer></graph-renderer>` HTML tag in your markup.

## Attributes

- `type`: Specifies the type of the graph (`"bar"` or `"pie"`). Default is `"bar"`.
- `data`: Comma-separated string of data values for the graph.
- `labels`: Comma-separated string of labels for the graph data.
- `color`: (For bar charts) Specifies the color of the bars.
- `colors`: (For pie charts) Comma-separated string of colors for each slice.

## Usage

Here's how to integrate and use the `GraphRenderer` component in your web application:

### Example Markup

```html
<graph-renderer 
  type="bar" 
  data="10,20,30" 
  labels="Jan,Feb,Mar" 
  color="blue">
</graph-renderer>
```

This renders a bar chart with the specified data, labels, and color.

## Methods

- `downloadGraph()`: Downloads the currently rendered graph as a PNG image.
- `resetGraph()`: Dispatches the `resetGraph` event, intended for handling graph reset in the parent component.
- `initChart()`: Initializes or reinitializes the chart based on the current attributes.
- `renderError(message)`: Renders an error message inside the component.

## Events

- `resetGraph`: Dispatched when the user clicks the "Start New Graph" button.

## Styling

The `GraphRenderer` component comes with predefined styling, ensuring a visually appealing graph presentation and control buttons. If you need to customize its appearance, you can do so by applying CSS styles directly to the component in your stylesheet:

```css
graph-renderer {
  /* your custom styles here */
}
```

## Error Handling

The component includes error handling and rendering capabilities, displaying an error message within the component if an error occurs during graph initialization or download.

## Methods for Data Manipulation

- `set data(newData)`: Allows for dynamic updating of the graph's data after initialization. `newData` should be a comma-separated string of new data values.

- `render()`: Triggers a re-render/update of the chart. Useful if you've made changes to the chart's datasets directly.
