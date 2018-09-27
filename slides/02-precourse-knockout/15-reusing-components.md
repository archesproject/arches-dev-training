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

[demo](demos/knockout/demo5-components.html)
