
You might be writing some Markdown that looks like this:

Inline image 1

Looks relatively simple enough, doesn't it? A short sentence, followed by a short bulleted list.

It even renders beautifully in GitHub:

Inline image 2

But when we generate documentation in HTML to mapzen.com, something looks really off:

Inline image 4

The beautiful bullet points are not converted, but instead remain normal dashes. And while I didn't take the screenshot, the effect is similar if you used asterisks instead. Instead of formatting them as bullet points, with the right amount of indenting and spacing, there's just ugly asterisks turning your intended bulleted list into a typographic nightmare.

At this point you might be tempted to tear your hair out, curse silently under your breath, and try all sorts of wild-ass guesses to get your bulleted list to work correctly.

But there's actually a pretty easy solution once you know what it is. Let me show you the corrected Markdown file:

Inline image 5

Hopefully you can see the difference. There's now a single blank line separating the text and the bulleted list.

It renders exactly the same in GitHub, and, blessedly, looks beautiful again in our built documentation:

Inline image 6

Whew!

"But, Lou," you're saying, "It works in GitHub, why do we need to do this extra step to make it work in the rendered documentation? Why can't you just fix it and make it work the way GitHub does?"

Ah. To answer that, let's talk a little about the history of Markdown.


---------------


When John Gruber wrote the original Markdown in 2004 he also made a Perl script to render Markdown to HTML. He didn't describe the original spec unambiguously, and furthermore, there were a number of bugs and edge cases in his own Perl implementation that never got documented. Then everyone else in the world liked Markdown so much they all wanted to adopt it for their projects, but of course everyone had their own preferred programming language, so they wrote their own and mimicked the documentation if not the actual original implementation.

So now we a huge number of different implementations of Markdown that all behave slightly differently given different types of text. Even GitHub Flavored Markdown (GFM) is not just "extra seasoning" on top of "normal Markdown." At this point, it is its own dialect -- linguistically, as far as I can tell, a descendent of a Ruby gem called Redcarpet but run through some kind of customized autotune machine. Basically, if you want your own GFM, you have to reconstruct GitHub's infrastructure.

In case you're curious, there is CommonMark, a project to attempt to standardize Markdown and create an "official," unambiguous specification. This project is not without its own drama: John Gruber has been on record about being extremely unhappy that other people are building on his project, and has refused to bless the project or allow the CommonMark authors to adopt the Markdown name.

So this is the world that we live in. A messy, warring-tribal-nations kind of world.

---------------

Our documentation pipeline is written in Python, so it has own native package, Python Markdown. It's about the most "normal" dialect of Markdown as you can get in Python-land.

And it won't render bullet points that immediately follow some text.

Interestingly enough, this is actually how the original Markdown behaves. Without a blank line separating bulleted lists and paragraphs, it errs on the side of treating the entire block of text as one paragraph.

You might find this unnatural. In fact, CommonMark has decided that this is one aspect where the "actual" behaviour ought to be fixed with the "natural" one. (So why not switch to CommonMark? Because, remember, dialects. CommonMark and GFM might share a common trait here, but not in others, and I don't yet have a full picture of how compatible it is.)

For now, the easiest way to get documentation looking spiffy is to follow this rule of thumb: see if your formatting weirdness is resolved if each "type" of content (e.g. bulleted lists and paragraphs) is separated with a single blank line.

And if you have any suggestions on how we might be able to tackle this problem for more user-friendliness, I'm all ears.
