import Ember from 'ember';
import DS from 'ember-data';


export default DS.JSONAPIAdapter.extend({
  /**
   * Make the session available. This is expected to
   * be a `torii-provider-arcgis` session.
   */
  session: Ember.inject.service('session'),

  /**
   * Pull the host from the application configuration
   * but if not present, default to the production url
   */
  host: Ember.computed(function(){
    let host = 'https://opendata.arcgis.com';
    let applicationConfig = Ember.getOwner(this).resolveRegistration('config:environment');
    if(applicationConfig && applicationConfig.APP && applicationConfig.APP.API){
      host = applicationConfig.APP.API;
    }
    return host;
  }),

  /**
   * If the session is authenticated, we append the Authorization header
   */
  headers: Ember.computed('session.isAuthenticated', function(){
    let result = {};
    if(this.get('session.isAuthenticated')){
      result.Authorization = this.get('session.token');
    }
    return result;
  }),

  /**
   * Use api v2
   */
  namespace: 'api/v2',

  /**
   * This informs the adapter that while our models are singular
   * the api routes are plural
   */
  pathForType: function(type) {
    let camelized = Ember.String.camelize(type);
    return Ember.String.pluralize(camelized);
  },

  /**
   * Should the Adapter re-fetch records it pulls from the store
   * For OpenData we always return false because it is very
   * unlikely that the record has changed since it was
   * loaded into the store
   * @return {boolean}
   */
  shouldBackgroundReloadRecord: function(/*store,snapshot*/){
    return false;
  }

});
