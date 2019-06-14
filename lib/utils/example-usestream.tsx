import * as React from 'react';

import { useStream } from '../use-stream';
import { state$ } from './example-store';

interface IProp {
  name: string;
}

const UsePlugTestComponent = (props: IProp) => {
  const state = useStream(state$);
  if(!state) return null;

  return (
    <div>
      <h1 data-testid="name">{props.name}</h1>
      <p data-testid="total">Total: {state.total}</p>
      <p data-testid="changed">The store was{state.changed ? '' : `n't`} changed.</p>
    </div>
  )
}

export {
  UsePlugTestComponent,
}