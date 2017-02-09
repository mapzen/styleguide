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

### MPZN

These are Javascript APIs without UI components under MPZN name space.

#### MPZN.trackevent
`MPZN.trackevent`is a wrapper for customized Google Analytics event. You can initialize `MPZN.trackevent` with your own Google Analytics value. Google Anlyatics value is going to be sent with the initialization of `MPZN.trackevent`.

```
MPZN.trackevent(category, action, label, value)
```

Please look at [Google Analytics page](https://support.google.com/analytics/answer/1033068?hl=en#anatomy-of-events) to know more about options.

#### MPZN.nav

`MPZN.nav`is a read-only component dealing with user's log-in status on the navbar.

| Method     | Return            | Description           |
|------------|-------------------|---------|-----------------------|
| `reflectUserState(<String> userNickname, <String> userAvatarImage, [<Function> customLogoutCall])` |`null` | Manipulate navigation bar state with passed user data. To show not-logged-in status, pass `null` or empty string as parameters. Optionally provide a custom logout handler to override the default. |


Contribute
----------

Watch and contribute to development on the styleguide via issues
[here in Github](https://github.com/mapzen/styleguide/issues)
and [on Waffle.io](https://waffle.io/mapzen/styleguide).

To edit and test Styleguide, please work on a new branch in this repository and
[use Precog](http://precog.mapzen.com/mapzen/styleguide) for preview and
testing.

To work with other Mapzen related-repo, please follow the steps in [contribution guide](https://github.com/mapzen/styleguide/blob/master/contribute.md#are-you-working-with-other-mapzen-related-repo). You can create an issue containing the check list with **[this link](https://github.com/mapzen/styleguide/issues/new?body=%23%23%23%20Are%20you%20working%20with%20other%20Mapzen-related%20repo%3F%20Please%20follow%20the%20steps%20below.%0A%0A%23%23%23%23%20pre-requirement%20%0A-%20%5B%20%5D%20Add%20temporary%20css%20or%20javascript%20on%20the%20branch%20of%20the%20repo%20which%20needs%20a%20change.%20%0A-%20%5B%20%5D%20Share%20changes%20with%20other%20people%20using%20Precog%0A%0A%23%23%23%23%20requirement%20%0A-%20%5B%20%5D%20Add%20new%20features%20on%20styleguide%20%0A-%20%5B%20%5D%20Reflect%20changes%20needed%20to%20the%20other%20repo%20you%20are%20working%20on%20%0A-%20%5B%20%5D%20Get%20rid%20of%20old%20features%20not%20used%20any%20more%20on%20Styleguide.%0A)**.

🚧 `master` branch is live 🚧

If you’d like to edit locally, Styleguide requires [Node](https://nodejs.org/)
and uses [Gulp](http://gulpjs.com) to generate files in `dist` directory from
sources in `src/site`. Build and test with these commands:

1. `npm install`
2. `gulp build` (or `./node_modules/.bin/gulp build` if _gulp_ not found)
3. `npm start`
4. Open [http://localhost:3000](http://localhost:3000) in a browser.




Organization
------------

To add a new sub-section to the styleguide:

1. Add a new folder and `index.html` to the appropriate section under `src/site/`
2. Add a new `@@include` to the appropriate HTML file for the section you are working on in `src/site/`
3. Add a new `<a>` link to the index file in `src/site/includes/side-nav.hmtl`
4. Add a new `.scss` file for your sub-section in `src/stylesheets/common`
5. Add a link to your stylesheet in `src/stylesheets/styleguide.scss` so that gulp will bundle it on build

Maintainers are [Ekta](https://github.com/souperneon),
[Lou](https://github.com/louh), [Mike M](https://github.com/migurski),
and [Hanbyul](https://github.com/hanbyul-here).
