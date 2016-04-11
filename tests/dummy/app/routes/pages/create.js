import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel(){
    if(!this.get('session.isAuthenticated')){
      //not authenticated - redirect to signin
      this.transitionTo('signin');
    }
  },

  model(){

    let user = this.get('session.currentUser');
    let portal = this.get('session.portal');

    let model = {
      public:false,
      updatedAt: new Date().toISOString,
      updatedBy: user.fullName,
      owner: user.username,
      title: 'Some Random Page Title',
      affiliation: portal.name,
      cards:[]
    };
    return model;
  },
  actions: {
    save(json){

      Ember.debug('Save called for newly created page!');
      let model = this.store.createRecord('page', json );
      //save it
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
