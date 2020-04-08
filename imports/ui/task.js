import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";

import "./task.html";

Template.task.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
});

Template.task.events({
  "click .toggle-checked"() {
    // Set the checked property to the opposite of its current value
    // Tasks.update(this._id, {
    //   $set: { isChecked: !this.isChecked },
    // });
    Meteor.call("tasks.setChecked", this._id, !this.isChecked);
  },
  "click .delete"() {
    // Tasks.remove(this._id);
    Meteor.call("tasks.remove", this._id, (error) => {
      if (error) {
        alert("You can only delete tasks you created.");
      }
    });
  },
  "click .toggle-private"() {
    Meteor.call("tasks.setPrivate", this._id, !this.private);
  },
});
