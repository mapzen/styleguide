To seamlessly integrate github issues and waffle.io:

1. Create a new issue on github
2. Create new branch with the format `{issue number}-{username}-{branch topic}`
3. Push the new branch. This will automatically transition the issue to "in progress" on waffle
4. When the issue is ready to be closed, go to github and create a pull request. In either the title or description of the pull request, include the text "closes #{issue number}". This transitions the issue to the "done" column on waffle
5. Once the PR has been merged and closed, waffle will remove the issue from the list