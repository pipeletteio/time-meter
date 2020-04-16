<h1 align="center">
  <p>@pipeletteio/time-meter</p>
</h1>

<p align="center">🕑 A minimal time-meter to calculate time between anything.</p>

<p align="center">
  <a alt="Build Status" href="https://github.com/pipeletteio/time-meter/actions?query=workflow">
    <img src="https://github.com/pipeletteio/time-meter/workflows/Build/badge.svg" />
  </a>
  <a alt="Npm version" href="https://www.npmjs.com/package/@pipeletteio/time-meter?activeTab=versions">
    <img src="https://img.shields.io/npm/v/@pipeletteio/time-meter.svg?longCache=true&logo=npm">
  </a>
  <a alt="CodeClimate coverage" href="https://codeclimate.com/github/pipeletteio/time-meter/test_coverage">
    <img src="https://api.codeclimate.com/v1/badges/542c12d0f2df88cdcd7d/test_coverage"/>
  </a>
  <a alt="CodeClimate maintainability" href="https://codeclimate.com/github/pipeletteio/time-meter/maintainability">
    <img src="https://api.codeclimate.com/v1/badges/542c12d0f2df88cdcd7d/maintainability"/>
  </a>
  <a alt="Node requierement version" href="https://github.com/pipeletteio/time-meter/blob/master/package.json">
    <img src="https://img.shields.io/node/v/pipeletteio/time-meter.svg?longCache=true" />
  </a>
</p>

## Installation
```bash
npm install @pipeletteio/time-meter
```

## Example:
```javascript
const { TimeMeter } = require('@pipeletteio/time-meter');

const meter = new TimeMeter();

// Should log: [0, xxxx]
console.log(meter.next());

// Should log: [1, xxxx]
setTimeout(() => {
  console.log(meter.next());
}, 1000);
```

A shared time meter instance can be retreived from the package:
```javascript
const { meter } = require('@pipeletteio/time-meter');
```

## API

#### TimeMeter.constructor

Create a new TimeMeter instance.

|   argument   |              type             |                               details                               |
|--------------|-------------------------------|---------------------------------------------------------------------|
|    initial   | `[number, number]` or `null`  | A result of 'process.hrtime' to be used as initial time. (optional) |

Return a new `TimeMeter` instance.

Example:
```javascript
new TimeMeter(process.hrtime());
```

#### TimeMeter.prototype.next

Get the time delay from the last 'next' call or instance construction.

Return an array of 2 number like `[seconds, nanoseconds]: [number, number]`.

Example:
```javascript
const meter = new TimeMeter();
setTimeout(() => console.log(meter.next()), 1000);
```
