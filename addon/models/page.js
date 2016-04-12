/**
 * page.js
 *
 * Ember Data Model for a Page
 */
 import DS from 'ember-data';

 export default DS.Model.extend({
   title: DS.attr('string'),
   description: DS.attr('string'),
   lead: DS.attr('string'),
   public: DS.attr('boolean'),
   uiVersion:  DS.attr('number'),
   owner: DS.attr('string'),
   ownerName: DS.attr('string'),
   updatedAt: DS.attr('date'),
   affiliation: DS.attr('string'),
   cards: DS.attr() //array of card objects
 });
