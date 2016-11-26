import { Keystamp } from '../lib/keystamp'

Accounts.onCreateUser(function(options, user) {
    if(!options || !user) {
      console.log('error creating user');
    return;
  }

  console.log(" Propagated: ", Keystamp.propagateNewUser({
    uid: user._id,
    email: options.email
  }))

  return user
})
