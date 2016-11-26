
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
