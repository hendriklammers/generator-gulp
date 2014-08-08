'use strict';

var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
    init: function() {
        this.helperMethod = function() {
            this.log('This won\'t be called automatically');
        };
    },

    method1: function() {
        this.log('Hello simpleapp generator');
        this.helperMethod();
    },

    promptTask: function () {
        var done = this.async();
        this.prompt({
            type    : 'input',
            name    : 'name',
            message : 'Your project name',
            default : this.appname // Default to current folder name
        }, function (answers) {
            this.log(answers.name);
            done();
        }.bind(this));
    },

    // Install neede npm packages used by Gulp
    installGulp: function() {
        var done = this.async(),
            packages = ['gulp',
                        'browser-sync',
                        'gulp-autoprefixer',
                        'gulp-concat',
                        'gulp-jshint',
                        'gulp-ruby-sass',
                        'jshint-stylish'];

        this.npmInstall(packages, {'save-dev': true}, done);
    }
});
