
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
import NoteAddOutlined from '@material-ui/icons/NoteAddOutlined';
import InsertChartOutlined from '@material-ui/icons/InsertChartOutlined'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PersonOutlined from '@material-ui/icons/PersonOutlined'





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
    // this.props.push(`/${event.target.value`)
  };

  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
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
                
                    <MenuItem onClick={this.handleClose}><NoteAddOutlined/>Create Activator</MenuItem>
                    <MenuItem onClick={this.handleClose}><InsertChartOutlined/>View Class Data</MenuItem>
                    <MenuItem onClick={this.handleClose}><PersonOutlined/>User Profile</MenuItem>
                    
                    
                </Menu>



                {/* <Button><NoteAdd/>Create Activator</Button> */}

                <LogOutButton/>
            </Toolbar>
        </AppBar>
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