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
- Define our widget configs for a geocoder widget
- Update our report's view model
- Update our report's template
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
+   {% block header %} {% endblock header %}
+   {% block body %}
    <!-- REMOVED PROVISIONAL STATUS MARKUP -->
    <div>
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
    </div>
+    {% endblock body %}
    <!-- REMOVED RELATED RESOURCES MARKUP -->
{% endblock report %}
<!-- /ko -->

<!-- ko if: configForm && (configType === 'header') -->
+ {% block header_form %} {% endblock header_form %}
<!-- /ko -->
```

---
