## Adding the address datatype

- Address data can be modeled as a simple object:
```json
{
    "x": 37,
    "y": -127,
    "address": "1234 Fake St., San Francisco, CA 94111"
}
```
- To add the address datatype to Arches, run the following from your project with your virtual environment activated:
```bash
python manage.py datatype register -s arches_dev_training/datatypes/address.py
```
