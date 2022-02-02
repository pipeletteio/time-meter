<h1 align="center">
  <p>@pipeletteio/time-meter</p>
</h1>

<p align="center">🕑 A minimal time-meter to calculate time between anything.</p>

<p align="center">
  <a alt="Build Status" href="https://github.com/pipeletteio/time-meter/actions?query=workflow">
    <img src="https://github.com/pipeletteio/time-meter/workflows/Build/badge.svg"/>
  </a>
  <a alt="Npm version" href="https://www.npmjs.com/package/@pipeletteio/time-meter?activeTab=versions">
    <img src="https://img.shields.io/npm/v/@pipeletteio/time-meter.svg?longCache=true&logo=npm">
  </a>
  <a alt="CodeClimate coverage" href="https://codeclimate.com/github/pipeletteio/time-meter/test_coverage">
    <img src="https://api.codeclimate.com/v1/badges/9a655368da75ed055fb9/test_coverage"/>
  </a>
  <a alt="CodeClimate maintainability" href="https://codeclimate.com/github/pipeletteio/time-meter/maintainability">
    <img src="https://api.codeclimate.com/v1/badges/9a655368da75ed055fb9/maintainability"/>
  </a>
  <a alt="Node requierement version" href="https://github.com/pipeletteio/time-meter/blob/master/package.json">
    <img src="https://img.shields.io/node/v/@pipeletteio/time-meter.svg?longCache=true"/>
  </a>
</p>

## Installation

```bash
npm install @pipeletteio/time-meter
```

## Docs:
Read documentation [here](https://pipeletteio.github.io/time-meter).

## Example:
```javascript
const { TimeMeter } = require('@pipeletteio/time-meter');

const meter = new TimeMeter();

setTimeout(() => console.log(`${meter.next()}ms`), 200);
```

With Typescript:
```typescript
import { TimeMeter, MilisecondFormatter } from '@pipeletteio/time-meter';

const meter = new TimeMeter();

setTimeout(() => console.log(`${meter.next()}ms`), 200);
```

A shared time meter instance can be retreived from the package (default meter uses the milisecond format):
```javascript
import { meter } from '@pipeletteio/time-meter';
```

Using a custom formatter (availables: `LegacyFormatter`, `MilisecondFormatter` and `NanosecondFormatter`):
```typescript
import { TimeMeter, LegacyFormatter } from '@pipeletteio/time-meter';

const meter = new TimeMeter({ formatter: new LegacyFormatter() });

setTimeout(() => {
  const [seconds, nanoseconds] = meter.next();
  console.log(`${seconds}s ${nanoseconds}ns`);
}, 200);
```

Using your own formatter:
```typescript
import { TimeMeter, TimeFormatterInterface } from '@pipeletteio/time-meter';

class SecondFormatter implements TimeFormatterInterface {
  static DIVIDER = BigInt(1e9);

  format (ns: bigint): number {
    return Number(ns / SecondFormatter.DIVIDER);
  }
}

const meter = new TimeMeter({ formatter: new SecondFormatter() });

setTimeout(() => console.log(`${meter.next()}s`), 1500);
```
