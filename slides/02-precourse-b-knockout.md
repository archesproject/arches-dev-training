<!-- sectionTitle: Pre-course B: KnockoutJS -->
<!-- background: jellybean -->

# KnockoutJS
## an Introduction

---


## Lesson Overview

In this lesson we will briefly discuss each of the following Knockout concepts with examples and an explanation of how they are used in Arches

- View Models
- Data binding
- Computeds & subscriptions
- Control flow
- Scope
- Components

---

## Lesson Goals

To gain a basic understanding of what KnockoutJS is and how the framework is used in Arches

---

## What is Knockout?
- JavaScript library for building web applications
- [Documentation can be found here](https://knockoutjs.com/documentation/introduction.html)
- [There are also some good tutorials](http://learn.knockoutjs.com/)
- Easy to learn
- Non-prescriptive regarding application architecture
- Simple to extend with custom bindings
- Allows users to work on isolated parts of the UI with "components"

---

## Model-View-View Model (MVVM)

MVVM is a design pattern for building complex applications. KnockoutJS uses this pattern

- **model**: "your application’s stored data."
- **view**: "a visible, interactive UI representing the state of the view model." ("your HTML document")
- **view model**: "a pure-code representation of the data and operations on a UI"

---

## A very simple View Model

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
function AlbumViewModel(artist, album) {
    this.artist = ko.observable(artist);
    this.album = ko.observable(album);
}

ko.applyBindings(new AlbumViewModel());
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

## Subscriptions & Computeds

- Subscription - calls a handler when a single observable changes
- Computeds - a function that returns a value if an observable within it changes

---

## Subscriptions & Computeds: View Model

```javascript
function AlbumListViewModel(albums) {
    var self = this;
    this.albums = ko.observableArray(albums);
    this.newAlbum = new AlbumViewModel();

    this.addAlbum = function(){
        var album = new AlbumViewModel(self.newAlbum.artist(), self.newAlbum.album());
        self.albums.push(album);
    };

    this.albums.subscribe(function(albums){
        self.newAlbum.artist('');
        self.newAlbum.album('');
    });

    this.lastAlbum = ko.computed(function() {    
        var albums = self.albums();
        if (albums.length === 0) return;
        
        return albums[albums.length-1];
    });
}

ko.applyBindings(new AlbumListViewModel());
```

---

## Subscriptions & Computeds: HTML

We can bind to our computed, as we would with an observable:

```html
<label>Artist:  <input data-bind="textInput: newAlbum.artist"></input></label>
<label>Album:  <input data-bind="textInput: newAlbum.album"></input></label>
<button data-bind="click: addAlbum">Add</button>
<div data-bind="if: lastAlbum()">
    <p>
        You added:
        <span data-bind="text: lastAlbum().artist"></span>,
        <span data-bind="text: lastAlbum().album"></span>
    </p>
</div>
```

[demo 2](https://codepen.io/fargeo/pen/ePdNov)

---

## Control flow

- Knockout provides bindings for managing control flow
- `foreach`, `if`, `ifnot`, `with`
- can be "virtual" (as comments) or inline (via `data-bind`)

```html
<!-- ko if: albums().length > 0 -->
<ul data-bind="foreach: albums">
    <li>
        <span data-bind="text: artist"></span>,
        <span data-bind="text: album"></span>
    </li>
</ul>
<!-- /ko -->
```

---

## Components

- Composed of a template and a view model
- Reusable within an application
- Registering a component:
```javascript
ko.components.register('album-list', {
    viewModel: function(albumListViewModel) {
        this.albums = albumListViewModel.albums;
    },
    template: '<!-- ko if: albums().length > 0 -->' +
        '<ul data-bind="foreach: albums">' +
            '<li>' +
                '<span data-bind="text: artist"></span>,' +
                '<span data-bind="text: album"></span>' +
            '</li>' +
        '</ul>' +
        '<!-- /ko -->'
});
```

---

## Declaring a component

```html
<div data-bind="component: {
    name: 'album-list',
    params: albumListViewModel
}"></div>
```

[demo 3](https://codepen.io/fargeo/pen/dgpoLj)

---

## Using multiple components

Different components can be used to represent the same data differently:

```javascript
ko.components.register('album-count', {
    viewModel: function(albumListViewModel) {
        this.albums = albumListViewModel.albums;
    },
    template: '<div data-bind="if: albums().length > 0">' +
            '<span data-bind="text: albums().length"></span> album(s)' +
        '</div>'
});
```

```html
<div data-bind='component: {
    name: "album-list",
    params: albumListViewModel
}'></div>

<div data-bind='component: {
    name: "album-count",
    params: albumListViewModel
}'></div>
```

[demo 4](https://codepen.io/fargeo/pen/GYjJLe)

---

## Reusing Components

Components can be reused within an application with different data & configurations:

```javascript
ko.components.register('album-count', {
    viewModel: AlbumListViewModel,
    template: '<div><span data-bind="albums.length"></span> albums added</div>'
});
```

```html
<div data-bind='component: {
    name: "album-list",
    params: newAlbums
}'></div>

<div data-bind='component: {
    name: "album-list",
    params: likedAlbums
}'></div>
```

[demo 5](https://codepen.io/fargeo/pen/wYzabw)
