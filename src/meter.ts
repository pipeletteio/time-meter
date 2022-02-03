import { hrtime } from 'process';
import { MilisecondFormatter, TimeFormatterInterface } from './formatters';

export interface TimeMeterInterface {
  /**
   * Get the next time delay.
   */
  next: () => unknown;

  /**
   * Get the next time delay as raw is ns.
   */
  nextRaw: () => bigint;

  /**
   * Get the last time delay.
   */
  last: () => unknown;

  /**
   * Get the last time delay as raw is ns.
   */
  lastRaw: () => bigint;
}

export interface TimeMeterOptions<F extends TimeFormatterInterface> {
  /**
   * An optional time formatter that extends `TimeFormatterInterface` and takes ns to return formatted time.
   */
  formatter?: F;
}

/**
 * A class to calculate time between anything.
 */
export class TimeMeter<F extends TimeFormatterInterface = MilisecondFormatter> implements TimeMeterInterface {
  protected _cache: bigint;

  protected _last: bigint;

  protected readonly _formatter: F;

  constructor ({ formatter = new MilisecondFormatter() as F }: TimeMeterOptions<F> = {}) {
    this._cache = hrtime.bigint();
    this._last = BigInt(0);
    this._formatter = formatter;
  }

  public next (): ReturnType<F['format']>;
  public next (): unknown {
    return this._formatter.format(this.nextRaw());
  }

  public nextRaw (): bigint {
    const time = hrtime.bigint();
    this._last = time - this._cache;
    this._cache = time;
    return this._last;
  }

  public last (): ReturnType<F['format']>;
  public last (): unknown {
    return this._formatter.format(this.lastRaw());
  }

  public lastRaw (): bigint {
    return this._last;
  }

  public getFormatter (): F {
    return this._formatter;
  }
}

/**
 * A shared time-meter.
 */
export const meter = new TimeMeter();
