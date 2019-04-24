
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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import Edit from '@material-ui/icons/Edit';
import Add from '@material-ui/icons/Add'

var moment = require('moment');


class AddStudentsRow extends Component {

  state ={
    currentlyEditing: false,
    updatedStudent: {
        id: this.props.student.id,
        date_added: moment(this.props.student.date_added).format('YYYY-MM-DD'),
        username: this.props.student.student_id,
        first_name: this.props.student.first_name,
        last_name: this.props.student.last_name,
        class_id: this.props.student.class_id,
        userId: this.props.student.user_id,
        

    }
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

handleEditSubmit = (event) => {
    console.log('in handleEditSubmit');
    this.setState({
        currentlyEditing: false,
    })
    this.props.dispatch({type:'EDIT_STUDENT', payload: this.state.updatedStudent});
}

handleChange = propertyName => {
    return(event) =>{
    
    this.setState({
        updatedStudent: {
            ...this.state.updatedStudent,
            [propertyName]: event.target.value,
            student_id: this.state.updatedStudent.username,

        }
    });
  }
}





  render() {
    const {classes} = this.props;
    console.log(this.state.currentlyEditing);
    console.log(this.state.updatedStudent);
    return (
        <TableRow key={this.props.student.id} hover={true} className={classes.tableRowHover}>
        <TableCell className={classes.tableFontHeader}>
            {moment(this.props.student.date_added).format('YYYY-MM-DD')}
        </TableCell>

        <TableCell className={classes.tableFontHeader}>
            {this.state.currentlyEditing === true ? <TextField onChange={this.handleChange('username')} defaultValue={`${this.props.student.student_id}`}/> : 
            this.props.student.student_id}
            </TableCell>

        <TableCell className={classes.tableFontHeader}>
            { this.state.currentlyEditing === true ? <TextField onChange={this.handleChange('first_name')} defaultValue={`${this.props.student.first_name}`}/> : 
            this.props.student.first_name}
            </TableCell>

        <TableCell className={classes.tableFontHeader}>
            { this.state.currentlyEditing === true ? <TextField onChange={this.handleChange('last_name')} defaultValue={`${this.props.student.last_name}`}/> : 
            this.props.student.last_name}
        </TableCell>

        <TableCell className={classes.tableFontHeader}>
            { this.state.currentlyEditing === true ?  
            <Select
                    value={this.state.updatedStudent.class_id}
                    onChange={this.handleChange('class_id')}>
                        {this.props.reduxState.classes.map( classes =>
                        <MenuItem value={classes.class_id} key={classes.class_id}>{classes.class_period}</MenuItem>
                        )}
            </Select> : this.props.student.class_period}
        </TableCell>
       
        <TableCell className={classes.tableFontHeader}>
            { this.state.currentlyEditing === true ? 
                <IconButton aria-label="Add" onClick={this.handleEditSubmit}> <Add/> </IconButton> :
                <IconButton aria-label="Edit" onClick={this.handleEdit} >
              <Edit/>
           </IconButton>
            }
        </TableCell>

        <TableCell className={classes.tableFontHeader}><IconButton aria-label="Delete" onClick={this.handleDelete} value={this.props.student.id}>
          <DeleteOutlinedIcon/>
          </IconButton>
        </TableCell>

        </TableRow>

        
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

export default connect( mapReduxStateToProps )(withStyles(styles)(AddStudentsRow));
