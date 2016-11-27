
import './panel.html';
import './panel.less';

Template.Panel.onCreated(function onPanelCreated() {
  let instance = this
  instance.results = new ReactiveVar([])
})

Template.Panel.helpers({

})

Template.Panel.events({
  'change input[name="search"], keyup input[name="search"]'(e) {
    Meteor.call('search', e.currentTarget.value, function(err, results) {
      if (err) {
        return console.warn(err)
      }
      instance.results.set(results)
    })
  }
})