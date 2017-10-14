import React from 'react';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = { page: [] };
  }

  componentDidMount() {
    fetch(`http://localhost:5000/api/v1/basic`)
      .then(result => {
        return result.json();
      })
      .then(response => {
        this.setState({page: response});
      });
  }

  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <h1>{ this.state.page.header }</h1>
        <p>{ this.state.page.body }</p>
      </div>
    );
  }
}
