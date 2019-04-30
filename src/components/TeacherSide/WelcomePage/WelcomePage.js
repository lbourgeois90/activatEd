import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles'
import './WelcomePageGrid.css';
import LogoutButton from '../../LogOutButton/LogOutButton';
var moment = require('moment');




class WelcomePage extends Component {

  componentDidMount(){
    this.props.dispatch({type:'GET_TEACHER'});
    this.props.dispatch({type:'GET_QUOTE'});
  }

  navToClassData = () => {
    this.props.history.push('/classData')
  }

  navToCreateActivator = () => {
    this.props.history.push('/createActivator')
  }





  render() {
    const { classes } = this.props;
    return (
      <section>
       
       <div className="wrapper">

        <div className="childOne">
          <LogoutButton/>
        
        
        </div>
        <div className="childTwo">
          {/* <img src="/images/thoughBubble.png" className="quoteImage"></img> */}
          <p className="dateAndTime">Today's Date Is: {moment().format('MMMM Do YYYY')}</p>
          <p className="dateAndTime">Current Time Is: {moment().format('LT')}</p>
          <p className="quoteText">Inspirational Quote of the Day:</p>
          <p className="quoteText">'{this.props.reduxState.quote.quoteText}'</p>
          <p className="quoteText">Author: {this.props.reduxState.quote.quoteAuthor}</p>
        </div>
         
        <div className="childThree">
          <p className={classes.buttonContainer}>
            <Button color="secondary" className={classes.activatorButton} onClick={this.navToCreateActivator}>Create an Activator</Button>
          </p>
          <img src="/images/createPhoto.png" className="activatorImage"></img>
        </div>
       

        <div className="childFour">
          <p className={classes.buttonContainer}>
          <Button color="secondary" className={classes.activatorButton} onClick={this.navToClassData}>See Class Data</Button>
          </p>
          <img src="/images/dataPhoto.png" className="dataImage"></img>
         
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