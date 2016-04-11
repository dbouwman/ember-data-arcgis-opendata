/**
 * mock session service
 *
 */
import Ember from 'ember';
export default Ember.Service.extend({
  isAuthenticated: true,
  token: 'FAKETOKEN123',
  currentUser: {fullName:'testmy mctest', username:'testymctest'},
  portal: {},
  clear(){
    this.set('token', null);
    this.set('isAuthenticated', false);
  }
});
