// ----------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//     Copyright (c) Microsoft Corporation.  All rights reserved.
// </copyright>
// ----------------------------------------------------------------

import * as React from 'react';

import { ReactAnnounce, AnnounceMethod } from './ReactAnnounce';

let AnnounceMessageLocal: AnnounceMethod = (message: string) =>
    console.log(`Global instance of DelayAnnounce not initialized. Failed to announce '${message}'`);

export const AnnounceMessage = (message: string) => {
    AnnounceMessageLocal(message);
}

// tslint:disable-next-line: function-name
export function InstantiateGlobalAnnounce(props?: {debounceDelay?: number}): JSX.Element {
    const setAnnounceMethod = (announceMethod: AnnounceMethod) => {
        AnnounceMessageLocal = announceMethod;
    }

    return <ReactAnnounce {...{ ...props, setAnnounceMethod }} />;
}
