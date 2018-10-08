<!-- sectionTitle: Module 1: The Arches Platform -->

# Module 1
## The Arches Platform
## and
## Core Technical Concepts

---

## Lesson Overview

- Describe core technologies and concepts in Arches
- Review standards for contributing to Arches
- Explain different ways of extending Arches

---

## Lesson Goals

- Understand the basic architecture of Arches
- Be familiar with Arches concepts and nomenclature
- Understand how developers contribute to Arches
- Be aware of the ways in which you can extend Arches
- Understand how Arches applications and packages are related
- Know where to find more help

---

## Design Goals

- Open Source
- Multi-language
- Standards based
    * CRM - Conceptual Reference Model (http://www.cidoc-crm.org/)
- Graph Data Structure
    * Supports concept management
    * Allows for a dynamic logical data model (graph) with a static physical model (db schema)
    * PostgreSQL(relational + JSON) ideal for its spatial capabilities
- Interoperable: Data could be used in other systems
- These qualities make Arches highly adaptable to different use cases and geographic contexts

---

## Core Technologies and System Architecture

- Django: server-side web framework
- PostgreSQL/PostGIS: Data store of record (as opposed to the Elasticsearch index)
- Elasticsearch (requires Java): Indexes business data to support search
- TileStache: serves and caches vector and raster tiles
- Knockout.js: UI framework

---

## Managing dependencies

- PIP
- Node/Yarn
- Require.js

---

## Contributing to Arches

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

## Elasticsearch

What is it used for?

How can I inspect my data?

---

## Graphs

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

## Resource Instances

JSON objects that store business data for nodegroups

---

## Datatypes

Define how data are managed for a given node; some examples include:

- String
- Number
- Boolean
- Date
- Concept
- Domain
- GeoJson

Datatypes are responsible for all backend operations, including:
- Validating values prior to save
- Indexing and searching for values in Elasticsearch
- Transforming data on import and export

---

## UI Representation

- Cards - UI representation of a **nodegroup/tile**
- Widgets - UI representation of a **node/value** based on datatype
- A datatype can be represented by different widgets, for example:

| datatype | widgets |
|:--------:|:-------:|
| boolean  | radio, switch, select |
| string   | input, rich text editor |
| domain   | radio, select |
| concept  | radio, select |

---

## Functions

- Custom data processing operations triggered when Arches retrieves, saves, or deletes data belonging to a specified nodegroup.
- Conceptually, similar to a database trigger.
- Arches only includes one function by default:
    - The display descriptors function
    - allows for the definition of names & descriptions for instances of a given resource model

---

## Code organization

- If you've used Django, Arches will look very familiar
- Django template file paths and names generally match their javascript counterparts:
    - `arches/app/templates/views/components/widgets/number.htm`
    - `arches/app/media/js/views/components/widgets/number.js`

---

## Packages

- Organization of files used to implement an Arches application
    - Business data
    - Resource models and branches
    - Custom cards, datatypes, widgets, report templates
- In contrast, a ***Project*** is essentially a Django `project`.
