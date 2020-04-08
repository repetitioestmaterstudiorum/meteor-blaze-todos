import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import swal from "sweetalert";

import "./task.html";

Template.task.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
});

Template.task.events({
  "click .toggle-checked"() {
    Meteor.call("tasks.setChecked", this._id, !this.isChecked);
  },
  "click .delete"() {
    swal({
      text: "Sure you want to delete this task?",
      icon: "warning",
      buttons: ["Actually, no", "Yes!"],
    }).then((yes) => {
      if (yes) {
        Meteor.call("tasks.remove", this._id, (error) => {
          if (error) {
            swal({
              text: `${error}`,
              icon: "error",
              button: "Alrighty",
            });
          }
        });
      }
    });
  },
  "click .toggle-private"() {
    Meteor.call("tasks.setPrivate", this._id, !this.private);
  },
});
