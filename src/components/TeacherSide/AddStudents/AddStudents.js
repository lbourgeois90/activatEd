
import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import Stepper from 'react-stepper-horizontal';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import AddStudentsTable from './AddStudentsTable';
import swal from 'sweetalert';
import './AddStudents.css'
var moment = require('moment');


class AddStudents extends Component {

  state= {
    newStudent: {
      date_added: '',
      username: '',
      first_name: '',
      last_name: '',
      class_id: '',
      password: '',
      permissions: '',
    },
  }


  //FUNCTION- on initilization of component--dispatch 'GET_CLASS' which is mapped through to population class dropdown
  //dispatch 'GET_STUDENT' to get added students to population editable table
  componentDidMount(){
    this.props.dispatch({type:'GET_CLASS'});
    this.props.dispatch({type:'GET_STUDENT'})
  }

  //FUNCTION- on click of add student and submit-- prevents reload of page
  //CONDITIONAL- FORM VALIDATION- IF checks state of input fields and if not empty then will dispatch payload of student to saga to server to db
    //And clear all inputs and redirect user to WELCOME view
  //ELSE sweetalert that all fields must be completed before submission
  handleSubmit = event => {
    event.preventDefault();
    console.log('in handleSubmit');
    if(this.state.newStudent.username !== '' && this.state.newStudent.first_name !== '' && this.state.newStudent.last_name !== '' && this.state.newStudent.class_id !== '' && this.state.newStudent.password !== ''){
    this.props.dispatch({type:'ADD_STUDENT', payload: this.state.newStudent});
    this.setState({
      newStudent: {
        date_added: '',
        username: '',
        first_name: '',
        last_name: '',
        class_id: '',
        password: '',
        permissions: '',
      },
    })
    this.props.history.push('/welcome');
  }
  else{
    swal({
      title: "Error",
      text: "Please complete all required fields before submitting.",
      icon: "warning",
      })
    }
  }

  //FUNCTION- on click of add another student-- prevents reload of page
  //CONDITIONAL- FORM VALIDATION- IF checks state of input fields and if not empty then will dispatch payload of student to saga to server to db
  //And clear all inputs
  //ELSE sweetalert that all fields must be completed before submission
  addAnotherStudent = event => {
    event.preventDefault();
    console.log('in addAnotherStudent');
    if(this.state.newStudent.username !== '' && this.state.newStudent.first_name !== '' && this.state.newStudent.last_name !== '' && this.state.newStudent.class_id !== '' && this.state.newStudent.password !== ''){
      this.props.dispatch({type:'ADD_STUDENT', payload: this.state.newStudent});
      swal({
        title: "Student Has Been Added!",
        icon: "success",
      });
      this.setState({
        date_added: '',
        username: '',
        first_name: '',
        last_name: '',
        class_id: '',
        password: '',
        permissions: '',
        student_id: '',
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

//FUNCTION- handle change for inputs-- set state to input values-- date_added manually added using moment for current date-- student_id added
//from state.newStudent.username-- necessary for input into student table versus user table on DB
  handleChange = propertyName => {
    return(event) =>{
    
    this.setState({
        newStudent: {
            ...this.state.newStudent,
            [propertyName]: event.target.value,
            date_added: moment().format('YYYY-MM-DD'),
            permissions: 'student',
            student_id: this.state.newStudent.username,

        }
    });
  }
}

//FUNCTION- on click of delete icon will delete selected student from database
handleDelete = (event) => {
  event.preventDefault();
  console.log('in handleDelete');
  let studentId = event.currentTarget.value;
  console.log('Student Id is:', studentId);
  this.props.dispatch({type:'DELETE_STUDENT', payload: studentId});
}

 //FUNCTION- ability to set state to fill test data for presentation
// fillFields=()=>{
//   console.log('in fillFields')
//   this.setState({
//     newStudent: {
//       date_added: moment().format('YYYY-MM-DD'),
//       username: '050693',
//       first_name: 'Nicole',
//       last_name: 'Costa',
//       password: 'ncosta93',
//       permissions: 'student',
//       student_id: this.state.newStudent.username,
//     },
//   })
// }

//FUNCTION - on click of continue will redirect user to WELCOME view
goToWelcome = () => {
  this.props.history.push('/')
}


  render() {
    console.log(this.state.newStudent);
    const {classes} = this.props;
    return (
      <section>
        <Stepper steps={ [{title: 'Create Username and Password'}, {title: 'Create Profile'}, {title: 'Create Classes'}, {title: 'Add Students'}] } activeStep={ 3 } activeColor= '#F7C331' defaultBarColor= 'black' activeTitleColor= '#black' defaultTitleColor= '#6B7A8F' circleFontColor='#0B172A' className="stepper" completeColor="#6B7A8F" completeTitleColor="#6B7A8F" />
        <Typography variant="h4" className={classes.addStudents}>Add Students to Class</Typography>
        <div className={classes.addStudentsFormDiv}>
          <form className={classes.form}>
            <FormControl variant="outlined" className={classes.formControlAddStudents}>
              <TextField
                    id="class_id"
                    select
                    label="Select A Class Period"
                    value={this.state.newStudent.class_id}
                    onChange={this.handleChange('class_id')}
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu,
                      },
                    }}
                    margin="normal"
                    variant="outlined"
                    style = {{width: 400}}
                    required
                  >
                    <MenuItem disabled>Select a Class Period</MenuItem>
                    {this.props.reduxState.classes.map( classes =>
                          <MenuItem value={classes.class_id} key={classes.class_id}>{classes.class_period}</MenuItem>
                          )}
                        
                  </TextField>
            </FormControl>
            <br/>
            <FormControl className={classes.formControlAddStudents}>
                <TextField label="Student ID" variant="outlined" color="primary"
                value={this.state.newStudent.username}
                helperText="Required Field"
                onChange={this.handleChange('username')}
                required
                type="text"
                style = {{width: 400}}
                ></TextField>
            </FormControl>
            <FormControl className={classes.formControlAddStudents}>
                <TextField label="Student First Name" variant="outlined" color="primary"
                value={this.state.newStudent.first_name}
                helperText="Required Field"
                onChange={this.handleChange('first_name')}
                required
                type="text"
                style = {{width: 400}}
                ></TextField>
            </FormControl>
            <br/>
            <FormControl className={classes.formControlAddStudents}>
                <TextField label="Student Password" variant="outlined" color="primary"
                value={this.state.newStudent.password}
                helperText="Required Field"
                onChange={this.handleChange('password')}
                required
                type="text"
                style = {{width: 400}}
                ></TextField>
            </FormControl>
            <FormControl className={classes.formControlAddStudents}>
                <TextField label="Student Last Name" variant="outlined" color="primary"
                value={this.state.newStudent.last_name}
                helperText="Required Field"
                onChange={this.handleChange('last_name')}
                required
                type="text"
                style = {{width: 400}}
                ></TextField>
            </FormControl>
            <br/>
            <FormControl className={classes.formControlButton}>
                <Button color="primary" onClick={this.addAnotherStudent} size="large">Add Another Student</Button>
            </FormControl>
            <br/>
            <FormControl className={classes.formControlButton}>
                <Button color="primary" onClick={this.handleSubmit} size="large">Add Student and Submit</Button>
            </FormControl>
            <br/>
            <FormControl className={classes.formControlButton}>
                <Button color="primary" onClick={this.goToWelcome} size="large">Continue to Homepage</Button>
            </FormControl>
          </form>
          {/* <div className="footer">
            <p><button onClick={this.fillFields} className="registrationButtonFillFieldsSmaller"></button></p>
          </div> */}
          <AddStudentsTable/>
        </div>
      </section>
    );
  }
}

const styles = theme => ({
  formControlAddStudents: {
    marginRight: '50px',
    marginTop: '25px',
    
  },
  addStudentsFormDiv:{
    textAlign: 'center',
  },
  form:{
    padding: '0',
    margin: '0 auto',
  },
  addStudents:{
    textAlign: 'center',
  },
  })




const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect( mapReduxStateToProps )(withStyles(styles)(AddStudents));