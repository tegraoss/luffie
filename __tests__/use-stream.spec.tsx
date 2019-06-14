import * as React from 'react';
import { render, cleanup, waitForElement } from 'react-testing-library';
import 'jest-dom/extend-expect'
import { setTotal10ChangedTrue, cleanStore } from '../lib/utils/example-store';
import { UsePlugTestComponent } from '../lib/utils/example-usestream';

describe('Plug', () => {
  afterEach(cleanup);
  afterAll(() => cleanStore())

  it('Renders', async done => {
    const { getByTestId } = render(<UsePlugTestComponent name="Test Testersson" />);

    const nameNode = await waitForElement(() => getByTestId('name'))
    const totalNode = await waitForElement(() => getByTestId('total'))
    const changedNode = await waitForElement(() => getByTestId('changed'))

    expect(nameNode).toHaveTextContent('Test Testersson');
    expect(totalNode).toHaveTextContent('Total: 0');
    expect(changedNode).toHaveTextContent(`The store wasn't changed`);
    done();
  })

  it('Renders with new State', async done => {
    setTotal10ChangedTrue();

    const { getByTestId } = render(<UsePlugTestComponent name="Test Testersson" />);

    const nameNode = await waitForElement(() => getByTestId('name'))
    const totalNode = await waitForElement(() => getByTestId('total'))
    const changedNode = await waitForElement(() => getByTestId('changed'))

    expect(nameNode).toHaveTextContent('Test Testersson');
    expect(totalNode).toHaveTextContent('Total: 10');
    expect(changedNode).toHaveTextContent(`The store was changed`);
    done();
  })
})


