(function () {

    const template = document.createElement('template');

    template.innerHTML = `
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

    class CheckboxExample extends HTMLElement {
        static get observedAttributes() {
            return ['checked'];
        }

        constructor() {
            super();
            this.attachShadow({mode: 'open'});
            this.shadowRoot.appendChild(template.content.cloneNode(true));
        }

        connectedCallback() {
            if (!this.hasAttribute('role')) {
                this.setAttribute('role', 'checkbox');
            }
            if (!this.hasAttribute('tabindex')) {
                this.setAttribute('tabindex', '0');
            }

            this._upgradeProperty('checked');

            this.addEventListener('click', this._onClick);
        }

        _upgradeProperty(prop) {
            if (this.hasOwnProperty(prop)) {
                let value = this[prop];
                delete this[prop];
                this[prop] = value;
            }
        }

        disconnectedCallback() {
            this.removeEventListener('click', this._onClick);
        }

        set checked(value) {
            const isChecked = Boolean(value);
            if (isChecked) {
                this.setAttribute('checked', '');
            } else {
                this.removeAttribute('checked');
            }
        }

        get checked() {
            return this.hasAttribute('checked');
        }


        attributeChangedCallback(name, oldValue, newValue) {
            const hasValue = newValue !== null;
            switch (name) {
                case 'checked':
                    this.setAttribute('aria-checked', hasValue);
                    break;
            }
        }

        _onClick(event) {
            this._toggleChecked();
        }

        _toggleChecked() {
            this.checked = !this.checked;
            this.dispatchEvent(new CustomEvent('change-checkbox', {
                detail: {
                    checked: this.checked,
                },
                bubbles: true,
            }));
        }
    }

    window.customElements.define('checkbox-example', CheckboxExample);
})();

window.onload = () => {
    document.getElementById('test-checkbox').addEventListener('change-checkbox', (checked) => {
        console.log('Checkbox clicked: ', checked.detail.checked);
    });
};
