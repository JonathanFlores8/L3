const errorHandlerTemplate = document.createElement('template')
errorHandlerTemplate.innerHTML = `
<style>
  .error-message {
    color: red;
    margin-top: 5px;
    text-align: center;
    display: none;
  }
</style>
<p class="error-message"></p>
`

customElements.define('error-handler', class ErrorHandler extends HTMLElement {

    constructor () {
      super()
      const shadowRoot = this.attachShadow({ mode: 'open' })
      shadowRoot.appendChild(errorHandlerTemplate.content.cloneNode(true))

      this.errorMessage = shadowRoot.querySelector('.error-message')
    }

    showError (message) {
      this.errorMessage.textContent = message
      this.errorMessage.style.display = 'block'
    }

    hideError () {
      this.errorMessage.style.display = 'none'
    }
  })
