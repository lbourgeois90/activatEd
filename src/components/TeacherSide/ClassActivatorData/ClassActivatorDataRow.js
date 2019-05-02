
import React, { Component} from 'react';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import Edit from '@material-ui/icons/Edit';
import Add from '@material-ui/icons/Add'

var moment = require('moment');


class ClassActivatorDataRow extends Component {

  state ={
    currentlyEditing: false,
    studentScore:{
        id: this.props.student.id,
        score: this.props.student.score,
    }
        

    }

//FUNCTION- on initilization of component--dispatch 'GET_CLASS' which is mapped through to population class dropdown
//dipatch "GET_STUDENT" to return student data for selected date and class
componentDidMount(){
  this.props.dispatch({type:'GET_CLASS'});
  this.props.dispatch({type:'GET_STUDENT'})
}

//FUNCTION-- will delete selected student answers from DB based on student_id
handleDelete = (event) => {
  event.preventDefault();
  console.log('in handleDelete');
  let id = event.currentTarget.value;
  console.log('Student_Answer_Id is:', id);
  this.props.dispatch({type:'DELETE_STUDENT_ANSWER', payload: {StudentId: id, ClassData: this.props.classData }});
}

//FUNCTION- on click of edit set currentlyEditing state to true to enable toggled conditional rendering--
//score table cell becomes input field
handleEdit = (event) => {
  console.log('in handleEdit');
  let id = event.currentTarget.value;
  console.log('Student_Answer_Id is:', id);
  this.setState({
    currentlyEditing: true,
  })
  console.log(this.state.currentlyEditing);


}

//FUNCTION- on click of add set currentlyEditing state to false to disable edit conditional rendering
//dispatch updatedStudent to saga to server to db to update student score
handleEditSubmit = (event) => {
    console.log('in handleEditSubmit');
    this.setState({
        currentlyEditing: false,
    })
    this.props.dispatch({type:'EDIT_STUDENT_ANSWER', payload: {StudentScore: this.state.studentScore, ClassData: this.props.classData }});
    // this.props.dispatch({type: 'GET_ANSWERS', payload: this.props.classData });
}

//FUNCTION- handle change for input-- set state with input values
handleChange = propertyName => {
    return(event) =>{
    
    this.setState({
        studentScore: {
            ...this.state.studentScore,
            [propertyName]: event.target.value,

        }
    });
  }
}





  render() {
    const {classes} = this.props;
    console.log(this.state.currentlyEditing);
    console.log(this.state.studentScore);
    return (
        <TableRow key={this.props.student.id} hover={true} className={classes.tableRowHover}>
        <TableCell className={classes.tableFontBody}>
            {moment(this.props.student.date).format('YYYY-MM-DD')}
        </TableCell>

        <TableCell className={classes.tableFontBody}>
            {this.props.student.first_name} {this.props.student.last_name}
            </TableCell>

        <TableCell className={classes.tableFontBody}>
            {this.props.student.question}
            </TableCell>

        <TableCell className={classes.tableFontBody}>
            { this.props.student.answer}
        </TableCell>

       
        <TableCell className={classes.tableFontBody}>
        { this.state.currentlyEditing === true ? <TextField onChange={this.handleChange('score')}/> : 
            this.props.student.score}
        </TableCell>

        <TableCell className={classes.tableFontBody}>
            { this.state.currentlyEditing === true ? 
                <IconButton aria-label="Add" onClick={this.handleEditSubmit}> <Add/> </IconButton> :
                <IconButton aria-label="Edit" onClick={this.handleEdit} >
              <Edit/>
           </IconButton>
            }
        </TableCell>

        <TableCell className={classes.tableFontBody}><IconButton aria-label="Delete" onClick={this.handleDelete} value={this.props.student.id}>
          <DeleteOutlinedIcon/>
          </IconButton>
        </TableCell>


        </TableRow>

        
    );
  }
}

const styles = theme => ({
  tableFontBody:{
    fontSize: '18px',
    color: '#543739',
  },

  })




const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect( mapReduxStateToProps )(withStyles(styles)(ClassActivatorDataRow));
