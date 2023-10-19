import { MyChart } from "testgraphifyjs";

const graphRendererTemplate = document.createElement("template");
graphRendererTemplate.innerHTML = `
  <style>
    /* Add your styles for GraphRenderer here */
  </style>
  <canvas id="graphCanvas" width="600" height="400"></canvas>
`;

customElements.define(
  "graph-renderer",
  class GraphRenderer extends HTMLElement {
    static get observedAttributes() {
      return ["data", "labels", "type", "color"];
    }

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
      if (
        name === "data" ||
        name === "labels" ||
        name === "type" ||
        name === "color"
      ) {
        this.initChart();
      }
    }

    initChart() {
      const ctx = this.shadowRoot
        .getElementById("graphCanvas")
        .getContext("2d");
      const config = {
        type: this.getAttribute("type") || "bar",
        data: this.getAttribute("data")
          ? this.getAttribute("data").split(",").map(Number)
          : [],
        labels: this.getAttribute("labels")
          ? this.getAttribute("labels").split(",")
          : [],
        color: this.getAttribute("color") || "blue",
      };

      this.chart = new MyChart(ctx, config).init();
      this.chart.draw();
    }

    set data(newData) {
      if (this.chart) {
        this.chart.data = newData.split(",").map(Number);
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
