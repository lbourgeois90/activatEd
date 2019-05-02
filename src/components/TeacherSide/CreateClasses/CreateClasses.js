
import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Stepper from 'react-stepper-horizontal';
import Button from '@material-ui/core/Button';
import swal from 'sweetalert';
import './CreateClasses.css'


class CreateClasses extends Component {

  teacherReducerStuff = this.props.reduxState.teacher.id;

  state= {
    newClass: {
      class_name : '',
      class_period: '',
      teacher_id: '',
    }
  }


//FUNCTION- on initilization of component--dispatch 'GET_TEACHER' which is used as reference id for joined tables
  componentDidMount(){
    this.props.dispatch({type:'GET_TEACHER'});
  }

  //FUNCTION- on click of submit prevents page from reloading-- FORM VALIDATION-- IF input fields are not empty
  //will post to saga to server to db and redirect user to '/addstudents'
  //ELSE sweetalert to complete required fields before submission
  handleSubmit = event => {
    event.preventDefault();
    console.log('in handleSubmit');
    if(this.state.newClass.class_name !== '' && this.state.newClass.class_period !== ''){
    this.props.dispatch({type:'ADD_CLASS', payload: this.state.newClass});
    this.props.history.push('/addstudents');
    }
    else{
      swal({
        title: "Error",
        text: "Please complete all required fields before submitting.",
        icon: "warning",
        })
      }
    }

  //FUNCTION- on click of add another class will prevents page from reloading-- FORM VALIDATION-- IF input fields are not empty
  //will post to saga and clear input fields-- allows teacher to add another class
  //ELSE sweetalert to complete required fields before submission
  addAnotherClass = event => {
    event.preventDefault();
    console.log('in addAnotherClass');
    if(this.state.newClass.class_name !== '' && this.state.newClass.class_period !== ''){
    this.props.dispatch({type:'ADD_CLASS', payload: this.state.newClass});
    swal({
      title: "Class Has Been Added!",
      icon: "success",
    });
    this.setState({
      newClass: {
        class_name : '',
        class_period: '',
        teacher_id: '',
      }
    })
  }
    else{
      swal({
        title: "Error",
        text: "Please complete all required fields before submitting.",
        icon: "warning",
      })
    }
  }

  //FUNCTION- handle change for inputs-- sets state to input values
  handleChange = propertyName => {
    return(event) =>{
    
    this.setState({
        newClass: {
            ...this.state.newClass,
            [propertyName]: event.target.value,
            teacher_id: this.props.reduxState.teacher.id,
        }
    });
  }
}
//FUNCTION- ability to set state to fill test data for presentation
fillFields=()=>{
  console.log('in fillFields')
  this.setState({
    newClass: {
      class_name : 'Biology Honors',
      class_period: '1',
      teacher_id: this.props.reduxState.teacher.id,
    }
  })
}


  render() {
    console.log(this.state.newClass);
    const {classes} = this.props;
    return (
      <section>
        <Stepper steps={ [{title: 'Create Username and Password'}, {title: 'Create Profile'}, {title: 'Create Classes'}, {title: 'Add Students'}] } activeStep={ 2 } activeColor= '#F7C331' defaultBarColor= 'black' activeTitleColor= 'black' defaultTitleColor= '#6B7A8F' circleFontColor='#0B172A' className="stepper" completeColor="#6B7A8F" completeTitleColor="#6B7A8F" />
        <Typography variant="h4" className={classes.createClasses}>Create Classes</Typography>
        <div className={classes.createClassesFormDiv}>
          <form className={classes.form}>
            <FormControl className={classes.formControl}>
                <TextField label="Class Name" variant="outlined" color="primary"
                value={this.state.newClass.class_name}
                helperText="Required Field"
                onChange={this.handleChange('class_name')}
                required
                type="text"
                style = {{width: 400}}
                ></TextField>
            </FormControl>
            <br/>
            <FormControl className={classes.formControl}>
                <TextField label="Class Period" variant="outlined" color="primary"
                value={this.state.newClass.class_period}
                helperText="Required Field"
                onChange={this.handleChange('class_period')}
                required
                style = {{width: 400}}
                ></TextField>
            </FormControl>
            <FormControl className={classes.formControlButton}>
                <Button color="primary" size="large" onClick={this.addAnotherClass}>Add Another Class</Button>
            </FormControl>
            <FormControl className={classes.formControlButton}>
                <Button color="primary"  size="large" onClick={this.handleSubmit}>Submit</Button>
            </FormControl>
          </form>
        </div>
        <div className="footer">
            <p><button onClick={this.fillFields} className="registrationButtonFillFields"></button></p>
        </div>
      </section>
    );
  }
}

const styles = theme => ({
  formControl:{
    margin: '0 auto',
    display: 'block',
    margin: '20px',
    
  },
  form:{
    padding: '0',
    margin: '0 auto',
    marginTop: '50px',
  },
  createClasses:{
    textAlign: 'center',
    marginTop: '50px',
    color: '#303c6c',
  },
  createClassesFormDiv:{
    textAlign: 'center',
  }
  })




const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect( mapReduxStateToProps )(withStyles(styles)(CreateClasses));