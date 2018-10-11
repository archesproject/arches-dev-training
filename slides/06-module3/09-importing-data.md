## Importing a model & data

- Now, let's test the new datatype by importing a model and some instance data that implement it **(with your Arches virtual environment activated)**:
```bash
python manage.py packages -o import_graphs -s arches_dev_training/graphs/Person.json
python manage.py packages -o import_business_data -s arches_dev_training/data/Person.json -ow overwrite
```
- You can verify that the data loaded by turning on the development server and then going to the [search page](http://localhost:8000/search):
```bash
python manage.py runserver
```
