# Styleguide

The `gh-pages` branch holds the files for https://mapzen.github.io/styleguide and is a copy of the files found in the `dist` directory on the `archive` branch.

Update these files with the following commands:

1. `git checkout archive`
2. `npm install`
2. `gulp build` (or `./node_modules/.bin/gulp build` if _gulp_ not found)
4. `gulp deploy` (will copy files from the `dist` directory to the remote `gh-pages` branch
