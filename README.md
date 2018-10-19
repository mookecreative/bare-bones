# README #

This README documents the requirements for bare-bones, created by Luke Moody (LMWD)

Blank scaffold front-end boilerplate. Write stylesheets with Sass, automatically check your JavaScript for errors, enable synchronized browser testing, and more with a Gulp based setup.

* bare-bones
* Version 5.0.1
* https://www.lukemoody.co.uk

### Features ###

* Modern JavaScript
* Sass for stylesheets
* Gulp
* BrowserSync
* TweenMax
* jQuery
* FontAwesome v4.7.0

### Requirements ###

Ensure all dependencies have bene installed:

* Node.js >= 6.9.x
* Yarn

### Structure ###

```shell
root/                     # → Root
├── dist/                 # → Built assets (never edit)
├── inc/                  # → Includes folder
│   ├── assets/           # → Images, logo, icons etc
│   ├── css/              # → Compiled source css file
│   ├── fonts/            # → Font folder
│   ├── js/               # → JavaScript build file, library and compiled source file
│   └── scss/             # → Sass partials, mixins and variables
├── node_modules/         # → Node.js packages (never edit)
├── .gitignore            # → Directories, files, or patterns you don't want to be tracked by version control
├── gulpfile.json         # → Manifest to define tasks
├── package.json          # → Node.js dependencies and scripts
└── ...
```

### Pre-install ###

* Copy bare-bones-wp files into your `theme` directory
* Rename `bare-bones` theme folder name to a project specific reference

### How to install ###

* Change to the project's root directory.
* Install project dependencies with `yarn`
* BrowserSync - If you’re already running a local server with PHP or similar, you’ll need to use the proxy mode. Open gulpfile.json and replace `http://local.dev/` with your local development url
* Run Gulp with `gulp watch`

### Who do I talk to? ###

* LMWD
* Luke Moody - hello@lukemoody.co.uk
