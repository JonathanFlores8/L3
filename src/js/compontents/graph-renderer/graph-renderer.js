import { MyChart } from "testgraphifyjs";

const graphRendererTemplate = document.createElement("template");
graphRendererTemplate.innerHTML = `
  <style>
    canvas {
  display: block;
  margin: 0 auto;
  border: 1px solid #ddd;
}
  </style>
  <canvas id="graphCanvas" width="600" height="400"></canvas>
`;

customElements.define(
  "graph-renderer",
  class GraphRenderer extends HTMLElement {

    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(
        graphRendererTemplate.content.cloneNode(true)
      );
      this.chart = null;
    }

    connectedCallback() {
      this.initChart();
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === "data" || name === "labels" || name === "type" || name === "color") {
        this.initChart();
      }
    }

    initChart() {
        const ctx = this.shadowRoot.getElementById("graphCanvas").getContext("2d");
        
        const chartType = this.getAttribute("type") || "bar";
        const data = this.getAttribute("data") ? this.getAttribute("data").split(",").map(Number) : [];
        const labels = this.getAttribute("labels") ? this.getAttribute("labels").split(",") : [];
        
        let config = {};
      
        if (chartType === "bar") {
          config = {
            type: 'bar',
            data: data,
            labels: labels,
            color: this.getAttribute("color") || "blue"
          };
        } else if (chartType === "pie") {
          const colors = this.getAttribute("colors") ? this.getAttribute("colors").split(",") : [];
          config = {
            type: 'pie',
            data: data,
            labels: labels,
            colors: colors.length ? colors : ['yellow', 'orange', 'pink'] // default colors if not provided
          };
        }
      
        this.chart = new MyChart(ctx, config).init();
        this.chart.draw();
      }
      

    set data(newData) {
      if (this.chart) {
        this.chart.data.datasets[0].data = newData.split(",").map(Number);
        this.chart.update();
      }
    }

    render() {
      if (this.chart) {
        this.chart.update();
      }
    }
  }
);
