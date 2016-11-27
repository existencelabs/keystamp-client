import { Keystamp } from '../lib/keystamp'

Accounts.onCreateUser(function(options, user) {
    if(!options || !user) {
      console.warn('error creating user');
    return;
  }


  Keystamp.propagateNewUser({
    uid: user._id,
    email: options.email,
    phone: options.profile.phone,
    role: options.profile.role
  })

  return user
})
