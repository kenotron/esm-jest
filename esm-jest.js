#!/usr/bin/env node
/**
 * Copyright (c) 2014-present, Ken Chau. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
"use strict";

const fs = require('fs');
const jestRuntime = require('jest-runtime');
const path = require('path');
const loader = require('esm')(module, {mode: 'auto', cjs: true});

// NOTE: use the esm modified require here to make sure Module is actually the esm one and not the "real" one
const moduleNameMapper = loader('./moduleNameMapper');

// TODO: read this out of a jest configuration
// This is just an example of a jest alias that we have for jest configs
moduleNameMapper({
  '^anotherRoot/(.*)$': __dirname + '/lib/anotherRoot/$1',
});

const api = [
  "afterAll",
  "afterEach",
  "beforeAll",
  "beforeEach",
  "describe",
  "expect",
  "it",
  "test"
];

const oldRequireModule = jestRuntime.prototype.requireModule;

jestRuntime.prototype.requireModule = function (from, moduleName, options) {
  const modulePath = this._resolveModule(from, moduleName);
  const ext = path.extname(modulePath);

  if (this._resolver.isCoreModule(moduleName) ||
      (options && options.isInternalModule) ||
      (ext === ".json" || ext === ".node")) {
    return Reflect.apply(oldRequireModule, this, [from, moduleName, options]);
  }

  const moduleRegistry = this._moduleRegistry;

  if (moduleRegistry[modulePath]) {
    return moduleRegistry[modulePath].exports;
  }

  const localModule = {
    children: [],
    exports: {},
    filename: modulePath,
    id: modulePath,
    loaded: false
  };

  const envGlobal = this._environment.global;

  api.forEach((name) => {
    global[name] = envGlobal[name];
  });

  moduleRegistry[modulePath] = localModule;

  localModule.exports = loader(from);
  localModule.loaded = true;
  return localModule;
};

require('jest/bin/jest');
