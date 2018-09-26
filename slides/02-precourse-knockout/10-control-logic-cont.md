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
