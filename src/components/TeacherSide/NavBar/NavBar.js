
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import {withStyles} from '@material-ui/core/styles'
import LogOutButton from '../../LogOutButton/LogOutButton';
import IconButton from '@material-ui/core/IconButton';
import NoteAdd from '@material-ui/icons/NoteAdd';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';





class NavBar extends Component {

    state = {
        auth: true,
        anchorEl: null,
      }; 

  componentDidMount(){
    this.props.dispatch({type:'GET_TEACHER'});
    this.props.dispatch({type:'GET_CLASS'});
  }

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <section>
         <AppBar position="static">
            <Toolbar>
            <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                {/* {this.props.reduxState.} */}
                  {/* <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                  <MenuItem onClick={this.handleClose}>My account</MenuItem> */}
                </Menu>




                <Button><NoteAdd/>Create Activator</Button>

                <LogOutButton/>
            </Toolbar>
        </AppBar>
        <Paper>
         <h1>Welcome {this.props.reduxState.teacher.first_name}</h1>
        </Paper>

      </section>
    );
  }
}


const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
  });


// const styles = theme => ({
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
//   })




const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect( mapReduxStateToProps )(withStyles(styles)(NavBar));