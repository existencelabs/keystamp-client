import { Meteor } from 'meteor/meteor';
import { Keystamp } from '../lib/keystamp'


Meteor.methods({
  'user-account'() {
    Keystamp.getUserAccount(Meteor.userId())
  }
});