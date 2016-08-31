# Documentation authoring instructions

You can get help at [mapzen.com/documentation](https://mapzen.com/documentation/), or click `Documentation` in the top header on any page on [mapzen.com](https://mapzen.com) to take you there.

This site brings together all Mapzen's documentation in one place. The underlying source help files are in GitHub, but display them in a way that is easy to navigate and visually pleasing. In addition, putting the help on mapzen.com connects it to the resources on the website, such as signing up for API keys.

[mapzen-docs-generator](https://github.com/mapzen/mapzen-docs-generator) contains the configuration files and tools used to build the help system. Anytime there is a change to mapzen-docs-generator, CircleCI rebuilds the site. It also builds hourly to catch any changes in each documentation source repository.

## Update the table of contents

To display on the documentation site, you need to add a topic to a configuration file to make it part of the help build process. Otherwise, the topic exists only in the repository. It is fine to have topics in the repository that are not in the help system, as long as you know that is happening.

You need to update the config.yml file to add a topic, remove one, or rename it in the table of contents.

1. Go to https://github.com/mapzen/mapzen-docs-generator/tree/master/config
2. Find the .yml file for your section of help. For example, Mapzen Mobility can be found in mobility.yml.
3. Under `pages:`, make the change to the table of contents. The topic in the `Home:` position should always be only `index.md` (under MkDocs rules). Add topics by including a heading, contained in single quotation mark, followed by a colon and the name of the md file. For example, `'API Reference': 'api-reference.md'`
4. You can add nesting in the table of contents by indenting the lines underneath the heading.
```json
- Concept overviews:
  - 'The Scene File': 'Scene-file.md'
```

Filenames are case-sensitive, so 'Scene-file.md' is different from 'scene-file.md'. The filename in the config file must exactly match the source file, or else you will get a build error.

## Add URL redirects

Mapzen wrote some additional Python code to enable URLs to forward when files are renamed or moved. For example, the existing Turn-by-Turn, Optimized Route, and Matrix sections of the help were grouped under a Mobility section when they were packaged into a product called Mapzen Mobility. Because adding mobility changed the URLs, redirects allowed the previous topics to be found in the new help.

For example, https://mapzen.com/documentation/turn-by-turn/api-reference/ redirects to https://mapzen.com/documentation/mobility/turn-by-turn/api-reference/ (note the mobility in the URL).

## Rename or move files into a structure different from the source



## Build and deploy the help system website

The help system is built with an open-source Python tool called [MkDocs](http://www.mkdocs.org/), which formats GitHub markdown files in to a static, HTML website. MkDocs also creates a table of contents, a simple keyword search, navigation breadcrumbs, and links to move back and forward between topics. Note that while MkDocs reads just one source, Mapzen has enhanced the generator to integrate multiple repositories.
