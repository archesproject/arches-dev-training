<!-- sectionTitle: Django Intro -->
<!-- background: jellybean -->

# Django
## an Introduction

---

**Lesson Overview**

In this lesson we will briefly discuss each of the following Django concepts with examples and an explanation of how they are used in Arches

- Projects and Apps
- Settings
- Management Commands
- Models/Proxy Models
- Views
- Templates
- Routing

---

***Lesson Goals***

To have a basic understanding of Django and how the framework is applied in Arches

Django has a great tutorial, but it take longer than this session.
However, if you're new to Django, it would
be worth the time to do it.

---

**What is Django?**

## The web framework for perfectionists with deadlines

- Full-featured Python server-side web framework.
- Well documented
- Active community
- It offers:
    - Authentication
    - ORM and database migrations
    - Template language
    - Admin interface
    - Internationalization
    - Dev server
    - GeoDjango (spatial datatypes: Geography and Geometry)
    - Email support
    - and more ...

---

## Models
### Django's object representation of your database schema

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

### Views

Send data from a model to a template:

```python
@method_decorator(group_required('Graph Editor'), name='dispatch')
class GraphDesignerView(GraphBaseView):

    def get(self, request, graphid):
        datatypes = models.DDataType.objects.all()
        context['datatypes'] = datatypes=datatypes
        return render(request, 'graph-designer.htm', context)
```

or just as data:

```python
class ResourceData(View):

    def get(self, request):
        datatypes = models.DDataType.objects.all()
        return JSONResponse(datatypes)
```

---

##Templates

Uses data from a view to render a web page.

---

## Urls

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

http://localhost:8081/graph_designer/ccbd1537-ac5e-11e6-84a5-026d961c88e6

---

## VirtualEnv

Typically Django projects are run in a virtual environment.  

---

## Settings

settings.py

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

## Django Apps

A project's functionality can be divided by subject into `Apps`

The Admin page is a good example of a Django app.

### Important for Django, but not so important to understand Arches
### Here's a simple example:

app/
    __init__.py
    admin.py
    apps.py
    migrations/
        __init__.py
    models.py
    tests.py
    views.py

## Arches also contains, but it's complex.
