import { HTTP } from 'meteor/http'
let Future = Npm.require('fibers/future');

let KeystampSDK = function(pub, secret) {

  let token;

  // Define the Call API function
  let callAPI = function(type, method, opts, timeout) {
    var future = new Future();

    HTTP.call(type, "http://localhost:3000", {
      params: opts, // GET || POST
      timeout: timeout || 4000, // 4s
    }, function(err, result) {
      if (err) {
        return future.throw(err)
      }
      future.return(result)
    })
    return future.wait()
  }

  // Get token
  token = callAPI("GET", "auth", {app_id: pub, app_secret: secret}, 2000) // Wait max 1sec to get the API token
  if (!token) {
    throw new Meteor.Error("Invalid connect to Keystamp")
  }

  // Return all available endpoint
  return {
    getUserAccount: function(opts) {
      callAPI("GET", 'get-user-account', opts)
    }
  }
}

let Keystamp = new KeystampSDK(Meteor.settings.KEYSTAMP.PUBLIC, Meteor.settings.KEYSTAMP.SECRET)

export {Keystamp}