<!-- sectionTitle: Module 5: Widget Development -->

# Module 5
## Widget Development

---

## Lesson Overview

- Review what widgets are in Arches
- Where are widgets used in Arches
- What are the basic building blocks of a widget

- Lab:
    - Create an geocoder widget to leverage our address datatype
    - Register our widget in Arches
    - Update our address datatype to use the geocoder widget

---

## Widget review

- A widget is the UI representation of a node
- They can be assigned to nodes with a datatype (not semantic)
- A datatype may have more than one possible widget, and
every datatype in Arches has at least one:
    - string : input/rich text
    - boolean : radio/switch
    - concept : radio/dropdown
    - etc...
- As components widgets consist of front-end code only
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
- `configs`
- `default value`
- `widget label`
- `value`
- `value properties` (if your data is a simple object)

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

## The widget manager

![widget manager](/images/widget-manager-config-form.png)

---

## A basic widget config form

### Markup is in the `config_form` block

```html
{% block config_form %}
<div class="control-label">{% trans "Placeholder" %}</div>
<div class="col-xs-12 pad-no crud-widget-container">  
    <input type="" placeholder="{% trans "Placeholder" %}" id="" class="form-control input-md widget-input"  
    data-bind="textInput: placeholder">
</div>

<div class="control-label">{% trans "Max Length" %}</div>
<div class="col-xs-12 pad-no crud-widget-container">
    <input type="" placeholder="{% trans "Max Length" %}" id="" class="form-control input-md widget-input"  
    data-bind="textInput: maxLength">
</div>

<div class="control-label">{% trans "Default Value" %}</div>
<div class="col-xs-12 pad-no crud-widget-container">
    <input type="" placeholder="{% trans "Default Value" %}" id="" class="form-control input-md widget-input"  
    data-bind="textInput: defaultValue">
</div>
{% endblock config_form %}
```

---

## The widget manager

![widget manager](/images/widget-manager-form.png)

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

## Creating a geocoder widgets

arches_dev_training/widgets/geocoder.json

```javascript
{
    "name": "",
    "component": "",
    "defaultconfig": {
        "placeholder": "Find an address..."
    },
    "helptext": null,
    "datatype": null
}
```

We need to update the name and component

---

## Get the name of your datatype

We also need the name of the datatype:

```python manage.py datatype list```

---
