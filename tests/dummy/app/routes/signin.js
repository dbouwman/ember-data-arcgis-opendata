import Ember from 'ember';
export default Ember.Route.extend({

  actions: {
    signin: function(){
      this.get('session').open('arcgis-oauth-bearer')
        .then((authorization) => {
          Ember.debug('AUTH SUCCESS: ', authorization);
          //transition to some secured route or... so whatever is needed
          this.controller.transitionToRoute('index');
        })
        .catch((err)=>{
          Ember.debug('AUTH ERROR: ', err);
        });
    }
  }
});
