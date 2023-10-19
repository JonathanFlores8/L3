const buttonTemplate = document.createElement("template");
buttonTemplate.innerHTML = `
<style>
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
