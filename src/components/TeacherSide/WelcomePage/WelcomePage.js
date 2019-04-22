import React, { Component } from 'react';
import { connect } from 'react-redux';




class WelcomePage extends Component {
  render() {
    return (
      <section>
      <header>
         <h1>Welcome Page</h1>
      </header>
      </section>
    );
  }
}
const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect( mapReduxStateToProps )(WelcomePage);