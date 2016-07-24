const generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.argument('appname', {
      type: String, 
      required: false,
      default: this.appname
    });
    this.argument('description', {
      type: String,
      required: false
    });
    this.argument('version', {
      type: String,
      required: false,
      default: "0.1.0"
    });
    this.argument('license', {
      type: String,
      required: false,
      default: "MIT"
    });
    this.argument('githubuser', {
      type: String,
      required: false,
    });
    this.argument('authorname', {
      type: String,
      required: false,
    });
    this.argument('authoremail', {
      type: String,
      required: false,
    });
  },

  initializing: { // initialization methods (checking current project state, getting configs, etc)
    method: () => {console.log('just ran initializing')}
  },

  prompting: function () { // prompt users for options
    return this.prompt([
      {
        type: 'input',
        name: 'appname',
        message: 'Project name',
        default: this.appname // Default to current folder name
      }, {
        type: 'input',
        name: 'description',
        message: 'Project description',
      }, {
        type: 'input',
        name: 'version',
        message: 'Project version',
        default: this.version
      }, {
        type: 'input',
        name: 'license',
        message: 'Project Licence',
        default: this.license
      }, {
        type: 'input',
        name: 'githubuser',
        message: 'Your github user',
        default: this.githubuser,
      }, {
        type: 'input',
        name: 'authorname',
        message: 'Your name',
        default: this.authorname,
      }, {
        type: 'input',
        name: 'authoremail',
        message: 'Your email',
        default: this.authoremail
      }, {
        type: 'checkbox',
        name: 'badges',
        message: 'Badges',
        choices: [
          {name: 'npm downloads', value: 'npmd'},
          {name: 'npm version', value: 'npmv'},
          {name: 'npm license', value: 'npml'},
          {name: 'travis build', value: 'travis-build'},
          {name: 'codecov coverage', value: 'codecov'},
          {name: 'github fork', value: 'gforks'},
          {name: 'github stars', value: 'gstars'},
          {name: 'github watchers', value: 'gwatchers'},
          {name: 'github followers', value: 'gfollowers'},
        ]
      }
    ]).then(function (answers) {
      this.appname = answers.appname;
      this.description = answers.description;
      this.version = answers.version;
      this.license = answers.license;
      this.githubuser = answers.githubuser;
      this.authorname = answers.authorname;
      this.authoremail = answers.authoremail;
      this.badges = answers.badges;
    }.bind(this));
  },
  
  configuring: function () { // saving configurations and configure the project
    this.config.set({
      "appname": this.appname,
      "description": this.description,
      "version": this.version,
      "license": this.license,
      "githubuser": this.githubuser,
      "authorname": this.authorname,
      "authoremail": this.authoremail,
      "badges": this.badges
    });
  },

  default: { // if the method name doesn't match a priority, it will be pushed to this group
  },

  writing: function () { // write the generator specific files (routes, controllers, etc)
    const config = this.config.getAll();

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      config);

    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      config
    );

    this.fs.copyTpl(
      this.templatePath('.travis.yml'),
      this.destinationPath('.travis.yml'),
      config
    );

    this.fs.copyTpl(
      this.templatePath('.babelrc'),
      this.destinationPath('.babelrc'),
      config
    );

    this.fs.copyTpl(
      this.templatePath('webpack.config.babel.js'),
      this.destinationPath('webpack.config.babel.js'),
      config
    );

    this.fs.copyTpl(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore'),
      config
    );

    this.fs.copyTpl(
      this.templatePath('.eslintrc.json'),
      this.destinationPath('.eslintrc.json'),
      config
    );

    this.fs.copyTpl(
      this.templatePath('src'),
      this.destinationPath('src'),
      config
    );
  },
  
  conficts: { // where conflicts are handled (used internally)
  },

  install: function () { // where installation are run (npm, bower)
    this.npmInstall([
      'babel-cli',
      'babel-loader',
      'babel-preset-es2015',
      'babel-preset-stage-2',
      'babel-register',
      'chai',
      'codecov',
      'commitizen',
      'cz-conventional-changelog',
      'eslint',
      'eslint-config-defaults',
      'ghooks',
      'json-loader',
      'mocha',
      'npm-run-all',
      'nyc',
      'rimraf',
      'webpack'
    ], 
    { 'saveDev': true });
  },
  
  end: { // called last, cleanup, say good bye, etc
  },
});
