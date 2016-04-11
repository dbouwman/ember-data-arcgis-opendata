import DS from 'ember-data';
import Ember from 'ember';
export default DS.JSONAPISerializer.extend({

  /**
     * Normalize the response from the server into the json we want to work with
     * Apparently the default json api serializer has some issues, so it seems
     * important that we keep this function around
     */
    normalizeResponse (store, primaryModelClass, payload/*, id, requestType*/){

      if (Ember.isArray(payload.data)) {
        payload.data = payload.data.map(this._mapObject);
      } else {
        payload.data = this._mapObject(payload.data);
      }

      return payload;
    },

    /**
     * Deal with attributes.body
     * @param  {JsonApiPage} page Page as JSON API
     * @return {Page}      Page as json
     */
    _mapObject: function(page){

      if(typeof page.attributes.body ==='object'){
        page.attributes = page.attributes.body;
        delete page.attributes.body;
        if(!page.attributes.updatedAt){
          page.attributes.updatedAt = (new Date()).toISOString();
        }
      }

      return page;
    },

    /**
     * Re-Convert the draft and cards objects into strings
     */
    serializeIntoHash (hash, typeClass, snapshot/*, options*/){
      //debugger;
      let attrs = snapshot.attributes();
      //build the main structure
      hash.data= {
        type: typeClass.modelName,
        id: snapshot.id,
        attributes: {
          body:attrs
        }
      };

    }

});
