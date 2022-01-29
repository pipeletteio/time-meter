import { TimeMeter } from '@/src/index';

test('should TimeMeter work fine', (done) => {
  const timeMeter = new TimeMeter(process.hrtime());

  // Wait for 1 second.
  setTimeout(() => {
    let seconds, nanoseconds;

    [seconds] = timeMeter.next();
    expect(seconds).toBe(1);

    [seconds, nanoseconds] = timeMeter.next();
    expect(seconds).toBe(0);
    expect(nanoseconds).toBeGreaterThan(0);

    // Wait for 0.5 second.
    setTimeout(() => {
      [seconds] = timeMeter.next();
      expect(seconds).toBe(0);

      [seconds, nanoseconds] = timeMeter.next();
      expect(seconds).toBe(0);
      expect(nanoseconds).toBeGreaterThan(500);

      done();
    }, 500);
  }, 1000);
});
