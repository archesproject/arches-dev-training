## Package command examples

- update a local package:
```bash
python manage.py packages -o update_package -d /Full/path/to/mypackage
```
- load a package from GitHub:
```bash
python manage.py packages -o load_package -s https://github.com/package/archive/branch.zip
```
- override your database when loading a package by adding `-db true` (careful!):
```bash
python manage.py packages -o load_package -s https://github.com/package/archive/branch.zip -db true
```
