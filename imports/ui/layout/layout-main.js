import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './layout-main.html';
import './layout-main.less';

/* Includes */
import '../includes/footer/footer.js';

/* Pages */
import '../pages/home-page/home-page.js';


Template.LayoutMain.onCreated(function LayoutMainCreated() {
  let instance = this

  // Get User
  console.log("User on Keystamp ? ")
  Meteor.call('user-account', function(err, result) {
    if (err) {
      return console.warn("Err : ", err)
    }
    console.log("User account on API : ", result)
  })
});

