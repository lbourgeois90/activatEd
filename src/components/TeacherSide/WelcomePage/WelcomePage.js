import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles'
import './WelcomePageGrid.css';
import LogoutButton from '../../LogOutButton/LogOutButton';

var moment = require('moment');




class WelcomePage extends Component {

  // state={
  //   quotes: {
  //     quoteText: '',
  //     quoteAuthor: '',

  //   }
  // }

  //FUNCTION- on intialization component dispatches 'GET_TEACHER' to get teacher info 
  //dispatch 'GET_QUOTE' to get random quote from API
  componentDidMount(){
    this.props.dispatch({type:'GET_TEACHER'});
    // this.props.dispatch({type:'GET_QUOTE'});
  }

  //FUNCTION- checks status of reduxState and will update reduxState until quote has been set to reducer from API
  // componentDidUpdate(prevProps) {
  //   if(this.props.reduxState.quote !== prevProps.reduxState.quote){
  //     this.setState({
  //       quotes:{
  //         quoteText: this.props.reduxState.quote.quoteText,
  //         quoteAuthor: this.props.reduxState.quote.quoteAuthor,
  //       }
  //     })
  //   }
  // }

  //FUNCTION- on click of See Class Data redirects user to CLASSDATA view
  navToClassData = () => {
    this.props.history.push('/classData')
  }

  //FUNCTION- on click of Create An Activator redirects user to CREATEACTIVATOR view 
  navToCreateActivator = () => {
    this.props.history.push('/createActivator')
  }


  render() {
    const { classes } = this.props;
   
    return (
      <section>
       
       <div className="wrapper">

        <div className="childOne">
          <p className="logoutButtonWelcome"><LogoutButton/></p>
        
        
        </div>
        <div className="childTwo">
          <p> Welcome {this.props.reduxState.teacher.first_name}</p>
          <p className="dateAndTime">Today's Date Is: {moment().format('MMMM Do YYYY')}</p>
          <p className="dateAndTime">Current Time Is: {moment().format('LT')}</p>
        </div>
         
        <div className="childThree">
          <p className={classes.buttonContainer}>
            <Button color="secondary" className={classes.activatorButton} onClick={this.navToCreateActivator}>Create an Activator</Button>
          </p>
          <img src="/images/createPhoto.png" className="activatorImage" width='100%'></img>
        </div>
       

        <div className="childFour">
          <p className={classes.buttonContainer}>
          <Button color="secondary" className={classes.activatorButton} onClick={this.navToClassData}>See Class Data</Button>
          </p>
          <img src="/images/dataPhoto.png" className="dataImage" width='100%'></img>
         
        </div>
        <footer className="childFive">

        </footer>
       </div>
        
      </section>
    );
  }
}

const styles = theme => ({
  activatorButton:{
    fontSize: '36px',
    justifyContent: 'center',
    fontFamily: 'Lato',
  },
  buttonContainer:{
    textAlign: 'center',
    margin: '0',
  }
 


  })




const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect( mapReduxStateToProps )(withStyles(styles)(WelcomePage));