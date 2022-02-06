# Some options to configure pdoc visual layout
- You'll need to specify a `template_directory` in pdoc's configuration:
```python
pdoc.render.configure(template_directory="./path/to/_pdoc_custom_templates")
```
- There you need to create html files for each template you want to modify. 
They use jinja2 syntax. You can add comments surrounded by `{# #}`
See some [examples at pdoc site](https://github.com/mitmproxy/pdoc/blob/main/examples/custom-template/module.html.jinja2)
Plus [jinja2 documentation](https://jinja.palletsprojects.com/en/3.0.x/templates/#child-template).

### Example: Moving docstring up, so it stays below function definition when source code is expanded:

_**FILE: ./path/to/_pdoc_custom_templates/module.html.jinja2**_
```jinja2
{% extends "default/module.html.jinja2" %} {# <--- ALL CODE BELOW MODIFIES DIFFERENT PARTS OF THIS FILE #}

{% defaultmacro member(doc) %}
    {% if doc.type == "class" %}
        {{ class(doc) }}
    {% elif doc.type == "function" %}
        {{ function(doc) }}
    {% elif doc.type == "module" %}
        {{ submodule(doc) }}
    {% else %}
        {{ variable(doc) }}
    {% endif %}
    {{ docstring(doc) }}  {# DVD moved this up: https://github.com/mitmproxy/pdoc/issues/343 #}
    {% if doc.type != "variable" %}
        {# <br>  #}{# DVD we can also add this, just in case the very last line of a docstring 
                      is long enough to reach exactly the top right of its section, 
                      where the <summary>View Source</summary> appears 
                      (i.e. for long strings without break spaces, like a long url or so). #}
        {{ view_source(doc) }}
    {% endif %}
{% enddefaultmacro %}
```


### Example: Adding module full name at top of left navigation bar:

_**FILE: ./path/to/_pdoc_custom_templates/module.html.jinja2**_
```jinja2
{% extends "default/module.html.jinja2" %} {# <--- ALL CODE BELOW MODIFIES DIFFERENT PARTS OF THIS FILE #}

{% block nav %}  {# <----- I HAVE TO REPRODUCE THE FULL BLOCK WHICH CONTAINS THE PART I WANT TO MODIFY  #}
    <nav class="pdoc">
        <label id="navtoggle" for="togglestate" class="pdoc-button">{% include 'navtoggle.svg' %}</label>
        <input id="togglestate" type="checkbox">
        <div>
            {% block module_list_link %}
                {% set parentmodule = ".".join(module.modulename.split(".")[:-1]) %}
                {% if parentmodule and parentmodule in all_modules %}
                    <a class="pdoc-button module-list-button" href="../{{ parentmodule.split(".")[-1] }}.html">
                        {% include "box-arrow-in-left.svg" %}
                        &nbsp;
                        {{- parentmodule -}}
                    </a>
                {% elif all_modules|length > 1 %}
                    <a class="pdoc-button module-list-button" href="{{ "../" * module.modulename.count(".") }}index.html">
                        {% include "box-arrow-in-left.svg" %}
                        &nbsp;
                        Module Index
                    </a>
                {% endif %}
            {% endblock %}

            {% block nav_title %}
                {% if logo %}
                    {% if logo_link %}<a href="{{ logo_link }}">{% endif %}
                    <img src="{{ logo }}" class="logo" alt="project logo"/>
                    {% if logo_link %}</a>{% endif %}
                {% endif %}
            {% endblock %}

            {% block search_box %}
                {% if search and all_modules|length > 1 %}
                    {# we set a pattern here so that we can use the :valid CSS selector #}
                    <input type="search" placeholder="Search..." role="searchbox" aria-label="search"
                           pattern=".+" required>
                {% endif %}
            {% endblock %}

            {% set index = module.docstring | to_markdown | to_html | attr("toc_html") %}
            {% if index %}
                <h2>Contents</h2>
                {{ index | safe }}
            {% endif %}

            {# DVD #}{#<h4>{{ module.fullname }} </h4>#}

            {% if module.submodules %}
                <h2>Submodules</h2>
                <ul>
                    {% for submodule in module.submodules %}
                        <li>{{ submodule.taken_from | link }}</li>
                    {% endfor %}
                </ul>
            {% endif %}

            {% if module.members %}
                <h2>API Documentation</h2>
                <h4>{{ module.fullname }}</h4>  {# <------ THIS IS THE LINE I ADDED #}
                {{ nav_members(module.members.values()) }}
            {% endif %}

            {% block nav_footer %}
                {% if footer_text %}
                <footer>{{ footer_text }}</footer>
                {% endif %}
            {% endblock %}

            {% block attribution %}
                <a class="attribution" title="pdoc: Python API documentation generator" href="https://pdoc.dev">
                    built with <span class="visually-hidden">pdoc</span><img
                        alt="pdoc logo"
                        src="data:image/svg+xml,
                                {%- filter urlencode %}{% include "pdoc-logo.svg" %}{% endfilter %}"/>
                </a>
            {% endblock %}
        </div>
    </nav>
{% endblock %}
```
#### TO-DO:
- Create [TOC](https://stackoverflow.com/questions/18244417/how-do-i-create-some-kind-of-table-of-content-in-github-wiki/66824119#66824119).
- [This](https://github.blog/changelog/2021-04-13-table-of-contents-support-in-markdown-files/) is not working for [gist .md files](https://gist.github.com/jonschlinkert/ac5d8122bfaaa394f896).
