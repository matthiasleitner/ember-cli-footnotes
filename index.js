/* jshint node: true */
'use strict';

require('shelljs/global');
var getRepoInfo = require('git-repo-info');
var info = getRepoInfo();
var path = require('path');
var readFileSync = require('fs').readFileSync;
var userInfo, footnotesStyles, footnotesInfo;

userInfo = function() {
  var command = 'git config --get user.name';

  return exec(command, {silent:true}).output.replace(/(\r\n|\n|\r)/gm,"");
}

footnotesStyles = function() {
  var fileName = path.join(__dirname, './addon/styles/footnotes.css');
  return '<style>' + readFileSync(fileName) + '</style>';
}

footnotesInfo = function() {
  return '<div class="ember-cli-footnotes"> \
              <p> Branch: ' + info.branch + '</p> \
              <p> SHA: ' + info.sha + '</p> \
              <p> Deployed by: ' + userInfo() + ' at ' + new Date().toString() + '</p> \
            </div>'
}

module.exports = {
  name: 'ember-cli-footnotes',

  contentFor: function(type, config) {
    if(config.environment === 'production' || type !== 'body-footer') {
      return;
    }

    return footnotesStyles() + footnotesInfo();

  }
};
