import Ember from 'ember';

export default Ember.Route.extend({
  init(){
    this._super(...arguments);
    Ember.debug('application route:init');

    this.get('session').fetch()
    .then((options)=>{
      Ember.debug('Fetch succeeded... returned: ' + JSON.stringify(options));
      this.set('isAuthenticated', true);
    })
    .catch((err)=>{
      Ember.debug('session fetch failed ' + JSON.stringify(err));
    });
  },
  actions: {
    accessDenied: function() {
      console.error('Access Denied - transitioning to signin route...');
      this.transitionTo('signin');
    },
    signout: function() {
      //destroy the session
      this.get('session').close();

    }
  }
});
