### Module 1: The Arches Platform and Core Technical Concepts

---

**Lesson Overview**

Arches Application Overview
- Design goals
- Core technologies and system architecture

Contributing to Arches
- Submitting tickets/zenhub
- Writing documentation
- Code conventions and submitting pull requests
- Developer Code of Conduct
- Where to get more help

Major Arches Concepts
- Graphs, datatypes, cards, tiles ...

Extending Arches for your application
- Building custom components (datatypes, widgets, cards, reports)
- Putting it all together: Package development

---

***Lesson Goals***

To understand the basic architecture of Arches
To be familiar with Arches concepts and nomenclature
To understand how developers contribute to Arches
To be aware of the ways in which you can extend Arches
To understand how Arches applications and packages are related
To know where to find more help

---

**Design Goals**

- Open Source
- Multi-language
- Standards based
    * CRM - Conceptual Reference Model (http://www.cidoc-crm.org/)
- Graph Data Structure
    * Supports concept management
    * Allows for a dynamic logical data model (graph) with a static physical model (db schema)
    * PostgreSQL(relational + JSON) ideal for its spatial capabilities
- Interoperable: Data could be used in other systems

These qualities make Arches highly adaptable to different use cases and geographic contexts

---

**Core Technologies and System Architecture**

- Django: server-side web framework
- PostgreSQL/PostGIS: Data store of record (as opposed to the Elasticsearch index)
- Elasticsearch (requires Java): Indexes business data to support search
- TileStache: Caches vector and raster tiles
- Knockout.js: UI framework


**Managing dependencies**
- Node/Yarn
- Require.js

---

**Contributing to Arches**

- Communicating about development issues:
    - Ask questions on the forum: https://groups.google.com/forum/#!forum/archesproject
    - Write a ticket on GitHub: https://github.com/archesproject/arches

- Coding Conventions:
    - PEP 8
    - ESlint: 'recommended'

- Writing documentation:
    - Documentation is in a dedicated repo
    - Written in restructured text
    - Converted to HTML using Sphinx

- Submitting pull requests:

- Developer Code of Conduct

---

**Graphs**

- Resource Models
    - The blueprint of a resource instance
    - Conceptually similar to a class in an object-oriented programming language
    - Composed of a root node and one or more branches
- Branches
    - Building blocks of a resource model
    - Generally composed of nodes of a particular theme
    - Nodes on a branch that share the same parent comprise a Nodegroup
- Nodes
    - The smallest unit of a resource model
    - Semantic or data collecting
- Edges
    - Relationships between nodes.
    - In some cases has a relationship with its parent defined

---

**Datatypes**

Define how data is managed for a node

- String
- Number
- Boolean
- Date
- EDTF
- Concept
- Domain
- GeoJson

Example operations:
    - Validation
    - Transforming data when indexed in Elasticsearch
    - Transforming data on import and export
    - Defines search filters for its type

---

**UI Representation**

- Cards - UI representation of a **nodegroups**
- Widgets - UI representation of a **node** based on datatype
- A datatype can be represented by different widgets

| datatype | widgets |
|:--------:|:-------:|
| boolean  | radio, switch, select |
| string   | input, rich text editor |
| domain   | radio, select |
| concept  | radio, select |

---

**Card Components**

Organize how nodes are represented in the UI
- Resource editor
- Card tree
- Reports

---

**Functions**

Custom data processing operations triggered when Arches retrieves, saves, or deletes data belonging to a specified nodegroup.

Conceptually similar to a database trigger

---

**Code organization**

If you're comfortable with Django, Arches will look very familiar

Django template file paths and names generally match their javascript couterparts:
    - arches/app/templates/views/components/widgets/number.htm
    - arches/app/media/js/views/components/widgets/number.js

**Packages**

Organization of files used to implement an Arches application
- Business data
- Resource models and branches
- Custom cards, datatypes, widgets, report templates
