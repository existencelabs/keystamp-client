import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import '../../includes/graph/graph';
import '../../includes/graph2/graph';
import '../../includes/uploader/uploader';
import '../../includes/sign-document/sign-document';

import './home-page.html';
import './home-page.less';


Template.HomePage.onCreated(function HomePageCreated() {
  let instance = this

  // if (!instance.data.user && window.location !== '') {
  //   window.location = '/login'
  // }
})

Template.HomePage.helpers({
  getUser() {
    console.log("getUser on homepage : ", Template.instance().data)
    return Template.instance().data.user
  },
  isLoggedUser() {
    console.log(Template.instance().data.user._id)
    // if (!Template.instance().data.user || !Template.instance().data.user._id) {
    //   window.location = '/login'
    // }
    return (Template.instance().data.user && Template.instance().data.user._id)
  },

  // OSC
  isOSC() {
    return (Template.instance().data.user.role === 'osc')
  },

  // Customer
  isCustomer() {
    return true
    return (Template.instance().data.user.role === 'customer')
  },

  getDocsToSign() {
    let docs = Template.instance().data.user.docs
    docs = [{hash:'123', signed:false}, {hash:'456', signed:true}]

    let r = []
    docs.forEach(doc => {
      if (doc.signed === false) {
        r.push(doc)
      }
    })
    return r
  },
  getDocsSigned() {
    let docs = Template.instance().data.user.docs
    docs = [{hash:'123', signed:false}, {hash:'456', signed:true}]

    let r = []
    docs.forEach(doc => {
      if (doc.signed === true) {
        r.push(doc)
      }
    })
    return r
  },
})

Template.HomePage.events({
  'click .sign'(e, instance) {
    let hash = e.currentTarget.getAttribute('data-doc')
    // Send SMS
    Meteor.call('send-sms')

    // Display Modal
    Modal.show('signDocument', {hash: hash, user:instance.data.user})
  }
})
