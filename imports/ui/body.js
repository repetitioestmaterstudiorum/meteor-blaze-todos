import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { ReactiveDict } from "meteor/reactive-dict";
import { Tasks } from "../api/tasks.js";

// This file, because it is called the same as body.html (and in the same folder), is automatically used by meteor to add functionality...
import "./body.html";
// "The body template uses the task template, so we need to import it as well:" (https://www.meteor.com/tutorials/blaze/update-and-remove) -> should be: the body component uses the task component...
// Importing task.js also imports task.html to body.html?!
import "./task.js";

// do stuff once file loads (onCreated)
Template.body.onCreated(function () {
  // initialize the state in a ReactiveDict
  this.state = new ReactiveDict();
  // get tasks (subscribe to tasks.js in the api)
  Meteor.subscribe("tasks");
});

// creating a helper ("tasks") we use in body.html
Template.body.helpers({
  tasks() {
    const instance = Template.instance();
    if (instance.state.get("hideCompleted")) {
      // If hide completed is checked, filter tasks
      return Tasks.find(
        { isChecked: { $ne: true } }, // $ne selects the documents where the value of the field is not equal to the specified value.
        { sort: { createdAt: -1 } }
      );
    }
    // Otherwise, return all of the tasks
    // Show newest tasks at the top
    return Tasks.find({}, { sort: { createdAt: -1 } });
  },
  incompleteCount() {
    return Tasks.find({ isChecked: { $ne: true } }).count();
  },
});

// "Event listeners are added to templates in much the same way as helpers are: by calling Template.templateName.events(...)" (https://www.meteor.com/tutorials/blaze/forms-and-events). However, body is not the template name?! task is the template name of the template created in body.html ... I conclude it should be Template.component.events(...) instead.
Template.body.events({
  "submit .new-task"(event) {
    event.preventDefault();
    // Get value from form element
    const text = event.target.text.value;
    // Insert a task into the collection
    Meteor.call("tasks.insert", text);
    // Clear form
    event.target.text.value = "";
  },
  "change .hide-completed input"(event, instance) {
    instance.state.set("hideCompleted", event.target.checked);
  },
});
