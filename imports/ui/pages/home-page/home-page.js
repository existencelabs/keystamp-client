import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import '../../includes/graph/graph';
import '../../includes/graph2/graph';
import '../../includes/uploader/uploader';

import './home-page.html';
import './home-page.less';


Template.HomePage.onCreated(function HomePageCreated() {
  let instance = this

  console.log("Homepageuer" , instance.data.user)

  // if (!instance.data.user && window.location !== '') {
  //   window.location = '/login'
  // }
})

Template.HomePage.helpers({
})