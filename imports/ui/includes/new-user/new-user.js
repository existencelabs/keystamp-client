import './new-user.html';
import './new-user.less';


Template.newUser.onCreated(function onSignCreated() {
  let instance = this
  instance.email = new ReactiveVar('')
  instance.phone  = new ReactiveVar('')
  instance.password  = new ReactiveVar('')
  instance.isConfirmed  = new ReactiveVar(false)
})
Template.newUser.helpers({
  getRole() {
    return Template.instance().data.role
  },
  isConfirmed(type) {
    return Template.instance().isConfirmed.get()
  },
  getValue(type) {
    return Template.instance()[type].get()
  }
})
Template.newUser.events({
  'change .form-control, keyup .form-control'(e, instance) {
    instance[e.currentTarget.name].set(e.currentTarget.value)
  },
  'click .create'(e, instance) {
    Meteor.call('create-user', {
      email: instance.email.get(),
      phone: instance.phone.get(),
      password: instance.password.get(),
      role: instance.data.role,
      assignTo: Meteor.userId()
    })
console.log("Create !", {
      email: instance.email.get(),
      phone: instance.phone.get(),
      password: instance.password.get(),
      role: instance.data.role,
      assignTo: Meteor.userId()
    })
    instance.isConfirmed.set(true)
    // Accounts.createUser(opts, function(err, user) {
    //   console.log("USER CREATED : ", {err, user})
    // })
  },
})