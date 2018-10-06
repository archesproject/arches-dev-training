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

---

## Component file locations
```
/templates/views/components/card_components/address-card.html
/templates/views/components/reports/address-report.html
/templates/views/components/widgets/geocoder.html
```
```
/media/js/views/components/card_components/address-card.js
/media/js/views/components/reports/address-report.js
/media/js/views/components/widgets/geocoder.js
```
### Note: the html and js file names correspond

| View Model         |   Template            |
|:------------------:|:---------------------:|
| address-card.js    |   address-card.html   |
| address-report.js  |   address-report.html |
| geocoder.js        |   geocoder.html       |

---

## The configuration (.json) file

The configuration file can go anywhere in your project

In the training project they're located here:

```
/card_components/address-card.json
/reports/address-report.json
/widgets/geocoder.json
```

---

## The configuration (.json) file

Contents corresponds to what is loaded in Postgres

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
