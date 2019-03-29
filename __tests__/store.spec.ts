import { createStore } from "../lib";
import { take, skip } from 'rxjs/operators';

describe('Store', () => {
  beforeAll(() => {
    process.env = Object.assign(process.env, { isTesting: 'true' });
  });

  interface IStore {
    total: number;
    changed: boolean;
  }

  const initialState: IStore = {
    total: 0,
    changed: false
  }
  
  const { updateState, getCurrentState, state$ } = createStore(initialState);

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

    updateState({
      total: 10, changed: true
    });
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

    updateState({
      total: 20
    });
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

    updateState((state: any) => ({
      total: state.total * 2
    }));
  });
})