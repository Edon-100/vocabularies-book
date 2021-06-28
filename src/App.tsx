import React from 'react'
import Review from './pages/review'
import ErrorBoundary from './components/ErrorBoundaries'

export default class App extends React.Component {
  state = {
    data: {}
  }

  componentDidMount() {
    // const db = utools.db.get('to_be_kill') as any
    // const {data} = db
    // this.setState({
    //   data
    // })
  }

  render() {
    return (
      <ErrorBoundary>
        <Review></Review>
      </ErrorBoundary>
    )
  }
}
