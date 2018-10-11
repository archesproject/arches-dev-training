## Package Config vs Package Settings

- Package Settings
    - The django settings relevant to your package not managed in system settings
    - used to apply default settings for your package to projects that use it
    - This file is copied into your project when the package is loaded.
- Package Config
    - This file allows you to configure other parts of the data loading process.
    - For example, the order in which the business data files are loaded
