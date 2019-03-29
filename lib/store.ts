import { clone } from './aux/clone';
import { IStore } from './interfaces/store';
import { BehaviorSubject } from 'rxjs';

function createStore<IState>(initialState: IState): IStore<IState> {
  const behavior$ = new BehaviorSubject<IState>(clone(initialState));
  const updateState = (request: any) => {
    const isFunction = request instanceof Function;
    const currentState = clone(behavior$.getValue());
    const newKeys = isFunction ? request(currentState) : request;

    behavior$.next({
      ...(currentState as any),
      ...newKeys
    });
  };

  function stateInjector<T>(func: Function): () => T {
    return (): T => func(behavior$.getValue());
  }

  const getCurrentState = (): any => behavior$.getValue();

  const state$ = behavior$.asObservable();

  return {
    state$,
    stateInjector,
    updateState,
    getCurrentState,
  };
}

export { createStore };