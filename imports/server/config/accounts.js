import { Keystamp } from '../lib/keystamp'

Accounts.onCreateUser(function(options, user) {
    if(!options || !user) {
      console.log('error creating user');
    return;
  }

  console.log("New user created : ", options, user)
  Keystamp.propagateNewUser({
    _id: options._id,
    email: options.email
  })

  return user
})
