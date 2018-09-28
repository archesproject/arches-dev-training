## What are datatypes in code?

- Arches represents datatypes on the backend as a Python class
    - should extend `arches.app.datatypes.base.BaseDataType`
    - is responsible for all datatype logic
    - `d_data_types.classname` defines this class
    - module containing this class (`d_data_types.modulename`) must be in a path contained in `settings.DATATYPE_LOCATIONS`
- datatypes can also (optionally) include a Knockout component, used for:
    - configuring nodes to use a datatype
    - searching for values of a given datatype in advanced search