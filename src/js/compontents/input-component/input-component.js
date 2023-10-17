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

  .hidden {
    display: none;
  }
  
  .stat-entry {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .stat-entry input[type="text"] {
    flex: 1;
    margin-right: 5px;
  }

</style>

<div>
  <h1>Create Your Chart</h1>

  <input type="text" id="chartTitle" placeholder="Enter Chart Title" />
  <button id="createGraphButton">Create My Graph</button>

  <select id="chartType">
    <option value="bar">Bar Chart</option>
    <option value="pie">Pie Chart</option>
  </select>

  <div class="stats-container">
    <div class="stat-entry">
      <input type="text" placeholder="Label e.g. One">
      <input type="text" placeholder="Value e.g. 10">
    </div>
  </div>

  <button class="add-stat-btn">Add Stat</button>
  <button id="generateGraph">Generate Graph</button>
  <p id="error-message">Invalid input. Please enter numbers.</p>

  <canvas id="barCanvas" class="hidden"></canvas>

  <button id="downloadPNG" class="hidden">Download as PNG</button>
  <button id="newChart" class="hidden">New Chart</button>
  <button id="confirmChartType" class="hidden">Confirm Chart Type</button>
</div>
`

/**
 * Custom web component for input and generation of charts.
 *
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

      this.selectedChartType = 'bar'
      // Initialize element references
      this.chartTitleElement = shadowRoot.querySelector('#chartTitle')
      this.createGraphButton = shadowRoot.querySelector('#createGraphButton')
      this.newChartButton = shadowRoot.querySelector('#newChart')
      this.chartTypeElement = shadowRoot.querySelector('#chartType')
      this.statsContainer = shadowRoot.querySelector('.stats-container')
      this.generateGraphButton = shadowRoot.querySelector('#generateGraph')
      this.addStatButton = shadowRoot.querySelector('.add-stat-btn')
      this.barCanvas = shadowRoot.querySelector('#barCanvas')
      this.errorMessage = shadowRoot.querySelector('#error-message')
      this.downloadPNGButton = shadowRoot.querySelector('#downloadPNG')
      this.confirmChartTypeButton = shadowRoot.querySelector('#confirmChartType')

      this.hideAllElements()
      this.chartTitleElement.style.display = 'block'
      this.createGraphButton.style.display = 'block'

      this.createGraphButton.addEventListener('click', () => {
        if (this.chartTitleElement.value.trim() !== '') {
          this.hideAllElements()
          this.chartTypeElement.style.display = 'block'
        }
      })

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

      this.newChartButton.addEventListener('click', () => {
        this.newChart()
      })

      this.chartTitleElement = shadowRoot.querySelector('#chartTitle')
      this.chartTitleElement.addEventListener('input', (e) => {
        if (e.target.value.trim() !== '') {
          this.revealNextStep(2)
        }

        this.chartTypeElement.addEventListener('change', () => {
          this.confirmChartTypeButton.style.display = 'block'
          this.revealNextStep(3)
        })
      })

      this.confirmChartTypeButton.addEventListener('click', () => {
        const selectedChartType = this.chartTypeElement.value
        if (selectedChartType) {
          this.hideAllElements()
          this.statsContainer.style.display = 'block'
          this.addStatButton.style.display = 'block'
          this.generateGraphButton.style.display = 'block'
        }
      })

      this.createGraphButton.addEventListener('click', () => {
        if (this.chartTitleElement.value.trim() !== '') {
          this.hideAllElements()
          this.chartTypeElement.style.display = 'block'
          this.confirmChartTypeButton.style.display = 'block'
        }
      })
      this.chartTypeElement.addEventListener('change', () => {
        this.selectedChartType = this.chartTypeElement.value
        this.confirmChartTypeButton.style.display = 'block'
        this.revealNextStep(3)
      })
    }

    /**
     * Adds a new stat input field to the component.
     */
    addStatInput () {
      const inputWrapper = document.createElement('div')
      inputWrapper.classList.add('stat-entry')
      const labelField = document.createElement('input')
      labelField.type = 'text'
      labelField.placeholder = 'Label e.g. One'
      const inputField = document.createElement('input')
      inputField.type = 'text'
      inputField.placeholder = 'Value e.g. 10'
      inputWrapper.appendChild(labelField)
      inputWrapper.appendChild(inputField)
      this.statsContainer.appendChild(inputWrapper)
    }

    /**
     * Generates the graph based on user input.
     */
    generateGraph () {
      const statEntries = this.statsContainer.querySelectorAll('.stat-entry')
      const values = []
      const labels = []

      statEntries.forEach(entry => {
        const labelInput = entry.querySelector('input[type="text"]:first-child')
        const valueInput = entry.querySelector('input[type="text"]:last-child')
        const value = parseInt(valueInput.value, 10)

        if (!isNaN(value)) {
          values.push(value)
          labels.push(labelInput.value)
        }
      })

      if (values.length === 0 || values.length !== statEntries.length) {
        this.errorMessage.style.display = 'block'
        return
      } else {
        this.errorMessage.style.display = 'none'
      }

      const chartCtx = this.barCanvas.getContext('2d')
      const selectedChartType = this.chartTypeElement.value
      const chartTitle = this.chartTitleElement.value

      let chartConfig

      if (selectedChartType === 'bar') {
        chartConfig = {
          type: selectedChartType,
          data: values,
          labels,
          color: 'blue' // You can adjust this color as needed or provide a dynamic way for user to choose
        }
      } else if (selectedChartType === 'pie') {
        // We assume equal distribution of colors for simplicity.
        // You might need to adjust this for more dynamic behavior.
        const colors = ['yellow', 'orange', 'pink'] // Default colors, can be dynamic
        chartConfig = {
          type: selectedChartType,
          data: values,
          labels,
          colors: colors.slice(0, values.length) // Slicing to match the data count
        }
      }

      const chart = new MyChart(chartCtx, chartConfig).init()
      chart.draw()

      if (selectedChartType === 'bar') {
        chart.toggleGrid(true)
      }

      this.barCanvas.style.display = 'block'
      this.downloadPNGButton.style.display = 'block'
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

    /**
     *
     */
    newChart () {
      this.chartTypeElement.value = 'bar'
      this.statsContainer.innerHTML = ''
      this.addStatInput()
      this.barCanvas.classList.add('hidden')
      this.downloadPNGButton.classList.add('hidden')
      this.newChartButton.classList.add('hidden')
      this.errorMessage.style.display = 'none'
    }

    /**
     *
     * @param step
     */
    revealNextStep (step) {
      const element = this.shadowRoot.querySelector(`[data-step="${step}"]`)
      if (element) {
        element.classList.remove('hidden')
      }
    }

    /**
     *
     */
    hideAllElements () {
      this.chartTitleElement.style.display = 'none'
      this.chartTypeElement.style.display = 'none'
      this.statsContainer.style.display = 'none'
      this.addStatButton.style.display = 'none'
      this.generateGraphButton.style.display = 'none'
      this.barCanvas.style.display = 'none'
      this.downloadPNGButton.style.display = 'none'
      this.newChartButton.style.display = 'none'
      this.errorMessage.style.display = 'none'
      this.createGraphButton.style.display = 'none'
      this.confirmChartTypeButton.style.display = 'none'
    }
  })
