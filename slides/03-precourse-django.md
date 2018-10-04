<!-- sectionTitle: Django Intro -->
<!-- background: jellybean -->

# Django
## an Introduction

---

## Lesson Overview

In this lesson we will briefly discuss each of the following Django concepts with examples and an explanation of how they are used in Arches

- Models/Proxy Models
- Views
- Routing
- Templates
- Projects
- Settings
- Apps
- Management Commands

---

## Lesson Goals

To have a basic understanding of Django and how the framework is applied in Arches

Django has a great tutorial, but it take longer than this session.
However, if you're new to Django, it would
be worth the time to do it.

---

## What is Django?

- "The web framework for perfectionists with deadlines"
- Full-featured Python server-side web framework.
- Strong documentation & community
- Features:
    - Authentication
    - ORM and database migrations
    - Template language
    - Admin interface
    - Internationalization/Localization
    - Development server
    - Support for spatial data
    - Email/Messaging
    - and more ...

---

## VirtualEnv

Django projects are typically run inside of a virtual environment

```bash
pip install virtualenv
virtualenv env
source env/bin/activate
pip install django
```

---

## Models (`models.py`)

Models are Django's object representation of your database schema:

```python
class DDataType(models.Model):
    datatype = models.TextField(primary_key=True)
    defaultwidget = models.ForeignKey(db_column='defaultwidget', to='Widget', null=True)
    isgeometric = models.BooleanField()

    class Meta:
        managed = True
        db_table = 'd_data_types'
```

![Datatype Table](/images/datatype-table.png)

---

## Migrations

As your app is developed, models will change. For example you might:

- Add a field
- Remove a field
- Add a constraint
- Rename a field
- etc

You can update your database with these changes
by running migrations:

- create a new migration from your models
```bash
python manage.py makemigrations
```
- run any pending migrations
```bash
python manage.py migrate
```  

---

## Views (`views.py`)

Views define how Django handles requests.  Often, views will retrieve data from a model and use that to render a template (HTML):

```python
@method_decorator(group_required('Graph Editor'), name='dispatch')
class GraphDesignerView(GraphBaseView):

    def get(self, request, graphid):
        datatypes = models.DDataType.objects.all()
        context['datatypes'] = datatypes=datatypes
        return render(request, 'graph-designer.htm', context)
```

...or they may simply return the model data (JSON):

```python
class ResourceData(View):

    def get(self, request):
        datatypes = models.DDataType.objects.all()
        return JSONResponse(datatypes)
```

---

## Routing (`urls.py`)

```python
uuid_regex = settings.UUID_REGEX
urlpatterns = [
    url(
        r'^graph_designer/(?P<graphid>%s)$' % uuid_regex,
        GraphDesignerView.as_view(),
        name='graph_designer'
    ),
]
```

For example, if you server is running at localhost:8080, an example of the above URL would look like this:

http://localhost:8000/graph_designer/ccbd1537-ac5e-11e6-84a5-026d961c88e6

---

## Templates

Uses data from a view to render a web page (using the Django template language).

An example template:
```html
<ul>
{% for datatype in datatypes %}
    <li>{{datatype.datatype}}</li>
{% endfor %}
</ul>
```

The above template might render something like this:
```html
<ul>
    <li>file-list</li>
    <li>string</li>
    <li>number</li>
</ul>
```
---

## Django Projects

```
arches/
    manage.py
    arches/
        __init__.py
        settings.py
        urls.py
        wsgi.py
```

BTW, Arches is a Django Project

---

## Settings (`settings.py`)

Application configuration:

```python
DEBUG = True
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
```

---

## Admin and Management Commands

```bash
django-admin startproject mysite
archesproject create myproject
```

```bash
python manage.py createsuperuser
python manage.py startapp mynewapp
python manage.py runserver
```

You can easily add custom management commands

```bash
python manage.py packages -o load_package
python manage.py es index_database
```

---

## Django Apps

A project's functionality can be divided by subject into `Apps`
This is where our models and views go:

```
app/
    __init__.py
    admin.py #registers app with admin page
    apps.py  #app configuration file
    migrations/  #migration files
        __init__.py
    models.py
    tests.py
    views.py
```

The Admin page is a good example of a Django app.

---

## Piecing it together

1. Create a project
2. Modify your settings (particularly db settings)
3. Create a super user
4. Create an app
5. Register your app in settings
6. Write your models -> migrate
7. Write your templates, views, and urls (and tests)
