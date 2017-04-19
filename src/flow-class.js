'use strict';

const _ = require('lodash');

class Flow {

    constructor (data, parent) {
        let self = this;

        self.data = data;

        self.parent = parent;

        self.init();
    }

    init () {
        let self = this;

        if (_.isPlainObject(self.data)) {



        } else if (_.isFunction(self.data)) {


        }
    }

    initObject (obj) {

    }

    initFunction (func) {

    }

}

function create (data, parent) {
    return new Flow(data, parent);
}

create.Constructor = Flow;

module.exports = create;
