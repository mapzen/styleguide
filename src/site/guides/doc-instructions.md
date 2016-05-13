# Documentation authoring instructions

You can get help at [mapzen.com/documentation](https://mapzen.com/documentation/), or click `Documentation` in the top header on any page on [mapzen.com](https://mapzen.com) to take you there.

This site brings together all Mapzen's documentation in one place. The underlying source help files are in GitHub, but display them in a way that is easy to navigate and visually pleasing. In addition, putting the help on mapzen.com connects it to the resources on the website, such as signing up for API keys. 

[mapzen-docs-generator](https://github.com/mapzen/mapzen-docs-generator) contains the configuration files and tools used to build the help system. Anytime there is a change to mapzen-docs-generator, CircleCI rebuilds the site. It also builds hourly to catch any changes in each documentation source repository.

## Update the table of contents (add a topic, remove one, rename it in the table of contents)

To display on the documentation site, you need to add a topic to a configuration file. Otherwise, the topic exists only in the repository.

1. Go to https://github.com/mapzen/mapzen-docs-generator/tree/master/config
2. Find the .yml file for your section of help. For example, Mapzen Turn-by-Turn can be found in turn-by-turn.yml.
3. Under `pages:`, make the change to the table of contents. `Home:` should always be only `index.md.` Add topics by including a heading, contained in single quotation mark, followed by a colon and the name of the md file. For example, `'API Reference': 'api-reference.md'` 
4. You can add nesting in the table of contents by indenting the lines underneath the heading. 
```json
- Concept overviews:
  - 'The Scene File': 'Scene-file.md'
```

## Build and deploy the help system website

The help system is built with an open-source Python tool called [MkDocs](http://www.mkdocs.org/), which formats GitHub markdown files in to a static, HTML website. MkDocs also creates a table of contents, a simple keyword search, navigation breadcrumbs, and links to move back and forward between topics. Note that while MkDocs reads just one source, Mapzen has enhanced the generator to integrate multiple repositories.
