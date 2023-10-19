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
  gap: 10px;
}

input[type="text"], input[type="radio"] + label {
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.2s;
}

input[type="text"]:focus {
  border-color: #007bff;
  outline: none;
}

input[type="radio"] + label {
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
  display: inline-block;
  margin-right: 10px;
}

input[type="radio"]:checked + label {
  background-color: #007bff;
  color: #fff;
  border-color: #007bff;
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
            <label><input type="radio" name="graphType" value="bar"> Bar Graph</label>
            <label><input type="radio" name="graphType" value="pie"> Pie Chart</label>
            <custom-button label="Confirm"></custom-button>
        `;
    }

    setupTitleForm() {
      const formContainer = this.shadowRoot.querySelector(".form-container");
      formContainer.innerHTML = `
        <h2>Step 1: Enter Graph Title</h2>
        <input type="text" placeholder="Enter graph title...">
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
        <button id="addMore">Add more</button>
        <custom-button label="Generate Graph"></custom-button>
      `;

      this.shadowRoot.getElementById("addMore").addEventListener("click", this.addMoreInputs.bind(this));
    }

    addMoreInputs() {
      const dataEntriesDiv = this.shadowRoot.querySelector('.data-entries');
      const newEntryDiv = document.createElement('div');
      newEntryDiv.className = 'data-entry';
      newEntryDiv.innerHTML = `
        <input type="text" class="label-input" placeholder="Enter label...">
        <input type="text" class="data-input" placeholder="Enter data...">
      `;
      dataEntriesDiv.appendChild(newEntryDiv);
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
          const labelInputs = this.shadowRoot.querySelectorAll('.label-input');
          const dataInputs = this.shadowRoot.querySelectorAll('.data-input');
          const labels = Array.from(labelInputs).map(input => input.value);
          const data = Array.from(dataInputs).map(input => Number(input.value));
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
