import { IStore } from './interfaces/store';
declare function createStore<IState>(initialState: IState): IStore<IState>;
export { createStore };
