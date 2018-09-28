## How are datatypes registered with Arches?

The `d_data_types` table has the following columns:
- `datatype` [string]: the name of the datatype, also the primary key
- `iconclass` [string]: a class (or classes) to be used to render an icon for this datatype
- `modulename` [string]: the python module that defines this datatype
- `classname` [string]: the class that defines this datatype
- `configcomponent` [string]: an optional path to a KO component for configuration
- `defaultconfig` [JSON]: the default configuration for nodes using this datatype
- `configname` [string]: the name of a KO component for configuration
- `isgeometric` [boolean]: use this datatype on maps
- `defaultwidget` [UUID]: a foreign key to the default widget to use with this datatype
- `issearchable` [boolean]: use this datatype in advanced search
