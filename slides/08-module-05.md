<!-- sectionTitle: Module 5: Widget Development -->

# Module 5
## Widget Development

---

## Lesson Overview

- Review what widgets are in Arches
- Where are widgets used in Arches
- What are the basic building blocks of a widget
- Lab - create a geocoder widget for the address datatype

---

## Widget review

- A widget is the UI representation of a node
- They can be assigned to nodes with a datatype specified in the widget record
- A datatype may have more than one possible widget:
    - string : input/rich text
    - boolean : radio/switch
    - concept : radio/dropdown
    - etc...
- As widgets are just a type of component, they consist of front-end code only
    - view model
    - template

---

## Where are widgets used in Arches?

- In the graph designer's widget manager (widget configuration)
- In the resource editor (form)
- In reports
- In the card tree

In the template, each widget has a dedicated block for each of these roles.

---

## The base widget template

`arches/app/templates/views/components/widgets/base.htm`

```html
{% load i18n %}
<!-- ko if: !configForm  && state === 'form' -->
{% block form %}
{% endblock form %}
<!-- /ko -->

<!-- ko if: !configForm  && state === 'report' -->
{% block report %}
<dt data-bind="text: label"></dt>
<dd data-bind="text: displayValue() || '{% trans "None" %}'"></dd>
{% endblock report %}
<!-- /ko -->

<!-- ko if: !configForm  && state === 'display_value' -->
{% block display_value %}
<span data-bind="text: displayValue() || '{% trans "None" %}'"></span>
{% endblock display_value %}
<!-- /ko -->

<!-- ko if: configForm -->
{% block config_form %}
{% endblock config_form %}
<!-- /ko -->
```

---

## Widgets inherit from a base view model

`arches/app/media/js/viewmodels/widget.js`

This makes some properties immediately available as ko observables
- configurations
    - `params.configKeys = []`
- `defaultValue`
- `label`
- `value`
- value properties (if your data is a simple object)
    - `params.valueProperties = []`

---

## A basic widget view model

```javascript
define(['knockout', 'underscore', 'viewmodels/widget'], function (ko, _, WidgetViewModel) {
    return ko.components.register('text-widget', {
        viewModel: function(params) {
            params.configKeys = ['placeholder', 'width', 'maxLength', 'defaultValue'];
            WidgetViewModel.apply(this, [params]);
        },
        template: { require: 'text!widget-templates/text' }
    });
});
```

---

## The widget manager - config_form

<img alt="widget-manager-config-form" src="https://user-images.githubusercontent.com/1877663/48462214-3cda8300-e7cf-11e8-845b-0ff4bed781a1.png">

---

## A basic widget config form

### Markup is in the `config_form` block

```html
{% block config_form %}
<div class="control-label">{% trans "Placeholder" %}</div>
<div class="col-xs-12 pad-no crud-widget-container">  
    <input placeholder="{% trans "Placeholder" %}" class="form-control input-md widget-input"  
    data-bind="textInput: placeholder">
</div>

<div class="control-label">{% trans "Max Length" %}</div>
<div class="col-xs-12 pad-no crud-widget-container">
    <input placeholder="{% trans "Max Length" %}" class="form-control input-md widget-input"  
    data-bind="textInput: maxLength">
</div>

<div class="control-label">{% trans "Default Value" %}</div>
<div class="col-xs-12 pad-no crud-widget-container">
    <input placeholder="{% trans "Default Value" %}" class="form-control input-md widget-input"  
    data-bind="textInput: defaultValue">
</div>
{% endblock config_form %}
```

---

## The widget manager - form

<img alt="widget-manager-form" src="https://user-images.githubusercontent.com/1877663/48462225-44019100-e7cf-11e8-82fb-87007ba2ae44.png">

---

## A basic widget form

### Markup is in the `form` block

```html
{% block form %}
<div class="row widget-wrapper">
    <div class="form-group">
        <label class="control-label widget-input-label" for="" data-bind="text:label"></label>
        <!-- ko if: node -->
        <i data-bind="css: {'ion-asterisk widget-label-required': node.isrequired}"></i>
        <!-- /ko -->
        <div class="col-xs-12">
            <input type="text" class="form-control input-lg widget-input"
            data-bind="textInput: value, attr: {  
                placeholder: placeholder,  
                maxlength: maxLength,  
                disabled: disabled},  
                style: {width: width}">
        </div>
    </div>
</div>
{% endblock form %}
```

---

## Lab Overview

Build a widget that will get an address from a geocoding service:
- Define our widget configs for a geocoder widget
- Update our widget's view model
- Update our widget's template
- Register our widget in Arches
- Update our address datatype so that it uses our widget by default

---


## Getting caught up

```
git checkout module-5
python manage.py packages -o setup_db
python manage.py datatype register -s arches_dev_training/datatypes/address.py
python manage.py packages -o import_graphs -s arches_dev_training/graphs/Person.json
python manage.py packages -o import_business_data -s arches_dev_training/data/Person.json -ow overwrite
```

---

## Defining our widget properties in the .json file

`arches_dev_training/widgets/geocoder.json`

```javascript
{
    "defaultconfig": {
        "placeholder": "Find an address..."
    }
}
```

Add the rest of the widget's properties

---

## Widget Properties Demo

---

## Widget Properties

```javascript
{
    "name": "geocoder",
    "component": "views/components/widgets/geocoder",
    "defaultconfig": {
        "placeholder": "Find an address..."
    },
    "helptext": null,
    "datatype": "address"
}
```

---

## Update our view model

`arches_dev_training/media/js/views/components/widgets/geocoder.js`

1. The widget's view model need the following parameter properties assigned:  
`params.valueProperties =`  
`params.configKeys =`

2. We need use the `apply` method to inherit from the base widget view model

3. Also, the `template` file path needs to be updated

---

## View Model Demo

---

## View Model

1. `params.valueProperties = ['address','x','y'];`  
   `params.configKeys = ['placeholder'];`

2. `WidgetViewModel.apply(this, [params]);`

3. `'text!templates/views/components/widgets/geocoder.htm'`

---

## Template

Bind the label observable to the label element:
```html
{% block form %}
<div class="row widget-wrapper">
    <div class="form-group">
        <label class="control-label widget-input-label" for=""></label>
        <div class="col-xs-12">
            <input data-bind="select2Query: {select2Config: select2Config}">
        </div>
    </div>
</div>
{% endblock form %}
```


Bind the placeholder observable to the placeholder config input:
```html
{% block config_form %}
<div class="control-label">
    {% trans "Placeholder" %}
</div>
<div class="col-xs-12 pad-no crud-widget-container">
    <input type="text" placeholder="{% trans "Placeholder" %}" id=""   
    class="form-control input-md widget-input">
</div>
{% endblock config_form %}
```

---

## Template Demo

---

## Template

```html
{% block form %}
<div class="row widget-wrapper">
    <div class="form-group">
        <label class="control-label widget-input-label" for="" data-bind="text:label"></label>
        <div class="col-xs-12">
            <input data-bind="select2Query: {select2Config: select2Config}">
        </div>
    </div>
</div>
{% endblock form %}

{% block config_form %}
<div class="control-label">
    {% trans "Placeholder" %}
</div>
<div class="col-xs-12 pad-no crud-widget-container">
    <input type="text" placeholder="{% trans "Placeholder" %}" id=""  
    class="form-control input-md widget-input" data-bind="textInput: placeholder">
</div>
{% endblock config_form %}
```

---

## Registering the Widget

```bash
$(env) python manage.py widget register -s arches_dev_training/widgets/geocoder.json
```

---

### Making the geocoder the default widget for the address datatype

```python
from arches.app.models import models

geocoder = models.Widget.objects.get(name='geocoder')

details = {
    'datatype': 'address',
    'iconclass': 'fa fa-location-arrow',
    'modulename': 'datatypes.py',
    'classname': 'AddressDataType',
    'defaultwidget': geocoder,
    'defaultconfig': None,
    'configcomponent': None,
    'configname': None,
    'isgeometric': False,
    'issearchable': False
}
```

---

## Updating our datatype

```bash
$(env) python manage.py datatype update -s arches_dev_training/datatypes/address.py
```
