
import React, { Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InsertChartOutlined from '@material-ui/icons/InsertChartOutlined';
import ClassActivatorDataTable from './ClassActivatorDataTable';
import ArrowBack from '@material-ui/icons/ArrowBack';
import './ClassActivatorData.css';

var moment = require('moment');


class ClassActivatorData extends Component {


  state= {
    classData:{
        class_id: '',
        date: '',
    },
  }


//FUNCTION- on initilization of component--dispatch 'GET_CLASS' which is mapped through to population class dropdown
  componentDidMount(){
    this.props.dispatch({type:'GET_CLASS'});
  }

  //on Click of Get Activators will prevent reload-- dispatch 'GET_ANSWERS' to get student answers for selected class and date
  handleSubmit =(event)=>{
    event.preventDefault();
    console.log('in handleSubmit');
     this.props.dispatch({type:'GET_ANSWERS', payload: this.state.classData});
  }


  //FUNCTION- handle change for input fields and sets state based on inputs
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

//FUNCTION-- will delete selected student answers from DB based on student_id
handleDelete = (event) => {
  event.preventDefault();
  console.log('in handleDelete');
  let studentId = event.currentTarget.value;
  console.log('Student Id is:', studentId);
  this.props.dispatch({type:'DELETE_STUDENT', payload: studentId});
}

//FUNCTION- on click of back to homepage will redirect user to WELCOME view
backToHomepage = () => {
  this.props.history.push('/home')
}


  render() {
    console.log(this.state.classData);
    const {classes} = this.props;
    return (
      <section className="classActivatorDataSection">
        <div className="activatorClassDataHeaderDiv">
          <Button onClick={this.backToHomepage} size="large" color="primary" className="backButtonClassData"><ArrowBack color="primary"/>Back to Homepage</Button>
          <h1 className="classDataHeader">Class Data</h1>
        </div>
       
        <div className="classDataFormDiv">
          
          <form className="classDataForm">
                <FormControl className={classes.classDataFormControlClassPeriod}>
                    <TextField
                      id="class_id"
                      select
                      label="Select A Class Period"
                      value={this.state.classData.class_id}
                      onChange={this.handleChange('class_id')}
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu,
                        },
                      }}
                      margin="normal"
                      variant="outlined"
                      style = {{width: 400}}
                      required
                    >
                      <MenuItem disabled>Select a Class Period</MenuItem>
                      {this.props.reduxState.classes.map( classes =>
                            <MenuItem value={classes.class_id} key={classes.class_id}>{classes.class_period}</MenuItem>
                            )}
                          
                    </TextField>
                </FormControl>

                <FormControl className={classes.classDataFormControlDate}>
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
                      require
                      style = {{width: 400}}
                        />
                </FormControl>
            <br/>
            <Button onClick={this.handleSubmit} color="primary" size="large"><InsertChartOutlined/> Get Activators</Button>
            <br/>
          </form>

        </div>         
        <ClassActivatorDataTable classData={this.state.classData}/>

      </section>
    );
  }
}

const styles = theme => ({

  classDataFormControlDate:{
    paddingRight: '10px',
    marginTop: '15px'
},


classDataFormControlClassPeriod:{
    marginRight: '25px',
}

})





const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect( mapReduxStateToProps )(withStyles(styles)(ClassActivatorData));