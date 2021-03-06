import React, { Component } from 'react';
import {connect} from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import './Registration.css';
import {withStyles} from '@material-ui/core/styles'


class Registration extends Component {
  state = {
    username: '',
    password: '',
    accessCode: '',
  };


  //FUNCTION- prevents reload of the page-- checks username, password and access code validity prior to creation of user-- checks to see if requirements are met as well that the username is unique
  registerUser = (event) => {
    event.preventDefault();
    console.log('in registerUser');
    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          username: this.state.username,
          password: this.state.password,
          permissions: 'teacher',
          accessCode: this.state.accessCode,
        },
      });
      // if(this.props.errors.loginMode === 'createProfile'){
      //   this.props.history.push('/createProfile')
      // }
   
    } else {
      this.props.dispatch({type: 'REGISTRATION_INPUT_ERROR'});
    }
  } // end registerUser


  //FUNCTION- handle change for input fields and sets state based on inputs
  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  //FUNCTION- on click of login button, dispatches 'SET_TO_LOGIN_MODE which redirects user to login view(has to do with protected route '/')
  backToLogin = () => {
    this.props.dispatch({type:'SET_TO_LOGIN_MODE'})
    this.props.history.push('/home');
  }
  
  //FUNCTION- ability to set state to fill test data for presentation
  // fillFields=()=>{
  //   console.log('in fillFields')
  //   this.setState({
  //     username: 'mTroxell',
  //     password: 'Password12345',
  //     permissions: 'teacher',
  //     accessCode: 122090,
  //   })
  // }

  render() {
    const {classes} = this.props
    return (
      <div className="wrapperRegistration">
      
        <div className="registrationHeader">
           <h1>Register User</h1>
        </div>

        <div className="registrationBody">
            <form onSubmit={this.registerUser} className="registrationForm">
              
              <FormControl className={classes.registrationFormControl}>
                  <TextField label="Username" variant="outlined" color="primary"
                  value={this.state.username}
                  onChange={this.handleInputChangeFor('username')}
                  style = {{width: 400}}
                  ></TextField>
              </FormControl>
              <br/>
              <FormControl className={classes.registrationFormControl}>
                  <TextField label="Password" variant="outlined" color="primary"
                  value={this.state.password}
                  onChange={this.handleInputChangeFor('password')}
                  type="password"
                  style = {{width: 400}}
                  ></TextField>
              </FormControl>
              <br/>
              <FormControl className={classes.registrationFormControl}>
                  <TextField label="Access Code" variant="outlined" color="primary"
                  value={this.state.accessCode}
                  onChange={this.handleInputChangeFor('accessCode')}
                  type="password"
                  style = {{width: 400}}
                  >
                  </TextField>
              </FormControl>
              <br/>
            <FormControl className={classes.registrationFormControlRegistrationButtons}>
                <Button size="large" color="primary" onClick={this.registerUser} >Register</Button>
            </FormControl>
            <FormControl className={classes.registrationFormControlButtons}>
                <Button size="large" color="primary" onClick={this.backToLogin} >Back To Login</Button>
            </FormControl>
            </form>

            {this.props.errors.registrationMessage && (
              <h2
                className="alert"
                role="alert"
              >
                {this.props.errors.registrationMessage}
          </h2>
        )}

          </div>
          {/* <div className="footer">
            <button onClick={this.fillFields} className="registrationButtonFillFields"></button>
          </div> */}
        
      </div>
    );
  }
}

const styles = theme => ({
  registrationFormControl:{
    dispaly: 'block',
    margin:'25px',
  },
  registrationFormControlButtons:{
    display: 'inline-block',
  },
  registrationFormControlRegistrationButtons:{
    display: 'inline-block',
    paddingRight: '150px',
  },

  })



// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
  user : state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Registration));

