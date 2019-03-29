"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const clone_1 = require("./aux/clone");
const rxjs_1 = require("rxjs");
function createStore(initialState) {
    const state$ = new rxjs_1.BehaviorSubject(clone_1.clone(initialState));
    const updateState = (request) => {
        const isFunction = request instanceof Function;
        const currentState = clone_1.clone(state$.getValue());
        const newKeys = isFunction ? request(currentState) : request;
        state$.next(Object.assign({}, currentState, newKeys));
    };
    function stateInjector(func) {
        return () => func(state$.getValue());
    }
    const getCurrentState = () => state$.getValue();
    return {
        state$,
        stateInjector,
        updateState,
        getCurrentState,
    };
}
exports.createStore = createStore;
