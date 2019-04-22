
import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField'
import {withStyles} from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Stepper from 'react-stepper-horizontal';


class CreateClasses extends Component {


  state= {
    newClass: {
      class_name : '',
      class_period: '',
      // teacher_id: this.props.reduxState.teacher[0].id,
    }
  }



  componentDidMount(){
    this.props.dispatch({type:'GET_TEACHER'});
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log('in handleSubmit');
    // this.props.dispatch({type:'ADD_CLASS', payload: this.state.newClass});
    // this.props.history.push('/addstudents');
  }

  addAnotherClass = event => {
    event.preventDefault();
    console.log('in handleSubmit');
    this.props.dispatch({type:'ADD_CLASS', payload: this.state.newClass});
    alert(`Class Has Been Added!`);
  }

  handleChange = propertyName => {
    return(event) =>{
    
    this.setState({
        newClass: {
            ...this.state.newClass,
            [propertyName]: event.target.value,
        }
    });
  }
}




  render() {
    console.log(this.state.newClass);
    const {classes} = this.props;
    return (
      <section>
        <Stepper steps={ [{title: 'Create Username and Password'}, {title: 'Create Profile'}, {title: 'Create Classes'}, {title: 'Add Students'}] } activeStep={ 2 } activeColor= '#814fff' defaultBarColor= '#814fff' activeTitleColor= '#814fff' defaultTitleColor= '#814fff' circleFontColor='#0B172A' className="stepper" completeColor="#ffbe5c" completeTitleColor="#463940" />
     
        <Typography variant="h4" className={classes.createClasses}>Create Classes</Typography>
        <form className={classes.form}>
          <FormControl className={classes.formControl}>
              <TextField label="Class Name" variant="outlined" color="primary"
              value={this.state.newClass.class_name}
              helperText="Required Field"
              onChange={this.handleChange('class_name')}
              ></TextField>
          </FormControl>
          <br/>
          <FormControl className={classes.formControl}>
              <TextField label="Class Period" variant="outlined" color="primary"
              value={this.state.newClass.class_period}
              helperText="Required Field"
              onChange={this.handleChange('class_period')}
              ></TextField>
          </FormControl>
          <FormControl className={classes.formControl}>
              <IconButton color="primary" onClick={this.addAnotherClass} size="large">Add Another Class</IconButton>
          </FormControl>
          <FormControl className={classes.formControl}>
              <IconButton color="primary" onClick={this.handleSubmit} size="large">Create Class and Submit</IconButton>
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
  createClasses:{
    textAlign: 'center',
  },
  })




const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect( mapReduxStateToProps )(withStyles(styles)(CreateClasses));