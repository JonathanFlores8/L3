import { MyChart } from 'testgraphifyjs'
/**
 * The virtual-window component.
 *
 */

/**
 * Define template.
 */
const template = document.createElement('template')
template.innerHTML = `
<style>
  body {
    background-color: #f4f4f4;
  }

  #barCanvas {
    width: 400px;
    height: 300px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }

  h1 {
    color: #333;
  }

  input {
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
    width: 250px;
  }

  button {
    margin-left: 10px;
    padding: 10px 15px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  button:hover {
    background-color: #0056b3;
  }

  .error-message {
    color: red;
    margin-top: 5px;
    display: none;
  }

</style>
<div>
  <h1>Input Statistics</h1>
  <input type="text" id="statInput" placeholder="Enter comma-separated numbers e.g. 10,20,30">
  <button id="generateGraph">Generate Graph</button>
  <p id="error-message">Invalid input. Please enter comma-separated numbers.</p>
  <canvas id="barCanvas"></canvas>
</div>
`

/*
 * Define custom element.
 */
customElements.define(
  'input-component',
  /**
   * A virtual window
   */
  class InputComponent extends HTMLElement {
    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this element and
      // append the template to the shadow root.
      const shadowRoot = this.attachShadow({ mode: 'open' })
      shadowRoot.appendChild(template.content.cloneNode(true))

      this.inputElement = shadowRoot.querySelector('#statInput')
      this.generateGraphButton = shadowRoot.querySelector('#generateGraph')
      this.barCanvas = shadowRoot.querySelector('#barCanvas')
      this.errorMessage = shadowRoot.querySelector('#error-message')

      this.generateGraphButton.addEventListener('click', () => {
        this.generateGraph()
      })
    }

    /**
     *
     */
    generateGraph () {
      const value = this.inputElement.value.split(',').map(num => parseInt(num, 10))

      if (!this.validateInput(this.inputElement.value)) {
        this.errorMessage.style.display = 'block'
        return
      } else {
        this.errorMessage.style.display = 'none'
      }

      const barCtx = this.barCanvas.getContext('2d')
      const barConfig = {
        type: 'bar',
        data: value,
        labels: Array.from({ length: value.length }, (_, i) => `Label ${i + 1}`),
        color: 'blue'
      }

      const barChart = new MyChart(barCtx, barConfig).init()
      barChart.draw()
      barChart.toggleGrid(true)
    }

    /**
     *
     * @param value
     */
    validateInput (value) {
      return value.split(',').every(num => !isNaN(num))
    }
  }
)
