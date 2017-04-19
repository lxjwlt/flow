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

        assert.deepEqual(flow.info(flowFunc), {
            root: true,
            type: 'function',
            flow: [
                {
                    arguments: [
                        {
                            type: 'number',
                            value: 1
                        }
                    ],
                    return: 1
                },
                {
                    arguments: [
                        {
                            type: 'number',
                            value: 2
                        },
                        {
                            type: 'string',
                            value: 'string value'
                        }
                    ],
                    return: 1
                }
            ]

        });
    });

});
