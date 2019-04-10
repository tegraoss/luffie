import * as React from 'react';
import { plug, createStore } from "../../lib";
import { map, combineLatest } from "rxjs/operators";
import { of, Observable } from "rxjs";

interface IProp {
  name: string;
}

interface IStore {
  total: number;
  changed: boolean;
}

const initialState: IStore = {
  total: 0,
  changed: false
}

const { updateState, getCurrentState, state$ } = createStore(initialState);

const TestComponent = (props: IStore & IProp) => {
  const { total, changed, name } = props;
  return (
    <div>
      <h1 data-testid="name">{name}</h1>
      <p data-testid="total">Total: {total}</p>
      <p data-testid="changed">The store was{changed ? '' : `n't`} changed.</p>
    </div>
  )
}

const stream = (props: IProp): Observable<IStore & IProp> => {
  return of(props).pipe(
    combineLatest(state$),
    map(([props, state]) => {
      const data: IStore & IProp = {
        name: props.name,
        ...state
      }
      return data;
    })
  );
}

const setTotal10ChangedTrue = () => updateState({
  total: 10, changed: true
});

const setTotal20 = () => updateState({
  total: 20
});

const setTotalDouble = () => updateState((state: any) => ({
  total: state.total * 2
}));

const PluggedTestComponent = plug<IProp>(stream)(TestComponent);

export {
  state$,
  getCurrentState,
  PluggedTestComponent,
  setTotal10ChangedTrue,
  setTotal20,
  setTotalDouble
}