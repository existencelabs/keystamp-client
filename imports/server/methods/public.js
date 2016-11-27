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

Meteor.methods({
  'get-users'() {
    let user_id = Meteor.userId()

    // What's my role ?
    let user = Keystamp.getUserAccount(user_id)
    if (!user) { return [] }

    console.log("UERR : ", user)


    if (user.role === 'osc') {
      return Keystamp.getFirms(user._id)
    }
    else if (user.role === 'firm') {
      return Keystamp.getAdvisors(user_id)
    }
    else if (user.role === 'advisor') {
      return Keystamp.getUsers(user_id)
    }
    else if (user.role === 'issuer') {
      return Keystamp.getAdvisors(user_id)
    }
  }
});

Meteor.methods({
  'create-user'(data) {
    console.log("Method - create user : ", data)
    let id = Meteor.users.insert({
      emails: [{'address': data.email}],
    });
    console.log("Created : ", id, data.password)
    Accounts.setPassword(id, data.password);
    data._id = id

    Keystamp.propagateNewUser(data)
  }
});


/*
I20161127-02:51:37.934(-5)? -------->>> API POST http://localhost:4000/api/create_user { email: 'my@advisor.com',
I20161127-02:51:37.934(-5)?   phone: '123123',
I20161127-02:51:37.934(-5)?   password: '1231232',
I20161127-02:51:37.934(-5)?   role: 'advisor',
I20161127-02:51:37.935(-5)?   assignTo: '9Az49L9SMyMf3kpiu',
I20161127-02:51:37.935(-5)?   _id: 'ER34cdYybANaTmegS' }


 > db.users.findOne({email:'my@advisor.com'})
 {
  "_id" : ObjectId("583a90896971ffb423000002"),
  "email" : "my@advisor.com",
  "phone" : 123123,
  "role" : "advisor",
  "uid" : "ER34cdYybANaTmegS",
  "docs" : [ ],
  "lastUpdated" : ISODate("2016-11-27T07:48:51.980Z"),
  "signed" : false,
  "child" : [ ],
  "__v" : 0
 }

*/