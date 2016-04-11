import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel(){
    if(!this.get('session.isAuthenticated')){
      //not authenticated - redirect to signin
      this.transitionTo('signin');
    }
  },

  model(params){
    console.log('pages:edit:model params: ' + JSON.stringify(params));
    return this.store.findRecord('page', params.id);
  },
  actions: {
    save(model){
      model.save()
      .then(()=>{
        Ember.debug('Page saved to api. Returning to page list...');
        this.transitionTo('pages.index');
      })
      .catch((err)=>{
        console.error('Error saving page to api: ' + JSON.stringify(err));
      });
    },
    cancel(){
      this.transitionTo('pages.index');
    }
  }

});
