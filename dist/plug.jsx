"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
exports.plug = (stream, lifecycleHooks) => (WrappedComponent) => class PluggedComponent extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasEmmited: false,
        };
    }
    componentDidMount() {
        this._streamSubscription = stream(this.props).subscribe((data) => this.setState({
            hasEmmited: true,
            innerData: data,
        }));
        if (lifecycleHooks.componentDidMount) {
            lifecycleHooks.componentDidMount();
        }
    }
    componentWillUnmount() {
        this._streamSubscription.unsubscribe();
        if (lifecycleHooks.componentWillUnmount) {
            lifecycleHooks.componentWillUnmount();
        }
    }
    render() {
        const { hasEmmited, innerData } = this.state;
        if (hasEmmited) {
            return <WrappedComponent {...innerData}/>;
        }
        return null;
    }
};
