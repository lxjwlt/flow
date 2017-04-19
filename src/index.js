'use strict';

const Flow = require('./flow-class');
const Record = require('./flow-class');
const _ = require('lodash');

function flow (data) {

    if (_.isPlainObject(data)) {
        initObject(data);

    } else if (_.isFunction(data)) {

        if (this instanceof data) {
            initConstructor(data);
        } else {
            initFunction(data);
        }
    }

    return Flow(data);
}

function initObject (obj) {
    obj.__flowData__ = _.cloneDeep(obj);
    obj.__record__ = Record(obj);

    for (let key of Object.getOwnPropertyNames(obj)) {

        Object.defineProperty(obj, key, {

            get () {
                obj.__record__.get(key, obj.__flowData__[key]);
                return obj.__flowData__[key];
            },

            set (value) {
                obj.__record__.set(key, obj.__flowData__[key]);
                obj.__flowData__[key] = value;
            }

        });

    }

}

function initFunction (func) {

    initObject(func);

    return function () {

        func.__record__.arguments(...arguments);

        const result = func.apply(this, arguments);

        func.__record__.return(result);

        return flow(result);
    };


}

function initConstructor (func) {

}

module.exports = flow;
