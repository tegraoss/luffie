import { take, skip } from 'rxjs/operators';
import { state$, setTotal10ChangedTrue, setTotal20, getCurrentState, setTotalDouble } from '../lib/utils/example-store';

describe('Store', () => {
  beforeAll(() => {
    process.env = Object.assign(process.env, { isTesting: 'true' });
  });

  it('Creates a Store', async done => {
    state$.pipe(
      take(1)
    ).subscribe(data => {
      expect(data).toEqual({
        total: 0,
        changed: false
      });
      done();
    })
  });

  it('Update State', async done => {
    state$.pipe(
      skip(1),
      take(1)
    ).subscribe(data => {
      expect(data).toEqual({
        total: 10,
        changed: true
      });
      done();
    });

    setTotal10ChangedTrue();
  });

  it('Update State Partially', async done => {
    state$.pipe(
      skip(1),
      take(1)
    ).subscribe(data => {
      expect(data).toEqual({
        total: 20,
        changed: true
      });
      done();
    })

    setTotal20();
  });

  it('Retrieve current State', () => {
    const currentState = getCurrentState();

    expect(currentState).toEqual({
      total: 20,
      changed: true
    });
  });

  it('Update State using Callback', async done => {
    state$.pipe(
      skip(1),
      take(1)
    ).subscribe(data => {
      expect(data).toEqual({
        total: 40,
        changed: true
      });
      done();
    })

    setTotalDouble();
  });
})