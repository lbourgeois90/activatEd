
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
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import NavBar from '../NavBar/NavBar';

var moment = require('moment');


class ClassActivatorData extends Component {


  state= {
    selectedClass: '',
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
    // this.props.dispatch({type:'ADD_STUDENT', payload: this.state.newStudent});
    // this.setState({
    //   newStudent: {
    //     date_added: '',
    //     username: '',
    //     first_name: '',
    //     last_name: '',
    //     class_id: '',
    //     password: '',
    //     permissions: '',
    //   },
    // })
    // this.props.history.push('/welcome');
  }


  handleChange = propertyName => {
    return(event) =>{
    
    this.setState({
        selectedClass: event.target.value,
    })
  }
  this.props.dispatch({type:'GET_ANSWERS', payload: this.state.selectedClass});
}

handleDelete = (event) => {
  event.preventDefault();
  console.log('in handleDelete');
//   let studentId = event.currentTarget.value;
//   console.log('Student Id is:', studentId);
//   this.props.dispatch({type:'DELETE_STUDENT', payload: studentId});
}


  render() {
    console.log(this.state.selectedClass);
    const {classes} = this.props;
    return (
      <section>
       <NavBar/>
       <Typography>Period</Typography>
        <form className={classes.form}>
          <FormControl variant="outlined">
              <InputLabel
                ref={ref => {
                  this.InputLabelRef = ref;
                }}
                htmlFor="class_id" >Select a Class </InputLabel>
              <Select
                value={this.state.selectedClass.class_id}
                onChange={this.handleChange('class_id')}
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
          </FormControl>
          <br/>
        </form>
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

export default connect( mapReduxStateToProps )(withStyles(styles)(ClassActivatorData));