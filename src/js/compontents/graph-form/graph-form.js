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
      let eventData = {};
      let hasError = false; // Flag to check if any validation error occurs

      switch (formType) {
        case "title":
          const title = this.shadowRoot.querySelector("input").value;
          if (title.trim() === "") {
            // If title is empty or just whitespace
            const titleError = this.shadowRoot.querySelector("#titleError");
            titleError.textContent = "Graph title is required.";
            titleError.show();
            hasError = true;
          } else {
            eventData.title = title;
          }
          break;

        case "graphType":
          const selectedType =
            this.shadowRoot.getElementById("chartType").value;
          if (!selectedType) {
            // If no type is selected
            const typeError = this.shadowRoot.querySelector("#typeError");
            typeError.textContent = "Please select a graph type.";
            typeError.show();
            hasError = true;
          } else {
            eventData.type = selectedType;
          }
          break;

        case "data":
          const labelInputs = this.shadowRoot.querySelectorAll(".label-input");
          const dataInputs = this.shadowRoot.querySelectorAll(".data-input");

          // Checking for any empty fields
          labelInputs.forEach((input, index) => {
            if (
              input.value.trim() === "" ||
              isNaN(Number(dataInputs[index].value))
            ) {
              const dataError = this.shadowRoot.querySelector("#dataError");
              dataError.textContent =
                "Please ensure all fields are filled correctly.";
              dataError.show();
              hasError = true;
            }
          });

          if (!hasError) {
            const labels = Array.from(labelInputs).map((input) => input.value);
            const data = Array.from(dataInputs).map((input) =>
              Number(input.value)
            );
            eventData.labels = labels;
            eventData.data = data;
          }
          break;
      }

      if (!hasError) {
        this.dispatchEvent(
          new CustomEvent("formDataChange", {
            detail: eventData,
            bubbles: true,
            composed: true,
          })
        );
      }
    }
  }
);
