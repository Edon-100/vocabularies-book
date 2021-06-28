import React from 'react'
export default class ErrorBoundary extends React.Component {
  constructor(props:any) {
    super(props)
    this.state = { error: null, errorInfo: null };
  }

  // static getDerivedStateFromError(error:any) {
  //   // Update state so the next render will show the fallback UI.
  //   this.state = { error: null, errorInfo: null };
  // }

  componentDidCatch(error:any, errorInfo:any) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    // You can also log error messages to an error reporting service here
  }

  render() {
    if ((this.state as any).errorInfo) {
      // Error path
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {(this.state as any).error && (this.state as any).error.toString()}
            <br />
            {(this.state as any).errorInfo.componentStack}
          </details>
        </div>
      );
    }
    return this.props.children
  }
}
