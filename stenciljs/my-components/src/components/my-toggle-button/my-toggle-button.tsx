import { Component, Event, Prop, h, Host, EventEmitter, Listen, State, Watch } from '@stencil/core';

@Component({
  tag: 'my-toggle-button',
  styleUrl: 'my-toggle-button.css',
  shadow: true,
})
export class MyToggleButton {
  
  @Prop() checked: boolean;
  @State() value: boolean;
  @Event({bubbles: true, composed: true, eventName: 'toggleButtonChanged'}) stateHasBeenChanged: EventEmitter<boolean>;

  @Listen('click')
  changeState() {
    this.value = !this.value;
    this.stateHasBeenChanged.emit(this.value);
  }

  @Watch('checked')
  onStateBeingChanged() {
    this.checked ? this.value = true : this.value = false;
  }
  
  componentWillLoad() {
      this.value = this.checked;
  }

  render() {
    return (
      <Host class={{'toggle-on': this.value}}>
        <div class="switch">
          <div class="slider round"></div>
        </div>
      </Host>
    )
  }
}
