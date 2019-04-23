import * as React from 'react';
import { Component } from 'react';
import { Subscription } from 'rxjs';
import { TStream, ILifecycle, IPlugState } from './interfaces/plug';

export const plug = <T extends {}>(stream: TStream, lifecycleHooks: Partial<ILifecycle> = {},
) => (WrappedComponent: any) => {
  const factory = React.createFactory(WrappedComponent);

  return class PluggedComponent extends Component<T, IPlugState> {
    
    _streamSubscription!: Subscription;

    constructor(props: any) {
      super(props);

      this.state = {
        hasEmmited: false,
      };
    }

    public componentDidMount() {
      this._streamSubscription = stream(this.props).subscribe((data: any) =>
        this.setState({
          hasEmmited: true,
          innerData: data,
        }),
      );

      if (lifecycleHooks.componentDidMount) {
        lifecycleHooks.componentDidMount();
      }
    }

    public componentWillUnmount() {
      this._streamSubscription.unsubscribe();

      if (lifecycleHooks.componentWillUnmount) {
        lifecycleHooks.componentWillUnmount();
      }
    }

    public render() {
      const { hasEmmited, innerData } = this.state;

      if (hasEmmited) {
        return factory({...this.props, ...innerData});
      }

      return null;
    }
  }
}