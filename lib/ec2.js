
'use strict';

/**
 * Load modules
 */

var AWS = require('aws-sdk');
var utils = require('./utils');

/**
 * Config
 */

var DEFAULT_REGION = 'eu-west-1';
var DEFAULT_NAME_TAG_KEY = 'Name';

var ec2 = new AWS.EC2({ region: DEFAULT_REGION });

/**
 * Instances
 */

var getInstanceName = function( instance ) {

  if ( !instance.Tags.length ) {
    return 'Unkown';
  }

  var tags = instance.Tags.filter(function( tag ) {
    return tag.Key === DEFAULT_NAME_TAG_KEY;
  });

  if ( !tags.length ) {
    return 'Unkown';
  }

  return tags[0].Value;

};

var getInstanceInfo = function( instance ) {

  return {
    name: getInstanceName( instance ),
    dns: instance.PublicDnsName,
    keyName: instance.KeyName
  };

};

var getInstances = function( data ) {

  var instances = data.Reservations
    .filter(function( reservation ) {
      return reservation.Instances && reservation.Instances.length;
    })
    .map(function( reservation ) {
      return reservation.Instances.map( getInstanceInfo );
    });

  return utils.flattenArray( instances );

};

var filterInstancesList = function( instances, filters ) {

  if ( !filters.length ) {
    return instances;
  }

  return instances.filter(function( instance ) {

    return filters
      .map(function( filter ) {
        return instance.name.toLowerCase().indexOf( filter.toLowerCase() );
      })
      .filter(function( index ) {
        return index > -1;
      }).length;

  });

};

var describeInstances = function( filters, callback ) {

  if ( typeof filters === 'function' ) {
    callback = filters;
    filters = [];
  }

  ec2.describeInstances({}, function( err, data ) {

    if ( !!err ) {
      return callback( err );
    }

    var instances = getInstances( data );

    instances = filterInstancesList( instances, filters );

    return callback( null, instances );

  });

};

/**
 * Export
 */

module.exports.describeInstances = describeInstances;
