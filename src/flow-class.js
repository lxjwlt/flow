'use strict';

const _ = require('lodash');

class Flow {

    constructor (origin, parent) {
        let self = this;

        self.origin = origin;

        self.parent = parent;

        self.init();
    }

    init () {
        let self = this;

        if (_.isPlainObject(self.origin)) {

            self.type = 'object';

        } else if (_.isFunction(self.origin)) {

            self.type = 'function';

            self.examples = [];
        }
    }

    setExample (context, args, result) {
        let self = this;

        self.examples.push({
            isConstructor: context instanceof self.origin,
            params: args,
            return: result
        });
    }

}

function create (data, parent) {
    return new Flow(data, parent);
}

create.Constructor = Flow;

module.exports = create;
