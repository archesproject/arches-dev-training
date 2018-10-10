## The address datatype

```python
from arches.app.datatypes.base import BaseDataType

details = {
    'datatype': 'address',
    'iconclass': 'fa fa-location-arrow',
    'modulename': 'datatypes.py',
    'classname': 'AddressDataType',
    'defaultwidget': None,
    'defaultconfig': None,
    'configcomponent': None,
    'configname': None,
    'isgeometric': False,
    'issearchable': False
}


class AddressDataType(BaseDataType):

    def validate(self, value, source=None):
        return []

    def append_to_document(self, document, nodevalue, nodeid, tile):
        return

    def get_search_terms(self, nodevalue, nodeid=None):
        return []

```
