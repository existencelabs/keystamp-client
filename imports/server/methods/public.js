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
  'upload'(data) {
    let user_id = Meteor.userId()
    return Keystamp.upload(user_id, data.url)
  }
});