import Ember from 'ember';

export default Ember.Route.extend({
  model(params){
    console.log('pages:page:model params: ' + JSON.stringify(params));
    return this.store.findRecord('page', params.id);
  }
});
