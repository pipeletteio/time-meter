import { nsToMs, nsToLegacyFormat } from './utils';

export interface TimeFormatterInterface {
  /**
   * Transform a time represented by a bigint as nanoseconds to another time representation.
   */
  format: (ns: bigint) => unknown;
}

export class NanosecondFormatter implements TimeFormatterInterface {
  public format (ns: bigint): bigint {
    return ns;
  }
}

export class MilisecondFormatter implements TimeFormatterInterface {
  public format (ns: bigint): number {
    return nsToMs(ns);
  }
}

export class LegacyFormatter implements TimeFormatterInterface {
  public format (ns: bigint): [number, number] {
    return nsToLegacyFormat(ns);
  }
}

export const formatters = {
  NanosecondFormatter,
  MilisecondFormatter,
  LegacyFormatter
};
