import { Observable } from 'rxjs';

export interface IStore<T> {
  state$: Observable<T>;
  updateState(request: Function | Partial<T>): void;
  stateInjector<T>(func: Function): () => T;
  getCurrentState(): T;
}