<!-- sectionTitle: Module 10: Creating a Package -->

# Module 10
## Packaging it all up

---

## Lab Overview

Create a package from your project to share your customizations:
- Create a new package
- Migrate extensions and data from the training project
- Create a new GitHub repository for your package
- Create a new project and test your package load from GitHub

---

## Create a package

First, we must create a package into which we will add our extensions and data (update the path accordingly):
```bash
python manage.py packages -o create_package -d destination/path/to/mypackage
```

---

## Package extensions and data

- `business_data` - business data to be loaded with this package
    - `files`, `relations`, `resource_views`
- `extensions` - package extensions/customizations
    - `functions`, `datatypes`, `widgets`
- `graphs` - package graphs by type
    - `branches`, `resource_models`
- `map_layers` - project map layers, (mapbox and tileserver layers)
    - `mapbox_styles`, `tile_server`
        - `overlays`, `basemaps`
- `preliminary_sql` - sql files to be executed on load
- `resource_views` - views of your resource data
- `system_settings` - package system settings
- (more information can be found [here](https://arches.readthedocs.io/en/stable/projects-and-packages/#creating-a-new-package))

---

## Migrate extensions and data

- `data` > `business_data`
- `resource views` > `business_data/resource_views`
- (`widgets`, `card_components`, `reports`, `datatypes`) > `extensions`
- `graphs` > `graphs`
- `map_layers` > `map_layers`
- `sql` > `preliminary_sql`

```python manage.py packages -o export_business_data -d ~/Documents/temp/training_pkg/business_data -f 'json' -g 395a71e8-cd0f-11e8-9cc7-784f435179ea```

---

## Create a new project and load package

Now, we can create a project and load our package to test (update the URL to match your repository):
```bash
arches-project create testproject
python manage.py packages -o load_package -s https://github.com/user/repo/branch.zip -db true
```

---

# Thanks!
