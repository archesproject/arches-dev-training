### Module 1: The Arches Platform and Core Technical Concepts

---

**Lesson Overview**

Arches design goals, core technologies, system architecture, and coding conventions.
Organization of Arches code base, Git repository and submitting pull requests.
Developer code of conduct.

Introduction to graphs, datatypes, widgets, tiles, card components, report templates,
packages. Overview/summary of how Arches implements data models, modular design
of data types, relationship between data types and widgets. Role and use of card
components in Arches data editor UI. Implementing custom logic via functions. Using
packages to create Arches applications

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

---

**Contributing to Arches**

- Communicating about development issues:
    - Ask questions on the forum: https://groups.google.com/forum/#!forum/archesproject
    - Write a ticket on GitHub: https://github.com/archesproject/arches

- Coding Conventions:
    - PEP 8
    - ESlint: 'recommended'

- Submitting pull requests:

- Developer Code of Conduct

---

**Graphs**

- Resource Models
- Branches
- Nodes

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

- Widgets - Nodes
- Cards - Nodegroups

---

**Card Components**

Organize how nodes are represented in the UI
- Resource editor
- Card tree
- Reports

---

**Functions**

Data processing operations triggered by a get, save, delete or index event.

**Packages**

Organization of files used to implement an Arches application
- Business data
- Resource models and branches
- Custom cards, datatypes, widgets, report templates
