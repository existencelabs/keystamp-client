
import './header.html';
import './header.less';

Template.Header.helpers({
  isUserLogged() {
    console.log("data ?", Template.instance().data)
    return (Template.instance().data.user && Template.instance().data.user._id)
  }
});