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