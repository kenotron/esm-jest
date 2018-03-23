#!/usr/bin/env node
/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const jestRuntime = require('jest-runtime');
const fs = require('fs');
const oldRequireModule = jestRuntime.prototype.requireModule;

function isEsm(module) {
    if (module.indexOf('.mjs') > -1) {
        return true;
    }

    const contents = fs.readFileSync(module).toString();

    if (contents.match(/\n\s*(import|export)\b/) || contents.match(/^\s*(import|export)\b/)) {
        return true;
    }

    return false;
}

jestRuntime.prototype.requireModule = function(from, moduleName, options) {
    if (options && options.isInternalModule) {
        return oldRequireModule.apply(this, [from, moduleName, options]);
    }

    if (isEsm(from)) {
        const environment = this._environment;
        Object.assign(global, {
            describe: environment.global.describe,
            it: environment.global.it,
            test: environment.global.test,
            expect: environment.global.expect,
            beforeAll: environment.global.beforeAll,
            beforeEach: environment.global.beforeEach,
            afterAll: environment.global.afterAll,
            afterEach: environment.global.afterEach,
        });
        module.exports = require('esm')(module)(from, { mode: 'auto', cjs: true });
        return module;
    }
};

cli = require('jest/bin/jest');
