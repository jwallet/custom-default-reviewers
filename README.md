# Bitbucket Custom Reviewers
Firefox/Chrome addon for Bitbucket.org that lets you select and save your own default reviewers when creating a pull request, afterwards it will always be rehydrated.

![image](https://raw.githubusercontent.com/jwallet/bitbucket-custom-reviewers/main/screenshot.png)

### What the extension does that Bitbucket doesn't

##### Core feature
Once you click on `Save As Default` it will save your current selection as your default reviewers in your browser storage.
Afterwards, any new pull request in the same repository will have those reviewers rehydrated as your default reviewers.

##### Batch action
- Add all users at once `Add All`.
- Add all recents users at once `Recents +`
- Add all authors users at once `Authors +` (related to those who committed in the branch).
- Remove all selected users using ✖ in the top-right corner inside the reviewers box.

##### Search improvements
- Accent insentive: typing `jose` will return a user named `José`
- Case insentive: typing `RICK` will return a user named `Andrick`
- While typing the search input will print a user suggestion, hit enter if you want to select it.
- While typing the results while be highlighted if a part matches the current value: typing `Max` will have a user result like so <b>Max</b>im
- Search results are kept
