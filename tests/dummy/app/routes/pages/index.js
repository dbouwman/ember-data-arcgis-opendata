import Ember from 'ember';

export default Ember.Route.extend({

  model(params){
    console.log("Params", params);

      params = {
        page: {
          size:100
        }
      };

    return this.store.query('page', params);
  },
  actions: {
    delete(page_id){
      Ember.debug('Delete called for PAGE ' + page_id);
      this.store.findRecord('page', page_id)
        .then((page)=>{
          page.destroyRecord();
        });
    }
  }

});
