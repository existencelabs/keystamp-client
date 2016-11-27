import { Meteor } from 'meteor/meteor';
import { Keystamp } from '../lib/keystamp'


Meteor.methods({
  'user-account'() {
    let user_id = Meteor.userId()
    if (!user_id) {
      return {}
    }
    return Keystamp.getUserAccount(user_id)
  }
});

Meteor.methods({
  'upload'(url) {
    let user_id = Meteor.userId()
    return Keystamp.upload(user_id, url)
  }
});

Meteor.methods({
  'search'(value) {
    let user_id = Meteor.userId()
    return Keystamp.search(user_id, value)
  }
});

Meteor.methods({
  'send-sms'(value) {
    let user_id = Meteor.userId()
    return Keystamp.sendSMS(user_id, value)
  }
});

Meteor.methods({
  'verify-sms'(value) {
    let user_id = Meteor.userId()
    return Keystamp.verifySMS(user_id, value)
  }
});