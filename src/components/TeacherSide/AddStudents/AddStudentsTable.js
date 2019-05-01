
import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';

import FormHelperText from '@material-ui/core/FormHelperText';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import Edit from '@material-ui/icons/Edit';
import AddStudentRow from './AddStudentsRow';



var moment = require('moment');


class AddStudentsTable extends Component {

  state ={
    currentlyEditing: false,
  }


  componentDidMount(){
    this.props.dispatch({type:'GET_CLASS'});
    this.props.dispatch({type:'GET_STUDENT'})
  }


handleDelete = (event) => {
  event.preventDefault();
  console.log('in handleDelete');
  let studentId = event.currentTarget.value;
  console.log('Student Id is:', studentId);
  this.props.dispatch({type:'DELETE_STUDENT', payload: studentId});
}

handleEdit = (event) => {
  console.log('in handleEdit');
  let studentId = event.currentTarget.value;
  console.log(studentId);
  this.setState({
    currentlyEditing: true,
  })
  console.log(this.state.currentlyEditing);


}


  render() {
    const {classes} = this.props;
    console.log(this.state.currentlyEditing);
    return (
      <section>

        <Table className={classes.table}>
          <TableHead >
              <TableRow>
                <TableCell className={classes.tableFontHeader}>Date Added</TableCell>
                <TableCell className={classes.tableFontHeader}>Student ID</TableCell>
                <TableCell className={classes.tableFontHeader}>Student First Name</TableCell>
                <TableCell className={classes.tableFontHeader}>Student Last Name</TableCell>
                <TableCell className={classes.tableFontHeader}>Class Period</TableCell>
                <TableCell className={classes.tableFontHeader}>Edit Student</TableCell>
                <TableCell className={classes.tableFontHeader}>Delete Student</TableCell>
              </TableRow>
          </TableHead>
          <TableBody>
            {this.props.reduxState.student.map( (student) =>
                <AddStudentRow key={student.id} student={student}/> 
            )}
          </TableBody>
      </Table>             

      </section>
    );
  }
}

const styles = theme => ({

  table:{
    width: '90%',
    margin: '0 auto',
    marginBottom: '50px',
    marginTop: '100px',
   },
   
  
   tableFontHeader:{
     fontSize: '22px',
     color: '#303c6c',
   },
  })




const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect( mapReduxStateToProps )(withStyles(styles)(AddStudentsTable));