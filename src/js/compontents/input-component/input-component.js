import { MyChart } from 'testgraphifyjs'

const template = document.createElement('template')
template.innerHTML = `
<style>
#barCanvas {
    max-width: 100%;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.05);
    margin-top: 20px;
}

h1 {
    color: #2c3e50;
    text-align: center;
    font-size: 42px;
    font-weight: 600;
    margin-bottom: 20px;
}

input, select {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #e5e5e5;
    font-size: 16px;
    color: #555;
    outline: none;
    transition: border-color 0.2s;
}

input:focus, select:focus {
    border-color: #007BFF;
}

button {
    padding: 10px 15px;
    background-color: #85bb65;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    margin-top: 10px;
}

button:hover {
    background-color: #83a96a;
    transform: translateY(-1px);
}

button:active {
    transform: translateY(0);
}

.error-message {
    color: #e74c3c;
    margin-top: 10px;
    text-align: center;
    display: none;
    font-weight: 500;
}

.stats-container {
    width: 100%;
    text-align: center;
    margin-top: 10px;
}

.add-stat-btn {
    display: block;
    margin: 15px auto;
    width: 100%;
    max-width: 150px;
}

.main-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    box-sizing: border-box;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
}

.hidden {
    display: none;
}

.stat-entry {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 15px;
}

.stat-entry input[type="text"] {
    flex: 1;
    margin-right: 10px;
}

#chartType {
    background-color: white;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
    padding: 10px 15px;
    font-size: 16px;
    color: #555;
    width: 100%;
    cursor: pointer;
}

#createGraphButton {
  display: block
}
</style>



<div class="main-container">
  <h1>Create Your Chart</h1>
  <div class="title-box">
  <input type="text" id="chartTitle" placeholder="Enter Chart Title" />
  <button id="createGraphButton">Create My Graph</button>
  </div>
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
  <error-handler id="input-error-handler"></error-handler>
`

customElements.define('input-component', class InputComponent extends HTMLElement {

    constructor () {
      super()
      const shadowRoot = this.attachShadow({ mode: 'open' })
      shadowRoot.appendChild(template.content.cloneNode(true))

      this.selectedChartType = 'bar'

      this.errorHandler = shadowRoot.querySelector('#input-error-handler');
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
          color: 'blue'
        }
      } else if (selectedChartType === 'pie') {
        const colors = ['yellow', 'orange', 'pink']
        chartConfig = {
          type: selectedChartType,
          data: values,
          labels,
          colors: colors.slice(0, values.length)
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

    downloadGraphAsPNG () {
      const format = 'image/png'
      const image = this.barCanvas.toDataURL(format)
      const link = document.createElement('a')
      link.href = image
      link.download = `graph.${format.split('/')[1]}`
      link.click()
    }

    newChart () {
      this.chartTypeElement.value = 'bar'
      this.statsContainer.innerHTML = ''
      this.addStatInput()
      this.barCanvas.classList.add('hidden')
      this.downloadPNGButton.classList.add('hidden')
      this.newChartButton.classList.add('hidden')
      this.errorMessage.style.display = 'none'
    }

    revealNextStep (step) {
      const element = this.shadowRoot.querySelector(`[data-step="${step}"]`)
      if (element) {
        element.classList.remove('hidden')
      }
    }

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
