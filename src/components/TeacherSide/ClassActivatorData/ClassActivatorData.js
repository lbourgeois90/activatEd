
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
import InsertChartOutlined from '@material-ui/icons/InsertChartOutlined';
import ClassActivatorDataTable from './ClassActivatorDataTable';
import ClassActivatorDataRow from './ClassActivatorDataRow';
import ArrowBack from '@material-ui/icons/ArrowBack';
import './ClassActivatorData.css';

var moment = require('moment');


class ClassActivatorData extends Component {


  state= {
    classData:{
        class_id: '',
        date: '',
    },
    labelWidth: 0,
  }



  componentDidMount(){
    this.props.dispatch({type:'GET_CLASS'});
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });
  }

  handleSubmit =(event)=>{
    event.preventDefault();
    console.log('in handleSubmit');
     this.props.dispatch({type:'GET_ANSWERS', payload: this.state.classData});
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
        classData: {
            ...this.state.classData,
            [propertyName]: event.target.value,
        }
    })
  }
}

handleDelete = (event) => {
  event.preventDefault();
  console.log('in handleDelete');
//   let studentId = event.currentTarget.value;
//   console.log('Student Id is:', studentId);
//   this.props.dispatch({type:'DELETE_STUDENT', payload: studentId});
}

backToHomepage = () => {
  this.props.history.push('/home')
}


  render() {
    console.log(this.state.classData);
    const {classes} = this.props;
    return (
      <section className="classActivatorDataSection">
        <div className="activatorClassDataHeaderDiv">
          <img src="/images/passionHeader.png" width="100%" className="passionImage"></img>
        </div>
        <div className="backButtonDiv">
        <Button onClick={this.backToHomepage} size="large" color="primary" className="backButtonClassData"><ArrowBack color="primary"/>Back to Homepage</Button>
        </div>


        <div className="classDataFormDiv">
        
          <form className="classDataForm">

            <FormControl variant="outlined">
                <InputLabel
                  ref={ref => {
                    this.InputLabelRef = ref;
                  }}
                  htmlFor="class_id" >Select a Class </InputLabel>
                <Select
                  value={this.state.classData.class_id}
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
                <br/>
                <br/>
                <TextField
                  id= "date"
                  label="Assigned Date"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                        }}
                  variant="outlined"
                  value={this.state.classData.date}
                  onChange={this.handleChange('date')}
                    />
              <br/>
            </FormControl>
            <br/>
            <Button onClick={this.handleSubmit} color="primary"><InsertChartOutlined/> Get Activators</Button>
            <br/>
          </form>

        </div>

        <ClassActivatorDataTable classData={this.state.classData}/>

      </section>
    );
  }
}

const styles = theme => ({

})





const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect( mapReduxStateToProps )(withStyles(styles)(ClassActivatorData));