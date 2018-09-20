title: Module 1: Precourse Module - KnockoutJS
class: animation-fade
layout: true

<!-- This slide will serve as the base layout for all your slides -->
.bottom-bar[
 ![](images/arches_logo.png){{title}}
]

---

class: impact

# {{title}}
## Fall 2018
---

**Lesson Overview**

In this lesson we will briefly discuss each of the following Knockout concepts with examples and an explanation of how they are used in Arches

- ViewModels
- Data binding
- Computeds
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
- Allows users to work on isolated parts of the UI with "components"  


---

***Data Model***
- View Model
- Observables
- Observable Arrays


---

**A very simple ViewModel**

```html
<p data-bind="text: artist"></p>
<p data-bind="text: album"></p>
<input data-bind="textInput: album"></input>
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

[module 1 slides](module1.html)
---
