[![Build Status](https://travis-ci.org/tegraoss/luffie.svg?branch=master)](https://travis-ci.org/tegraoss/luffie) [![Coverage Status](https://coveralls.io/repos/github/tegraoss/luffie/badge.svg?branch=master)](https://coveralls.io/github/tegraoss/luffie?branch=master)

<p align="center">
<img width="180" src="assets/luffiejs-logo-b.png">
</p>


**A state management library for React.**

If you need a simple way to manage your application's state without needing to rewrite a lot of code, maybe you like Luffie.

You can keep your state centralized at our **Store** and create functions that alter the Store State. Everytime the state gets updated, all components plugged into it are rendered automatically.

In Luffie, you need two steps to do that:

## How to install

```bash
npm install --save luffie
```

or

```bash
yarn add luffie
```

## How to use

```javascript
import { createStore, plug } from "luffie"
```

<hr />

<p align="center">
  <img src="assets/luffiejs-store.png">
</p>

The store is a place where you keep the data that you need to access across you application.
Usually you will have a Store for each Page or Shared Resource that you need to keep in your application's memory.

**1. Initialize your Store**

```javascript

const initialState = {
  ...yourInitialData
}

const { updateState, getCurrentState, state$ } = createStore(initialState);
```

**2. Export your State Stream**

```javascript
const yourState$ = state$;

export { yourState$ }
```

**3. Create actions that change your store**

```javascript
const changeTotal = (quantity: number) => {
  updateState({ total: 10 })
}
```

When you call `updateState`, your new data will be merged with the current data stored and a new `state` will be forwarded for all Components/Subscribers of you Store.

<hr />

<p align="center">
  <img src="assets/luffiejs-usestream.png">
</p>

The other side of the coin is the UsePlug Hook. This way you can Plug your component into your newly created Store and at each change, the store data update your component's state.

```javascript
const TestComponent = (props) => {
  const { name } = props;
  const state = usePlug(state$)
  return (
    <div>
      <h1 data-testid="name">{name}</h1>
      <p data-testid="total">Total: {total}</p>
      <p data-testid="changed">The store was{changed ? '' : `n't`} changed.</p>
    </div>
  )
}
```

<hr />

<p align="center">
  <img src="assets/luffiejs-plug.png">
</p>

**Use Luffie like this if your React doesn't support Hooks**
If you use a older version of React without Hooks, you can use the Plug HOC to connect your component with you store state following the steps described below:

**1. Create your Container**

```javascript
const TestComponent = (props) => {
  const { total, changed, name } = props;
  return (
    <div>
      <h1 data-testid="name">{name}</h1>
      <p data-testid="total">Total: {total}</p>
      <p data-testid="changed">The store was{changed ? '' : `n't`} changed.</p>
    </div>
  )
}
```

**2. Create your StreamToProp constant.**

This stream receives your parent's component Prop, and this way you can merge it with your Store's State.

```javascript
const streamToProp = (props) => {
  return of(props).pipe(
    combineLatest(state$),
    map(([props, state]) => {
      const data = {
        name: props.name,
        ...state
      }
      return data;
    })
  );
}
```

**3. Plug!**

```javascript
const PluggedTestComponent = plug(streamToProp)(TestComponent);
```

<hr />

# Future Plans

- Make RxJs optional
- Use React Hooks instead of a PureComponent inside Plug's HOC
