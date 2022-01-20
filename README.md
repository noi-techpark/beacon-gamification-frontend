# beacon-gamification-frontend
Frontend for the beacon gamification back-office developed using the [lit-element](https://lit-element.polymer-project.org/) polymer library.

[![ci beacon-gamification-frontend](https://github.com/noi-techpark/beacon-gamification-frontend/actions/workflows/ci.yml/badge.svg)](https://github.com/noi-techpark/beacon-gamification-frontend/actions/workflows/ci.yml)

## Install the Dependencies

`$ yarn`

This will install all the dependencies including:

- lit-element: webcomponent library
- polymer-cli: cli used to preview and build the project
- redux: used to manage state

## Viewing Your Application

`$ yarn ps`

The project will then be available at `http://127.0.0.1:8081`

## Building Your Application

* Create a file called `api-url.txt` in the folder `config`.
* `$ yarn pb` will generate the builds `dev`, `es5prod` and `es6prod`.

At the current time the assets (images and logos) are only copied in the `es5prod` build, if you want to change that, change the pb command in `package.json`
