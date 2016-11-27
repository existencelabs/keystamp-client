import './sign-document.html';
import './sign-document.less';


Template.signDocument.onCreated(function onSignCreated() {
  let instance = this
  instance.code = new ReactiveVar(null)

})
Template.signDocument.helpers({
  getCode() {
    return Template.instance().code.get()
  }
})
Template.signDocument.events({
  'change .code, keyup .code'(e, instance) {
    instance.code.set(e.currentTarget.value)
  },
  'click .disagree'(e, instance) {
    Meteor.call('verify-sms', false, function(err, result) {
      window.location = "/"
    })
  },
  'click .accept'(e, instance) {
    Meteor.call('verify-sms', true, function(err, result) {
      window.location = "/"
    })
  },

})