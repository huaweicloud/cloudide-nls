import * as fs from 'fs';
import path = require('path');

interface CloudIDENlsConfig {
    locale: string;
    availableLanguages: {
        [pack: string]: string;
    };
    l10n?: any;
}

let nlsConfig: CloudIDENlsConfig = { locale: 'en', availableLanguages: { '*': 'en' } };

export function initNlsConfig(basePath = ''): void {
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

// copied and modified from https://github.com/microsoft/vscode-nls/blob/master/src/common/common.ts#L100
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function format(message: string, args: any[]): string {
    let result = message;
    if (args.length === 0) {
        result = message;
    } else {
        result = message.replace(/\{(\d+)\}/g, (match, rest) => {
            const index = rest[0];
            const arg = args[index];
            let replacement = match;
            if (typeof arg === 'string') {
                replacement = arg;
            } else if (typeof arg === 'number' || typeof arg === 'boolean' || arg === void 0 || arg === null) {
                replacement = String(arg);
            }
            return replacement;
        });
    }
    return result;
}
