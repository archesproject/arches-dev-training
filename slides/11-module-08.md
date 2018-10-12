<!-- sectionTitle: Module 8: Projects and Packages -->

# Module 8
## Projects and Packages

---

## Lesson Goals

- To understand the distinction between a project and a package
- To be familiar with the directory structure of a project and a package
- To understand how to create and maintain your own project and/or package
- To understand how Arches applications and packages are related
- To know how to host and contribute to a project or package

---

## Projects

- Projects facilitate all of the customizations that you will need to make one installation of Arches different from the next
- You can update html to modify web page branding, and add functions, datatypes, and widgets to introduce new functionality
- A project sits outside of your virtual environment, and can thus be transferred to any other system where Arches is installed
- The templates directory holds HTML templates that you can modify to customize the branding and general appearance of your project.

---

## Project Settings

- Many project-specific settings are defined in `settings.py`
- You should use `settings_local.py` to store variables that you may want to keep out of the public eye (db passwords, API keys, etc.).
- Contains your site specific Django settings
- Settings from Arches are inherited and can be overridden by projects and packages:

```
Project Settings
├── Package Settings
     ├── Core Arches Settings
```

---

## Creating a Project

```bash
arches-project create mynewproject
```

---

## Project Directory Structure

```
Example Project
  ├── datatypes
  ├── functions
  ├── logs
  ├── media
  │   ├── img
  │   │   └── landing
  │   ├── js
  │   │   ├── reports
  │   │   └── views
  │   │       └── components
  │   └── packages
  ├── node_modules
  ├── system_settings
  ├── templates
  │   └── views
  │       └── components
  │           ├── functions
  │           └── widgets
  ├── uploadedfiles
  └── widgets
```

---

## Packages

- A package contains all the data you'd like loaded into your Arches implementation
    - business data
    - concepts/reference data
    - resource models/branches
    - datatypes/functions/widgets
    - map layers
- Each of these components can be loaded separately
- The whole package can be loaded from local file system or directly from github
- Also contains package specific settings (e.g. load order of business data, date format of business data)
- A local package may be updated if you make changes in your deployment of Arches (eg changes to branches and/or resource models)

---

## Creating a Package

```bash
python manage.py packages -o create_package -d /Full/path/to/mypackage
```

---

## Package Directory Structure

```
Example Package
  ├── business_data
  │   ├── files
  │   └── relations
  ├── extensions
  │   ├── datatypes
  │   ├── functions
  │   └── widgets
  ├── graphs
  │   ├── branches
  │   └── resource_models
  ├── map_layers
  │   ├── mapbox_spec_json
  │   │   ├── basemaps
  │   │   └── overlays
  │   └── tile_server
  │       ├── basemaps
  │       └── overlays
  ├── preliminary_sql
  ├── reference_data
  │   ├── collections
  │   └── concepts
  ├── staging_data
  └── system_settings
```

---

## Package Config vs Package Settings

- Package Settings
    - The django settings relevant to your package not managed in system settings
    - used to apply default settings for your package to projects that use it
    - This file is copied into your project when the package is loaded.
- Package Config
    - This file allows you to configure other parts of the data loading process.
    - For example, the order in which the business data files are loaded

---

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
