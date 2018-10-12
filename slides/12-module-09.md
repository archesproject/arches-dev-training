<!-- sectionTitle: Module 9: Arches Geospatial -->

# Module 9
## Introduction to Maps in Arches

---

## Lesson Overview

- Learn the basics about how Arches creates dynamic maps with Mapbox GL JS
- Learn the basics about how Arches serves tiles via TileStache
- Learn about how to add new overlays and basemaps in archesproject
    - from external services using mapbox style json
    - from local PostGIS data using TileStache
- Learn how to add interactivity to custom layers

---

## Mapbox Gl JS

- Arches uses the powerful front end library called [Mapbox GL JS](https://www.mapbox.com/mapbox-gl-js/api/) to create dynamic web maps
- Mapbox GL JS creates beautiful maps with high performance by using
    - Vector Tiles
    - Web GL
- Built to work with services provided by Mapbox, but not required
- Great examples are available [here](https://www.mapbox.com/mapbox-gl-js/examples)

---

## Mapbox Style Spec

- Mapbox GL JS uses a JSON spec called the [Mapbox Style Spec](https://www.mapbox.com/mapbox-gl-js/style-spec) for defining layer styles
- web based tools are available for working with this spec
    - [Mapbox Studio](https://www.mapbox.com/studio/)
    - [Maputnik](https://maputnik.github.io/)
- Esri ArcGIS Online and Portal also support this spec (check your license)

---

## Map sources and layers

- In accordance with the [Mapbox Style Spec](https://www.mapbox.com/mapbox-gl-js/style-spec), Arches tracks map sources and layers
- these are stored in PostgreSQL in the tables `map_sources` and `map_layers`
- `map_layers` are a group of layers as per the style spec that are displayed together (either as a basemap or overlay)
- `map_layers` may reference multiple sources
- `map_sources` and `map_layers` can be managed via the admin interface or CLI
- Layers and sources can be added from a Mapbox style JSON file using the following command:
```bash
python manage.py packages -o add_mapbox_layer -j /path/to/mapbox_style.json -n "New MapBox Layer"
```

---

## Adding basemaps from external services

- add the basemap from Mapbox by running the following: 
```bash
python manage.py packages -o add_mapbox_layer \
-j arches_dev_training/map_layers/mapbox_spec_json/basemaps/decimal.json \
-n "Decimal" -b
```
- add the basemap from Ordinance Survey by running the following: 
```bash
python manage.py packages -o add_mapbox_layer \
-j arches_dev_training/map_layers/mapbox_spec_json/basemaps/os-zoomstack-outdoor.json \
-n "OS Zoomstack Outdoor" -b
```

---

## Vector Tiles

- Vector tiles are a concept as well as a spec purpose fit for this concept
- conceptually, vector tiles are a way of serving up map data as vectors, sub-divided into "tiles"
- traditionally, map tiles on the web were images
- [Mapbox created a spec](https://www.mapbox.com/vector-tiles/specification/) (now widely adopted, including by Esri) to provide highly compressed vector tiles
- Mapbox Gl JS was built to work with Vector tiles (though it can also display raster tiles)
- You can find a list of [great tools for working with vector tiles here](https://github.com/mapbox/awesome-vector-tiles)

---

## TileStache

- Arches integrates the python based tileserver [TileStache](http://tilestache.org/)
- it can be used to serve up data as raster tiles from a variety of sources
- it can also serve vector tiles up out of PostgreSQL
- TileStache provides basic tileserver features like caching, proxying, and metatiles
- It can be a good solution when convenient, but is not perfect for all deployments
- Arches provides some default layers for resources with geometric nodes using TileStache

---

## Tileserver layers

- Arches represents TileStache layers in PostgreSQL as the `tileserver_layers` table
- These layers are defined based on [TileStache layer configurations](http://tilestache.org/doc/#layers)
- `tileserver_layers` records can be managed via the admin interface or CLI
- tileserver layers (and related map sources and layers) can be created from a JSON file using the following command:
```bash
python manage.py packages -o add_tileserver_layer \
-t /path/to/tileserver_config.json -n "New Tileserver Layer"
```

---

```sql
create or replace view addresses as
    select t.resourceinstanceid,
        t.tiledata::json -> n.nodeid::text -> 'address' as address,
        c.config::json -> 'icon' as icon,
        st_transform(
            st_setsrid(
                st_point(
                    (t.tiledata::json -> n.nodeid::text -> 'x')::text::float,
                    (t.tiledata::json -> n.nodeid::text -> 'y')::text::float
                ),
                4326
            ),
            900913
        )::geometry(geometry,900913) as geom,
        row_number () over () as gid
    from tiles t
        left join nodes n on t.nodegroupid = n.nodegroupid
        left join cards c on t.nodegroupid = c.nodegroupid
    where (
        select count(*) as count
        from jsonb_object_keys(t.tiledata) jsonb_object_keys(jsonb_object_keys)
        where (
            jsonb_object_keys.jsonb_object_keys in (
                select n_1.nodeid::text as nodeid
                from nodes n_1
                where n_1.datatype = 'address'::text
            )
        )
    ) > 0 and n.datatype = 'address'::text;
```

---

```json
{
    "type": "vector",
    "layers": [{
        "id": "addresses",
        "source": "addresses",
        "type": "symbol",
        "layout": {
            "icon-image": "{icon}",
            "text-field": "{address}",
            "text-offset": [0, 0.6],
            "text-anchor": "top"
        }
    }],
    "config": {
        "provider": {
            "class": "TileStache.Goodies.VecTiles:Provider",
            "kwargs": {
                "dbinfo": {
                    "host": "localhost",
                    "user": "postgres",
                    "password": "postgis",
                    "database": "arches",
                    "port": "5432"
                },
                "simplify": 0.5,
                "queries": ["select * from addresses"]
            }
        },
        "allowed origin": "*",
        "write cache": false
    }
}
```

---

## Adding interactivity

- Arches provides a number of ways to add interactivity to vectors added to the map
- Vectors representing resource instances can be assigned a property called "`resourceinstanceid`" to give them the default resource instance popup
- There are also ways to make vectors available for [selection as drawings](https://arches.readthedocs.io/en/stable/creating-new-map-layers/#making-selectable-vector-layers) on the map and [add custom popups](https://arches.readthedocs.io/en/stable/creating-new-map-layers/#customizing-map-popup-content)

---

## Adding addresses from PostGIS using TileStache

- First we need to create a view of addreses by running the SQL contained in `arches_dev_training/sql/addresses.sql`
- Now, we can add our new address data as a layer by running:
```bash
python manage.py packages -o add_tileserver_layer \
-t arches_dev_training/map_layers/tile_server/overlays/addresses.json -n "Addresses"
```

---

## A word of warning....

Tuning your map layers can become difficult at scale, so keep some of these warnings in mind:
- caching can speed up the loading of tiles for users, but may slow down updating data
- clustering at high zoom levels with large amounts of data can cause issues; it may help to disable clustering entirely in favor of custom styling
- it may be necessary with some datasets to use an external tileserver, as there are some issues with TileStache 
