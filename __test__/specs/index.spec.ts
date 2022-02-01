import { TimeMeter, MilisecondFormatter, NanosecondFormatter, LegacyFormatter } from '@/src/index';

const wait = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

test('should TimeMeter work fine without optionnal argument (MilisecondFormatter)', async () => {
  const meter = new TimeMeter();
  expect(meter.getFormatter()).toBeInstanceOf(MilisecondFormatter);

  expect(meter.next()).toBeLessThan(5);
  expect(meter.next()).toBeLessThan(5);

  await wait(100);
  expect(meter.next()).toBeGreaterThanOrEqual(100);
  expect(meter.next()).toBeLessThan(5);
});

test('should TimeMeter work fine with NanosecondFormatter', async () => {
  const meter = new TimeMeter({ formatter: new NanosecondFormatter() });
  expect(meter.getFormatter()).toBeInstanceOf(NanosecondFormatter);

  expect(meter.next()).toBeLessThan(BigInt(5e6));
  expect(meter.next()).toBeLessThan(BigInt(5e6));

  await wait(100);
  expect(meter.next()).toBeGreaterThanOrEqual(BigInt(100e6));
  expect(meter.next()).toBeLessThan(BigInt(5e6));
});

test('should TimeMeter work fine with LegacyFormatter', async () => {
  const meter = new TimeMeter({ formatter: new LegacyFormatter() });
  expect(meter.getFormatter()).toBeInstanceOf(LegacyFormatter);

  let [s, n] = meter.next();
  expect(s).toBe(0);
  expect(n).toBeLessThan(5e6);

  await wait(1000);
  [s, n] = meter.next();
  expect(s).toBe(1);
  expect(n).toBeLessThan(5e6);

  [s, n] = meter.next();
  expect(s).toBe(0);
  expect(n).toBeLessThan(5e6);
});

test('should last methods works fine', () => {
  const meter = new TimeMeter({ formatter: new NanosecondFormatter() });
  expect(meter.next()).toBe(meter.last());
  expect(meter.nextRaw()).toBe(meter.lastRaw());
});
