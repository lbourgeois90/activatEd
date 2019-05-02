
import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import Stepper from 'react-stepper-horizontal';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import AddStudentsTable from './AddStudentsTable';
import swal from 'sweetalert';
import './AddStudents.css'
var moment = require('moment');


class AddStudents extends Component {

  teacherReducerStuff = this.props.reduxState.teacher.id;

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
    labelWidth: 0,
  }



  componentDidMount(){
    this.props.dispatch({type:'GET_CLASS'});
    this.props.dispatch({type:'GET_STUDENT'})
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });
  }

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

  addAnotherStudent = event => {
    event.preventDefault();
    console.log('in addAnotherStudent');
    if(this.state.newStudent.username !== '' && this.state.newStudent.first_name !== '' && this.state.newStudent.last_name !== '' && this.state.newStudent.class_id !== '' && this.state.newStudent.password !== ''){
      this.props.dispatch({type:'ADD_STUDENT', payload: this.state.newStudent});
      alert(`Student Has Been Added!`);
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

handleDelete = (event) => {
  event.preventDefault();
  console.log('in handleDelete');
  let studentId = event.currentTarget.value;
  console.log('Student Id is:', studentId);
  this.props.dispatch({type:'DELETE_STUDENT', payload: studentId});
}

fillFields=()=>{
  console.log('in fillFields')
  this.setState({
    newStudent: {
      date_added: moment().format('YYYY-MM-DD'),
      username: '050693',
      first_name: 'Nicole',
      last_name: 'Costa',
      password: 'ncosta93',
      permissions: 'student',
      student_id: this.state.newStudent.username,
    },
  })
}

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
                <InputLabel
                  ref={ref => {
                    this.InputLabelRef = ref;
                  }}
                  htmlFor="class_id" >Select a Class </InputLabel>
                <Select
                  value={this.state.newStudent.class_id}
                  onChange={this.handleChange('class_id')}
                  required
                  style = {{width: 400}}
                  input={
                    <OutlinedInput
                      labelWidth={this.state.labelWidth}
                      name="class_id"
                      id="class_id"
                      />}
                      >
                      <MenuItem disabled>Select a Class</MenuItem>
                      {this.props.reduxState.classes.map( classes =>
                      <MenuItem value={classes.class_id} key={classes.class_id}>{classes.class_period}</MenuItem>
                      )}
                      
                </Select>
                <FormHelperText>Required Field</FormHelperText>
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
          <div className="footer">
            <p><button onClick={this.fillFields} className="registrationButtonFillFieldsSmaller"></button></p>
          </div>
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