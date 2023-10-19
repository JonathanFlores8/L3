const graphContainerTemplate = document.createElement("template");
graphContainerTemplate.innerHTML = `
  <style>
    .container {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
  </style>
  <div class="container">
  </div>
`;

customElements.define(
  "graph-container",
  class GraphContainer extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(
        graphContainerTemplate.content.cloneNode(true)
      );
      this.titleForm = null;
      this.typeForm = null;
      this.dataForm = null;
      this.graphRenderer = null;
      this.graphType = "";
    }

    connectedCallback() {
      this.setupTitleForm();

      this.shadowRoot.addEventListener("formDataChange", (event) => {
        const detail = event.detail;

        if (detail.title) {
          this.handleTitleSubmission(detail.title);
        } else if (detail.type) {
          this.handleGraphTypeSelection(detail.type);
        } else if (detail.labels && detail.data) {
          this.handleDataSubmission(detail);
        }
      });
    }

    setupTitleForm() {
      this.titleForm = document.createElement("graph-form");
      this.titleForm.setAttribute("type", "title");
      this.shadowRoot.querySelector(".container").appendChild(this.titleForm);
    }

    handleTitleSubmission(title) {
      this.titleForm.remove();
      this.setupGraphTypeForm();
    }

    setupGraphTypeForm() {
      this.typeForm = document.createElement("graph-form");
      this.typeForm.setAttribute("type", "graphType");
      this.shadowRoot.querySelector(".container").appendChild(this.typeForm);
    }

    handleGraphTypeSelection(graphType) {
      this.graphType = graphType;
      this.typeForm.remove();
      this.setupDataForm();
    }

    setupDataForm() {
      this.dataForm = document.createElement("graph-form");
      this.dataForm.setAttribute("type", "data");
      this.shadowRoot.querySelector(".container").appendChild(this.dataForm);
    }

    handleDataSubmission(data) {
      this.dataForm.remove();
      this.setupGraphRenderer(data);
    }

    setupGraphRenderer(data) {
      this.graphRenderer = document.createElement("graph-renderer");

      this.graphRenderer.setAttribute("type", this.graphType);
      this.graphRenderer.setAttribute("labels", data.labels.join(","));
      this.graphRenderer.setAttribute("data", data.data.join(","));

      this.shadowRoot
        .querySelector(".container")
        .appendChild(this.graphRenderer);
    }
  }
);
