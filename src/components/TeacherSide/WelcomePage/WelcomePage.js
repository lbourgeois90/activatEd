import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {withStyles} from '@material-ui/core/styles'
import NavBar from '../NavBar/NavBar';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
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
          Welcome {this.props.reduxState.teacher.first_name}
          <LogoutButton/>
        
        
        </div>
        <div className="childTwo">
          <img src="/images/thoughBubble.png" className="quoteImage"></img>
          <p className="dateAndTime">Today's Date Is: {moment().format('MMMM Do YYYY')}</p>
          <p className="dateAndTime">Current Time Is: {moment().format('LT')}</p>
          <p className="quoteText">Inspirational Quote of the Day:</p>
          <p className="quoteText">'{this.props.reduxState.quote.quoteText}'</p>
          <p className="quoteText">Author: {this.props.reduxState.quote.quoteAuthor}</p>
        </div>
         
        <div className="childThree">
          <img src="/images/createactivatoricon.png" className="activatorImage"></img>
          <p className={classes.buttonContainer}>
            <Button color="primary" className={classes.activatorButton} onClick={this.navToCreateActivator}>Create an Activator</Button>
          </p>
        </div>
        <div className="childFour">
          <img src="/images/data.png" className="dataImage"></img>
          <p className={classes.buttonContainer}>
          <Button color="primary" className={classes.activatorButton} onClick={this.navToClassData}>See Class Data</Button>
          </p>
        </div>
          
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