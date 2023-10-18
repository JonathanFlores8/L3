import { MyChart } from "testgraphifyjs";

const template = document.createElement("template");
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
  <chart-buttons></chart-buttons>
  <error-handler id="input-error-handler"></error-handler>
`;

customElements.define(
  "input-component",
  class InputComponent extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(template.content.cloneNode(true));

      this.initializeMembers();
      this.setupEventListeners();
      this.initializeUI();
      
    }

    initializeMembers() {
      this.selectedChartType = "bar";
      this.elements = {
        errorHandler: this.shadowRoot.querySelector("#input-error-handler"),
        chartTitle: this.shadowRoot.querySelector("#chartTitle"),
        createGraphButton: this.shadowRoot.querySelector("#createGraphButton"),
        newChartButton: this.shadowRoot.querySelector("#newChart"),
        chartType: this.shadowRoot.querySelector("#chartType"),
        statsContainer: this.shadowRoot.querySelector(".stats-container"),
        generateGraphButton: this.shadowRoot.querySelector("#generateGraph"),
        addStatButton: this.shadowRoot.querySelector(".add-stat-btn"),
        barCanvas: this.shadowRoot.querySelector("#barCanvas"),
        errorMessage: this.shadowRoot.querySelector("#error-message"),
        downloadPNGButton: this.shadowRoot.querySelector("#downloadPNG"),
        confirmChartTypeButton:
          this.shadowRoot.querySelector("#confirmChartType"),
      };
    }

    setupEventListeners = () => {
      this.elements.createGraphButton.addEventListener(
        "click",
        this.handleGraphCreation.bind(this)
      );
      this.elements.generateGraphButton.addEventListener(
        "click",
        this.generateGraph.bind(this)
      );
      this.elements.addStatButton.addEventListener(
        "click",
        this.addStatInput.bind(this)
      );
      this.elements.downloadPNGButton.addEventListener(
        "click",
        this.downloadGraphAsPNG.bind(this)
      );
      this.elements.newChartButton.addEventListener(
        "click",
        this.newChart.bind(this)
      );
      this.elements.confirmChartTypeButton.addEventListener(
        "click",
        this.confirmChartType.bind(this)
      );
      this.elements.chartType.addEventListener(
        "change",
        this.handleChartTypeChange.bind(this)
      );
    }

    initializeUI() {
      this.hideAllElements();
      this.displayElements([
        this.elements.chartTitle,
        this.elements.createGraphButton,
      ]);
    }

    handleGraphCreation() {
      const isTitlePresent = this.elements.chartTitle.value.trim() !== "";
      if (isTitlePresent) {
        this.hideAllElements();
        this.displayElements([
          this.elements.chartType,
          this.elements.confirmChartTypeButton,
        ]);
      }
    }

    handleChartTypeChange() {
      this.selectedChartType = this.elements.chartType.value;
      this.elements.confirmChartTypeButton.style.display = "block";
    }

    confirmChartType() {
      if (this.elements.chartType.value) {
        this.hideAllElements();
        this.elements.statsContainer.style.display = "block";
        this.elements.addStatButton.style.display = "block";
        this.elements.generateGraphButton.style.display = "block";
      }
    }

    addStatInput() {
      const statEntry = this.createStatEntryElement();
      this.elements.statsContainer.appendChild(statEntry);
    }

    createStatEntryElement() {
      const wrapper = this.createWrapperDivWithClass("stat-entry");

      const labelField = this.createInput("text", "Label e.g. One");
      const valueField = this.createInput("text", "Value e.g. 10");

      wrapper.append(labelField, valueField);

      return wrapper;
    }

    createInput(type, placeholder) {
      const input = document.createElement("input");
      input.type = type;
      input.placeholder = placeholder;
      return input;
    }

    createWrapperDivWithClass(className) {
      const div = document.createElement("div");
      div.classList.add(className);
      return div;
    }

    generateGraph() {
      const pixelRatio = window.devicePixelRatio || 1;

      const desiredWidth = 800;
      const desiredHeight = 400;

      this.elements.barCanvas.width = desiredWidth * pixelRatio;
      this.elements.barCanvas.height = desiredHeight * pixelRatio;
      this.elements.barCanvas.style.width = `${desiredWidth}px`;
      this.elements.barCanvas.style.height = `${desiredHeight}px`;

      const chartCtx = this.elements.barCanvas.getContext("2d");
      chartCtx.scale(pixelRatio, pixelRatio);

      const statEntries =
        this.elements.statsContainer.querySelectorAll(".stat-entry");
      const values = [];
      const labels = [];

      statEntries.forEach((entry) => {
        const labelInput = entry.querySelector(
          'input[type="text"]:first-child'
        );
        const valueInput = entry.querySelector('input[type="text"]:last-child');
        const value = parseFloat(valueInput.value);

        if (!isNaN(value) && labelInput.value.trim() !== "") {
          values.push(value);
          labels.push(labelInput.value);
        }
      });

      if (values.length === 0 || values.length !== statEntries.length) {
        this.elements.errorMessage.style.display = "block";
        return;
      } else {
        this.elements.errorMessage.style.display = "none";
      }

      const selectedChartType = this.elements.chartType.value;
      const chartTitle = this.elements.chartTitle.value;

      let chartConfig;

      if (selectedChartType === "bar") {
        chartConfig = {
          type: selectedChartType,
          data: values,
          labels,
          color: "blue",
        };
      } else if (selectedChartType === "pie") {
        const colors = ["yellow", "orange", "pink"];
        chartConfig = {
          type: selectedChartType,
          data: values,
          labels,
          colors: colors.slice(0, values.length),
        };
      }

      const chart = new MyChart(chartCtx, chartConfig).init();
      chart.draw();

      if (selectedChartType === "bar") {
        chart.toggleGrid(true);
      }

      this.elements.barCanvas.style.display = "block";
      this.elements.downloadPNGButton.style.display = "block";
      this.elements.newChartButton.style.display = "block";
    }

    downloadGraphAsPNG() {
      const format = "image/png";
      const image = this.elements.barCanvas.toDataURL(format);
      this.triggerDownload(image, `graph.${format.split("/")[1]}`);
    }

    triggerDownload(href, downloadName) {
      const link = document.createElement("a");
      link.href = href;
      link.download = downloadName;
      link.click();
    }

    newChart() {
      location.reload();
    }

    hideAllElements() {
      this.modifyDisplayOfElements(Object.values(this.elements), "none");
    }

    displayElements(elements) {
      this.modifyDisplayOfElements(elements, "block");
    }
	
    modifyDisplayOfElements(elements, displayType) {
      elements.forEach((element) => {
        element.style.display = displayType;
      });
    }
  }
);
