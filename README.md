# `npms-client`

[![Greenkeeper badge](https://badges.greenkeeper.io/jaebradley/npms-client.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/jaebradley/npms-client.svg?branch=master)](https://travis-ci.org/jaebradley/npms-client)
[![npm](https://img.shields.io/npm/v/npms-client.svg)](https://www.npmjs.com/package/npms-client)
[![npm](https://img.shields.io/npm/dt/npms-client.svg)](https://www.npmjs.com/package/npms-client)
[![codecov](https://codecov.io/gh/jaebradley/npms-client/branch/master/graph/badge.svg)](https://codecov.io/gh/jaebradley/npms-client)

NodeJS Client for [the `npms.io` API](https://api-docs.npms.io/)

- [`npms-client`](#npms-client)
  - [Installation](#installation)
  - [API](#api)
    - [`search`](#search)
    - [`getSuggestions`](#getsuggestions)
    - [`getPackageInformation`](#getpackageinformation)
    - [`getPackagesInformation`](#getpackagesinformation)
    - [`PACKAGE_TYPES`](#packagetypes)

## Installation

`npm i npms-client`

You may need to install [axios](https://github.com/axios/axios) as it is a peer dependency of `npms-client`.

## API

All query parameters are optional unless otherwise specified. All API endpoints return a `Promise`.

### `search`

Perform a search query

* **`terms` (required)** - an array of strings that represent the terms to search across
* `scope` - a string that filters by a specific scope (`@jaebradley`, for example)
* `author` - a string that filters by a specific author
* `maintainer` - a string that filters by a specific maintainer
* `exclude` - an object that represents certain exclusion rules
  * `packageTypes` - an array of [`PACKAGE_TYPES`](#package_types). Defaults to `[PACKAGE_TYPES.DEPRECATED, PACKAGE_TYPES.INSECURE, PACKAGE_TYPES.UNSTABLE]`.
  * `keywords` - an array of strings that filter based on matching values in `keywords` field in `package.json`
* `include` - an object that represents certain inclusion rules
  * `packageTypes` - an array of [`PACKAGE_TYPES`](#package_types). Defaults to an empty array.
  * `keywords` - an array of strings that filter based on matching values in `keywords` field in `package.json`
* `boostExactMatches` - a `boolean` that will boost exact matches. Is `true` by default.
* `packageScoreMultiplier` - a number that represents the impact that package scores have on the final search score
* `packageScoreWeights` - an object that represents the impact that certain package attributes have on the package score
  * `quality` - a number that represents the impact that quality has on package score
  * `popularity` - a number that represents the impact that popularity has on package score
  * `maintenance` - a number that represents the impact that maintenance has on package score
* `from` - a number that represents the offset to start searching from. Is `0`, by default
* `size` - a number that represents the total number of results to return. Is `25`, by default.

```javascript
import { search, PACKAGE_TYPES } from 'npms-client';

// Search for packages that match jae or jaebradley that are not deprecated, insecure, or unstable
await search({ terms: ['jae', 'jaebradley'] });

// Search for packages that match jae that only exclude deprecated packages
await search({
  terms: ['jae'],
  exclude: {
    packageTypes: [PACKAGE_TYPES.DEPRECATED],
    keywords: [],
  },
});

// Other search examples
const termsSearch = await search({ terms: ['foo', 'bar']});
const scopeSearch = await search({ terms: ['foo', 'bar'], scope: '@jaebradley' });
const authorSearch = await search({ terms: ['foo', 'bar'], author: 'jaebradley' });
const maintainerSearch = await search({ terms: ['foo', 'bar'], maintainer: 'jaebradley' });
const excludeDeprecatedPackages = await search({ terms: ['foo', 'bar'], exclude: { packageTypes: [PACKAGE_TYPES.DEPRECATED] }});
const excludeKeywords = await search({ terms: ['foo', 'bar'], exclude: { keywords: ['jae', 'baebae'] }});
const includeDeprecatedPackages = await search({ terms: ['foo', 'bar'], include: { packageTypes: [PACKAGE_TYPES.DEPRECATED] }});
const includeKeywords = await search({ terms: ['foo', 'bar'], include: { keywords: ['jae', 'baebae'] }});
const sizeSearch = await search({ terms: ['foo', 'bar'], size: 10 });
const offsetSearch = await search({ terms: ['foo', 'bar'], from: 10 });
```

### `getSuggestions`

Get suggestions for an array of search terms

* **`terms` (required)** - an array of strings that represent the terms to search across
* `size` - a number that represents the total number of results to return. Is `25` by default.

```javascript
import { getSuggestions } from 'npms-client';

await getSuggestions({ terms: ['jae'] });
```

### `getPackageInformation`

Get information about a specific package

* **`packageName` (required)** - a string that represents the package name

```javascript
import { getPackageInformation } from 'npms-client';

await getPackageInformation('npms-client');
```

### `getPackagesInformation`

Get information about a set of packages

* **`packageNames` (required)** - an array of strings that represent all the package names to get information for

```javascript
import { getPackagesInformation } from 'npms-client';

await getPackagesInformation(['npms-client']);
```

### `PACKAGE_TYPES`

An enum that is exported by `npms-client`.

There are three values - `PACKAGE_TYPES.DEPRECATED`, `PACKAGE_TYPES.UNSTABLE`, `PACKAGE_TYPES.INSECURE`.

These values are primarily used to exclude or include certain packages when executing search queries.
