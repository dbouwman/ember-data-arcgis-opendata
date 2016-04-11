import { moduleFor, test } from 'ember-qunit';
import MockSession from '../../mocks/session';
import Ember from 'ember';


moduleFor('adapter:page', 'Unit | Adapter | page', {
  beforeEach() {
    this.registry.register('service:session', MockSession);
  },
  // Specify the other units that are required for this test.
  needs: ['serializer:page', 'config:environment'],

});

// Replace this with your real tests.
test('it exists', function(assert) {
  let adapter = this.subject();
  assert.ok(adapter);
});

test('defaults to public api url', function(assert){
  let adapter = this.subject();
  let applicationConfig = Ember.getOwner(this).resolveRegistration('config:environment');
  delete applicationConfig.APP.API;
  assert.equal(adapter.get('host'), 'https://opendata.arcgis.com');
});

test('uses config.APP.API', function(assert){
  let adapter = this.subject();
  let applicationConfig = Ember.getOwner(this).resolveRegistration('config:environment');
  applicationConfig.APP.API = 'https://foo.bar.com/api/v12';
  assert.equal(adapter.get('host'), 'https://foo.bar.com/api/v12');
});

test('api v2 namespace', function(assert){
  let adapter = this.subject();
  assert.equal(adapter.get('namespace'), 'api/v2');
});

test('does not inject token if no session', function(assert){
  let adapter = this.subject();
  let session = Ember.getOwner(this).resolveRegistration('service:session');
  session.clear();
  let url = adapter.buildURL('page', 2, {}, 'deleteRecord');
  assert.equal(url,"wat");
  assert.ok(url.indexOf('?token=') === -1);
});

test('injects token if session', function(assert){
  let adapter = this.subject();
  let url = adapter.buildURL('page', 2, {}, 'deleteRecord');
  assert.ok(url.indexOf('?token=') > 0);
});
