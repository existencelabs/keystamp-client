import '../../ui/layout/layout-main'

// Config file have to be on user/ subdirectory, cause he have to be loaded BEFORE /lib/routes/user/user-accounts.js
AccountsTemplates.configure({
  // Flow Router
  defaultLayout: 'LayoutMain',
  // defaultLayoutRegions: {
  //   nav: 'publicNav'
  // },
  defaultContentRegion: 'main',

  // Behavior
  enablePasswordChange: true,
  // enforceEmailVerification: true,
  sendVerificationEmail: true,

  // Appearance
  showForgotPasswordLink: true,
  showPlaceholders: false,

  // Client-side Validation
  negativeValidation: true,
  positiveValidation: true,
  positiveFeedback: true,

  // Links
  homeRoutePath: '/',
  // privacyUrl: '/privacy',
  // termsUrl: '/terms'
});


var email = AccountsTemplates.removeField('email');
var password = AccountsTemplates.removeField('password');

AccountsTemplates.addField({
  _id: 'firstname',
  type: 'text',
  required: true,
  displayName: "First name",
  maxLength: 100
});

AccountsTemplates.addField({
  _id: 'lastname',
  type: 'text',
  required: true,
  displayName: "Last name",
  maxLength: 50
});

AccountsTemplates.addField(email);
AccountsTemplates.addField(password);
