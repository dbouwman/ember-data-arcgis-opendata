# Ember-Data ArcGIS OpenData

Ember Data model and adapters for the [ArcGIS OpenData API](https://opendata.arcgis.com/api/v2)

## Notes
This is beta software. The intention of this add-on is to enable an application to work with the ArcGIS Open Data api. It is being built incrementally, and does not currently encompass the entire API.

## Usage

Create a project using ember-cli. If you have an existing ember-cli project, skip this step.

```
$ ember new my-new-app
```

Add Torii, the ArcGIS torii provider and this add-on to the project

```
$ ember install torii
$ ember install torii-provider-arcgis
$ ember install ember-data-arcgis-opendata
```

Now edit `/config/environment.js` to add your Torii provider configuration.

```
module.exports = function(environment) {
  var ENV = {

   // ... other ENV config stuff here

   torii:{
      sessionServiceName: 'session',
      providers: {
        'arcgis-oauth-bearer': {
          apiKey: 'APP CLIENT ID GOES HERE',
          portalUrl: 'https://someportal.com' //optional - defaults to https://www.arcgis.com
        }
      }
    }
  };

  return ENV;
};
```

The application will now have access to the following models:

- [Page](https://github.com/ArcGIS/ember-data-arcgis-opendata/blob/master/addon/models/page.js)

The model will automatically be available to the Ember Data store in the consuming application. Please see the [Ember Guides](https://guides.emberjs.com/v2.4.0/models/) for details on how to [find records](https://guides.emberjs.com/v2.4.0/models/finding-records/) or [other operations](https://guides.emberjs.com/v2.4.0/models/creating-updating-and-deleting-records/).
