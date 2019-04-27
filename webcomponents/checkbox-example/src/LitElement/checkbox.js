import {html, LitElement} from 'lit-element';

class CheckboxExample extends LitElement {
    render() {
        return html`
        <style>
          :host {
            display: inline-block;
            background: url('./../../assets/images/unchecked_checkbox.png') no-repeat;
            background-size: contain;
            width: 24px;
            height: 24px;
          }
          :host([hidden]) {
            display: none;
          }
          :host([checked]) {
            background: url('./../../assets/images/checked_checkbox.png') no-repeat;
            background-size: contain;
          
        </style>
        `;
    }

    constructor() {
        super();

        this.checked = false;
        this.role = 'checkbox';
        this.tabIndex = 0;

        this.addEventListener('click', this._onClick);
    }

    static get properties() {
        return {
            checked: {attribute: true, type: Boolean, reflect: true},
            role: {type: String, reflect: true},
            tabIndex: {type: Number, reflect: true}
        };
    }

    _onClick() {
        this._toggleChecked();
    }

    _toggleChecked() {
        this.checked = !this.checked;
        this.dispatchEvent(new CustomEvent('change-checkbox', {
            detail: {
                checked: this.checked,
            }
        }));
    }
}

customElements.define('checkbox-example', CheckboxExample);
