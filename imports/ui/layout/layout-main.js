import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './layout-main.html';
import './layout-main.less';

/* Includes */
import '../includes/header/header.js';
import '../includes/panel/panel.js';
import '../includes/footer/footer.js';

/* Pages */
import '../pages/home-page/home-page.js';


Template.LayoutMain.onCreated(function LayoutMainCreated() {
  let instance = this

  console.log("LayoutMain")

  // Global ReactiveVar
  instance.user = new ReactiveVar({})

  // Handle Path here
  instance.route = new ReactiveDict()
  instance.route.set('template', instance.data.main())
  instance.route.set('path', FlowRouter.current().path)
  instance.route.set('name', FlowRouter.current().route.name)

  // Get first user data
  updateUserData(instance)

  // Track if route change
  Tracker.autorun(function() {
    FlowRouter.watchPathChange()

    // Is route is new
    let current = FlowRouter.current()
    if (instance.route.get('path') !== current.path) {
      instance.route.set('template', instance.data.main())
      instance.route.set('path', current.path)
      instance.route.set('name', current.route.name)

      // Get User
      updateUserData(instance) // Do it everytime (should be only for path who can change )
    }
  })
});

Template.LayoutMain.helpers({
  getUser() {
    return Template.instance().user.get()
  }
})


let updateUserData = function(instance) {
  Meteor.call('user-account', function(err, result) {
    if (err) {
      return console.warn("Err : ", err)
    }
    console.log("User account on API : ", result)
    instance.user.set(result)
  })
}