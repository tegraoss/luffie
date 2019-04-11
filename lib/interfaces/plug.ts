import { Observable } from "rxjs";

export type TStream = (stream: any) => Observable<any>;

export interface ILifecycle {
  componentDidMount: () => void;
  componentWillUnmount: () => void;
}

export interface IPlugState {
  hasEmmited: boolean;
  innerData?: any;
}