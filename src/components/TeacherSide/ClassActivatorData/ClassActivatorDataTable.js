
import React, { Component} from 'react';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ClassActivatorDataRow from './ClassActivatorDataRow';


var moment = require('moment');


class ClassActivatorDataTable extends Component {


  render() {
    const {classes} = this.props;
    return (

        <div className="activatorDataTableDiv">
          <Table className={classes.table}>
            <TableHead >
                <TableRow>
                  <TableCell className={classes.tableFontHeader}>Date Assigned</TableCell>
                  <TableCell className={classes.tableFontHeader}>Student Name</TableCell>
                  <TableCell className={classes.tableFontHeader}>Activator Question</TableCell>
                  <TableCell className={classes.tableFontHeader}>Student Answer</TableCell>
                  <TableCell className={classes.tableFontHeader}>Score</TableCell>
                  <TableCell className={classes.tableFontHeader}>Edit Score</TableCell>
                  <TableCell className={classes.tableFontHeader}>Delete</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
              {this.props.reduxState.classData.map( (student) =>
                  <ClassActivatorDataRow key={student.id} student={student} classData={this.props.classData}/> 
              )}
            </TableBody>
        </Table>   
      </div>          
    );
  }
}

const styles = theme => ({
 
  addStudents:{
    textAlign: 'center',
  },
  table:{
    width: '90%',
    margin: '0 auto',
    marginBottom: '50px',
    marginTop: '100px',
    backgroundImage: 'background-image: linear-gradient(to right, rgb(189, 186, 169, 0), rgb(189, 186, 169, 1))',
   },
   
   tableFont:{
     fontSize: '22px',
     color: '#303c6c',
   },
   tableFontHeader:{
     fontSize: '22px',
     color: '#303c6c',
   },
   tableFontCenter:{
     fontSize: '22px',
     color: '#303c6c',
   },
   tableFontHeaderCenter:{
     fontSize: '22px',
     textAlign: 'center',
     color: '#303c6c' 
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

export default connect( mapReduxStateToProps )(withStyles(styles)(ClassActivatorDataTable));