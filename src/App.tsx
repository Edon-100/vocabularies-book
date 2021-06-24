import React from 'react'

export default class App extends React.Component {
  state = {
    code: '',
    theme: 'light',
    data: {}
  }

  componentDidMount () {
    const db = utools.db.get('to_be_kill') as any
    const {data} = db
    this.setState({
      data
    })
  }

  render () {
    return(
      <div>
        App22233122
        <div>{ Object.keys(this.state.data).length}</div>
      </div>
    )
  }
}
