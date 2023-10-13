import { MyChart } from 'testgraphifyjs'

const template = document.createElement('template')
template.innerHTML = `
<style>
  body {
    background-color: #f4f4f4;
  }

  #barCanvas {
    transform: scale(1);
    max-width: 100%;
    border: 1px solid #ccc;
  }

  h1 {
    color: #333;
    text-align: center;
  }

  input, select {
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }

  button {
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
    text-align: center;
    display: none;
  }

  .stats-container {
    text-align: center;
  }

  .single-stat {
  }

  .add-stat-btn {
    display: block;
    margin: 10px auto; 
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;

  }

</style>

<div>
  <h1>Input Statistics</h1>
  <select id="chartType">
    <option value="bar">Bar Chart</option>
    <option value="pie">Pie Chart</option>
  </select>
  <div class="stats-container">
    <div class="single-stat">
      <input type="text" placeholder="Enter a number e.g. 10">
    </div>
  </div>
  <button class="add-stat-btn">+</button>
  <button id="generateGraph">Generate Graph</button>
  <p id="error-message">Invalid input. Please enter numbers.</p>
  <canvas id="barCanvas"></canvas>
  <button id="downloadPNG">Download as PNG</button>
</div>
`

/**
 * Custom web component for input and generation of charts.
 *
 * @extends {HTMLElement}
 */
customElements.define('input-component', class InputComponent extends HTMLElement {
  /**
   * Constructor for the custom element.
   */
    constructor () {
      super()
      // Attach shadow DOM and append template content
      const shadowRoot = this.attachShadow({ mode: 'open' })
      shadowRoot.appendChild(template.content.cloneNode(true))

      // Initialize element references
      this.chartTypeElement = shadowRoot.querySelector('#chartType')
      this.statsContainer = shadowRoot.querySelector('.stats-container')
      this.generateGraphButton = shadowRoot.querySelector('#generateGraph')
      this.addStatButton = shadowRoot.querySelector('.add-stat-btn')
      this.barCanvas = shadowRoot.querySelector('#barCanvas')
      this.errorMessage = shadowRoot.querySelector('#error-message')
      this.downloadPNGButton = shadowRoot.querySelector('#downloadPNG')

      // Add event listeners
      this.generateGraphButton.addEventListener('click', () => {
        this.generateGraph()
      })

      this.addStatButton.addEventListener('click', () => {
        this.addStatInput()
      })

      this.downloadPNGButton.addEventListener('click', () => {
        this.downloadGraphAsPNG()
      })
    }

    /**
     * Adds a new stat input field to the component.
     */
    addStatInput () {
      const inputWrapper = document.createElement('div')
      inputWrapper.classList.add('single-stat')
      const inputField = document.createElement('input')
      inputField.type = 'text'
      inputField.placeholder = 'Enter a number e.g. 10'
      inputWrapper.appendChild(inputField)
      this.statsContainer.appendChild(inputWrapper)
    }

    /**
     * Generates the graph based on user input.
     */
    generateGraph () {
      const inputs = this.statsContainer.querySelectorAll('input')
      const values = []
      inputs.forEach(input => {
        const value = parseInt(input.value, 10)
        if (!isNaN(value)) {
          values.push(value)
        }
      })

      if (values.length === 0 || values.length !== inputs.length) {
        this.errorMessage.style.display = 'block'
        return
      } else {
        this.errorMessage.style.display = 'none'
      }

      const barCtx = this.barCanvas.getContext('2d')
      const selectedChartType = this.chartTypeElement.value
      const barConfig = {
        type: selectedChartType,
        data: values,
        labels: Array.from({ length: values.length }, (_, i) => `Label ${i + 1}`),
        color: 'blue'
      }

      const chart = new MyChart(barCtx, barConfig).init()
      chart.draw()
      chart.toggleGrid(true)
    }

    /**
     * Validates the input value to ensure it's a number.
     *
     * @param {string} value - The value to validate.
     * @returns {boolean} - Returns true if value is a number, else false.
     */
    validateInput (value) {
      return !isNaN(parseInt(value, 10))
    }

    /**
     * Downloads the generated graph as a PNG image.
     */
    downloadGraphAsPNG () {
      const format = 'image/png'
      const image = this.barCanvas.toDataURL(format)
      const link = document.createElement('a')
      link.href = image
      link.download = `graph.${format.split('/')[1]}`
      link.click()
    }
  })
