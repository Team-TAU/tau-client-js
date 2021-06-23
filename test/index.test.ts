import * as Tau from '../src/index';

describe('Entire Package', () => {
  it('should contain TauSocket class', done => {
    expect(Tau.TauSocket).toBeDefined();
    done();
  });
});
