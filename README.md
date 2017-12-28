# egg-thrift

## Do not use this package in production, it's still not finished

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-thrift.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-thrift
[travis-image]: https://img.shields.io/travis/eggjs/egg-thrift.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-thrift
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-thrift.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-thrift?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-thrift.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-thrift
[snyk-image]: https://snyk.io/test/npm/egg-thrift/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-thrift
[download-image]: https://img.shields.io/npm/dm/egg-thrift.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-thrift

<!--
Description here.
-->

## Install

```bash
$ npm i egg-thrift --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.thrift = {
  enable: true,
  package: 'egg-thrift',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.thrift = {
  package: null,
  dir: 'thrift',
  compilerOptions: {},
  thriftOptions: {
    timeout: 5000,
  },
  defaultClientConfig: {
    multiplexed: false,
    serviceName: '',
    connectType: 'tcp',
    host: '127.0.0.1',
    port: '80',
    options: {
      transport: TBufferedTransport,
      protocol: TBinaryProtocol,
      path: '',
      ssl: false,
      https: false,
      max_attempts: 3,
      retry_max_delay: 300,
      connect_timeout: 5000,
      timeout: 5000,
      nodeOptions: {},
      headers: {},
    },
  },
  defaultServiceConfig: {
    multiplexed: false,
    serviceName: '',
    connectType: 'tcp',
    host: '127.0.0.1',
    port: '80',
    options: {
      transport: TBufferedTransport,
      protocol: TBinaryProtocol,
      path: '',
      headers: {},
      tls: {},
    },
  },
  clients: [
    // {
    //   client: '',
    //   alias: '',
    //   multiplexed: false,
    //   serviceName: '',
    //   transport: TBufferedTransport,
    //   protocol: TBinaryProtocol,
    //   connectType: 'tcp',
    //   host: '127.0.0.1',
    //   path: '', only works when connection type is http
    //   port: '80',
    //   headers: {
    //   },
    // },
  ],
  services: [
    // {
    //   service: '',
    //   processor: '',
    //   multiplexed: false,
    //   serviceName: '',
    //   transport: TBufferedTransport,
    //   protocol: TBinaryProtocol,
    //   connectType: 'tcp',
    //   host: '127.0.0.1',
    //   path: '',  only works when connection type is http
    //   port: '80',
    //   headers: {
    //   },
    // },
  ],
};

```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

<!-- example here -->

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)

## TODO

- [x] compiler
- [x] thriftType
- [x] http server
- [x] http client
- [x] tcp client
- [ ] test

