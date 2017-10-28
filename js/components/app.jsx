import React from 'react';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = { page: [], gif: "loading" };
  }

  componentDidMount() {
    fetch(`/api/v1/basic`)
      .then(result => {
        return result.json();
      })
      .then(response => {
        this.setState({page: response, gif: "lines-of-code"});
      });
  }

  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <h1>{ this.state.page.header }</h1>
        <p>{ this.state.page.body }</p>
        <div className={"gif " + this.state.gif}></div>
      </div>
    );
  }
}
