import { Template } from "meteor/templating";
import { Tasks } from "../api/tasks.js";

import "./task.html";

Template.task.events({
  "click .toggle-checked"() {
    // Set the checked property to the opposite of its current value
    // this. refers to an individual task object
    Tasks.update(this._id, {
      $set: { isChecked: !this.isChecked },
    });
  },
  "click .delete"() {
    Tasks.remove(this._id);
  },
});
