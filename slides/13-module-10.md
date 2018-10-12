<!-- sectionTitle: Module 10: Creating a Package -->

# Module 10
## Packaging it all up

---

## Lab Overview

Create a package from your project to share your customizations:
- Create a new package
- Migrate extensions and data from the training project
- Create a new GitHub repository from your package
- Create a new project and test your package load from GitHub

---

## Why create a package

- to share your customizations/extensions
- to allow for easy redeployment of an Arches application
- to share resource models or instance data across deployments

---

## Create a package

First, we must create a package into which we will add our extensions and data (update the path accordingly):
```bash
python manage.py packages -o create_package -d /Full/path/to/mypackage
```

---

## Create a package (demo)

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
- `system_settings` - package system settings
- (more information can be found [here](https://arches.readthedocs.io/en/stable/projects-and-packages/#creating-a-new-package))

---

## Migrate extensions and data

- `data` > `business_data`
- (`widgets`, `card_components`, `reports`, `datatypes`) > `extensions`
- `graphs` > `graphs`
- `map_layers` > `map_layers`
- `sql` > `preliminary_sql`

---

## Migrate extensions and data (demo)

---

## Upload your package to GitHub (demo)

---

## Create a project and load package

Now, we can create a project and load our package to test (update the URL to match your repository):
```bash
arches-project create testproject
python manage.py packages -o load_package -s https://github.com/user/repo/branch.zip -db true
```

---

## Create a project and load package (demo)

---

# Thanks!