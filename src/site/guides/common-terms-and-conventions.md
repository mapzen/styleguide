# Common terms and writing conventions

Use this style guide in conjunction with other sources of style information, such as a dictionary like [Merriam-Webster](http://www.merriam-webster.com/), the Microsoft Manual of Style (available in print only), and the [Apple Style Guide](https://help.apple.com/asg/mac/2013/ASG_2013.pdf), or the Associated Press Stylebook (available with a subscription). For example, if you want to know how to refer to an item in Mac OS, defer to the term Apple uses for it. This document brings together some of the most commonly encountered terms from those other guides, and may add Mapzen flavor to them.

This list is a living document that will be added to or changed as terminology is encountered.

## Numbers, times, and dates

- Spell out one through nine unless it precedes a unit or is to be input, write the numerals for 10 and above.
- Use numerals for all measurements.
- Use 24-hour times, if you can, to consider a global audience.
- Use [ISO standards](https://en.wikipedia.org/wiki/ISO_8601) for calendar dates because this is the common format Mapzen uses in developer contexts and code. Example: _YYYY-MM-DD_, or _2016-09-05_ for September 5, 2016. Note that this diverges from Microsoft style, which is _month day, year_.

## User interface elements

- When interacting with a user interface, you _click_ an item that you expect to be in a desktop context. For documentation about mobile products, you can use _tap_ an item. Use _press_ only when referring to items that you physically press, such as keys on a keyboard.
- When describing cascading menus or breadcrumbs, it is okay to use the caret symbol (>) to show the hierarchy. For example, _click File > New Tab_.
- In most cases, you do not need to add a description of the user interface element. For example, _click Download_, instead of _click the Download button_. This simplifies the documentation and avoids ambiguity over what to call the particular element.

## Open source and open-source (and other cases of hyphenation)

- Whether or not to hyphenate depends on how these terms are used.
- When open source is a compound adjective, which is an adjective made up of multiple words, you should hyphenate. For example, in _open-source software_ or _open-source project_, you should use a hyphen.
- Do not use a hyphen with in a sentence such as, "The code is open source."
- You do not need to use a hyphen with adverbs, such as "a beautifully created map".
- Follow the same guidelines when writing with other adjectives, compound adjectives, and adverbs. For example: _real-time communication_ versus _the communication is in real time_.

## Computing terms

- You _sign in_ or _sign off_ when accessing an account. You _log on_ or _log out_ of a operating system session.
- Hosting within your organization is _on-premises_. It always has a hyphen and an -s.
- email (n.) is one word, no hyphen. Use "send an email message", rather than "email" as a verb.
- File format abbreviations (PDF, JPEG) should be in uppercase, and filename extensions (.pdf, .jpeg) in lowercase.
- filename is one word
- Finder is the application for browsing folders on a Mac. Apple says to use it as "the Finder", not "Finder".
- administrator should not be shortened to "admin".
- plug-in (n., related to extending functionality, such as for a browser) always has a hyphen. Plug in (v.) without a hyphen describes the action of plugging in a cable.
- The words, internet and web, are lowercase. These have historically been capitalized because they were proper nouns, but the [AP changed this in June 2016](https://twitter.com/apstylebook/status/716279065888563200).

## Abbreviations and acronyms

- Spell out a term if you think the audience does not know it. Put the spelled-out term first and the acronym in parentheses, such as API (application programming interface). In most cases, the words that form the acronym or abbreviation are not capitalized.
- Do not add an apostrophe if you make acronym plural (for example, DVDs not DVD's, 1980s not 1980's).
- Abbreviate MB and GB
- Avoid using Latin words, such as e.g., i.e., et al., and etc. Instead, use for example, that is, and others, and so on.
- Do not use the ampersand symbol (&) in text to mean _and_. In that case, spell out the word and. It is okay to use & in appropriate contexts, such as in code samples.

## Titles and headings

- Use sentence-style capitalization (_Only first word capitalized_), rather than title case (_Every, Single Word Gets Capitalized_). Sentence-style is easier to read, and words that are truly proper nouns stand out better.
- Use imperative verbs, rather than gerunds for titles and headings. For example, name a section, "Add a point", rather than "Adding a point". Imperative is clearer and easier to translate. Nouns are also acceptable for titles and headings.

## Common words

- Because, since: use _because_ for causation (because you checked your email, you saw the meeting invitation) and _since_ for a period of time (it's been hours since you checked email).
