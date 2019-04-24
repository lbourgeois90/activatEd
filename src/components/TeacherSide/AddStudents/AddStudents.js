
import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import Stepper from 'react-stepper-horizontal';
import TextField from '@material-ui/core/TextField'
import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl'
// import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import swal from '@sweetalert/with-react'
import FormHelperText from '@material-ui/core/FormHelperText';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import AddStudentsTable from './AddStudentsTable';

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

  addAnotherStudent = event => {
    event.preventDefault();
    console.log('in addAnotherStudent');
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


  render() {
    // console.log(this.state.newStudent);
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
              value={this.state.newStudent.username}
              helperText="Required Field"
              onChange={this.handleChange('username')}
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
          <FormControl className={classes.formControl}>
              <IconButton color="primary" onClick={this.addAnotherStudent} size="large">Add Another Student</IconButton>
          </FormControl>
          <br/>
          <FormControl className={classes.formControl}>
              <IconButton color="primary" onClick={this.handleSubmit} size="large">Add Student and Submit</IconButton>
          </FormControl>
        </form>
        <AddStudentsTable/>
        {/* <Table className={classes.table}>
          <TableHead >
              <TableRow>
                <TableCell className={classes.tableFontHeader}>Date Added</TableCell>
                <TableCell className={classes.tableFontHeader}>Student First Name</TableCell>
                <TableCell className={classes.tableFontHeader}>Student Last Name</TableCell>
                <TableCell className={classes.tableFontHeader}>Class Name</TableCell>
                <TableCell className={classes.tableFontHeader}>Class Period</TableCell>
                <TableCell className={classes.tableFontHeader}>Delete Student</TableCell>
              </TableRow>
          </TableHead>
          <TableBody>
            {this.props.reduxState.student.map( (student) =>
                <TableRow key={student.id} hover={true} className={classes.tableRowHover}>
                      <TableCell className={classes.tableFontHeader}>{moment(student.date_added).format('YYYY-MM-DD')}</TableCell>
                      <TableCell className={classes.tableFontHeader}>{student.first_name}</TableCell>
                      <TableCell className={classes.tableFontHeader}>{student.last_name}</TableCell>
                      <TableCell className={classes.tableFontHeader}>{student.class_name}</TableCell>
                      <TableCell className={classes.tableFontHeader}>{student.class_period}</TableCell>
                      <TableCell className={classes.tableFontHeader}><IconButton aria-label="Delete" onClick={this.handleDelete} value={student.id}>
                        <DeleteOutlinedIcon/>
                        </IconButton>
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
      </Table>              */}

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
  table:{
    width: '90%',
    margin: '0 auto',
    marginBottom: '50px',
    marginTop: '100px',
   },
   
   tableFont:{
     fontSize: '22px',
     color: '#ff65af',
   },
   tableFontHeader:{
     fontSize: '22px',
     color: '#ff65af',
   },
   tableFontCenter:{
     fontSize: '22px',
     textAlign: '#ff65af',
     color: '#ff65af',
   },
   tableFontHeaderCenter:{
     fontSize: '22px',
     textAlign: 'center',
     color: '#ff65af' 
   },
   tableRowHover: {
     '&:hover': {
       backgroundColor: 'primary',
     },
   },
  })




const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect( mapReduxStateToProps )(withStyles(styles)(AddStudents));