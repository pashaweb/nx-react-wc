import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('stage-svg')
export class StageSvg extends LitElement {

  constructor(){
    super()
  }

  @property({type: String, attribute: 'data-uid'})
  uid:string = 'my-element';

  override firstUpdated() {
    console.log('firstUpdated');
  }


  static get styles() {
    return css`
      h1 {
        color: red;
      }
      svg {
        width: 100%;
        height: 100%;
      }
    `;
  }

  override render() {
    return html`
    <h1>stageSvg ${this.uid}</h1>
      <svg>
        <g id="stage"></g>
      </svg>
    `;
  }
}


declare global {
  interface HTMLElementTagNameMap {
    'my-element': StageSvg;
  }
}
