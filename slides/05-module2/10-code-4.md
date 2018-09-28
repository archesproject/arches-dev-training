### Example: BooleanDataType widget HTML

```html
{% load i18n %}

<!-- ko if: $data.search -->
{% block search %}
<div class="col-sm-12">
    <select class="resources" data-bind="value: searchValue, chosen: {
        width: '100%',
        disable_search_threshold: 15
    }, options: [
        {id: 't', name: trueLabel},
        {id: 'f', name: falseLabel}
    ], optionsText: 'name', optionsValue: 'id'"></select>
</div>
{% endblock search %}
<!-- /ko -->

<!-- ko if: $data.graph -->
<div class="control-label">
    {% trans "Label 'True'" %}
</div>
<div class="col-xs-12 pad-no crud-widget-container">
    <input class="form-control input-md widget-input" data-bind="textInput: trueLabel">
</div>
<div class="control-label">
    {% trans "Label 'False'" %}
</div>
<div class="col-xs-12 pad-no crud-widget-container">
    <input class="form-control input-md widget-input" data-bind="textInput: falseLabel">
</div>
<!-- /ko -->
```