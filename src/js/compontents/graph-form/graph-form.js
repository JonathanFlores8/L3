const graphFormTemplate = document.createElement("template");
graphFormTemplate.innerHTML = `
  <style>
    .form-container {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  </style>

  <div class="form-container">
    <input type="text" placeholder="Enter graph data...">
    <custom-button label="Submit"></custom-button>
  </div>
`;

customElements.define(
  "graph-form",
  class GraphForm extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(graphFormTemplate.content.cloneNode(true));
    }

    connectedCallback() {
      const formType = this.getAttribute("type");

      switch (formType) {
        case "title":
          this.setupTitleForm();
          break;
        case "graphType":
          this.setupTypeForm();
          break;
        case "data":
          this.setupDataForm();
          break;
      }

      this.shadowRoot
        .querySelector("custom-button")
        .addEventListener("click", this.handleSubmit.bind(this));
    }

    setupTypeForm() {
      const formContainer = this.shadowRoot.querySelector(".form-container");
      formContainer.innerHTML = `
            <label><input type="radio" name="graphType" value="bar"> Bar Graph</label>
            <label><input type="radio" name="graphType" value="pie"> Pie Chart</label>
            <custom-button label="Confirm"></custom-button>
        `;
    }

    setupTitleForm() {
      const inputField = this.shadowRoot.querySelector("input");
      inputField.placeholder = "Enter graph title...";
    }

    setupDataForm() {
      const formContainer = this.shadowRoot.querySelector(".form-container");
      formContainer.innerHTML = `
            <input type="text" placeholder="Enter labels (comma-separated)">
            <input type="text" placeholder="Enter data (comma-separated)">
            <custom-button label="Generate Graph"></custom-button>
        `;
    }

    handleSubmit() {
      const formType = this.getAttribute("type");
      let eventData = {};

      switch (formType) {
        case "title":
          eventData.title = this.shadowRoot.querySelector("input").value;
          break;
        case "graphType":
          const selectedType = this.shadowRoot.querySelector(
            'input[name="graphType"]:checked'
          ).value;
          eventData.type = selectedType;
          break;
        case "data":
          const labelsInput = this.shadowRoot.querySelector(
            'input[placeholder="Enter labels (comma-separated)"]'
          );
          const dataInput = this.shadowRoot.querySelector(
            'input[placeholder="Enter data (comma-separated)"]'
          );

          const labels = labelsInput ? labelsInput.value.split(",") : [];
          const data = dataInput ? dataInput.value.split(",").map(Number) : [];

          eventData.labels = labels;
          eventData.data = data;
          break;
      }

      this.dispatchEvent(
        new CustomEvent("formDataChange", {
          detail: eventData,
          bubbles: true,
          composed: true,
        })
      );
    }
  }
);
