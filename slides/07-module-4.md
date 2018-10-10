<!-- sectionTitle: Module 4: Introduction to Components -->

# Module 4
## Introduction to Components in Arches

---

## Lesson Overview

- What are Knockout components
- How are they used in Arches
- How are their files organized in Arches
- How are they registered

---

## Knockout Components

- Similar to Angular directives or Vue components
- Reusable blocks of UI
- Comprise a javascript view model corresponding html template
- Configurable

---

## The role of components

- **Widgets:**  the UI for a tile
- **Card components:**  the UI for a collection of widgets (or a collection of cards)
- **Reports:**  the UI for a resource report header and the display of cards
- **Functions:**  the UI for function configuration (not covered in this course)

Lets look at some examples in Arches...

---

## Components as extensions of Arches

You could override existing components.
For example, the map widget's geocoder is a component.
If it does not suit your needs you could simply override the existing one.

The components we're covering in this course can ***extend*** Arches.
They allow you to add to the existing widgets, cards, and reports.

---

### Why?

1. You need to support a custom datatype
2. You want more options in how your data is presented. For example
    - reports - a new kind of header
    - widgets - write a map widget with a different library
    - card components - arrange your widgets differently or show a summary of their tile values

---

## Registering components

Knockout loads components from separate files asynchronously using require.js

```javascript
ko.components.register('some-component', {
    viewModel: { require: 'files/some-component' },
    template: { require: 'text!files/some-component.html' }
});
```

Arches handles this for you. You simply have to write the files and place where
Arches can find them.

So, where should you place them?

---

## Component file locations

### Templates
- `/templates/views/components/card_components/address-card.html`
- `/templates/views/components/reports/address-report.html`
- `/templates/views/components/widgets/geocoder.html`

### View Models
- `/media/js/views/components/card_components/address-card.js`
- `/media/js/views/components/reports/address-report.js`
- `/media/js/views/components/widgets/geocoder.js`

### Note: the html and js file base names match
| View Model         |   Template            |
|:------------------:|:---------------------:|
| address-card.js    |   address-card.html   |
| address-report.js  |   address-report.html |

---

## The configuration (.json) file

In the training project the config files are located here:


- `/card_components/address-card.json`
- `/reports/address-report.json`
- `/widgets/geocoder.json`


But, the can go anywhere in your project. Ultimately, they will typically
be saved in a package.

---

## The configuration (.json) file

Contents corresponds to what is loaded in Postgres.

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

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ![widget](/images/widget-db-screenshot.png)

---

## Registering components

Each component has its own management command class:

- arches/management/commands/widget.py
- arches/management/commands/report.py
- arches/management/commands/card_component.py

- $(env) python manage.py widget register -s myproject/widgets/geocoder.json
- $(env) python manage.py report register -s myproject/reports/geocoder.json
- $(env) python manage.py card_component register -s myproject/card_components/geocoder.json

---

## Unregistering components

A compent's `name` is unique in Arches and is used as it's identifier:

- $(env) python manage.py widget unregister -n 'geocoder'
- $(env) python manage.py report unregister -n 'address-report'
- $(env) python manage.py card_component unregister -n 'address-card'

---

## To get help:

You can list the arguments using `--help`. For example:

- To get the names of the commands:  
```$(env) python manage.py --help```

- To get the arguments of a command (widget in this case):  
```$(env) python manage.py widget --help```

---
