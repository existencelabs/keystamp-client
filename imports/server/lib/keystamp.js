import { HTTP } from 'meteor/http'
let Future = Npm.require('fibers/future');

let IS_DEV = Meteor.settings.IS_DEV || false

let KeystampSDK = function(pub, secret) {
  // Save a token for this instance
  let token;

  // Define the Call API function
  let callAPI = function(method, url, opts, timeout) {
    let future = new Future();

    let headers = {}
    if (token) {
      headers['x-access-token'] = token
    }


    // Make a call
    let host = IS_DEV ? 'localhost' : ''
    console.log(" ")
    console.log("-------->>> API " + method, "http://" + host + ":4000/api/" + url, opts)
    console.log(" ")

    HTTP.call(method, "http://" + host + ":4000/api/" + url, {
      params: opts || {}, // GET || POST
      timeout: timeout || 4000, // 4s
      headers: headers,
    }, function(err, result) {
      if (err) {
        return future.throw(err)
      }
      future.return(result.data)
    })

    // Wait for asyncrone call to be ended, and return the result
    return future.wait()
  }

  // Get token
  let token_response = callAPI("POST", "auth", {app_id: pub, app_secret: secret}, 2000) // Wait max 1sec to get the API token
  token = token_response.token
  if (!token) {
    throw new Meteor.Error("Invalid connect to Keystamp")
  }
  // Token also send OSC USER !! Check if we have it on databse, if not create with password `123123`
  console.log("token_response : ", token_response)
  let osc = token_response.osc
  if (token_response.osc && !Meteor.users.findOne({_id: token_response.osc.uid})) {
   let osc_id = Meteor.users.insert({
      _id: osc.uid,
      emails: [{'address' :osc.email}],
      is_osc: true
    });
    Accounts.setPassword(osc_id, '123123');
  }

  // Return all available endpoint
  return {
    propagateNewUser: function(opts) {
      callAPI("POST", 'create_user', opts)
    },
    getUserAccount: function(id) {
      let result = callAPI("GET", 'users/' + id)
      console.log("Get user result : ", result, result.success ? result.user : null)
      return result.success ? result.user : null
    },
    upload: function(id, url) {
      callAPI("POST", 'upload/' + id, {path: url})
    },
    search: function(id, value) {
      let result = callAPI("POST", 'search/' + id, {value: value})
      return result.success ? result.results : []
    },
    sendSMS: function(id, value) {
      callAPI("GET", 'send_sms/' + id)
    },
    verifySMS: function(id, value, accepted) {
      let result = callAPI("POST", 'verify_sms/' + id, {value: code, accepted: accepted})
      return result.success
    },
    getFirms: function(id) {
      let result = callAPI("GET", 'get_firms/')
      console.log("USERS : ", result)
      return result.success ? result.firms : []
    },
    getAdvisors: function(id) {
      let result = callAPI("GET", 'get_advisors/' + id)
      console.log("USERS : ", result)
      return result.success ? result.advisors : []
    },
  }
}

let Keystamp = new KeystampSDK(Meteor.settings.KEYSTAMP.PUBLIC, Meteor.settings.KEYSTAMP.SECRET)

export {Keystamp}