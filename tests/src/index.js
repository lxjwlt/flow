'use strict';

const assert = require('chai').assert;
const flow = require('../../src/index');

describe('src/index.js', () => {

    it('xxx', () => {

        function test () {
            return 1;
        }

        let flowFunc = flow(test);

        flowFunc(1);

        flowFunc(2, 'string value');

        assert.deepEqual(flowFunc.__record__, {
            examples: [
                {
                    params: [
                        1
                    ],
                    return: 1
                },
                {
                    params: [
                        2, 'string value'
                    ],
                    return: 1
                }
            ]
        });
    });

});
