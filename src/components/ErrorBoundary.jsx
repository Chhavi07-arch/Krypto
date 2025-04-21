import { Component } from 'react';

class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1 className="text-white text-center mt-10">Something went wrong. Please try again later. Error: {this.state.error.message}</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;