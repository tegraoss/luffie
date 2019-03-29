import { BehaviorSubject } from 'rxjs';
export interface IStore<T> {
    state$: BehaviorSubject<T>;
    updateState(request: Function | Partial<T>): void;
    stateInjector<T>(func: Function): () => T;
    getCurrentState(): T;
}
