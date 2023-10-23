import { MyChart } from 'testgraphifyjs'

const graphRendererTemplate = document.createElement('template')
graphRendererTemplate.innerHTML = `
   <style>
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    canvas {
      display: block;
      margin: 0 auto;
      border: 1px solid #ddd;
    }

    .buttons-container {
      margin-top: 20px;
      display: flex;
      gap: 10px;
    }

    button {
      background-color: #657F5F;
      color: #fff;
      padding: 10px 20px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      transition: background-color 0.2s, transform 0.2s;
    }

    button:focus {
      outline: 2px solid #111510; 
    }

    button:hover {
      background-color: #556A4F;
    }

    button:active {
      transform: scale(0.98);
    }
  </style>

  <canvas id="graphCanvas" width="600" height="400"></canvas>
  <div class="buttons-container">
    <button id="downloadBtn">Download as PNG</button>
    <button id="resetBtn">Start New Graph</button>
  </div>
`

customElements.define(
  'graph-renderer',
  class GraphRenderer extends HTMLElement {
    constructor() {
      super()
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(graphRendererTemplate.content.cloneNode(true))
      this.chart = null
    }

    connectedCallback() {
      try {
        this.initChart()
        this.addEventListeners()
      } catch (error) {
        console.error('Error initializing the graph renderer:', error)
        this.renderError('Failed to initialize the graph.')
      }
    }

    addEventListeners() {
      this.shadowRoot
        .getElementById('downloadBtn')
        .addEventListener('click', this.downloadGraph.bind(this))
      this.shadowRoot
        .getElementById('resetBtn')
        .addEventListener('click', this.resetGraph.bind(this))
    }

    downloadGraph() {
      try {
        const canvas = this.shadowRoot.getElementById('graphCanvas')
        const link = document.createElement('a')
        link.href = canvas.toDataURL('image/png')
        link.download = 'graph.png'
        link.click()
      } catch (error) {
        console.error('Error downloading the graph:', error)
        this.renderError('Failed to download the graph.')
      }
    }

    resetGraph() {
      this.dispatchEvent(
        new CustomEvent('resetGraph', {
          bubbles: true,
          composed: true,
        }),
      )
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (
        name === 'data' ||
        name === 'labels' ||
        name === 'type' ||
        name === 'color'
      ) {
        this.initChart()
      }
    }

    initChart() {
      try {
        const ctx = this.shadowRoot
          .getElementById('graphCanvas')
          .getContext('2d')

        const chartType = this.getAttribute('type') || 'bar'
        const data = this.getAttribute('data')
          ? this.getAttribute('data').split(',').map(Number)
          : []
        const labels = this.getAttribute('labels')
          ? this.getAttribute('labels').split(',')
          : []

        let config = {}

        if (chartType === 'bar') {
          config = {
            type: 'bar',
            data: data,
            labels: labels,
            color: this.getAttribute('color') || 'blue',
          }
          this.chart = new MyChart(ctx, config).init()
          this.chart.draw()
          this.chart.toggleGrid(true)
        } else if (chartType === 'pie') {
          const colors = this.getAttribute('colors')
            ? this.getAttribute('colors').split(',')
            : []
          config = {
            type: 'pie',
            data: data,
            labels: labels,
            colors: colors.length ? colors : ['yellow', 'orange', 'pink'],
          }
          this.chart = new MyChart(ctx, config).init()
          this.chart.draw()
        }
      } catch (error) {
        console.error('Error initializing the graph:', error)
        this.renderError('Failed to initialize the graph.')
      }
    }

    renderError(message) {
      const errorElement = document.createElement('div')
      errorElement.style.color = 'red'
      errorElement.textContent = message
      this.shadowRoot.appendChild(errorElement)
    }

    set data(newData) {
      if (this.chart) {
        this.chart.data.datasets[0].data = newData.split(',').map(Number)
        this.chart.update()
      }
    }

    render() {
      if (this.chart) {
        this.chart.update()
      }
    }
  },
)
