import React, { Component} from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import {withRouter} from 'react-router-dom'
import './LoginPage.css';
import {withStyles} from '@material-ui/core/styles'

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
    permissions: 'teacher',
  };



  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
    // this.checkPath();
  } // end login

  // checkPath = () => {
  //   console.log('This.props.user is:', this.props.user);
  //   if (this.props.user.permissions === 'teacher'){
  //     this.props.history.push('/welcome')
  //   }
  //   else if (this.props.user.permissions === 'student'){
  //     this.props.history.push('/studentactivator');
  //   }
  // }

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  handleRegister = () => {
    this.props.dispatch({type: 'SET_TO_REGISTER_MODE'});
    this.props.history.push('/register');
  }

  handleToggle = () => {
    console.log('in toggle');
    this.setState({
      open: !this.state.open
    })
  }

  render() {
    const {classes} = this.props
    return (
      <div className="loginWrapper">
      <div className="loginHeader">
        <img src="/images/activated4.svg" className="activatedImage"></img>
      </div>

      <div className="loginArea">
        
        <form onSubmit={this.login}>
          <Typography variant="h3" className={classes.loginTypography}>Login</Typography>
          <FormControl className={classes.formControl}>
              <TextField label="Username" variant="outlined" color="secondary"
              value={this.state.username}
              onChange={this.handleInputChangeFor('username')}
              style = {{width: 400}}
              ></TextField>
          </FormControl>
          
          <FormControl className={classes.formControl}>
              <TextField label="Password" variant="outlined"  color="secondary"
              value={this.state.password}
              onChange={this.handleInputChangeFor('password')}
              type="password"
              style = {{width: 400}}
            ></TextField>
          </FormControl>
          {this.props.errors.loginMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.loginMessage}
          </h2>
        )}
         
          <Button size= "large" value="Log In" variant="outlined" onClick={this.login} className={classes.loginButton}>Log In</Button>
        </form>
       
        
          <Button size= "large" onClick={this.handleRegister}>Register</Button>
        
      </div>
      <div className="loginFooter">
      </div>
      </div>
    );
  }
}

const styles = theme => ({

  formControl:{
    display: 'block',
    marginBottom: '25px',
  },
  loginTypography:{
    textAlign: 'center',
    fontFamily: 'Lato',
    color: '#313D6B',
    paddingBottom: '25px',
  },
  loginButton:{
    marginBottom:'25px',
  }

  })

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
  user: state.user
});

export default withRouter(connect(mapStateToProps)(withStyles(styles)(LoginPage)));
