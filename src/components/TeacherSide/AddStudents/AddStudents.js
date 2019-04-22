import React, { Component } from 'react';
import { connect } from 'react-redux';




class AddStudents extends Component {
  render() {
    return (
      <section>
      <header>
         <h1>Add Students Page</h1>
      </header>
      </section>
    );
  }
}
const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect( mapReduxStateToProps )(AddStudents);