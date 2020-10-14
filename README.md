## Custom Default Reviewers on BitBucket Cloud
Firefox add-on / Chrome extension that overwrites the repository default reviewers by a custom selection made by the user when creating a pull request on Bitbucket Cloud.

![image](https://raw.githubusercontent.com/jwallet/bitbucket-custom-reviewers/main/screenshot.png)

### What the extension does that Bitbucket does not

##### Core feature
Once you click on `Save As Default` it will save your current selection as your default reviewers in your browser connected account or fallback to your browser storage.

Afterwards, any new pull request in the same repository will have those reviewers rehydrated as your default reviewers.

##### Batch action
- Add all users at once `Add All`.
- Add all recents users at once `Recents +`
- Add all authors users at once `Authors +` (related to those who committed in the branch).
- Remove all selected users using ✖ in the top-right corner inside the reviewers box.

##### Search improvements
- Accent insentive: typing `jose` will return a user such as `José`
- Case insentive: typing `RICK` will return a user such as `Andrick`
- User suggestion: the search input will print a user suggestion based on the current searched value, hit enter to select it.
- Highlighting results: typing `Max` will highlight all matching results such as <b>Max</b>im.
- Search results are kept


### Releases
- Firefox add-on: https://addons.mozilla.org/en-CA/firefox/addon/bitbucket-custom-reviewers/
- [Release on Github](https://github.com/jwallet/bitbucket-custom-reviewers/releases) as zip file.
    - On firefox, load the `manifest.json` in debug addon tab.
    - On chrome, load the unzipped folder as a unpacked extension.
