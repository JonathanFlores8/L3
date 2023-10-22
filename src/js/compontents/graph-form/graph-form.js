const graphFormTemplate = document.createElement("template");
graphFormTemplate.innerHTML = `
  <style>
    h2 {
        margin-bottom: 15px;
        color: #333;
        text-align: center;
    }

    .form-container {
        display: flex;
        flex-direction: column;
        align-items: center;       
        justify-content: center;   
        gap: 10px;
    }

    input[type="text"], select {
        padding: 10px 15px;
        border: 2px solid #111510;
        border-radius: 6px;
        font-size: 14px;
        transition: border-color 0.2s;
    }

    input[type="text"]:focus, select:focus {
        border-color: #0a0d0f;
        outline: none;
        box-shadow: 0 0 0 1px #0a0d0f;
    }

    select {
        background-color: #fff;
    }

    #addMore {
        background-color: #657F5F;
        color: #fff;
        padding: 10px 20px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
        transition: background-color 0.2s, transform 0.2s, border-color 0.2s, box-shadow 0.2s;
        margin-top: 10px;
    }

    #addMore:focus {
        outline: none;
        border: 2px solid #111510;
    }

    #addMore:hover {
        background-color: #556A4F;
    }

    #addMore:active {
        transform: scale(0.98);
    }

    .label-input, .data-input {
        margin-bottom: 10px; 
    }

</style>

  <div class="form-container">
    <!-- Dynamic data inputs will be added based on form type -->
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
            <h2>Step 2: Choose Graph Type</h2>
            <select id="chartType">
                <option value="bar">Bar Graph</option>
                <option value="pie">Pie Chart</option>
            </select>
            <error-message id="typeError"></error-message>
            <custom-button label="Confirm"></custom-button>
        `;
    }

    setupTitleForm() {
      const formContainer = this.shadowRoot.querySelector(".form-container");
      formContainer.innerHTML = `
        <h2>Step 1: Enter Graph Title</h2>
        <input type="text" placeholder="Enter graph title..." id="graphTitleInput">
        <error-message id="titleError"></error-message>
        <custom-button label="Submit"></custom-button>
      `;
    }

    setupDataForm() {
      const formContainer = this.shadowRoot.querySelector(".form-container");
      formContainer.innerHTML = `
        <h2>Step 3: Enter Graph Data</h2>
        <div class="data-entries">
          <div class="data-entry">
            <input type="text" class="label-input" placeholder="Enter label...">
            <input type="text" class="data-input" placeholder="Enter data...">
          </div>
        </div>
        <error-message id="dataError"></error-message>
        <button id="addMore">Add more</button>
        <custom-button label="Generate Graph"></custom-button>
      `;

      this.shadowRoot
        .getElementById("addMore")
        .addEventListener("click", this.addMoreInputs.bind(this));
    }

    addMoreInputs() {
      const dataEntriesDiv = this.shadowRoot.querySelector(".data-entries");
      const newEntryDiv = document.createElement("div");
      newEntryDiv.className = "data-entry";
      newEntryDiv.innerHTML = `
        <input type="text" class="label-input" placeholder="Enter label...">
        <input type="text" class="data-input" placeholder="Enter data...">
      `;
      dataEntriesDiv.appendChild(newEntryDiv);
    }

    handleSubmit() {
      const formType = this.getAttribute("type");
      const eventData = {};
      try {
        switch (formType) {
          case "title":
            this.validateAndSetEventDataForTitle(eventData);
            break;
          case "graphType":
            this.validateAndSetEventDataForGraphType(eventData);
            break;
          case "data":
            this.validateAndSetEventDataForData(eventData);
            break;
        }

        this.dispatchEvent(
          new CustomEvent("formDataChange", {
            detail: eventData,
            bubbles: true,
            composed: true,
          })
        );
      } catch (error) {
        console.error(error);
        this.showErrorMessage(formType, error.message);
      }
    }

    validateAndSetEventDataForTitle(eventData) {
      const title = this.shadowRoot.querySelector("input").value.trim();
      if (!title) {
        throw new Error("Graph title is required.");
      }
      eventData.title = title;
    }

    validateAndSetEventDataForGraphType(eventData) {
      const selectedType = this.shadowRoot.getElementById("chartType").value;
      if (!selectedType) {
        throw new Error("Please select a graph type.");
      }
      eventData.type = selectedType;
    }

    validateAndSetEventDataForData(eventData) {
      const labelInputs = this.shadowRoot.querySelectorAll(".label-input");
      const dataInputs = this.shadowRoot.querySelectorAll(".data-input");
      const labels = [];
      const data = [];

      labelInputs.forEach((input, index) => {
        const label = input.value.trim();
        const dataValue = Number(dataInputs[index].value);
        if (!label || isNaN(dataValue)) {
          throw new Error("Please ensure all fields are filled correctly.");
        }
        labels.push(label);
        data.push(dataValue);
      });

      eventData.labels = labels;
      eventData.data = data;
    }

    showErrorMessage(formType, message) {
      const errorElement = this.shadowRoot.querySelector(`#${formType}Error`);
      if (errorElement) {
        errorElement.textContent = message;
        errorElement.show();
      }
    }
  }
);
