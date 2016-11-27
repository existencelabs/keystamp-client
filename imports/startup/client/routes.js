import { FlowRouter } from 'meteor/kadira:flow-router'
import { BlazeLayout } from 'meteor/kadira:blaze-layout'

import '../../ui/layout/layout-main'

// Home !
FlowRouter.route('/', {
  name: 'App.home',
  action() {
    BlazeLayout.render('LayoutMain', {main: 'HomePage'})
  }
})


// Define these routes in a file loaded on both client and server
AccountsTemplates.configureRoute('signIn', {
  name: 'App.login',
  path: '/login'
});

AccountsTemplates.configureRoute('signUp', {
  name: 'App.join',
  path: '/join'
});

AccountsTemplates.configureRoute('forgotPwd', {
  name: 'App.forgot',
  path: '/forgot-password'
});

AccountsTemplates.configureRoute('resetPwd', {
  name: 'App.resetPwd',
  path: '/reset-password'
});


// var email = AccountsTemplates.removeField('email');
// var password = AccountsTemplates.removeField('password');

AccountsTemplates.addField({
  _id: 'phone',
  type: 'text',
  required: true,
  displayName: "Phone",
  maxLength: 100
});

AccountsTemplates.addField({
  _id: 'role',
  type: 'text',
  required: true,
  displayName: "Role",
  maxLength: 100
});


// AccountsTemplates.addField(email);
// AccountsTemplates.addField(password);
