
import './header.html';
import './header.less';

Template.Header.onCreated(function onHeaderCreated() {
  let instance = this
  instance.dropdown_open = new ReactiveVar(false)
})
Template.Header.helpers({
  isUserLogged() {
    return (Template.instance().data.user && Template.instance().data.user._id)
  },
  getUser() {
    return Template.instance().data.user
  }
});

Template.Header.events({
  'click .logout-user-account'(e) {
    Meteor.logout(function() {
      window.location = "/"
    })
  }
});