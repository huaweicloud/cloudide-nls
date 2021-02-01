/********************************************************************************
 * Copyright (C) 2021. Huawei Technologies Co., Ltd. All rights reserved.
 * SPDX-License-Identifier: MIT
 ********************************************************************************/

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
