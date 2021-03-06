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
      timeout: timeout || 6000, // 4s
      headers: headers,
    }, function(err, result) {
      if (err) {
        console.warn("Error: ", err)
        return future.throw(err)
      }
      console.log("Success !")
      future.return(result.data)
    })

    // Wait for asyncrone call to be ended, and return the result
    return future.wait()
  }

  // Get token
  let token_response = callAPI("POST", "auth", {app_id: pub, app_secret: secret}, 5000) // Wait max 1sec to get the API token
  token = token_response.token
  if (!token) {
    throw new Meteor.Error("Invalid connect to Keystamp")
  }
  // Token also send OSC USER !! Check if we have it on databse, if not create with password `123123`
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
      opts.assignedTo = opts.assignedTo || "none"
      callAPI("POST", 'create_user', opts)
    },
    getUserAccount: function(id) {
      let result = callAPI("GET", 'users/' + id)
      return result.success ? result.user : null
    },
    upload: function(id, data) {
      callAPI("POST", 'upload/' + data.assignedTo, {path: data.path, comingFrom: id}, 30000)
    },
    search: function(id, value) {
      let result = callAPI("POST", 'search/' + id, {value: value})
      return result.success ? result.results : []
    },
    sendSMS: function(id, value) {
      callAPI("GET", 'send_sms/' + id, {}, 10000)
    },
    verifySMS: function(id, value, accepted) {
      let result = callAPI("POST", 'verify_sms/' + id, {value: code, accepted: accepted}, 10000)
      return result.success
    },
    getFirms: function(id) {
      let result = callAPI("GET", 'get_firms/')
      return result.success ? result.firms : []
    },
    getAdvisors: function(id) {
      let result = callAPI("GET", 'get_advisors/' + id)
      return result.success ? result.advisors : []
    },
    getUsers: function(id) {
      let result = callAPI("GET", 'get_customers/' + id)
      return result.success ? result.customers : []
    },
    getAllAdvisers: function() {
      let result = callAPI("GET", 'get_all_advisors/')
      return result.success ? result.advisors : []
    },
    getAllDocuments: function() {
      let result = callAPI("GET", 'get_all_document/')
      let docss =  result.success ? result.docs : []
      let finals = []
      // Doc of doc [ [ {doc}, {doc}], [{doc}] ] => [{doc}, {doc}, {doc}]
      docss.forEach(docs => {
        docs.forEach(doc => {
          finals.push(doc)
        })
      })
      return finals
    }
  }
}

let Keystamp = new KeystampSDK(Meteor.settings.KEYSTAMP.PUBLIC, Meteor.settings.KEYSTAMP.SECRET)

export {Keystamp}