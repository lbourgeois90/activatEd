import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogoutButton from '../../LogOutButton/LogOutButton'


class StudentActivator extends Component {

  componentDidMount(){
    this.props.dispatch({type: 'GET_ACTIVATOR'})
  }


  render() {
    return (
      <section>
      <header>
         <h1>Student Activator Page</h1>
         <LogoutButton/>
      </header>
      </section>
    );
  }
}
const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect( mapReduxStateToProps )(StudentActivator);