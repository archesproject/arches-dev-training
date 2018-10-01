## Package Config vs Package Settings


Package Settings

- The django settings relevant to your project not managed in system settings. For example, you may want to include your time wheel configuration and your analysis SRID settings in this file so that users do not have add these settings manually to their own settings file after loading your package. This file is copied into your project when the package is loaded.


Package Config

- This file allows you to configure other parts of the data loading process. For example, the order in which the business data files are loaded
