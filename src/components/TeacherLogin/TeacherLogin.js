import React, { Component } from 'react';
import { connect } from 'react-redux';




class TeacherLogin extends Component {
  render() {
    return (
      <section>
      <header>
         <h1 className="headerH1">Prime Digital Academy Feedback Form</h1>
      </header>
      </section>
    );
  }
}
const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect( mapReduxStateToProps )(TeacherLogin);