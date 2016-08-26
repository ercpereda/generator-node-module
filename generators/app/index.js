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
        name: 'eslintDefaults',
        message: 'Select eslint defaults',
        choices: [
          { 
            name: 'The config recommended by ESLint',
            value: 'defaults/configurations/eslint',
            checked: true
          }, {
            name: 'The Google JavaScript Style Guide',
            value: 'defaults/configurations/google',
            checked: true
          }, {
            name: 'The Gulp ESLint config',
            value: 'defaults/configurations/gulp'
          }, {
            name: 'The config used for the Node.js runtime',
            value: 'defaults/configurations/node-runtime'
          }, {
            name: 'ES5 config from the AirBnB Style Guide',
            value: 'defaults/configurations/airbnb/es5'
          }, {
            name: 'ES6 config from the AirBnB Style Guide',
            value: 'defaults/configurations/airbnb/es6'
          },  {
            name: 'React config from the AirBnB Style Guide',
            value: 'defaults/configurations/airbnb/es6-react'
          }, {
            name: 'ES5 Walmart config',
            value: 'defaults/configurations/walmart/es5'
          }, {
            name: 'Walmart ES5 + browser',
            value: 'defaults/configurations/walmart/es5-browser'
          }, {
            name: 'Walmart ES5 + node < 4.x',
            value: 'defaults/configurations/walmart/es5-node'
          }, {
            name: 'Walmart ES5 + test',
            value: 'defaults/configurations/walmart/es5-test'
          }, {
            name: 'ES6 Walmart config',
            value: 'defaults/configurations/walmart/es6'
          }, {
            name: 'Walmart ES6 + browser',
            value: 'defaults/configurations/walmart/es6-browser'
          }, {
            name: 'Walmart ES6 + node < 4.x',
            value: 'defaults/configurations/walmart/es6-node'
          }, {
            name: 'Walmart ES6 + test',
            value: 'defaults/configurations/walmart/es6-test'
          }, {
            name: 'Walmart ES6 + react',
            value: 'defaults/configurations/walmart/es6-react'
          }, {
            name: 'Walmart ES6 + react + test',
            value: 'defaults/configurations/walmart/es6-react-test'
          }, 
        ]
      }, {
        type: 'checkbox',
        name: 'badges',
        message: 'Badges',
        choices: [
          {name: 'npm version', value: 'npmv', checked: true},
          {name: 'npm license', value: 'npml', checked: true},
          {name: 'npm downloads', value: 'npmd', checked: true},
          {name: 'travis build', value: 'travis-build', checked: true},
          {name: 'codecov coverage', value: 'codecov', checked: true},
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
      this.eslintDefaults = answers.eslintDefaults;
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
      "eslintDefaults": this.eslintDefaults,
      "badges": this.badges
    });
  },

  default: { // if the method name doesn't match a priority, it will be pushed to this group
  },

  writing: function () { // write the generator specific files (routes, controllers, etc)
    let config = this.config.getAll(); 
    config.appnameCamelCased = this.appname.replace(/-([a-z])/g, (g) => g[1].toUpperCase());

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
      this.templatePath('.eslintrc.js'),
      this.destinationPath('.eslintrc.js'),
      config
    );

    this.fs.copyTpl(
      this.templatePath('.jsdocrc.json'),
      this.destinationPath('.jsdocrc.json'),
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
    this.log('Installing dependencies...');
    this.npmInstall([
      'jsdoc-babel',
      'babel-cli',
      'babel-loader',
      'babel-preset-es2015',
      'babel-preset-stage-2',
      'babel-register',
      'babel-eslint',
      'chai',
      'codecov',
      'commitizen',
      'cz-conventional-changelog',
      'eslint',
      'eslint-config-defaults',
      'ghooks',
      'jsdoc',
      'json-loader',
      'mocha',
      'npm-run-all',
      'nyc',
      'rimraf',
      'webpack'
    ], 
    { 'saveDev': true });

    // eslint dependencies
    const installEslintPluginReact = this.eslintDefaults.filter((value) => {
      return /-react/.test(value);
    }).length > 0;
    if (installEslintPluginReact) {
      this.npmInstall(['eslint-plugin-react', 'babel-eslint'], {'saveDev': true});  
    }
    else {
      const installBabelEslint = this.eslintDefaults.filter((value) => {
        return /es6/.test(value);
      }).length > 0;
      if (installBabelEslint) {
        this.npmInstall(['babel-eslint'], {'saveDev': true});  
      }
    }

    const installEslintPluginFilenames = this.eslintDefaults.filter((value) => {
      return /walmart/.test(value);
    }).length > 0;
    if (installEslintPluginFilenames) {
      this.npmInstall(['eslint-plugin-filenames'], {'saveDev': true});  
    }
  },
  
  end: { // called last, cleanup, say good bye, etc
  },
});
