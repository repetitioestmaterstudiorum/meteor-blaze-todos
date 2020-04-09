# meteor-blaze-todos

This is based on the following tutorial for Meteor and Blaze: https://www.meteor.com/tutorials/blaze/creating-an-app

## Adjustments to the tutorial

- installed bcrypt npm package to replace the meteor bcrypt package
- installed msavin:mongol to have a GUI for mongo (ctrl + m when the app is running in the browser)
- changed “checked” to “isChecked” (string of tasks object in the db)
- label tag for task texts to make them check/uncheck the task checkboxes as well
- set some basic meta tags in the main.html of the front-end for responsiveness
- adjusted the meteor test command in package.json to work with mocha/chai
- checked buttons (Public/Private) to look the same on mobile, and slight design changes to the todos
- made deleting a todo a private action, with an alert if someone tries to delete another user’s todo (using an es6 callback on Meteor.call())
- added npm package sweetalert to confirm task deletion and inform nicely if one has no permissions to do so
