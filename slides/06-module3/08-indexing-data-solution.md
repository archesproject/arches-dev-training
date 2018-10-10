## Indexing data

```python
def append_to_document(self, document, nodevalue, nodeid, tile):
    document['strings'].append({
        'string': nodevalue['address'],
        'nodegroup_id': tile.nodegroup_id
    })

def get_search_terms(self, nodevalue, nodeid=None):
    return [
        nodevalue['address']
    ]
```
