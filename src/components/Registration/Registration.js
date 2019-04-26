import React, { Component } from 'react';
import {connect} from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';


class Registration extends Component {
  state = {
    username: '',
    password: '',
    accessCode: '',
  };


  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

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

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    console.log('User is:', this.user);
    return (
      <Paper>
        {this.props.errors.registrationMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.registrationMessage}
          </h2>
        )}
        <form onSubmit={this.registerUser}>
          <Typography variant="h4">Register User</Typography>
          
          <FormControl>
              <TextField label="Username" variant="outlined" color="primary"
              value={this.state.username}
              onChange={this.handleInputChangeFor('username')}
              ></TextField>
          </FormControl>
          
          <FormControl>
              <TextField label="Password" variant="outlined" color="primary"
              value={this.state.password}
              onChange={this.handleInputChangeFor('password')}
              type="password"
              ></TextField>
          </FormControl>

          <FormControl>
              <TextField label="Access Code" variant="outlined" color="primary"
              value={this.state.accessCode}
              onChange={this.handleInputChangeFor('accessCode')}
              type="password"
              >
              </TextField>
          </FormControl>

         <Button onClick={this.registerUser} >Register</Button>
        </form>

        <Button
            type="button"
            className="link-button"
            onClick={() => {this.props.dispatch({type: 'SET_TO_LOGIN_MODE'})}}>
            Login
        </Button>
      </Paper>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
  user : state.user,
});

export default connect(mapStateToProps)(Registration);

