import React from 'react';
import { Alert } from 'antd';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary capturó un error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback || (
                <Alert
                    message="Error"
                    description={this.state.error?.message || "Ocurrió un error al cargar los datos."}
                    type="error"
                    showIcon
                    style={{ margin: '20px 0' }}
                />
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;