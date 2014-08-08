'use strict';

var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
    prompting: function() {
        var done = this.async();

        // have Yeoman greet the user
        this.log(this.yeoman);

        // Ask user for data input to use during the scaffolding
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

        // attach user input to generator
        this.prompt(prompts, function (props) {
            this.appName = props.appName;
            this.appDescription = props.appDescription;

            done();
        }.bind(this));
    },

    copyFiles: function() {
        this.copy('gitignore', '.gitignore');
        this.copy('jshintrc', '.jshintrc');
        this.copy('_gulpfile.js', 'gulpfile.js');

        // User data values to use in the templates
        var context = {
            appName: this.appName,
            appDescription: this.appDescription
        };

        // Fill templates with data
        this.template('_index.html', 'index.html', context);
        // Creation of package.json fails when title contains spaces?
        context.appName = this._.slugify(this.appname);
        this.template('_package.json', 'package.json', context);

        // Javascript
        this.mkdir('src');
        this.write('src/app.js', 'console.log(\'Initialize app!\');');

        // scss
        this.mkdir('sass');
        this.write('sass/styles.scss', '/*# sourceMappingURL=styles.css.map */');
    },

    // Install needed npm packages used by Gulp
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
