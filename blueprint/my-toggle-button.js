const htmlStructure = `
<div id="container">
    <div class='switch'>
        <div class='slider round'></div>
    </div>
</div>`;
const style = `
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}
/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}
.slider:before {
  position: absolute;
  content: '';
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}
#container.toggle-on .slider {
  background-color: #2196f3;
}
#container.toggle-on .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}
/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}
.slider.round:before {
  border-radius: 50%;
};`;
// you can use your own styles if you want

const tmpl = document.createElement("template");
tmpl.innerHTML = `<style>${style}</style>${htmlStructure}`;

// How shall the API of the component look like? which attributes / events do we need?
class MyToggleButton extends HTMLElement {
    constructor() {
        super();
        var shadow = this.attachShadow({mode: 'open'});
        shadow.appendChild(tmpl.content.cloneNode(true));
        this.addEventListener("click", this.changeToggleButtonState);
    }

    changeToggleButtonState() {
      const container = this.shadowRoot.children[1];
      let hasValue = container.hasAttribute('class');
      if (hasValue) {
        container.removeAttribute('class');
      } else {
        container.setAttribute('class', 'toggle-on');
      }
    }

    connectedCallback() {}

    attributeChangedCallback() {}

    disconnectedCallback() {}
}

customElements.define("my-toggle-button", MyToggleButton);