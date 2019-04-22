import React, { Component } from 'react';
import { connect } from 'react-redux';




class StudentActivator extends Component {
  render() {
    return (
      <section>
      <header>
         <h1>Student Activator Page</h1>
      </header>
      </section>
    );
  }
}
const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect( mapReduxStateToProps )(StudentActivator);