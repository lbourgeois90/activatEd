import React , { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import ExitToApp from '@material-ui/icons/ExitToApp';
import { withRouter } from 'react-router-dom';

class LogoutButton extends Component {

  handleLogout = () => {
    console.log('in handleLogout');
   
   this.props.dispatch({ type: 'LOGOUT' });
   this.props.history.push('/home');
  }


render() {

  return (
    
    <Button
      // This button shows up in multiple locations and is styled differently
      // because it's styled differently depending on where it is used, the className
      // is passed to it from it's parents through React props
      onClick={this.handleLogout}
      className="logoutButton"
    >
      <ExitToApp/>Log Out
    </Button>
  
  );
}
}

const mapReduxStateToProps = (reduxState) => ({
reduxState,
});

export default withRouter(connect( mapReduxStateToProps )(LogoutButton));

