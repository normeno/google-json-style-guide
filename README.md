# Google JSON Style Guide

[![Software License][ico-license]](LICENSE.md)
[![Build Status][ico-travis]][link-travis]
[![npm version][ico-npm]][link-npm]
[![npm downloads][ico-npm-download]][link-npm-download]

Google JSON Style Guide is a NPM library to work under the Google Json Style Guide standard. This package tries to offer facilities to handle the standard, or simply to force it.

## Basic Usage

### Install

```bash
npm i google-json-style-guide
```

### Import

```js
import GjsonResponse from "google-json-style-guide";
```

### Basic usage

```js
const apiVersion = "1.0";
const context = "My Context";
const gjsonResponse = new GjsonResponse(apiVersion, context);
```

## Responses

### One item

```js
const data = {
    id: 2,
    email: "username@email.com",
    firstName: "First",
    lastName: "Last"
};

res.json(gjsonResponse.one(data));
```

### Error

```js
const data = {
    code: "404",
    message: "Not Found"
};

res.status(404).json(gjsonResponse.error(data));
```

[ico-license]: https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square
[ico-travis]: https://travis-ci.com/normeno/google-json-style-guide.svg?branch=main
[ico-npm]: https://img.shields.io/npm/v/google-json-style-guide.svg?style=flat-square
[ico-npm-download]: https://img.shields.io/npm/dm/google-json-style-guide.svg?style=flat-square

[link-travis]: https://travis-ci.org/normeno/google-json-style-guide
[link-npm]: https://www.npmjs.org/package/google-json-style-guide
[link-npm-download]: http://npm-stat.com/charts.html?package=google-json-style-guide