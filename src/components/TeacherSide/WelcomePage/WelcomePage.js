import React, { Component } from 'react';
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





class WelcomePage extends Component {

  componentDidMount(){
    this.props.dispatch({type:'GET_TEACHER'})
  }

  render() {
    const { classes } = this.props;
    return (
      <section>
        <NavBar/>

      </section>
    );
  }
}

const styles = theme => ({
  // formControl:{
  //   margin: '0 auto',
    
  // },
  // form:{
  //   backgroundColor: 'white',
  //   padding: '0',
  //   margin: '0 auto',
  // },
  // addStudents:{
  //   textAlign: 'center',
  // },
  // table:{
  //   width: '90%',
  //   margin: '0 auto',
  //   marginBottom: '50px',
  //   marginTop: '100px',
  //  },
   
  //  tableFont:{
  //    fontSize: '22px',
  //    color: '#ff65af',
  //  },
  //  tableFontHeader:{
  //    fontSize: '22px',
  //    color: '#ff65af',
  //  },
  //  tableFontCenter:{
  //    fontSize: '22px',
  //    textAlign: '#ff65af',
  //    color: '#ff65af',
  //  },
  //  tableFontHeaderCenter:{
  //    fontSize: '22px',
  //    textAlign: 'center',
  //    color: '#ff65af' 
  //  },
  //  tableRowHover: {
  //    '&:hover': {
  //      backgroundColor: 'primary',
  //    },
  //  },
  })




const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect( mapReduxStateToProps )(withStyles(styles)(WelcomePage));