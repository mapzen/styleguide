#Guidelines for writing tutorials

Use tutorials when you want to guide a user through a workflow. A tutorial is one way users can learn how to perform a task, and they may likely retain the information better when doing it on their own. These are some suggestions for writing tutorials or "how to" documents. Some guidelines may not apply to your product or workflow.

Tutorials should represent the best practices for a product, with the simplest workflows, and not "hacks" or workarounds. They work best if they depict interesting and realistic scenarios that a user could encounter when using the tool.

Written tutorials can have a long lifespan, and should be updated when software changes. Tutorials can be posted on the Mapzen website, and also be provided for training events, such as Maptime or workshops. They can be targeted to many different audiences and levels. Some potential audiences include transportation planners with no map experience, advanced GIS professionals with no transportation domain knowledge, developers, users, and so on.  

You can call your documents tutorials, walkthroughs, lessons, exercises, guided tours, or whatever you feel like is the appropriate term. Choose one and be consistent within your own project. Microsoft uses walkthrough for exercises for end-user and developer audiences, and Apple often uses tours, tutorials, and basics.

When writing a tutorial, write it in a separate .md document in your organization's `<organizationname>-docs` repository, rather than in a blog post. You can publicize the release of a tutorial in a blog post, but blogs themselves often end up being snapshots of functionality at the time of writing and are not updated as functionality changes. This can cause frustration in users when they start an exercise and get stuck because the steps are old. 

##General recommendations
- Make the tutorial approachable.
- Do not assume prior knowledge, and if you do, be very clear about the expectations and provide links to resources for more information. For example, if you have established that some knowledge of git or GitHub workflows is necessary, include a link to the GitHub documentation.
- Even if you are targeting developers, do not start an exercise with a block of command line text. Many README files on GitHub are notorious for this, and it is very offputting to non-developers or even experienced developers who are new to an environment or language.

##Sections of a tutorial
A tutorial generally includes an introduction, a steps section with the instructions to perform, and a conclusion that summarizes and provides additional resources. Tutorials are time commitments, but are often worth the effort. As you write the tutorial, expect to get sidetracked by software issues; going through a real scenario is good way to find bugs that users will hit that you have never encountered in testing.

###Introduction
In the first few paragraphs, introduce the topic and provide an overview of the workflow to be performed.

In the introduction, also include:
- a summary of the tasks to be performed and the scenario the tutorial covers.
- an estimate of how long it is expected to take to complete the tutorial.
- the level of prerequisite knowledge that is expected (for example, beginner or no expectations, advanced programming skills, and so on).

####Requirements list
In the introduction, state the prerequisites to perform the tutorial. You can include this as a bullet list in a Requirements section. These are some items to consider for requirements.
- Any required operating system, machine configuration, or development tools or environments required. If the steps are written for Mac, but someone could likely follow along on Windows, say so.
- Specific software or hardware requirements. For software, you may want to include release numbers, such as QGIS 2.8.
- Whether Internet access is required, especially if you need to have it consistently through the exercises or to download large volumes of data. Some users will want to do tutorials in disconnected environments (airplanes, subways), while others may be in developing regions and lack continuous high-speed networks.
- Any additional accounts, such as GitHub, or permissions that are necessary.
- The recommended or tested hardware and minimum operating system release for tutorials intended for mobile devices.

###Steps
Start with a some introductory text that explains what the next section will do and why you are going to perform the upcoming tasks. Readers like to know the reasoning behind their actions, especially if they are working through a real-world scenario.
- Number the steps, starting with 1. in each section.
- Indent the steps, related images, and any paragraphs within the steps.
- Normally, each section would have its own numbering scheme with only one 1., but with Markdown, you will likely need to restart numbering at 1. within a section if you have much explanatory text or images between tasks.
- Break sections into reasonable chunks. There will usually be fewer than 10 steps in a section. Having multiple sections sets points where readers can take a break and makes the document easier to scan.
- Include all the relevant steps in the expected amount of detail. If you give detailed instructions for how to perform a task earlier, you can list shortcuts if the same task is done later. For example, the first time you tell a user to open a layer properties dialog box in QGIS, give the full directions. Later on, you can introduce a keyboard shortcut or say "Open the layer Properties...".

###Conclusion or summary
At the end of the exercises, include a section that summarizes the tasks performed and gives directions for where the reader can go next. This may include additional training, such as a link to another tutorial, or suggestions for other projects or skills.  

##Test the exercises
- Have other people within the organization test your tutorial.
- Get internal team reviews for content to make sure the text is correct from a technical standpoint.
- Have someone from another team work through the tutorial to make sure it makes sense to someone who is less familiar with the product.
- Consider building an automated test that walks through the steps in the tutorial. Tests can verify the API and make sure that software changes do not break common user workflows.
