import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'

class TeacherLogin extends Component {
  state = {
    username: '',
    password: '',
    permissions: 'teacher',
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
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
    this.checkPath()
  } // end login

  // checkPath = () => {
  //   if (this.state.user)
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
    console.log(this.state.open)
    return (
      <Paper>
        {this.props.errors.loginMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.loginMessage}
          </h2>
        )}
        <form onSubmit={this.login}>
          <Typography variant="h3">Login</Typography>
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
         
          <Button value="Log In" variant="outlined">Log In</Button>
        </form>
       
        
          <Button onClick={this.handleRegister}>Register</Button>
        
      </Paper>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
  state,
});

export default connect(mapStateToProps)(TeacherLogin);
