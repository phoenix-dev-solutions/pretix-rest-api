# Pretix API - Node.js Client

A Node.js client for the Pretix REST API. Easily interact with the Pretix REST API using this library.

## Installation

```js
npm install @phoenixdev/pretix-rest-api
```

```js
yarn add @phoenixdev/pretix-rest-api
```

## Getting started

GET API credentials from youe dealer
.

Pretix Services reference <https://docs.pretix.eu/en/latest/api/index.html>.

## Setup

Setup for the REST API integration :

```js
const PretixRestApi = require('@phoenixdev/pretix-rest-api');

const pretix = new PretixRestApi({
  url: 'https://xxx.xxxxxxxx.xx',
  token: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
});
```

### Options

| Option        | Type      | Required | Description                                                                                                         |
| ------------- | --------- | -------- | ------------------------------------------------------------------------------------------------------------------- |
| `url`         | `String`  | yes      | Your pretix url                                                                                                     |
| `token`       | `String`  | yes      | Your token                                                                                                          |
| `organizer`   | `String`  | no       | If exists, it will be added to all requests                                                                         |
| `version`     | `String`  | no       | API Version default is `v1`                                                                                         |
| `encoding`    | `String`  | no       | Encoding, default is `utf-8`                                                                                        |
| `timeout`     | `Integer` | no       | Define the request timeout                                                                                          |
| `axiosConfig` | `Object`  | no       | Define the custom [Axios config](https://github.com/axios/axios#request-config), also override this library options |

## Methods

### GET

- `.get(endpoint)`
- `.get(endpoint, params)`

| Params     | Type     | Description                                       |
| ---------- | -------- | ------------------------------------------------- |
| `endpoint` | `String` | Pretix API endpoint, example: `events` or `items` |
| `params`   | `Object` | Query strings params                              |

### POST

- `.post(endpoint, data)`
- `.post(endpoint, data, params)`

| Params     | Type     | Description                                                 |
| ---------- | -------- | ----------------------------------------------------------- |
| `endpoint` | `String` | Pretix API endpoint, example: `events` or `items`           |
| `data`     | `Object` | JS object to be converted into JSON and sent in the request |
| `params`   | `Object` | Query strings params                                        |

### PUT

- `.put(endpoint, data)`
- `.put(endpoint, data, params)`

| Params     | Type     | Description                                                 |
| ---------- | -------- | ----------------------------------------------------------- |
| `endpoint` | `String` | Pretix API endpoint, example: `events` or `items`           |
| `data`     | `Object` | JS object to be converted into JSON and sent in the request |
| `params`   | `Object` | Query strings params                                        |

### PATCH

- `.patch(endpoint, data)`
- `.patch(endpoint, data, params)`

| Params     | Type     | Description                                                 |
| ---------- | -------- | ----------------------------------------------------------- |
| `endpoint` | `String` | Pretix API endpoint, example: `events` or `items`           |
| `data`     | `Object` | JS object to be converted into JSON and sent in the request |
| `params`   | `Object` | Query strings params                                        |

### DELETE

- `.delete(endpoint)`
- `.delete(endpoint, params)`

| Params     | Type     | Description                                       |
| ---------- | -------- | ------------------------------------------------- |
| `endpoint` | `String` | Pretix API endpoint, example: `events` or `items` |
| `params`   | `Object` | Query strings params                              |

## Example of use can see in test and test with

```js
yarn test
```

or

```js
npm test
```

## Release History

- 2023-09-18 - v1.0.0 - Initial release.
