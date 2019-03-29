/// <reference types="react" />
import { Subscription } from 'rxjs';
import { TStream, ILifecycle, IPlugState } from './interfaces/plug';
export declare const plug: (stream: TStream, lifecycleHooks: Partial<ILifecycle>) => (WrappedComponent: any) => {
    new (props: any): {
        _streamSubscription: Subscription;
        componentDidMount(): void;
        componentWillUnmount(): void;
        render(): JSX.Element | null;
        context: any;
        setState<K extends "innerData" | "hasEmmited">(state: IPlugState | ((prevState: Readonly<IPlugState>, props: Readonly<any>) => IPlugState | Pick<IPlugState, K> | null) | Pick<IPlugState, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<any> & Readonly<{
            children?: import("react").ReactNode;
        }>;
        state: Readonly<IPlugState>;
        refs: {
            [key: string]: import("react").ReactInstance;
        };
    };
    contextType?: import("react").Context<any> | undefined;
};
