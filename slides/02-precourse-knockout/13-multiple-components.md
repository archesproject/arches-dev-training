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

[demo](demos/Knockout/demo4-components.html)
