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
- The sections of the report that you are likely to override are the  
header and the header configuration form.
- The body of the report is largely driven by the card component

---

## Report properties

`/reports/address-report.json`

```json
{
    "name": "Address Report",
    "description": "",
    "component": "views/components/reports/address-report",
    "componentname": "address-report",
    "defaultconfig": {
        "icon": "star-15"
    }
}
```

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

`/templates/views/components/reports/address-report.htm`

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

## Template Header Config Form

`/templates/views/components/reports/address-report.htm`

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

## Template Header Config Form Demo

---

## Template Header Config Form

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

---

## Update the Report View Model

`arches_dev_training/media/js/views/components/reports/address-report.js`

In its current state the map does not update when address are added or the icon is changed.  
We need to provide handlers to support dynamically updating these features.

---

## Report View Model Demo

---

## Report View Model

At the bottom of `this.setupMap`:

```javascript
self.geoJSON.subscribe(function(geoJSON) {
    map.getSource('address-points').setData(geoJSON);
    zoomToGeoJSON(geoJSON);
});

self.icon.subscribe(function(icon) {
    map.setLayoutProperty('address-points', 'icon-image', icon);
});
```

---

## Register our Report

```bash
$(env) python manage.py report register -s arches_dev_training/reports/address-report.json
```

---

## Now we can assign our report to our resource model
