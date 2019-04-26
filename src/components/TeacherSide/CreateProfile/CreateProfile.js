
import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField'
import {withStyles} from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Stepper from 'react-stepper-horizontal';


class CreateProfile extends Component {

  state= {
    newProfile: {
      first_name: '',
      last_name: '',
      email: '',
      school_district: '',
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log('in handleSubmit');
    this.props.dispatch({type:'ADD_PROFILE', payload: this.state.newProfile});
    this.props.history.push('/createclasses');
    this.props.dispatch({type:'SET_TO_LOGIN_MODE'});
  }

  handleChange = propertyName => {
    return(event) =>{
    
    this.setState({
        newProfile: {
            ...this.state.newProfile,
            [propertyName]: event.target.value,
        }
    });
  }
}




  render() {
    console.log(this.state.newProfile);
    const {classes} = this.props;
    return (
      <section>
        <Stepper steps={ [{title: 'Create Username and Password'}, {title: 'Create Profile'}, {title: 'Create Classes'}, {title: 'Add Students'}] } activeStep={ 1 } activeColor= '#814fff' defaultBarColor= '#814fff' activeTitleColor= '#814fff' defaultTitleColor= '#814fff' circleFontColor='#0B172A' className="stepper" completeColor="#ffbe5c" completeTitleColor="#463940" />
        <Typography variant="h4" className={classes.createProfile}>Create Profile</Typography>
          <form className={classes.form}>
            <FormControl className={classes.formControl}>
                <TextField label="First Name" variant="outlined" color="primary"
                value={this.state.newProfile.first_name}
                helperText="Required Field"
                onChange={this.handleChange('first_name')}
                ></TextField>
            </FormControl>
            <br/>
            <FormControl className={classes.formControl}>
                <TextField label="Last Name" variant="outlined" color="primary"
                value={this.state.newProfile.last_name}
                helperText="Required Field"
                onChange={this.handleChange('last_name')}
                ></TextField>
            </FormControl>
              <br/>
              <FormControl className={classes.formControl}>
                <TextField label="Email Address" variant="outlined" color="primary"
                value={this.state.newProfile.email}
                helperText="Required Field"
                onChange={this.handleChange('email')}
                ></TextField>
            </FormControl>
            <br/>
            <FormControl className={classes.formControl}>
                <TextField label="School District" variant="outlined" color="primary"
                value={this.state.newProfile.school_distrct}
                helperText="Required Field"
                onChange={this.handleChange('school_district')}
                ></TextField>
            </FormControl>
            <br/>
            <FormControl className={classes.formControl}>
                <IconButton color="primary" onClick={this.handleSubmit} size="large">Submit</IconButton>
            </FormControl>
        </form>
      </section>
    );
  }
}

const styles = theme => ({
  formControl:{
    margin: '0 auto',
    
  },
  form:{
    backgroundColor: 'white',
    padding: '0',
    margin: '0 auto',
  },
  createProfile:{
    textAlign: 'center',
  },
  })




const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect( mapReduxStateToProps )(withStyles(styles)(CreateProfile));