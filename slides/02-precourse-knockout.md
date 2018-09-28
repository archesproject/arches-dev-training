<!-- sectionTitle: KnockoutJS Intro -->
<!-- background: jellybean -->

# KnockoutJS
## an Introduction

---


## Lesson Overview

In this lesson we will briefly discuss each of the following Knockout concepts with examples and an explanation of how they are used in Arches

- ViewModels
- Data binding
- Computeds/subscriptions
- Control flow
- Scope
- Components

---

## Lesson Goals

To have a basic understanding of KnockoutJS and how the framework is applied in Arches

---

## What is Knockout?
- Relatively lightweight library
- Easy to learn
- Non-prescriptive regarding application architecture
- Simple to extend with custom bindings
- Allows users to work on isolated parts of the UI with  'components'  

---

## A very simple ViewModel

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

[demo](https://archesproject.github.io/arches-dev-training-demos/knockout/demo1-vm.html)

---

## Bindings

- text
- textInput
- visible
- css
- style
- attr
- click
- event
- custom binding handlers (if time, more on these later)

---

## Subscriptions/Computeds

- Subscription - calls a handler when a single observable changes
- Computeds - a function that returns a value if an observable within it changes

---

## Subscriptions/Computeds: ViewModel

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
    self.recentchange("You added " + currentItem.artist + ", " + currentItem.album);
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

## Subscriptions/Computeds: HTML

### We can bind to our computed:

```html
<label>Artist:  <input data-bind="textInput: artist"></input></label>
<label>Album:  <input data-bind="textInput: album"></input></label>
<button data-bind="click: addAlbum">Add</button>
<div data-bind="html: summary"></div> <!-- Our computed -->
<p data-bind="text: recentchange"></p> <!-- Our subscription updates recentchange -->
```

[demo](https://archesproject.github.io/arches-dev-training-demos/knockout/demo2-bindings.html)

---

## Control logic

### Inline and Virtual

```html
<div data-bind="if: someBooleanValue"></div>

<ul>
    <li>This item always appears</li>
    <!-- ko ifnot: someBooleanValue -->
        <li>display this line</li>
    <!-- /ko -->
</ul>

```

---

## Components

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

## Declaring a component

```html
<div data-bind='component: {
    name: "album-list",
    params: {albumlist: albums}
}'></div>
```

[demo](https://archesproject.github.io/arches-dev-training-demos/knockout/demo3-components-intro.html)

---

## Using multiple components

### Different components can be used to represent the same data differently:

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

[demo](https://archesproject.github.io/arches-dev-training-demos/knockout/demo4-components.html)

---

## Reusing Components

### Components can be reused within an application with different configurations:

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

[demo](https://archesproject.github.io/arches-dev-training-demos/knockout/demo5-components.html)
