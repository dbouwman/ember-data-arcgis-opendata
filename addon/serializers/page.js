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

      if(typeof page.attributes.body === 'object'){
        page.attributes = page.attributes.body;
        delete page.attributes.body;
        if(!page.attributes.updatedAt){
          page.attributes.updatedAt = (new Date()).toISOString();
        }
      }

      // normalize row data
      // add cards under rows
      if (!page.attributes.rows || page.attributes.rows.length === 0) {
        page.attributes.rows = [{
          cards: page.attributes.cards,
          style: {}
        }];
      }
      // no longer using top level cards, should be in first row
      delete page.attributes.cards;
      // make sure each row has a style
      page.attributes.rows.forEach(row => {
        if (!row.style) {
          row.style = {};
        }
      });

      return page;
    },

    /**
     * Ensure that we are speaking camelCase
     */
    keyForAttribute: function(attr) {
      console.log('KeyForAttribute: ' + attr);
      return Ember.String.camelize(attr);
    }

    /**
     * Re-Convert the draft and cards objects into strings
     */
    // serializeIntoHash (hash, typeClass, snapshot/*, options*/){
    //   //debugger;
    //   let attrs = snapshot.attributes();
    //   //build the main structure
    //   hash.data= {
    //     type: typeClass.modelName,
    //     id: snapshot.id,
    //     attributes: {
    //       body:attrs
    //     }
    //   };
    // }

});
