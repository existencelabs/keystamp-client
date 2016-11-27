import './uploader.html';
import './uploader.less';

Template.Uploader.onCreated(function() {
  this.state = new ReactiveVar(false)

})
Template.Uploader.helpers({
  getState(type) {
    return (Template.instance().state.get() === type)
  }
})
Template.Uploader.events({
  'change .uploader input[type="file"]' (event, instance) {
    let file = event.target.files[0]
    if (file) {
      let callback = instance.data.callback || function(err, path) {
        Meteor.call('upload', {path: path, assignedTo: instance.data.assignedTo})
      instance.state.set('done')
      }

      let uploader = new Slingshot.Upload( "uploadToAmazonS3" )
      uploader.send(file, callback)

      instance.state.set('loading')
    }
  },
});