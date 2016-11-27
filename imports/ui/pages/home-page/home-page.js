import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import '../../includes/graph/graph';
import '../../includes/graph2/graph';
import '../../includes/uploader/uploader';
import '../../includes/sign-document/sign-document';
import '../../includes/new-user/new-user';
import '../../includes/complain/complain';



import './home-page.html';
import './home-page.less';


Template.HomePage.onCreated(function HomePageCreated() {
  let instance = this
  instance.users = new ReactiveVar([])

  Meteor.call('get-users', function(err, result) {
    instance.users.set(result)
  })

  // if (!instance.data.user &&  window.location !== '') {
  //   window.location = '/login'
  // }
})

Template.HomePage.helpers({
  getUser() {
    console.log("getUser on homepage : ", Template.instance().data)
    return Template.instance().data.user
  },
  getUsers() {
    console.log("getUserssss on homepage : ", Template.instance().users.get())
    return Template.instance().users.get()
  },

  isLoggedUser() {
    let instance = Template.instance()
    console.log(instance.data.user._id)

    if (!instance.data.user || !instance.data.user._id) {
      Meteor.setTimeout(function() {
        if (!instance.data.user || !instance.data.user._id) {
          window.location = '/login'
        }
      }, 2000)
    }
    return (Template.instance().data.user && Template.instance().data.user._id)
  },

  // OSC
  isOSC() {
    return (Template.instance().data.user.role === 'osc')
  },

  // Customer
  isFirm() {
    return (Template.instance().data.user.role === 'firm')
  },

  // Customer
  isAdvisor() {
    return (Template.instance().data.user.role === 'advisor')
  },

  // Customer
  isCustomer() {
    return (Template.instance().data.user.role === 'customer')
  },

  // Issuer
  isIssuer() {
    return (Template.instance().data.user.role === 'issuer')
  },

  getUsers() {
    return Template.instance().users.get()
  },

  getFilename(path) {
    let split = path.split('/')
    return split[split.length - 1]
  },

  haveDocsToSign() {
    let docs = Template.instance().data.user.docs
    let r = []
    docs.forEach(doc => {
      if (doc.signed === false) {
        r.push(doc)
      }
    })
    return r.length > 0
  },
  getDocsToSign() {
    let docs = Template.instance().data.user.docs
    let r = []
    docs.forEach(doc => {
      if (doc.signed === false) {
        r.push(doc)
      }
    })
    return r
  },
  haveDocsSigned() {
    let docs = Template.instance().data.user.docs
    let r = []
    docs.forEach(doc => {
      if (doc.signed === true) {
        r.push(doc)
      }
    })
    return r.length > 0
  },
  getDocsSigned() {
    let docs = Template.instance().data.user.docs
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
  },
  'click .add-advisor'(e, instance) {
    // Display Modal
    Modal.show('newUser', {role: 'advisor'})
  },
  'click .add-firm'(e, instance) {
    // Display Modal
    Modal.show('newUser', {role: 'firm'})
  },
  'click .add-user'(e, instance) {
    Modal.show('newUser', {role: 'customer'})
  },
  'click .complain'() {
    Modal.show('complain')
  },
  'click .upload-doc'(e, instance) {
    let uid = e.currentTarget.getAttribute('data-uid')
    Modal.show('Uploader', {assignedTo: uid})
  }
})
