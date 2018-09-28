## How are datatypes registered with Arches?

Arches stores datatypes in PostgreSQL, in a table called `d_data_types`, for example...

### Query
```SQL
SELECT * FROM d_data_types WHERE datatype = 'boolean';
```

### Results
<div class="db-results">
    <table>
        <thead>
            <tr>
                <th style="text-align:left">datatype</th>
                <th style="text-align:left">iconclass</th>
                <th style="text-align:left">modulename</th>
                <th style="text-align:left">classname</th>
                <th style="text-align:left">configcomponent</th>
                <th style="text-align:left">defaultconfig</th>
                <th style="text-align:left">configname</th>
                <th style="text-align:left">isgeometric</th>
                <th style="text-align:left">defaultwidget</th>
                <th style="text-align:left">issearchable</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td style="text-align:left">boolean</td>
                <td style="text-align:left">fa fa-toggle-on</td>
                <td style="text-align:left">datatypes.py</td>
                <td style="text-align:left">BooleanDataType</td>
                <td style="text-align:left">views/components/datatypes/boolean</td>
                <td style="text-align:left">{"trueLabel":"Yes","falseLabel":"No"}</td>
                <td style="text-align:left">boolean-datatype-config</td>
                <td style="text-align:left">false</td>
                <td style="text-align:left">10000000-0000-0000-0000-000000000006</td>
                <td style="text-align:left">true</td>
            </tr>
        </tbody>
    </table>
</div>
