<!-- sectionTitle: Module 2: Introduction to Datatypes -->

# Module 2
## Introduction to Datatypes

---

## Lesson Overview

- review what datatypes are in Arches
    - what can they do?
    - where are datatypes registered?
    - what are they in code?
    - when do I need a new datatype?
- look at code for datatypes built into Arches

---

## What are datatypes?

- a way of representing values in Arches resources
- Arches includes sensible defaults:
    - string
    - number
    - date
    - etc...
- consist of backend code for managing data
- can optionally include a front end configuration component
- data are actually stored as JSON (can be objects or literals)

---

## What can datatypes do?

- validate incoming data before saving values
- transform values for import/export
- index data to Elasticsearch
- query data in Elasticsearch for advanced searching
- handle incoming request objects (to save files, for example)
- execute logic after data are saved
- provides hooks for Arches native geospatial features
    - tileserver layers
    - map overlays
    - etc.

---

## How are datatypes registered with Arches?

Arches stores datatypes in PostgreSQL, in a table called `d_data_types`, for example...

### Query
```SQL
SELECT * FROM d_data_types WHERE datatype = 'boolean';
```

### Results
<div class="db-results">
    <table>
        <thead>
            <tr>
                <th style="text-align:left">datatype</th>
                <th style="text-align:left">iconclass</th>
                <th style="text-align:left">modulename</th>
                <th style="text-align:left">classname</th>
                <th style="text-align:left">configcomponent</th>
                <th style="text-align:left">defaultconfig</th>
                <th style="text-align:left">configname</th>
                <th style="text-align:left">isgeometric</th>
                <th style="text-align:left">defaultwidget</th>
                <th style="text-align:left">issearchable</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td style="text-align:left">boolean</td>
                <td style="text-align:left">fa fa-toggle-on</td>
                <td style="text-align:left">datatypes.py</td>
                <td style="text-align:left">BooleanDataType</td>
                <td style="text-align:left">views/components/datatypes/boolean</td>
                <td style="text-align:left">{"trueLabel":"Yes","falseLabel":"No"}</td>
                <td style="text-align:left">boolean-datatype-config</td>
                <td style="text-align:left">false</td>
                <td style="text-align:left">10000000-0000-0000-0000-000000000006</td>
                <td style="text-align:left">true</td>
            </tr>
        </tbody>
    </table>
</div>

---

## How are datatypes registered with Arches?

The `d_data_types` table has the following columns:
- `datatype` [string]: the name of the datatype, also the primary key
- `iconclass` [string]: a class (or classes) to be used to render an icon for this datatype
- `modulename` [string]: the python module that defines this datatype
- `classname` [string]: the class that defines this datatype
- `configcomponent` [string]: an optional path to a KO component for configuration
- `defaultconfig` [JSON]: the default configuration for nodes using this datatype
- `configname` [string]: the name of a KO component for configuration
- `isgeometric` [boolean]: use this datatype on maps
- `defaultwidget` [UUID]: a foreign key to the default widget to use with this datatype
- `issearchable` [boolean]: use this datatype in advanced search

---

## What are datatypes in code?

- Arches represents datatypes on the backend as a Python class
    - should extend `arches.app.datatypes.base.BaseDataType`
    - is responsible for all datatype logic
    - `d_data_types.classname` defines this class
    - module containing this class (`d_data_types.modulename`) must be in a path contained in `settings.DATATYPE_LOCATIONS`
- datatypes can also (optionally) include a Knockout component, used for:
    - configuring nodes to use a datatype
    - searching for values of a given datatype in advanced search

---

### Example: BooleanDataType Python class

```python
class BooleanDataType(BaseDataType):

    def validate(self, value, row_number=None, source=''):
        errors = []

        try:
            type(bool(distutils.util.strtobool(str(value)))) is True
        except:
            errors.append({
                'type': 'ERROR',
                'message': '{0} is not of type boolean. This data was not imported.'.format(value)
            })

        return errors

    def transform_import_values(self, value, nodeid):
        return bool(distutils.util.strtobool(str(value)))

    def append_search_filters(self, value, node, query, request):
        try:
            if value['val'] != '':
                term = True if value['val'] == 't' else False
                query.must(Term(field='tiles.data.%s' % (str(node.pk)), term=term))
        except KeyError, e:
            pass
```

---

### Example: BooleanDataType configuration JS

```javascript
define(['knockout'], function(ko) {
    var name = 'boolean-datatype-config';
    ko.components.register(name, {
        viewModel: function(params) {
            var self = this;
            var config = params.config ? params.config : params.node.config;

            this.search = params.search;
            this.graph = params.graph;
            this.trueLabel = config.trueLabel;
            this.falseLabel = config.falseLabel;

            if (this.search) {
                var filter = params.filterValue();
                this.searchValue = ko.observable(filter.val || '');
                this.filterValue = ko.computed(function() {
                    return {
                        val: self.searchValue()
                    };
                });
                params.filterValue(this.filterValue());
                this.filterValue.subscribe(function(val) {
                    params.filterValue(val);
                });
            }
        },
        template: { require: 'text!datatype-config-templates/boolean' }
    });
    return name;
});
```

---

### Example: BooleanDataType configuration HTML

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

---

## Use a custom datatype when...

- you need to store data structures not currently supported in Arches
- you need to implement custom logic for:
    - validation
    - Elasticsearch indexing/querying
    - import/export
    - handling requests
