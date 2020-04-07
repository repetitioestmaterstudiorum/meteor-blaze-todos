import { Template } from "meteor/templating";
import { Tasks } from "../api/tasks.js";

// This file, because it is called the same as body.html (and in the same folder), is automatically used by meteor to add functionality...
import "./body.html";
// "The body template uses the task template, so we need to import it as well:" (https://www.meteor.com/tutorials/blaze/update-and-remove) -> should be: the body component uses the task component...
// Importing task.js also imports task.html to body.html?!
import "./task.js";

// creating a helper ("tasks") we use in body.html
Template.body.helpers({
  tasks() {
    // Show newest tasks at the top
    return Tasks.find({}, { sort: { createdAt: -1 } });
  },
});

// "Event listeners are added to templates in much the same way as helpers are: by calling Template.templateName.events(...)" (https://www.meteor.com/tutorials/blaze/forms-and-events). However, body is not the template name?! task is the template name of the template created in body.html ... I conclude it should be Template.component.events(...) instead.
Template.body.events({
  "submit .new-task"(event) {
    event.preventDefault();
    // Get value from form element
    const text = event.target.text.value;
    // Insert a task into the collection
    Tasks.insert({
      text,
      createdAt: new Date(), // current time
    });
    // Clear form
    event.target.text.value = "";
  },
});
