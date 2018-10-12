<!-- sectionTitle: Module 7: Report Template Development -->

# Module 7
## Developing Report Templates

---

## Lesson Overview

- Review what reports are in Arches
- What are the basic building blocks of a report
- Lab - create an address report component

---

## Lab Overview

We need a report to render a map with a resource's addresses

- Catch everyone up to the end of the last lab
- Update our report's template
- Update our report's view model to show addresses on a map
- Register our report in Arches

---

## Report Review

- Reports display data in the report page as well when the root node  
of a resource instance is selected
- Arches ships with three templates:
    - no header (default)
    - image header
    - map header
- The default template is also the base report template

---

## Base Report Template (abridged)

```diffko
<!--ko if: !configForm -->
{% block report %}
    <!-- REMOVED TITLE INFO -->
!   {% block header %} {% endblock header %}
!   {% block body %}
    <!-- REMOVED PROVISIONAL STATUS MARKUP -->
    <!-- ko foreach: { data: report.cards, as: 'card' } -->
        <!-- ko component: {
                name: card.model.cardComponentLookup[card.model.component_id()].componentname,
                params: {
                    state: 'report',
                    preview: $parent.report.preview,
                    card: card
                }
            } --> <!-- /ko -->
     <!-- /ko -->
!    {% endblock body %}
    <!-- REMOVED RELATED RESOURCES MARKUP -->
{% endblock report %}
<!-- /ko -->

<!-- ko if: configForm && (configType === 'header') -->
! {% block header_form %} {% endblock header_form %}
<!-- /ko -->
```

---


## Update our template header

In the mapboxgl binding handler:
1. We need to add a style definition
2. We need to initialize our map

```html
{% extends "views/report-templates/default.htm" %}
{% load i18n %}

{% block header %}
<div class="address-report-map" data-bind="mapboxgl: {
    mapOptions: {
        style: ''
    },
    afterRender: function() {console.log('init map')}
}"></div>
{% endblock header %}
```

---

## Update our template header

```diffko
{% extends "views/report-templates/default.htm" %}
{% load i18n %}

{% block header %}
<div class="address-report-map" data-bind="mapboxgl: {
    mapOptions: {
-        style: ''
+        style: 'mapbox://styles/mapbox/streets-v9'
    },
-    afterRender: function() {console.log('init map')}
+    afterRender: setupMap
}"></div>
{% endblock header %}
```

---

## Update our template header config form

1. Add the icon parameter to your templates select2Query binding handler
2. Add more icon options to the select2 config

```html
{% block header_form %}
<div class="node-config-item">
    <div class="control-label">
        {% trans "Icon" %}
    </div>
    <div>
        <input style="padding-bottom: 5px;" data-bind="select2Query: {
            select2Config: {
                value: '',
                data: {
                    results: [{
                        text: 'Star',
                        id: 'star-15'
                    }]
                }
            }
        }">
    </div>
</div>
{% endblock header_form %}
```

---

## Template header config form

```diffko

{% block header_form %}
<div class="node-config-item">
    <div class="control-label">
        {% trans "Icon" %}
    </div>
    <div>
        <input style="padding-bottom: 5px;" data-bind="select2Query: {
            select2Config: {
-               value: '',
+               value: icon,
                data: {
                    results: [{
                        text: 'Star',
                        id: 'star-15'
+                   }, {
+                       text: 'Circle',
+                       id: 'circle-15'
+                   }, {
+                       text: 'Triangle',
+                       id: 'triangle-15'
                    }]
                }
            }
        }">
    </div>
</div>
{% endblock header_form %}
```
