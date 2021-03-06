import { createStore } from "../../lib";

export interface IStore {
  total: number;
  changed: boolean;
}

const initialState: IStore = {
  total: 0,
  changed: false
}

const { updateState, getCurrentState, state$ } = createStore(initialState);

const setTotal10ChangedTrue = () => updateState({
  total: 10, changed: true
});

const setTotal20 = () => updateState({
  total: 20
});

const setTotalDouble = () => updateState((state: any) => ({
  total: state.total * 2
}));

const cleanStore = () => {
  updateState(initialState);
}

export {
  state$,
  getCurrentState,
  setTotal10ChangedTrue,
  setTotal20,
  setTotalDouble,
  cleanStore
}