
import './footer.html';
import './footer.less';

Template.Footer.helpers({
  year() {
    return new Date().getFullYear()
  },
});