/* jshint node: true */
'use strict';

require('shelljs/global');
var getRepoInfo = require('git-repo-info');
var info = getRepoInfo();
var userInfo, footnotesStyles, footnotesInfo;

userInfo = function() {
  var command = 'git config --get user.name';

  return exec(command, {silent:true}).output.replace(/(\r\n|\n|\r)/gm,"");
}

footnotesStyles = function() {
  return '<style> \
            body { \
              position:relative; \
            } \
            .ember-cli-footnotes {\
              position: absolute; \
              bottom: 0px; \
              right: 0px; \
              padding: 5px; \
              background: rgba(255, 255, 255, 0.9); \
              z-index: 1000; \
            } \
          </style>';
}

footnotesInfo = function() {
  return '<div class="ember-cli-footnotes"> \
              <p> Branch: ' + info.branch + '</p> \
              <p> SHA: ' + info.sha + '</p> \
              <p> Deployed by: ' + userInfo() + '</p> \
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
