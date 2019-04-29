import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogoutButton from '../../LogOutButton/LogOutButton'
import qs from 'query-string';


class StudentActivator extends Component {

  componentDidMount(){
    const searchObject = qs.parse(this.props.location.search);
    console.log(searchObject.id);
    this.props.dispatch({type:'GET_STUDENT_ACTIVATOR', payload: searchObject});
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