<!-- sectionTitle: Pre-course B: KnockoutJS -->
<!-- background: jellybean -->

# KnockoutJS
## an Introduction

---


## Lesson overview

In this lesson we will briefly discuss each of the following Knockout concepts with examples and an explanation of how they are used in Arches

- View Models
- Data binding
- Computeds & subscriptions
- Control flow
- Scope
- Components

---

## Lesson goals

To gain a basic understanding of what KnockoutJS is and how the framework is used in Arches

---

## What is Knockout?
- JavaScript library for building web applications
- Documentation can be found here: https://knockoutjs.com/documentation/introduction.html
- There are also some good tutorials: http://learn.knockoutjs.com/
- Easy to learn
- Non-prescriptive regarding application architecture
- Simple to extend with custom bindings
- Allows users to work on isolated parts of the UI with "components"

---

## Model-View-View Model (MVVM)

MVVM is a design pattern for building complex applications. KnockoutJS uses this pattern

- **model**: "your application’s stored data."
- **view model**: "a pure-code representation of the data and operations on a UI"
- **view**: "a visible, interactive UI representing the state of the view model." ("your HTML document")

---

## A very simple view model

```css
.output {
    background-color: #ddffdd;
    margin: 25px;
}
```

```html
<label>Artist: <input data-bind="textInput: artist"></input></label>
<label>Album: <input data-bind="textInput: album"></input></label>
<div class="output">
    <div data-bind="text: artist"></div>
    <div data-bind="text: album"></div>
</div>
```

```javascript
function ViewModel() {
    this.artist = ko.observable();
    this.album = ko.observable();
};

ko.applyBindings(new ViewModel());
```

[demo 1](https://codepen.io/fargeo/pen/KGgpYz)

---

## Bindings

- `text`
- `textInput`
- `visible`
- `css`
- `style`
- `attr`
- `click`
- `event`
- custom binding handlers

---

## Subscriptions & computeds

- Subscription - calls a handler when a single observable changes
- Computeds - a function that returns a value if an observable within it changes

---

## Subscriptions & computeds: view model

```javascript
var self = this;
this.artist = ko.observable("");
this.album = ko.observable("");
this.albums = ko.observableArray([]);

this.addAlbum = function(){
    self.albums.push({
        artist: self.artist(),
        album: self.album()
    });
};

this.albums.subscribe(function(albums){
    console.log('albums added:', albums);
});

this.lastChange = ko.computed(function() {    
    var albums = self.albums();
    if (albums.length > 0) {
        var currentItem = albums[albums.length-1];
        return "You added " + currentItem.artist + ", " + currentItem.album;
    }
    return '';
});
```

---

## Subscriptions & computeds: HTML

We can bind to our computed, as we would with an observable:

```html
<label>Artist:  <input data-bind="textInput: artist"></input></label>
<label>Album:  <input data-bind="textInput: album"></input></label>
<button data-bind="click: addAlbum">Add</button>
<p data-bind="text: lastChange"></p> <!-- Our computed -->
```

[demo 2](https://codepen.io/fargeo/pen/ePdNov)

---

## Control flow

- Knockout provides bindings for managing control flow
- `foreach`, `if`, `ifnot`, `with`
- can be "virtual" (as comments) or inline (via `data-bind`)

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

- Composed of a template and view model
- Reusable within an application
- Registering a component:
```javascript
ko.components.register('album-list', {
    viewModel: {
        require: 'js/album-list'
    },
    template: {
        require: 'text!templates/album-list.html'
    }
});
```

---

## Declaring a component

```html
<div data-bind='component: {
    name: "album-list",
    params: {
        albumlist: albums
    }
}'></div>
```

[demo 3](https://codepen.io/fargeo/pen/dgpoLj)

---

## Using multiple components

Different components can be used to represent the same data differently:

```html
<div data-bind='component: {
    name: "album-list-simple",
    params: {
        title: "Component 1",
        albumlist: albums
    }
}'></div>

<div data-bind='component: {
    name: "album-list",
    params: {
        title: "Component 2",
        albumlist: albums
    }
}'></div>
```

[demo 4](https://codepen.io/fargeo/pen/GYjJLe)

---

## Reusing components

Components can be reused within an application with different data & configurations:

```html
<div data-bind='component: {
    name: "album-list",
    params: {
        title: "Component",
        albumlist: albums
    }
}'></div>

<div data-bind='component: {
    name: "album-list",
    params: {
        title: "Same component",
        albumlist: albums,
        showCount: true
    }
}'></div>
```
```html
<!--ko if: showCount -->
    <div style="padding-top: 10px" data-bind="text: 'Album count: ' + albums().length"></div>
<!-- /ko -->
```

[demo 5](https://codepen.io/fargeo/pen/wYzabw)
