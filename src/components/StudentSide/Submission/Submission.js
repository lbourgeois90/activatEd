import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogoutButton from '../../LogOutButton/LogOutButton';
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import './Submission.css';




class Submission extends Component {


  backToHomepage = () =>{
    this.props.history.push('/')
  }


  render() {
    return (
      <section>
      <div className="submissionDiv">
        <h1 className="submissionHeader">Your Answer Has Been Submitted!</h1>
        <p className="submissionButton"><Button size="large" color="primary" onClick={this.backToHomepage}><ArrowBack color="primary"/>Back to Homepage</Button></p>
        <br/>
        <p className="submissionButton"><LogoutButton/></p>
      </div>
      </section>
    );
  }
}
const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect( mapReduxStateToProps )(Submission);