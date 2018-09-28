
**Control logic**

*** Inline and Virtual ***

```html
<div data-bind="if: someBooleanValue"></div>

<ul>
    <li>This item always appears</li>
    <!-- ko ifnot: someBooleanValue -->
        <li>display this line</li>
    <!-- /ko -->
</ul>

```
