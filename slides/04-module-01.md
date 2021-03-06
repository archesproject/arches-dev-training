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

## Contributing to Arches

- Communicating about development issues:
    - Ask questions on the forum: https://groups.google.com/forum/#!forum/archesproject
    - Write a ticket on GitHub: https://github.com/archesproject/arches
- Writing documentation:
    - Documentation is in a dedicated repo: https://github.com/archesproject/docs
    - Written in restructured text
    - Converted to HTML using Sphinx

---

## Contributing Code

- Code style conventions:
    - Python: PEP 8
    - JavaScript: ESlint, 'recommended'
- Submitting pull requests
    - Please create a ticket in the Arches repo first
    - Create your own fork with a branch for the ticket
    - Submit the pull request from your fork
- Developer Code of Conduct
    - https://www.archesproject.org/code-of-conduct/
    - Guidelines for Participation in Arches
    - Guidelines for Commercial Entities and Others Deploying Arches
    - Arches Trademark and Branding

---

## Graphs

- Arches models business data as `graphs`
- There are two kinds of `graphs` in Arches:
    - Resource Models
        - The blueprint of a resource instance
        - Conceptually similar to a class in an object-oriented programming language
        - Composed of a root node and one or more branches
    - Branches
        - Building blocks of a resource model
        - Generally composed of nodes of a particular theme
        - Nodes on a branch that share the same parent compose a Nodegroup

---

## Graphs

- Graphs are comprised of:
    - Nodes
        - The smallest unit of a resource model
        - Semantic or data collecting
    - Edges
        - Relationships between nodes.
        - In some cases has a relationship with its parent defined

---

## Resource Instances

- Resource Model vs Resource Instance
- Resource models often referred as `models` or `graphs`
- Resource instances often referred to as `resources` or `instances`

---

## Elasticsearch

The structure of business data in Elasticsearch is not exactly the same as in
PostgreSQL.

- [Elasticsearch-head](https://github.com/mobz/elasticsearch-head)
- [Elasticsearch-head chrome plugin](https://chrome.google.com/webstore/detail/elasticsearch-head/ffmkiejjmecolpfloofpjologoblkegm/)

---

## Datatypes

- Datatypes define how data are managed for a given node
- For example: strings, numbers, dates, etc.
- Datatypes are responsible for all backend operations, including:
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

## Managing dependencies

- Python pip (`requirements.txt` and `requirements_dev.txt`)
- Node/Yarn (`package.json`)
- Core JavaScript dependencies are loaded in `arches/app/templates/javascript.htm`
- You can add to these dependencies in your project's `package.json` file
- For editing documentation you need (already in `requirements_dev.txt`)
    - sphinx
    - sphinx-rtd-theme

---

## Packages

- Organization of files used to implement an Arches application
    - Business data
    - Resource models and branches
    - Custom cards, datatypes, widgets, report templates
- In contrast, a ***Project*** is essentially a Django `project`.

---

## Working in class - dependencies

- You are expected to have the dependencies outlined [here](https://arches.readthedocs.io/en/stable/requirements-and-dependencies/) installed as well as [Arches](https://arches.readthedocs.io/en/stable/installation/)
- You'll also need a git client and a text editor; we recommend [Atom](https://atom.io/)
- If you don't have these installed already, you may want to follow along with a classmate today and install them before tomorrow's class

---

## Working in class - project

- throughout the class, we'll be doing development in an Arches project stored in a GitHub repository
- to set up your local environment, clone the repository at [`archesproject/arches-dev-training-project`](https://github.com/archesproject/arches-dev-training-project) on GitHub:
```bash
git clone https://github.com/archesproject/arches-dev-training-project.git
```
- ...then install packages and build the your starter database like so **(with the virtual environment activated where you installed Arches)**:
```bash
yarn install
python manage.py packages -o setup_db
```
