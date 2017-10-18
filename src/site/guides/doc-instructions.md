# Documentation authoring instructions

You can get help at [mapzen.com/documentation](https://mapzen.com/documentation/), or click `Documentation` in the top header on any page on [mapzen.com](https://mapzen.com) to take you there.

This site brings together all Mapzen's documentation in one place. The underlying source help files are in GitHub, but display them in a way that is easy to navigate and visually pleasing. In addition, putting the help on mapzen.com connects it to the resources on the website, such as signing up for API keys.

[mapzen-docs-generator](https://github.com/mapzen/mapzen-docs-generator) contains the configuration files and tools used to build the help system. Anytime there is a change to mapzen-docs-generator, CircleCI rebuilds the site. There is also a Heroku process that builds hourly to catch any changes in each documentation source repository.

As long as a markdown file is listed in the build configuration, changes you make to the source files in the GitHub branch that is being pulled into the help (typically, the master branch) appear automatically on https://mapzen.com/documentation.

## Build and deploy the help system website

The help system is built with an open-source Python tool called [MkDocs](http://www.mkdocs.org/), which formats GitHub markdown files in to a static, HTML website. MkDocs also creates a table of contents, a simple keyword search, navigation breadcrumbs, and links to move back and forward between topics. Note that while MkDocs reads just one source, Mapzen has enhanced the generator to integrate multiple repositories. There have been additional enhancements to support URL redirects and renaming files in the output help.

## Update the table of contents

To display on the documentation site, you need to add a topic to a configuration file. Otherwise, the topic exists only in the repository. It is fine to have topics in the repository that are not in the help system, as long as you know that is happening.

You need to update the config.yml file to add a topic, remove one, or rename it in the table of contents.

1. Go to https://github.com/mapzen/mapzen-docs-generator/tree/master/config
2. Find the .yml file for your section of help. For example, Mapzen Mobility can be found in mobility.yml.
3. Under `pages:`, make the change to the table of contents. The topic in the `Home:` position should always be only `index.md` (under MkDocs rules). Add topics by including a heading, contained in single quotation mark, followed by a colon and the name of the md file. For example, `'API Reference': 'api-reference.md'`
4. You can add nesting in the table of contents by indenting the lines underneath the heading. 
```json
- Concept overviews:
  - 'The Scene File': 'Scene-file.md'
```

Adding nesting like this does not change the URL, so no redirects are needed when reorganizing existing content. However, if files are moved or new folders created in GitHub, these do update the URL and you need to add redirects.

Filenames are case-sensitive, so 'Scene-file.md' is different from 'scene-file.md'. The filename in the config file must exactly match the source file, or else you will get a build error.

## Add URL redirects when you rename or move files

Mapzen wrote some additional Python code to enable URLs to forward when files are renamed or moved. For example, the existing Turn-by-Turn, Optimized Route, and Matrix sections of the help were grouped under a Mobility section when they were packaged into a product called Mapzen Mobility. Because adding mobility changed the URLs, redirects allowed the previous topics to be found in the new help.

For example, https://mapzen.com/documentation/turn-by-turn/api-reference/ redirects to https://mapzen.com/documentation/mobility/turn-by-turn/api-reference/ (note the mobility in the URL).

You will also need to do this when a file is removed or renamed in GitHub, and it has existed long enough that users may have bookmarked it or it can be found through search engines.

1. Go to https://github.com/mapzen/mapzen-docs-generator/tree/master/config
2. Find the .yml file for your section of help. For example, Mapzen Mobility can be found in mobility.yml.
3. Look for a section named `mz:redirects:`. If one is not present, add it after the `pages:` section.
4. Add a new line underneath, indent, and add the portion of the current URL to redirect, followed by a colon and the new URL.

Here is a sample from the mobility.yml.

```
mz:redirects:
  'turn-by-turn': 'turn-by-turn/api-reference'
  'matrix': 'matrix/api-reference'
  'optimized': 'optimized/api-reference'
```

Behind the scenes, this calls setup-redirects.py during the build process.

The base URL for all help is https://mapzen.com/documentation.
This means that the base URL + left part of the colon is https://mapzen.com/documentation/turn-by-turn.

When the script runs, the URL will redirect to the base URL + this section name from the config file (/mobility/) + the right side of the colon. This forms https://mapzen.com/documentation/mobility/turn-by-turn/api-reference.

Similarly, for the `matrix` entry, https://mapzen.com/documentation/matrix will redirect to https://mapzen.com/documentation/mobility/matrix/api-reference.

Note: you must use the redirects functionality anytime you are adding topics that fall under the mobility/turn-by-turn section of help because it takes on a different URL structure than the GitHub repository.

Note: if you completely remove a section from the help, you should put your `mz:redirects` in the `index.yml` file. For example, the `turn-by-turn.yml` file was deleted during a product reorganization process, so redirects from that section of help are in `index.yml`.

## Use a URL structure different from the source file organization

MkDocs uses the exact file name and folder structure from the folder repository to build the URL for the help. This means that a file called `map_basics.md` becomes `/map_basics` with an underscore in the output documentation, when the URLs should ideally only have hyphens.

If you group markdown files in a folder in GitHub, the files will also have this structure in the URL. For example, if you have a folder called `api-reference-docs` with a file in it called `map-basics.md`, the output URL will include `api-reference-docs/map-basics`. In some cases, this adds unnecessary complexity and inconsistency in the URLs.

The simplest way around this is to rename or move the files in GitHub. When changing the source does not make sense, use the functions in the help build process.

1. Go to https://github.com/mapzen/mapzen-docs-generator/tree/master/config
2. Find the .yml file for your section of help. For example, Mapzen Mobility can be found in mobility.yml.
3. Look for a section named `mz:renames:`. If one is not present, add it before the `pages:` section.
4. Add a new line underneath, indent, and add the portion of the current URL to redirect, followed by a colon and the new path or filename.
5. In the `pages:` section, use the new name of the file.

Here is a sample from the mobility.yml.

```
mz:renames:
  'optimized_route/api-reference.md': 'optimized/api-reference.md'
  'api-reference.md': 'turn-by-turn/api-reference.md'
```

When the script runs, it will look in the GitHub source files for a folder named `optimized_route` (note the underscore) and a file in it called `api-reference.md`. It will then output to a temporary location during the build process a folder called `optimized` with the file in it still named `api-reference.md`. If you needed to rename the file, you could do that, too.

In the second entry, it will look at the root level of the GitHub source for a file called `api-reference.md` and output it to a folder named `turn-by-turn`.

## Add a new section to the help

Adding an entirely new section of the help has many factors, ranging from design decisions on the mapzen.com website to the mechanics of building the help. Make sure the Products team is aware of your product or planned section of help, as adding a product is more than getting documentation posted on the website.

In general, there are four files that you need to update to do this. In general, you can copy, paste, and modify existing files to understand what needs to be updated to add the new section.

1. Add an entry to https://github.com/mapzen/mapzen-docs-generator/tree/master/src-index to update the index file that is the landing page for the documentation.
2. Add a new config `.yml` file to https://github.com/mapzen/mapzen-docs-generator/tree/master/config. This builds the table of contents and sets the links to the source files so the `Edit this page on GitHub` links work properly (these allow users to go directly to the source file to propose edits).
3. Update the Makefile in https://github.com/mapzen/mapzen-docs-generator/blob/master/Makefile that pulls together all resources for the help.
4. Update the automated test at https://github.com/mapzen/mapzen-docs-generator/blob/master/run-checklist.py.

If you are removing sections from the help, you will need to consider adding URL redirects to the `index.yml` file.
