**Projects**

- Projects facilitate all of the customizations that you will need to make one installation of Arches different from the next
- You can update html to modify web page branding, and add functions, datatypes, and widgets to introduce new functionality
- A project sits outside of your virtual environment, and can thus be transferred to any other system where Arches is installed
- The templates directory holds HTML templates that you can modify to customize the branding and general appearance of your project.
- Many project-specific settings are defined in settings.py. You should use settings_local.py to store variables that you may want to keep out of the public eye (db passwords, API keys, etc.).
- Contains your site specific django settings

```
Package Settings
  ├── Project Settings
        ├── Core Arches Settings
```
