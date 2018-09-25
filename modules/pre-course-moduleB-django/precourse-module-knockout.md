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
.output {
    background-color: #ddffdd;
    width: 150px;
    margin: 25px;
}
```

```html
<label>Artist: <input data-bind="textInput: artist"></input></label>
<label>Album: <input data-bind="textInput: album"></input></label>
<div data-bind="css: style">
    <div data-bind="text: artist"></div>
    <div data-bind="text: album"></div>
</div>
```

```javascript
function ViewModel() {
    this.artist = ko.observable();
    this.album = ko.observable();
    this.style = 'output'
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
***Subscriptions/Computeds: ViewModel:***
```javascript
this.artist = ko.observable("");
this.album = ko.observable("");
this.recentchange = ko.observable();
this.albums = ko.observableArray([]);

this.addAlbum = function(){
    this.albums.push({artist: this.artist(), album: this.album()});
};

this.albums.subscribe(function(albums){
    var currentItem = _.last(albums)
    self.recentchange("You just added " + currentItem.artist + ", " + currentItem.album);
})

this.summary = ko.computed(function(){
    var res = "<ul>"
    _.map(self.albums(), function(album){
        res += "<li>Artist: " + album.artist + ",   Album: " + album.album + "</li>"});
    res += "</ul>"
    return res
});
```

---

***Subscriptions/Computeds: HTML***
```html
<label>Artist:  <input data-bind="textInput: artist"></input></label>
<label>Album:  <input data-bind="textInput: album"></input></label>
<button data-bind="click: addAlbum">Add</button>
<div data-bind="html: summary"></div>
<p data-bind="text: recentchange"></p>
```

[demo](demosite/demo2-bindings.html)

---

**Control logic**

- Inline and Virtual:
```html
<div data-bind="if: someBooleanValue">Here is a message. Astonishing.</div>

<ul>
    <li>This item always appears</li>
    <!-- ko ifnot: someBooleanValue -->
        <li>display this line</li>
    <!-- /ko -->
</ul>

```

---
***Control Logic - cont.***
- foreach binding & scope

```javascript
var geomViewModel = function() {
    var self = this;
    self.coords = [{x:37.5,y:-122.1},{x:37.6}, y:-122.0, ...];
    self.name = "San Francisco";
}
```

```html
<table data-bind="with: geomViewModel">
    <tbody data-bind="foreach: coords">
        <span data-bind="text: $parent.name"></span>
        <span data-bind="text: x"> </span>,
        <span data-bind="text: y"> </span>
    <tbody>
</table>
```

---

***Components***

- Composed of template and view model
- Reusable within an application
- Registering a component:
```javascript
ko.components.register('album-list', {
    viewModel: {require: 'js/album-list'},
    template: {require: 'text!templates/album-list.html'}
});
```

---

**Declaring a component**
```html
<div data-bind='component: {
    name: "album-list",
    params: {albumlist: albums}
}'></div>
```

[demo](demosite/demo3-components-intro.html)

---

**Using multiple components**

Different components can be used to represent the same data differently:
```html
<div data-bind='component: {
    name: "album-list-simple",
    params: {title: "Component 1", albumlist: albums}
}'></div>

<div data-bind='component: {
    name: "album-list",
    params: {title: "Component 2", albumlist: albums}
}'></div>
```

[demo](demosite/demo4-components.html)

***Reusing Components***

Components can be reused within an application with different configurations:
```html
<div data-bind='component: {
    name: "album-list",
    params: {title: "Component", albumlist: albums}
}'></div>

<div data-bind='component: {
    name: "album-list",
    params: {title: "Same component", albumlist: albums, context: "agg"}
}'></div>

<!--ko if: context -->
    <div style="padding-top: 10px" data-bind="text: 'Album count: ' + albums().length"></div>
<!-- /ko -->
```
