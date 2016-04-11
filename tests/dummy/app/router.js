import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('signin');
  this.route('pages', function() {
    this.route('create');
    this.route('page',{path: ':id'});
    this.route('edit',{path: 'edit/:id'});
  });
});

export default Router;
