import {LitElement} from "lit-element";

class ProgressBar extends LitElement {
    render() {
        return html`
        <div></div>
        <p>${this.value} / ${this.maxValue}</p>
        `
    }

    constructor() {
        super();

        this.step = 1;
        this.value = 0;
        this.maxValue = 100;
    }

    static get properties() {
        return {
            maxValue: {attribute: true, type: Number, reflect: true},
            value: {attribute: true, type: Number, reflect: true},
            step: {attribute: true, type: Number, reflect: true}
        }
    }
}
