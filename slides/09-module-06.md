<!-- sectionTitle: Module 6: Card Component Development -->

# Module 6
## Card Component Development

---

## Lesson Overview

- Review what card components are in Arches
- What are the basic building blocks of a card component
- Lab - create an address card component

---

## Lab Overview

Build a card component with a map to display addresses in that card
- Catch everyone up to the end of the last lab
- Update our address card component's view model
- Update our address card component's template
- Register our card component in Arches
- Assign the address card component to the Address card of the Person model

---

## Card components Review

- Cards are the UI in Arches that is used to represent a "tile"/"node group"
- Cards are rendered using "card components" (KO components)
- Card components are meant to manage a tile, but they can also manage children of that tile
- The default template is also the base card component template

---

## When to use card components

Card components can be used to:
- customize the display of widgets
- add some UI to a card (eg: a summary header)
- change the way data are managed
    - manage a node in the tile
    - manage some child tile(s)
- modify the presentation of cards and tiles in tree UIs
    - graph designer
    - resource editor

---

## Card component templates

As with widgets, the default card component template has a number of blocks we can override:
- `editor_tree`: the card and its tiles in the editor tree
- `designer_tree`: the card and its widgets in the designer tree
- `permissions_tree`: the card and its widgets in the designer tree
- `form`: the entire card in the resource editor
- `form_header`: the card header in the resource editor
- `form_buttons`: the buttons to manage save/cancel in the resource editor
- `report`: the card in the resource report
- `config`: the configuration form for the card component in the designer

---

## Card component view model

`arches/app/media/js/viewmodels/card-component.js`

As with widgets, this view model provides some observables by default
- configurations
    - `params.configKeys = []`
- `card` (`arches/app/media/js/viewmodels/card.js`)
- `tile` (`arches/app/media/js/viewmodels/tile.js`)
- `preview`
- `form`

---

## Adding an address card component

The address card component JSON (`card_components/address-card.json`):
```json
{
    "name": "Address Card",
    "description": "",
    "component": "views/components/card_components/address-card",
    "componentname": "address-card",
    "defaultconfig": {
        "icon": "star-15"
    }
}
```

---

## Add a map to the card header (demo)

---

## Add a map to the card header - View model

```js
if (self.tile) {
    _.each(koMapping.toJS(self.tile.data), function(value) {
        if (value && value.address && value.x && value.y) {
            geoJSON.features.push({
                'properties': {
                    'address': value.address
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [value.x, value.y]
                }
            });
        }
    });
}
```

---

## Add a map to the card header - Template

```HTML
{% block form_header %}
    {{ block.super }}
    <div class="address-card-map" data-bind="mapboxgl: {
        mapOptions: {
            style: 'mapbox://styles/mapbox/streets-v9'
        },
        afterRender: setupMap
    }"></div>
{% endblock form_header %}
```

---

## Add form for map icon (demo)

---

## Add form for map icon - Template

```HTML
{% block config %}
<div class="node-config-item">
    <div class="control-label">
        {% trans "Icon" %}
    </div>
    <div>
        <input style="padding-bottom: 5px;" data-bind="select2Query: {
            select2Config: {
                value: icon,
                data: {
                    results: [{
                        text: 'Star',
                        id: 'star-15'
                    }, {
                        text: 'Circle',
                        id: 'circle-15'
                    }, {
                        text: 'Triangle',
                        id: 'triangle-15'
                    }]
                }
            }
        }">
    </div>
</div>
{% endblock config %}
```

---

---

## Registering the card component

- Register the card component using the following command:
```bash
$(env) python manage.py card_component register -s arches_dev_training/card_components/address-card.json
```
- Now you can assign the card component to the Address card of the Person model in the designer UI
