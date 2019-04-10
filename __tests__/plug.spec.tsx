import * as React from 'react';
import { render, cleanup, waitForElement } from 'react-testing-library';
import 'jest-dom/extend-expect'
import { PluggedTestComponent } from '../lib/utils/example-plug';
import { setTotal10ChangedTrue } from '../lib/utils/example-store';

describe('Plug', () => {
  afterEach(cleanup);

  it('Renders', async done => {
    const { getByTestId } = render(<PluggedTestComponent name="Test Testersson" />);

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

    const { getByTestId } = render(<PluggedTestComponent name="Test Testersson" />);

    const nameNode = await waitForElement(() => getByTestId('name'))
    const totalNode = await waitForElement(() => getByTestId('total'))
    const changedNode = await waitForElement(() => getByTestId('changed'))

    expect(nameNode).toHaveTextContent('Test Testersson');
    expect(totalNode).toHaveTextContent('Total: 10');
    expect(changedNode).toHaveTextContent(`The store was changed`);
    done();
  })
})


