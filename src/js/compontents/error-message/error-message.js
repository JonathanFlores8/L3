const errorComponentTemplate = document.createElement("template");
errorComponentTemplate.innerHTML = `
  <style>
    .error-container {
      color: red;
      padding: 10px;
      display: none;
      margin-bottom: 10px;
    }
  </style>
  <div class="error-container">
    <slot></slot>
  </div>
`;

customElements.define(
  "error-message",
  class ErrorMessage extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(errorComponentTemplate.content.cloneNode(true));
    }

    connectedCallback() {
      if (this.textContent) {
        this.show();
      }
    }

    show() {
      this.shadowRoot.querySelector('.error-container').style.display = 'block';
    }

    hide() {
      this.shadowRoot.querySelector('.error-container').style.display = 'none';
    }
  }
);
