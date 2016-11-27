import './uploader.html';
import './uploader.less';

Template.Uploader.events({
  'change .uploader input[type="file"]' (event, instance) {
    let file = event.target.files[0]
    if (file) {
      let callback = instance.data.callback || function(err, path) {
        Meteor.call('upload', {path: path, assignedTo: instance.data.assignedTo})
      }

      let uploader = new Slingshot.Upload( "uploadToAmazonS3" )
      uploader.send(file, callback)
    }
  },
});