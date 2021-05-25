# Web Components Workshop

## About

This workshop will teach you the basics of web components.

material:

- slides: https://app.deckdeckgo.com/editor/iAB3p7dY2ribWi5hFmHz?signin=success
- source code basics
- source code stenciljs

### Agenda

1. About
2. specification of web components
3. simple web component via vanilla JS & web component API
   1. step-by-step implementation of a toggle button
   2. disadvantages
4. StencilJS
   1. alternatives
   1. motivation
   2. implementation of a toggle button
   3. resolving disadvantages
5. outlook

### Preparation

- install [nodejs lts](https://nodejs.org/en/download/) or [nvm](https://github.com/nvm-sh/nvm)
- verify successful installation `node -v`

## Specification of Web Components

### What are web components?

Web components are a set of web platform APIs that allow you to create new custom, reusable, encapsulated HTML tags to use in web pages and web apps. Custom components and widgets build on the Web Component standards, will work across modern browsers, and can be used with any JavaScript library or framework that works with HTML.

Web components are based on existing web standards. Features to support web components are currently being added to the HTML and DOM specs, letting web developers easily extend HTML with new elements with encapsulated styling and custom behavior.

src: [1]

### Overview of Specifications

web components are based on four main specification

- Custom Elements
- Shadow DOM
- HTML Template
- ES Modules

#### Custom Elements

- support to build fully-featured DOM elements
- concept is already known because of web libraries / frameworks
- has to have a dash in the element selector, i.e. `<wc-button>`
- elements have to be registered
- autonomous custom element vs customized built-in element
- behaviour via attributes, properties & events
- lifecycle methods
- DEMO

src: [2]

#### Shadow DOM

- nothing new: compare to `<video>` which only exposes control
- is a node tree whose root is a shadow root
  - what is DOM, shadow tree, shadow root, shadow host
- allows encapsulation
- has different modes: open / closed
- contains zero or more elements that are slots
- elements & text nodes can be slotted
- DEMO

src: [3],[4]

#### HTML Templates

- markup structures can be reused repeatedly
- template and content not rendered until attached to DOM
- elements can offer 'wildcard content' named slot
- DEMO

src: [5],[6]

#### ES Modules

- standardized inclusion & reuse of JS documents

src: [7]

## web component API in action

our goal is to implement a toggle button like this [code pen example](https://codepen.io/phhbr/pen/qBrjdqN).
If you want to implement any other simple component, feel free.

### implementation of toggle button

##### step 1: skeleton of our component

we create
- `index.html` for the show case
- `js-file` for component

all those file shall be placed in the same folder and the style & script shall have the same naming convention, i.e. `wc-toggle-button.js/css`.

you can check out a blueprint on develop [here](https://github.com/phhbr/architecture-guild-workshop-web-components/tree/develop/blueprint).

#### step 2: define API

questions to ask:
- when will state change be triggered?

   `ctor {...this.addEventListener(..., callback);}`

- do you want to be able to manipulate the state of the component from outside? You will need an attribute for this.

    `static get observedAttributes() { return ['attribute-name']}`

- do you want to be notified by state changes of the component? You will need to emit an event for this.

    `... this.dispatchEvent(customEvent);`

#### step 3: implementation

- use custom tag in HTML
- attach template to (shadow) DOM
- register state change functionality
- handle event emission
- handle attribute change

some solution (maybe not the best :) ) is available on branch [1-wc-api](https://github.com/phhbr/architecture-guild-workshop-web-components/tree/1-wc-api/vanilla).

### drawbacks

- browser support
- performance
- quality assurance
- frameworks integration
- developer experience

## StencilJS

### Alternatives to 'vanilla'

there are currently like ... 55 different ways to make a web component. [8]

### motivation of StencilJS

In short StencilJS was developed as a by-product of Ionic, which was used to recreate over 100 components used in the company's flagship product - the Ionic framework. They developed StencilJS because their framework was solely based on Angular from the very beginning, but competition forced them to start supporting other frameworks. They had to chose to either write a separate component library for each 3rd party framework OR make an universal one! So they went for Web Components. This is a huge POC of technology, if only because it is estimated that over 15% of applications in Google Play & 10% in App Store were developed in the Ionic framework. [9]

### implementation of previous toggle button

You can check out project in branch [2-stencil-start](https://github.com/phhbr/architecture-guild-workshop-web-components/tree/2-stencil-start/stenciljs/my-components) and skip step 1-3 **OR** use the Stencil CLI to create a project.

1. open up terminal in directory where to put your component, i.e. `stenciljs/`

2. run 
    
         npm init stencil

3. choose `component` & enter name, i.e. `my-components`


4. follow instruction (i.e. switch directory to `my-components` & run `npm install && npm run start`)

5. you can open up the stenciljs playground on `localhost:3333`

6. your component is located in `src/components/my-component`

7. refactor it to provide the functionality of `<my-toggle-button>`

You can check out the solution in branch [3-stencil-finish](https://github.com/phhbr/architecture-guild-workshop-web-components/tree/3-stencil-finish/stenciljs/my-components/src/components/my-toggle-button).

#### implementation hints

those table shows equivalents in different libraries/frameworks.

| Functionality | Web Component | StencilJS | Angular |
| --- | --- | --- | --- |
| Element is attached | connectedCallback() | connectedCallback() | ngOnInit() |
| Element is removed | disconnectedCallback() | disconnectedCallback() | ngOnDestroy() |
| Attribute has changed | ngOnUpdate() | attributeChangedCallback() | @Watch('attr') |
| Declare Attribute | observedAttribute.. | @Props() attrName: string; | @Input() attrName: string |
| Declare Property | observedProperty.. | @Props() attrName: ComplexType; | @Input() attrName: ComplexType |
| Emit Event | this.dispatchEvent(event) | @Event() ev: EventEmitter | @Output() ev: EventEmitter |

### let's talk the previous drawbacks

- browser support
- performance
- quality assurance
- frameworks integration
- developer experience

## outlook
- do we really, really need Web Components?

## references

[1]: https://www.webcomponents.org/introduction
1: https://www.webcomponents.org/introduction

[2]: https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements
2: https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements

[3]: https://dom.spec.whatwg.org/#shadow-trees
3: https://dom.spec.whatwg.org/#shadow-trees

[4]: https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM
4: https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM

[5]: https://html.spec.whatwg.org/multipage/scripting.html#the-template-element
5: https://html.spec.whatwg.org/multipage/scripting.html#the-template-element

[6]: https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots
6: https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots

[7]: https://html.spec.whatwg.org/multipage/webappapis.html#integration-with-the-javascript-module-system
7: https://html.spec.whatwg.org/multipage/webappapis.html#integration-with-the-javascript-module-system

[8]: https://webcomponents.dev/blog/all-the-ways-to-make-a-web-component/
8: https://webcomponents.dev/blog/all-the-ways-to-make-a-web-component/

[9]: https://appfigures.com/top-sdks/development/apps
9: https://appfigures.com/top-sdks/development/apps