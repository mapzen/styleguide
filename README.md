Styleguide
==========

Mapzen Styleguide makes it easy for us to create right-looking websites that
work well across platforms and into the future. If you’re publishing Mapzen
stuff, the guide is for you.

🔋 Batteries included:

* [Basic page structure](https://mapzen.com/common/styleguide/index.html) with
  standard linked CSS and Javascript resources.
* [Sample UI components](https://mapzen.com/common/styleguide/ui-components.html)
  like navigation, social buttons, search boxes, and pagination that can be
  combined to make new kinds of pages.
* [Complete sample pages](https://mapzen.com/common/styleguide/#sample-pages)
  like blog posts and developer documentation showing how all the pieces fit
  together.

Use
---

To use the guide for Mapzen-looking web sites, visit
[https://mapzen.com/common/styleguide](https://mapzen.com/common/styleguide)
and follow the instructions to structure HTML and linked style and script
resources.

Contribute
----------

Watch and contribute to development on the styleguide via issues
[here in Github](https://github.com/mapzen/styleguide/issues)
and [on Waffle.io](https://waffle.io/mapzen/styleguide).

To edit and test Styleguide, please work on a new branch in this repository and
[use Precog](http://precog.mapzen.com/mapzen/styleguide) for preview and
testing.

🚧 `master` branch is live 🚧

If you’d like to edit locally, Styleguide requires [Node](https://nodejs.org/)
and uses [Gulp](http://gulpjs.com) to generate files in `dist` directory from
sources in `src/site`. Build and test with these commands:

1. `npm install`
2. `gulp build` (or `./node_modules/.bin/gulp build` if _gulp_ not found)
3. `npm start`
4. Open [http://localhost:3000](http://localhost:3000) in a browser.

Maintainers are [Ekta](https://github.com/souperneon),
[Lou](https://github.com/louh), [Mike M](https://github.com/migurski),
and [Hanbyul](https://github.com/hanbyul-here).
