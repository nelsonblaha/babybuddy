# Contributing

[![Build Status](https://travis-ci.org/cdubz/babybuddy.svg?branch=master)](https://travis-ci.org/cdubz/babybuddy)
[![Coverage Status](https://coveralls.io/repos/github/cdubz/babybuddy/badge.svg?branch=master)](https://coveralls.io/github/cdubz/babybuddy?branch=master)
[![License](https://img.shields.io/badge/License-BSD%202--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)
[![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg)](https://gitter.im/babybuddy/Lobby)

- [Contributions](#contributions)
  - [Pull request process](#pull-request-process)
  - [Translation](#translation)
- [Development](#development)
  - [Installation](#installation)
  - [Gulp Commands](#gulp-commands)
  - [Pre-commit Hook](#pre-commit-hook)
  
## Contributions

Contributions are accepted and encouraged via GitHub
[Issues](https://github.com/cdubz/babybuddy/issues) and 
[Pull Requests](https://github.com/cdubz/babybuddy/pulls). Maintainers and users
may also be found at [babybuddy/Lobby](https://gitter.im/babybuddy/Lobby) on 
Gitter.

### Pull request process

1. Fork this repository and commit your changes.
1. Make and commit tests for any new features or major functionality changes.
1. Run `gulp lint` and `gulp test` (see [Gulp Commands](#gulp-commands)) and 
   ensure that all tests pass.
1. If changes are made to assets: build, collect and commit the `/static` 
   folder (see [Pre-commit Hook](#pre-commit-hook)).
1. Open a [new pull request](https://github.com/cdubz/babybuddy/compare) against
   the `master` branch.
   
New pull requests will be reviewed by project maintainers as soon as possible 
and we will do our best to provide feedback and support potential contributors.

### Translation

#### POEditor

Baby Buddy is set up as a project on [POEditor](https://poeditor.com/). 
Interested contibutors can 
[join translation of Baby Buddy](https://poeditor.com/join/project/QwQqrpTIzn)
for access to a simple, web-based frontend for adding/editing translation files
to the project.

#### Manual

Baby Buddy has support for translation/localization to any language. A general 
translation process will look something like this:

1. Set up a development environment (see [Development](#development) below).
1. Run `gulp makemessages -l xx` where `xx` is a specific locale code (e.g. "fr"
for French or "es" for Spanish). This create a new translation file at
`locale/xx/LC_MESSAGES/django.po`, or update one if it exits.
1. Open the created/updated `django.po` file and update the header template with
license and contact info.
1. Start translating! Each translatable string will have a `msgid` value with 
the string in English and a corresponding (empty) `msgstr` value where a
translated string can be filled in.
1. Once all strings have been translated, run `gulp compilemessages -l xx` to
compile an optimized translation file (`locale/xx/LC_MESSAGES/django.mo`).
1. To expose the new translation as a user setting, add the locale code to the
`LANGUAGES` array in the base settings file (`babybuddy/settings/base.py`).
1. Run the development server, log in, and update the user language to test the
newly translated strings.

Once the translation is complete, commit the new files and changes to a fork and
[create a pull request](#pull-request-process) for review.
 
For more information on the Django translation process, see Django's 
documentation section: [Translation](https://docs.djangoproject.com/en/dev/topics/i18n/translation/).

## Development

### Requirements

- Python 3.5+, pip3, pipenv
- NodeJS 8.x+ and NPM 5.x+
- Gulp

### Installation

1. Install pipenv

        pip3 install pipenv

1. Install required Python packages, including dev packages

        pipenv install --three

1. Install Gulp CLI

        sudo npm install -g gulp-cli

1. Install required Node packages

        npm install

1. Set, at least, the `DJANGO_SETTINGS_MODULE` environment variable

        export DJANGO_SETTINGS_MODULE=babybuddy.settings.development

    This process will differ based on the host OS. The above example is for
    Linux-based systems. See [Configuration](#configuration) for other settings
    and methods for defining them.

1. Migrate the database

        gulp migrate

1. Build assets and run the server

        gulp

    This command will also watch for file system changes to rebuild assets and
    restart the server as needed.

Open [http://127.0.0.1:8000](http://127.0.0.1:8000) and log in with the default
user name and password (`admin`/`admin`).

### Gulp commands

Baby Buddy's Gulp commands are defined and configured by files in the
[`gulpfile.js`](gulpfile.js) folder. Django's management commands are defined
in the [`babybuddy/management/commands`](babybuddy/management/commands) folder.

- [`gulp`](#gulp)
- [`gulp build`](#build)
- [`gulp clean`](#clean)
- [`gulp collectstatic`](#collectstatic)
- [`gulp compilemessages`](#compilemessages)
- [`gulp coverage`](#coverage)
- [`gulp extras`](#extras)
- [`gulp fake`](#fake)
- [`gulp lint`](#lint)
- [`gulp makemessages`](#makemessages)
- [`gulp makemigrations`](#makemigrations)
- [`gulp migrate`](#migrate)
- [`gulp reset`](#reset)
- [`gulp runserver`](#runserver)
- [`gulp scripts`](#scripts)
- [`gulp styles`](#styles)
- [`gulp test`](#test)

#### `gulp`

Executes the `build` and `watch` commands and runs Django's development server.

#### `build`

Creates all script, style and "extra" assets and places them in the
`babybuddy/static` folder.

#### `clean`

Deletes all build folders and the root `static` folder. Generally this should
be run before a `gulp build` to remove previous build files and the generated
static assets.

#### `collectstatic`

Executes Django's `collectstatic` management task. This task relies on files in
the `babybuddy/static` folder, so generally `gulp build` should be run before
this command for production deployments. Gulp also passes along
non-overlapping arguments for this command, e.g. `--no-input`.

#### `compilemessages`

Executes Django's `compilemessages` management task. See [django-admin compilemessages](https://docs.djangoproject.com/en/dev/ref/django-admin/#compilemessages)
for more details about other options and functionality of this command.

#### `coverage`

Create a test coverage report. See [`.coveragerc`](.coveragerc) for default
settings information.

#### `extras`

Copies "extra" files (fonts, images and server root contents) to the build
folder.

#### `fake`

Adds some fake data to the database. By default, ``fake`` creates one child and
31 days of random data. Use the  `--children` and `--days` flags to change the
default values, e.g. `gulp fake --children 5 --days 7` to generate five fake
children and seven days of data for each.

#### `lint`

Executes Python and SASS linting for all relevant source files.

#### `makemessages`

Executes Django's `makemessages` management task. See [django-admin makemessages](https://docs.djangoproject.com/en/dev/ref/django-admin/#makemessages)
for more details about other options and functionality of this command. When
working on a single translation, the `-l` flag is useful to make message for 
only that language, e.g. `gulp makemessages -l fr` to make only a French
language translation file.

#### `makemigrations`

Executes Django's `makemigrations` management task. Gulp also passes along
non-overlapping arguments for this command.

#### `migrate`

Executes Django's `migrate` management task. In addition to migrating the
database, this command creates the default `admin` user. Gulp also passes along
non-overlapping arguments for this command.

#### `reset`

Resets the database to a default state *with* one fake child and 31 days of
fake data.

#### `runserver`

Executes Django's `runserver` management task. Gulp also passes along
non-overlapping arguments for this command.

#### `scripts`

Builds and combines relevant application scripts. Generally this command does
not need to be executed independently - see the `build` command.

#### `styles`

Builds and combines SASS styles in to CSS files. Generally this command does
not need to be executed independently - see the `build` command.

#### `test`

Executes Baby Buddy's suite of tests.

Gulp also passes along non-overlapping arguments for this command, however
individual tests cannot be run with this command. `python manage.py test` can be
used for individual test execution.

### Pre-commit Hook

A [pre-commit hook](https://git-scm.com/docs/githooks#_pre_commit) is 
recommended for all commits in order to make sure that static assets are 
correctly committed. Here is an example working script for bash:

```
#!/bin/bash

if [ $(git diff --cached --name-only | grep static_src -c) -ne 0 ]
then
    gulp clean && gulp build && gulp collectstatic
    if [ $? -ne 0 ]; then exit $?; fi
    git add ./static
fi

gulp lint && gulp test

exit $?
```

This script will build and add static assets to the commit only if changes have
been made to files in a `static_src` directory of the project. It will always
run the `gulp lint` and `gulp test` commands. If any of these processes result
in an error, the commit will be rejected.
