import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";

import "./counter.html";

Template.counter.onCreated(function () {
  // initialize the state in a ReactiveVar
  this.state = new ReactiveVar(0);
});

Template.counter.helpers({
  counter() {
    return Template.instance().state.get();
  },
});

Template.counter.events({
  "click .count-up"(event, instance) {
    instance.state.set(instance.state.get() + 1);
  },
});
