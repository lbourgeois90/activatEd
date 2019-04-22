import React, { Component } from 'react';
import { connect } from 'react-redux';




class CreateActivator extends Component {
  render() {
    return (
      <section>
      <header>
         <h1>Create Activator</h1>
      </header>
      </section>
    );
  }
}
const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect( mapReduxStateToProps )(CreateActivator);