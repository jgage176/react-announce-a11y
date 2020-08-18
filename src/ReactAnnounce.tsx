// ----------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//     Copyright (c) Microsoft Corporation.  All rights reserved.
// </copyright>
// ----------------------------------------------------------------

import { debounce } from 'lodash';
import * as React from 'react';

const screenReaderOnlyStyle: any = {
    border: '0',
    clip: 'rect(0 0 0 0)',
    height: '1px',
    margin: '-1px',
    overflow: 'hidden',
    padding: '0',
    position: 'absolute',
    width: '1px',
};

const delayToEnsureAriaMessageBeingAnnounced = 500;

export type AnnounceMethod = (message: string) => void;

export interface AnnounceProps {
    announceMessage?: string;
    /** 
     * Only used for the prop.announceMessage way of passing the message.
     * This is especially useful for giving messages from searches/filters.
     */
    debounceDelay?: number;
    politeness?: 'polite' | 'assertive';
    /** 
     * This gives back a direct function for supplying an announcement for the screen reader.
     * This does not have any delay built into it.
     * If a new message comes in, the first may be cut off.
     */
    setAnnounceMethod?: (announceMethod: AnnounceMethod) => void;
};

/**
 * Give an announcement to the screen reader to read.
 * Can be done via a prop or via a direct method using the setAnnounceMethod prop.
 */
export class ReactAnnounce extends React.Component<AnnounceProps, { message: string }> {
    state = {
        message: '',
    }

    componentDidMount() {
        this.props.setAnnounceMethod && this.props.setAnnounceMethod(this.announceMethod);
    }

    componentDidUpdate(prevProps: AnnounceProps) {
        if (this.props.announceMessage !== prevProps.announceMessage) {
            this.debouncePropMessage();
        }
    }

    debounceDelay = () => typeof (this.props.debounceDelay) === 'number' ? this.props.debounceDelay : 500;
    
    debouncePropMessage = debounce(() => {
        this.updateMessage(this.props.announceMessage)
    }, this.debounceDelay());

    updateMessage = (message?: string) => {
        this.setState({ message: message || '' }, () =>
            setTimeout(() => this.setState({ message: '' }), delayToEnsureAriaMessageBeingAnnounced));
    }

    announceMethod: AnnounceMethod = (message: string) => {
        this.updateMessage(message);
    }

    render() {
        return <div style={screenReaderOnlyStyle} role="status" aria-live={this.props.politeness || "assertive"}>
            {this.state.message}
        </div>;
    }
}