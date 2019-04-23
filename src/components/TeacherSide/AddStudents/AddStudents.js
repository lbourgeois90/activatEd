
import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import Stepper from 'react-stepper-horizontal';
import TextField from '@material-ui/core/TextField'
import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl'
// import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import swal from '@sweetalert/with-react'
import FormHelperText from '@material-ui/core/FormHelperText';

var moment = require('moment');


class AddStudents extends Component {

  teacherReducerStuff = this.props.reduxState.teacher.id;

  state= {
    newStudent: {
      date_added: '',
      student_id: '',
      first_name: '',
      last_name: '',
      class_id: '',
      password: '',
    },
    labelWidth: 0,
  }



  componentDidMount(){
    this.props.dispatch({type:'GET_CLASS'});
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log('in handleSubmit');
    this.props.dispatch({type:'ADD_CLASS', payload: this.state.newClass});
    this.props.history.push('/addstudents');
  }

  addAnotherClass = event => {
    // event.preventDefault();
    // console.log('in handleSubmit');
    // this.props.dispatch({type:'ADD_CLASS', payload: this.state.newClass});
    // alert(`Class Has Been Added!`);
    // this.setState({
    //   newClass: {
    //     class_name : '',
    //     class_period: '',
    //     teacher_id: '',
    //   }
    // })
  }

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




  render() {
    // console.log(this.state.newClass);
    const {classes} = this.props;
    return (
      <section>
        <Stepper steps={ [{title: 'Create Username and Password'}, {title: 'Create Profile'}, {title: 'Create Classes'}, {title: 'Add Students'}] } activeStep={ 3 } activeColor= '#814fff' defaultBarColor= '#814fff' activeTitleColor= '#814fff' defaultTitleColor= '#814fff' circleFontColor='#0B172A' className="stepper" completeColor="#ffbe5c" completeTitleColor="#463940" />
        <Typography variant="h4" className={classes.addStudents}>Add Students to Class</Typography>
        
        <form className={classes.form}>
          <FormControl variant="outlined">
              <InputLabel
                ref={ref => {
                  this.InputLabelRef = ref;
                }}
                htmlFor="class_id" >Select a Class </InputLabel>
              <Select
                value={this.state.newStudent.class_id}
                onChange={this.handleChange('class_id')}
                input={
                  <OutlinedInput
                    labelWidth={this.state.labelWidth}
                    name="class_id"
                    id="class_id"
                    />}
                    >
                    {this.props.reduxState.classes.map( classes =>
                    <MenuItem value={classes.class_id} key={classes.class_id}>{classes.class_period}</MenuItem>
                    )}
              </Select>
              <FormHelperText>Required Field</FormHelperText>
          </FormControl>
          <br/>
          <FormControl className={classes.formControl}>
              <TextField label="Student ID" variant="outlined" color="primary"
              value={this.state.newStudent.student_id}
              helperText="Required Field"
              onChange={this.handleChange('student_id')}
              ></TextField>
          </FormControl>
          <FormControl className={classes.formControl}>
              <TextField label="Student First Name" variant="outlined" color="primary"
              value={this.state.newStudent.first_name}
              helperText="Required Field"
              onChange={this.handleChange('first_name')}
              ></TextField>
          </FormControl>
          <br/>
          <FormControl className={classes.formControl}>
              <TextField label="Student Password" variant="outlined" color="primary"
              value={this.state.newStudent.password}
              helperText="Required Field"
              onChange={this.handleChange('password')}
              ></TextField>
          </FormControl>
          <FormControl className={classes.formControl}>
              <TextField label="Student Last Name" variant="outlined" color="primary"
              value={this.state.newStudent.last_name}
              helperText="Required Field"
              onChange={this.handleChange('last_name')}
              ></TextField>
          </FormControl>
          <br/>





        </form>


        {/* <form className={classes.form}>
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
        </form> */}

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
  addStudents:{
    textAlign: 'center',
  },
  })




const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect( mapReduxStateToProps )(withStyles(styles)(AddStudents));