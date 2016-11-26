import './uploader.html';
import './uploader.less';

Template.Uploader.events({
  'change .uploader input[type="file"]' (event, template) {
    let file = event.target.files[0]
    if (file) {
      let callback = template.data.callback || function(err, url) {
        Meteor.call('upload', url)
      }

      let uploader = new Slingshot.Upload( "uploadToAmazonS3" )
      uploader.send(file, callback)
    }
  },
});