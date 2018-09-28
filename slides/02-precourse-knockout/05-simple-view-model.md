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

[demo](demos/knockout/demo1.html)
