'use strict';

const Flow = require('./flow-class');
const Record = require('./flow-class');
const _ = require('lodash');

function flow (data) {

    if (_.isPlainObject(data)) {
        return initPlainObject(data);

    } else if (_.isFunction(data)) {
        return initFunction(data);
    }

}

function initObject (obj, exclude) {
    obj.__record__ = Record(obj);

    exclude = exclude || [];
    exclude.push('prototype');

    for (let key of Object.getOwnPropertyNames(obj)) {

        if (key.match(/^_/) || exclude.indexOf(key) >= 0) {
            continue;
        }

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

function initPlainObject (obj) {
    obj.__flowData__ = _.cloneDeep(obj);

    initObject(obj);
}

function initFunction (func) {

    if (func.__IS_FLOW_FUNCTION__) {
        return func;
    }

    initObject(func, ['name', 'length']);



    let wrapFunc = function () {

        const result = func.apply(this, arguments);

        func.__record__.setExample(this, arguments, result);

        return flow(result);
    };

    wrapFunc.__IS_FLOW_FUNCTION__ = true;
    wrapFunc.__flowData__ = func;

    return wrapFunc;
}

module.exports = flow;
