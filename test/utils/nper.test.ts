import { nperRevolving } from '../../src/utils/nper';

describe('Test nperRevolving', () => {
  it('should calculate nper correctly for revolving loans', () => {
    const nper = nperRevolving(26.9, 91, 839);
    expect(nper).toEqual(11.018060383148585);

    const nper2 = nperRevolving(13.5, 71, 4897);
    expect(nper2).toEqual(134.0343182938983);

    const nper3 = nperRevolving(26.99, 40, 239);
    expect(nper3).toEqual(7.019653625490253);

    const nper4 = nperRevolving(23.99, 109, 528);
    expect(nper4).toEqual(6.011722168678857);

    const nper5 = nperRevolving(18.24, 78, 2000);
    expect(nper5).toEqual(33.038405361353576);
  });
});
