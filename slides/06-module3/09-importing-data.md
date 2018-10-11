## Importing a model & data

- Now, let's test the new datatype by importing a model and some instance data that implement it **(with your Arches virtual environment activated)**:
```bash
python manage.py packages -o import_graphs -s arches_dev_training/graphs/Person.json
python manage.py packages -o import_business_data -s arches_dev_training/data/Person.json -ow overwrite
```
- The data load can be verified by running the following SQL (you should see tiles containing addresses in the results):
```SQL
select * from tiles;
```
