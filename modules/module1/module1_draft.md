### Module 1: The Arches Platform and Core Technical Concepts

---

**Lesson Overview**

Arches Application Overview
- Design goals
- Core technologies and system architecture
- Managing dependencies

Contributing to Arches
- Getting more information
- Submitting tickets/Zenhub
- Writing documentation
- Code conventions
- Submitting pull requests
- Developer Code of Conduct

Major Arches Concepts
- graphs
- datatypes
- widgets
- tiles
- cards
- report templates
- functions
- packages

Extending Arches for your application
- Datatypes
- Widgets
- Functions
- Cards
- Package development

---

**Design Goals**

- Graph data structure

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
- Datetime
- Concept
- Domain
- GeoJson

---

**UI Representation**

- Widgets - UI representation of **nodes**
- Cards - UI representation of **nodegroups**

---

**Card Components**

Organize how nodes are represented in the UI
- Resource editor
- Card tree
- Reports

---

**Functions**

Data processing operations triggered by a get, save, delete or index event.

---

**Code organization**



**Packages**

Organization of files used to implement an Arches application
- Business data
- Resource models and branches
- Custom cards, datatypes, widgets, report templates
