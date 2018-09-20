### Pre-course Module: An Introduction to KnockoutJS

---

**Lesson Overview**

In this lesson we will briefly discuss each of the following Knockout concepts with examples and an explanation of how they are used in Arches

- ViewModels
- Data binding
- Computeds/subscriptions
- Control flow
- Scope
- Components

---

***Lesson Goals***

To have a basic understanding of KnockoutJS and how the framework is applied in Arches

**What is Knockout?**
- Relatively lightweight library
- Easy to learn
- Non-prescriptive regarding application architecture
- Simple to extend with custom bindings
- Allows users to work on isolated parts of the UI with  'components'  

---

**Data Model**

- View Model
- Observables - ViewModel property values that Knockout monitors for changes
- Bindings - Declarations in your markup that link HTML elements to data in your viewmodel  
---

**A very simple ViewModel**

```css
.green-background {
    background-color: #ddffdd;
}
```

```html
<p data-bind="text: artist"></p>
<p data-bind="text: album, css: style"></p>
<label>Album: <input data-bind="textInput: album"></input></label>
```

```javascript
function ViewModel() {
    this.artist = "David Bowie";
    this.style = 'green-background'
    this.album = ko.observable();
};

ko.applyBindings(new ViewModel());
```

[demo](demosite/demo1.html)

---

**Common Bindings**

- text
- inputText
- visible
- css
- style
- attr
- click

---

**Subscriptions/Computeds**

- Subscription - calls a handler when a single observable changes
- Computeds - a function that returns a value if an observable within it changes


---

**Control logic**

- Virtual and Inline

- foreach binding
- if binding
- ifnot binding
- with binding
- component binding
