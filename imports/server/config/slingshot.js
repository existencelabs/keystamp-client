Slingshot.fileRestrictions( "uploadToAmazonS3", {
  allowedFileTypes: null, //[ "image/png", "image/jpeg", "image/gif" ],
  maxSize: 5 * 1024 * 1024 //5Mo
})

Slingshot.createDirective( "uploadToAmazonS3", Slingshot.S3Storage, {
  bucket: "bitcoin-outlet",
  acl: "public-read",
  authorize: function () {
    // let userFileCount = Files.find( { "userId": this.userId } ).count()
    // return userFileCount < 100 ? true : false; // Max 100 files / user
    return true
  },
  key: function (file, options) {
    let user_id = options && options.user_id || this.userId
    if (!user_id) {
      throw new Meteor.Error(400, "No user_id to uploadToAmazonS3")
    }
    var user = Meteor.users.findOne({_id: user_id})
    return user._id + "/" + file.name;
  }
})