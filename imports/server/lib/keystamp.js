import { HTTP } from 'meteor/http'
let Future = Npm.require('fibers/future');

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
    HTTP.call(method, "http://localhost:4000/api/" + url, {
      params: opts || {}, // GET || POST
      timeout: timeout || 4000, // 4s
      headers: headers,
    }, function(err, result) {
      if (err) {
        return future.throw(err)
      }
      future.return(result)
    })

    // Wait for asyncrone call to be ended, and return the result
    return future.wait()
  }

  // Get token
  let token_response = callAPI("POST", "auth", {app_id: pub, app_secret: secret}, 2000) // Wait max 1sec to get the API token
  token = token_response.data.token
  if (!token) {
    throw new Meteor.Error("Invalid connect to Keystamp")
  }

  // Return all available endpoint
  return {
    propagateNewUser: function(opts) {
      return callAPI("POST", 'create_user', opts)
    },
    getUserAccount: function(id) {
      return callAPI("GET", 'users/' + id)
    },
  }
}

let Keystamp = new KeystampSDK(Meteor.settings.KEYSTAMP.PUBLIC, Meteor.settings.KEYSTAMP.SECRET)

export {Keystamp}