import React, { Component } from 'react';
import { connect } from 'react-redux';




class Submission extends Component {
  render() {
    return (
      <section>
      <header>
         <h1>Submission Page</h1>
      </header>
      </section>
    );
  }
}
const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect( mapReduxStateToProps )(Submission);