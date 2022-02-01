export function nsToMs (ns: bigint): number {
  return Math.ceil(Number(ns / BigInt(1e6)));
}

/**
 * Transform ns to the hrtime legacy format ([seconds, nanoseconds]).
 */
export const nsToLegacyFormat = (() => {
  const divider = BigInt(1e9);

  return function nsToLegacyFormat (ns: bigint): [number, number] {
    return [
      Math.round(Number(ns / divider)),
      Number(ns % divider)
    ];
  };
})();
