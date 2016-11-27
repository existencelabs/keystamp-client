import { Keystamp } from '../lib/keystamp'

Accounts.onCreateUser(function(options, user) {
    if(!options || !user) {
      console.log('error creating user');
    return;
  }

  Keystamp.propagateNewUser({
    uid: user._id,
    email: options.email,
   //phone: options.phone,
    role: options.role
  })

  return user
})
