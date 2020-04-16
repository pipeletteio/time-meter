/** A class to calculate time between anything. */
export class TimeMeter {
  /** The 'last' property is the stored return of last 'next' call. */
  public last: [number, number] | null;

  /** The '_cache' property is a protected cache that only used to process the time calculate. */
  protected _cache: [number, number];

  /** @param {[number, number] | null} initial - A result of 'process.hrtime' to be used as initial time. */
  constructor (initial?: [number, number] | null) {
    this.last = null;
    this._cache = initial || process.hrtime();
  }

  /** Get the time delay from the last 'next' call or instance construction. */
  next ():  [number, number] {
    this.last = process.hrtime(this._cache);
    this._cache = process.hrtime();
    return this.last;
  }
}

/** A shared time-meter. */
export const meter = new TimeMeter();
