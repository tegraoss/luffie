import * as React from 'react';
import { plug } from "../../lib";
import { map, combineLatest } from "rxjs/operators";
import { of, Observable } from "rxjs";
import { IStore, state$ } from './example-store';

interface IProp {
  name: string;
}

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


const PluggedTestComponent = plug<IProp>(stream)(TestComponent);

export {
  PluggedTestComponent,
}