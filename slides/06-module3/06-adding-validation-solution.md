## Adding validation

```python
def validate(self, value, source=None):
    errors = []
    message = 'datatype: address, value: {1} {2} - missing required properties. This data was not imported.'
    try:
        value['address']
        value['x']
        value['y']
    except KeyError:
        errors.append({
            'type': 'ERROR',
            'message': message.format(value, source)
        })

    return errors
```
