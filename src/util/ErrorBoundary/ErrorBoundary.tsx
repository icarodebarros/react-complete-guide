import React, { Component, ErrorInfo, ReactNode } from 'react';

interface errProps {
    children: ReactNode;
}

interface errState {
    hasError: boolean;
    errorMessage: string;
}

// Foi usado Class component pois na Function component ainda não existe o Hook 'componentDidCatch'
class ErrorBoundary extends Component<errProps, errState> {
    state = {
        hasError: false,
        errorMessage: ''
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    componentDidCatch = (error: Error, _info: ErrorInfo): void => {
        this.setState({ hasError: true, errorMessage: error.message });
    }
    
    render(): ReactNode {
        if (this.state.hasError) {
            return <h1>{this.state.errorMessage}</h1>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;