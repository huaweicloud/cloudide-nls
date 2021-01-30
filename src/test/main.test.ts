/********************************************************************************
 * Copyright (C) 2020. Huawei Technologies Co., Ltd. All rights reserved.
 * SPDX-License-Identifier: MIT
 ********************************************************************************/

import { Done } from 'mocha';
import { initNlsConfig, localize } from '../node/main';
import * as assert from 'assert';

describe('test i18n', () => {
    it('load specific language', (done: Done) => {
        process.env.VSCODE_NLS_CONFIG = '{ "locale": "zh-cn", "availableLanguages": { "*": "en" } }';
        initNlsConfig('src/test');
        assert.equal(localize('test.a'), '这是一个测试用的消息文本');
        assert.equal(localize('test.b', 'ok'), '消息: ok');
        done();
    });
    it('load default language', (done: Done) => {
        process.env.VSCODE_NLS_CONFIG = '{ "locale": "en", "availableLanguages": { "*": "en" } }';
        initNlsConfig('src/test');
        assert.equal(localize('test.a'), 'This is a test message');
        assert.equal(localize('test.b', 'ok'), 'Message: ok');
        done();
    });
    it('no message bundle file found', (done: Done) => {
        process.env.VSCODE_NLS_CONFIG = '{ "locale": "en", "availableLanguages": { "*": "en" } }';
        initNlsConfig();
        assert.equal(localize('test.a'), 'test.a');
        assert.equal(localize('test.b {0}', 'ok'), 'test.b ok');
        done();
    });
    it('no message key found', (done: Done) => {
        process.env.VSCODE_NLS_CONFIG = '{ "locale": "en", "availableLanguages": { "*": "en" } }';
        initNlsConfig('src/test');
        assert.equal(localize('test.x'), 'test.x');
        assert.equal(localize('test.y {0}', 'ok'), 'test.y ok');
        done();
    });
});
