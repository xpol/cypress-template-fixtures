# Cypress Template Fixtures

Allow use `{{ENVIRONMENT_VARIABLE}}` in Cypress fixture files.

## Setup

Install this package by run `npm i -D cypress-template-fixtures` or `yarn add -D cypress-template-fixtures`.

Add `require('cypress-template-fixtures')(on, config);` in the `cypress/plugins/index.js`. 

```js
module.exports = (on, config) => {
    require('cypress-template-fixtures')(on, config); // Add this line
    return config;
};
```

Also add `cypress/fixtures.out/` into ignore list of you VCS. E.g. the `.gitignore` for Git. 

## Write Fixtures with variables

When writing a fixture data in `cypress/fixtures`, you can use environment variables.
Put the environment variable name in between `{{` and `}}`. Eg. `{{NODE_ENV}}` `{{MY_VARIABLE}}`.

## Provide Environment Variables

Please refer to the [doc here](https://docs.cypress.io/guides/guides/environment-variables).

1. From `env` field in `cypress.json`, don't have to use `CYPRESS_` or `cypress_` prefixes. 
2. From `cypress.env.json`, don't have to use `CYPRESS_` or `cypress_` prefixes.
3. From command line or system environment variables, **have to** use `CYPRESS_` or `cypress_` prefixes.
4. Using [cypress-dotenv](https://github.com/morficus/cypress-dotenv), **have to** use `CYPRESS_` or `cypress_` prefixes unless [set the `all` parameter to true](https://github.com/morficus/cypress-dotenv#options).

Note, if you use cypress-dotenv make sure enable it before cypress-template-fixtures.

```js
module.exports = (on, config) => {
    config = require('cypress-dotenv')(config); // load .env before cypress-template-fixtures
    require('cypress-template-fixtures')(on, config);
    return config
};
```

## How it works

1. When running `cypress run` or `cypress open` this plugin will copy all fixtures in `cypress/fixtures` into `cypress/fixtures.out` with sub-folders structure preserved.
2. When copying text fixtures (`.json`, `.js`, `.coffee`, `.html`, `.txt`, `.csv`) the variables like `{{MY_VARIABLE}}` will be replaced with the related environment variable value like `MY_VARIABLE`.
3. This plugin will also change the `fixturesFolder` config to `cypress/fixtures.out` so that cypress will use the fixtures there.

## Limitations

For simplicity, change the fixtures after `cypress open` may not regenerated automatically, you should rerun `cypress open`.

