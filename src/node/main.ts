/********************************************************************************
 * Copyright (C) 2021. Huawei Technologies Co., Ltd. All rights reserved.
 * SPDX-License-Identifier: MIT
 ********************************************************************************/

import * as fs from 'fs';
import { format } from '../common/common';
import path = require('path');

// resolve the plugin root when installed as node module
const PLUGIN_ROOT = path.resolve(__dirname, '../../../../../');

export interface CloudIDENlsConfig {
    locale: string;
    availableLanguages: {
        [pack: string]: string;
    };
    l10n?: any;
}

export let nlsConfig: CloudIDENlsConfig = { locale: 'en', availableLanguages: { '*': 'en' } };

export function initNlsConfig(basePath?: string): void {
    if (!basePath) {
        basePath = PLUGIN_ROOT;
    }

    try {
        if (process.env.VSCODE_NLS_CONFIG) {
            nlsConfig = JSON.parse(process.env.VSCODE_NLS_CONFIG) as CloudIDENlsConfig;
        }
    } catch (e) {
        console.error(e);
    }
    // load i18n resources
    const localizedNlsFile = path.join(basePath, `package.nls.${nlsConfig.locale}.json`);
    const defaultNlsFile = path.join(basePath, `package.nls.json`);

    if (fs.existsSync(localizedNlsFile)) {
        try {
            nlsConfig.l10n = JSON.parse(fs.readFileSync(localizedNlsFile, 'utf8'));
        } catch (e) {
            console.error(e);
        }
    }
    if (!nlsConfig.l10n && fs.existsSync(defaultNlsFile)) {
        try {
            nlsConfig.l10n = JSON.parse(fs.readFileSync(defaultNlsFile, 'utf8'));
        } catch (e) {
            console.error(e);
        }
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function localize(key: string, ...args: any[]): string {
    const message = nlsConfig.l10n ? (nlsConfig.l10n[key] ? nlsConfig.l10n[key] : key) : key;
    return format(message, args);
}
