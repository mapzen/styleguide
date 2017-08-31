# Common general terms and writing conventions

Use this style guide in conjunction with other sources of style information, such as a dictionary like [Merriam-Webster](http://www.merriam-webster.com/), the Microsoft Manual of Style (available in print only), and the [Apple Style Guide](https://help.apple.com/asg/mac/2013/ASG_2013.pdf), or the Associated Press Stylebook (available with a subscription). For example, if you want to know how to refer to an item in Mac OS, defer to the term Apple uses for it. This document brings together some of the most commonly encountered terms from those other guides, and may add Mapzen flavor to them.

This list is a living document that will be added to or changed as terminology is encountered.

## Numbers, times, and dates

- Spell out one through nine unless it precedes a unit or is to be input.
- Use numerals for 10 and above.
- Use numerals for all measurements.
- Use 24-hour times, if you can, to consider a global audience.
- Use [ISO standards](https://en.wikipedia.org/wiki/ISO_8601) for calendar dates in documentation because this is the common format Mapzen uses in developer contexts and code. Example: _YYYY-MM-DD_, or _2016-09-05_ for September 5, 2016.
- It is okay to use _month day, year_ in social media or a blog post. However, even in less formal content, avoid ambiguous date formatting, such as 9/5, which could be interpreted as September 5 or May 9, depending on the locale.
- Avoid mentioning seasons, such as a release is "expected in the fall." This sentence is centric to the northern hemisphere and confusing to antipodeans. Use months or calendar quarters instead. If you must use a season, state the hemisphere.

## Abbreviations and acronyms

- Spell out a term if you think the audience does not know it. Put the spelled-out term first and the acronym in parentheses, such as API (application programming interface). In most cases, the words that form the acronym or abbreviation are not capitalized.
- Do not add an apostrophe if you make acronym plural (for example, DVDs not DVD's, 1980s not 1980's).
- Abbreviate MB and GB
- Avoid using Latin words, such as e.g., i.e., et al., and etc. Instead, use for example, that is, and others, and so on.
- Do not use the ampersand symbol (&) in text to mean _and_. In that case, spell out the word and. It is okay to use & in appropriate contexts, such as in code samples.

## Titles and headings

- Use sentence-style capitalization (_Only first word capitalized_), rather than title case (_Every, Single Word Gets Capitalized_). Sentence-style is easier to read, and words that are truly proper nouns stand out better.
- Use imperative verbs, rather than gerunds for titles and headings. For example, name a section, "Add a point", rather than "Adding a point". Imperative is clearer and easier to translate.
- Use _Get started_, rather than _Getting started_, in following with the gerund style.
- Nouns or topic descriptions are acceptable for titles and headings, such as _Tutorial_, _Overview_, _API reference_, and _Datastore queries_. If you use a general word like _Tutorial_, make sure what the tutorial will be about is clear from the context of the help section.

## Common words and phrases

- Because, since: use _because_ for causation (because you checked your email, you saw the meeting invitation) and _since_ for a period of time (it's been hours since you checked email).
- Avoid _simple_ or _simply_, especially in instructions (for example, "Simply clone this repository to get it started.") Simplicity is in the eye of the beholder, and what is simple for you might be completely foreign to another person. Your goal is absolutely to make things as simple as possible, but let your readers and users judge for themselves.

## Map words

- _Basemaps_ is one word.
- Capitalize the names of other mapping companies and products correctly: _Mapbox_, _Esri_, _ArcGIS_.

## Technical writing

- All of our code is hosted on _GitHub_, not on _Github_ or _github_. When referring to GitHub-specific features or products, like issues, use _GitHub issues_. When referring to a repository hosted on GitHub, use _GitHub repository_.
- The command-line version control system GitHub is based on is a proper noun: _Git_. It is only lower-case `git` when written as shell code. When referring to a generic _Git repository_, use the proper noun form.
- Spell out _repository_. Using "repo" is too colloquial for potentially non-technical readers.

## Mapzen-related

- We are moving away from Mapzen _house styles_ (for example, Cinnabar, Bubble Wrap, or Zinc). Use _Mapzen basemaps_ instead.
- The basemap style Tron is written only in title case. Do not write it with all-caps.
- Files loaded by Tangram are _scene files_. Do not use _Tangram style_ (a single scene can contain multiple `style` blocks, so calling the entire thing a _style_ leads to confusion). _Tangram scene_ is accurate, but a _Tangram scene file_ is clearer.
- Mapzen products (such as Mapzen Vector Tiles) should be in title case. Don't confuse their names with generic forms like "vector tile service", and when writing, use the two forms consistently. Use _tile service_ when referring to _all_ tile services, since terrain tiles are not vector.
