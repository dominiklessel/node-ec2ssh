
'use strict';

/**
 * Load modules
 */

var path = require('path');
var spawn = require('child_process').spawn;

var AsciiTable = require('ascii-table');
var inquirer = require('inquirer');

/**
 * Interface helpers
 */

module.exports.printInstancesList = function fn_printInstancesList( instances ) {

  if ( !instances.length ) {
    return console.log( '[ec2hosts] - No instances found!' );
  }

  var table = new AsciiTable().setHeading( 'Name', 'DNS' );

  instances.forEach(function( instance ) {
    table.addRow( instance.name, instance.dns );
  });

  console.log( table.toString() );

};

module.exports.selectInstance = function fn_selectInstance( instances, callback ) {

  var inquirerOptions = [{
    type: 'list',
    name: 'instance',
    message: 'Please select an instance to connect to:',
    choices: instances.map(function( instance ) {
      return instance.name;
    }),
    filter: function( name ) {
      return instances.filter(function( instance ) {
        return instance.name === name;
      }).pop();
    }
  }];

  inquirer.prompt(inquirerOptions, function( answers ) {
    return callback( answers.instance );
  });

};

module.exports.sshIntoInstance = function fn_sshIntoInstance( instance, options ) {

  var identityFilePath = path.join( options.identityFilesPath, instance.keyName + '.pem');

  var sshArgs = [
    '-i',
    identityFilePath,
    options.user + '@' + instance.dns
  ];

  var sshOptions = {
    stdio: 'inherit'
  };

  var ssh = spawn( 'ssh', sshArgs, sshOptions );

  ssh.on('exit', function() {
    console.log();
    console.log('[ec2ssh] - Connection closed!');
    process.exit();
  });

};

/**
 * Array helpers
 */

module.exports.flattenArray = function fn_flattenArray( nestedArray ) {

  if ( !nestedArray.length ) {
    return [];
  }

  return nestedArray.reduce(function( a, b ) {
    return a.concat( b );
  });

};
