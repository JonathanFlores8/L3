const buttonTemplate = document.createElement("template");
buttonTemplate.innerHTML = `
<style>
  custom-button {
  display: inline-block;
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
  outline: 2px solid #111510; /* You can change the color as per your preference */
}

button:hover {
  background-color: #556A4F;
}

button:active {
  transform: scale(0.98);
}
</style>

<button></button>
`;

customElements.define(
  "custom-button",
  class CustomButton extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(buttonTemplate.content.cloneNode(true));
    }

    connectedCallback() {
      this.configureButtonAttributes();
    }

    configureButtonAttributes() {
      const button = this.shadowRoot.querySelector("button");
      button.textContent = this.getAttribute("label") || "";
      button.id = this.getAttribute("id") || "";

      button.className = this.getAttribute("classes") || "";

      button.addEventListener("click", () => {
        const action = this.getAttribute("action");
        if (action && typeof this[action] === "function") {
          this[action]();
        }
      });
    }
  }
);
