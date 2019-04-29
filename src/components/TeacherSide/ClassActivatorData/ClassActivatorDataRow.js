
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


componentDidMount(){
  this.props.dispatch({type:'GET_CLASS'});
  this.props.dispatch({type:'GET_STUDENT'})
}


handleDelete = (event) => {
  event.preventDefault();
  console.log('in handleDelete');
  let id = event.currentTarget.value;
  console.log('Student_Answer_Id is:', id);
  this.props.dispatch({type:'DELETE_STUDENT_ANSWER', payload: {StudentId: id, ClassData: this.props.classData }});
}

handleEdit = (event) => {
  console.log('in handleEdit');
  let id = event.currentTarget.value;
  console.log('Student_Answer_Id is:', id);
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
    this.props.dispatch({type:'EDIT_STUDENT_ANSWER', payload: {StudentScore: this.state.studentScore, ClassData: this.props.classData }});
    // this.props.dispatch({type: 'GET_ANSWERS', payload: this.props.classData });
}

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
        <TableCell className={classes.tableFontHeader}>
            {moment(this.props.student.date).format('YYYY-MM-DD')}
        </TableCell>

        <TableCell className={classes.tableFontHeader}>
            {this.props.student.first_name} {this.props.student.last_name}
            </TableCell>

        <TableCell className={classes.tableFontHeader}>
            {this.props.student.question}
            </TableCell>

        <TableCell className={classes.tableFontHeader}>
            { this.props.student.answer}
        </TableCell>

       
        <TableCell className={classes.tableFontHeader}>
        { this.state.currentlyEditing === true ? <TextField onChange={this.handleChange('score')}/> : 
            this.props.student.score}
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

export default connect( mapReduxStateToProps )(withStyles(styles)(ClassActivatorDataRow));
