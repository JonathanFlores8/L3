/**
 * The virtual-window component.
 *
 */

/**
 * Define template.
 */
const template = document.createElement('template')
template.innerHTML = `
<style>
  body {
    background-color: black;
  }

</style>
<div>
  <h1> lmao </h1>
</div>
`

/*
 * Define custom element.
 */
customElements.define('input-component',
  /**
   * A virtual window
   */
  class InputComponent extends HTMLElement {
    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this element and
      // append the template to the shadow root.
      const shadowRoot = this.attachShadow({ mode: 'open' })
      shadowRoot.appendChild(template.content.cloneNode(true))
    }
  }
)
