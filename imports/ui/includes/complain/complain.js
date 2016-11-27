import './complain.html';
import './complain.less';


Template.complain.onCreated(function() {
  let instance = this
  instance.is_done = new ReactiveVar(false)
})
Template.complain.helpers({
  isDone() {
    return Template.instance().is_done.get()
  }
})
Template.complain.events({
  'click .send-complain'(e, instance) {
    instance.is_done.set(true)
  }
})