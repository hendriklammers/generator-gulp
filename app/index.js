'use strict';

var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
    prompting: function() {
        var done = this.async();

        // have Yeoman greet the user
        this.log(this.yeoman);

        var prompts = [{
            type: 'input',
            name: 'appName',
            message: 'What is your app\'s name ?',
            default: this.appname
        }, {
            type: 'input',
            name: 'appDescription',
            message: 'What is the app\'s description?',
            default: ''
        }];

        this.prompt(prompts, function (props) {
            this.appName = props.appName;
            this.appDescription = props.appDescription;

            done();
        }.bind(this));
    },

    copyFiles: function() {
        this.copy('gitignore', '.gitignore');
        this.copy('jshintrc', '.jshintrc');

        var context = {
            appName: this.appName,
            appDescription: this.appDescription
        };

        this.template('_index.html', 'index.html', context);

        context.appName = this._.slugify(this.appname);
        this.template('_package.json', 'package.json', context);
    },

    // Install neede npm packages used by Gulp
    install: function() {
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
