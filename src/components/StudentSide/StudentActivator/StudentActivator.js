import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import LogoutButton from '../../LogOutButton/LogOutButton'
import qs from 'query-string';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IntervalTimer from 'react-interval-timer';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import './StudentActivator.css'
import { withStyles } from '@material-ui/core';
var moment = require('moment');


class StudentActivator extends Component {

  state={
    newAnswer:{
      answer: '',
      date: '',
      question_id: '',
      student_id: '',
    },
    counter: false,
  }

  //FUNCTION- on initialization of component-- uses query string to grab id from URL-- id is coming from previous view (StudentClass)
  //dispatch 'GET_STUDENT_ACTIVATOR' to get activator from DB based on student class and current date
  //dispatch 'SET_ACTIVATOR_BOOLEAN to check whether question is multiple choice-- determines conditional rendering
  //start set interval for start time- run every 10 seconds
  //start set interval for end time- run every 10 seconds
  componentDidMount(){
    const searchObject = qs.parse(this.props.location.search);
    console.log(searchObject.id);
    this.props.dispatch({type:'GET_STUDENT_ACTIVATOR', payload: searchObject});
    this.props.dispatch({type:'SET_ACTIVATOR_BOOLEAN', payload: 0})
    let startActivator = setInterval(this.activatorStartTimeCheck, 1000);
    this.setState({ startActivator: startActivator })
    let endActivator = setInterval(this.activatorEndTimeCheck, 10000);
    this.setState({endActivator: endActivator})
    
  }

  //FUNCTION- conditional used to check current time versus activator end time
  //IF end time is equal to current time-- dispatch 'SET_ACTIVATOR_BOOLEAN with payload for conditional rendering
  //clear interval for end time
activatorEndTimeCheck = () => {
  console.log('Current Time is', moment().format('HH:mm'))
  let time_end = this.props.reduxState.activator.time_end;
  console.log('End Time is', time_end);
  if(time_end == moment().format('HH:mm')){
      console.log('in IF STATEMENT activatorEndTime');
      this.props.dispatch({type:'SET_ACTIVATOR_BOOLEAN', payload: 2})
      clearInterval(this.state.endActivator);
  }
}

//FUNCTION- conditional used to check current time versus activator start time
  //IF start time is equal to current time or is after start time BUT before end time-- dispatch 'SET_ACTIVATOR_BOOLEAN with payload for conditional rendering
  //clear interval for end time
activatorStartTimeCheck=() => {
  console.log('Current Time is', moment().format('HH:mm'))
  let time_start = this.props.reduxState.activator.time_start;
  let time_end = this.props.reduxState.activator.time_end;
  console.log('Moment is', moment(time_start, "HH:mm"))
  console.log('Start Time is', time_start);
  if( time_start == moment().format("HH:mm") || moment().isAfter(moment(time_start, "HH:mm")) & moment().isBefore(moment(time_end, "HH:mm"))){
      console.log('in IF STATEMENT activatorstarttime');
      this.props.dispatch({type:'SET_ACTIVATOR_BOOLEAN', payload: 1})
      clearInterval(this.state.startActivator);
  }
}

//FUNCTION- handle change for input fields-- set state based on inputs-- adds question_id from activator reducer
//adds student_id from activator reducer
handleChange = propertyName => {
  return(event) =>{
  console.log('in handleChange');
  this.setState({
      newAnswer: {
          ...this.state.newAnswer,
          [propertyName]: event.target.value,
          date: moment().format('YYYY-MM-DD'),
          question_id: this.props.reduxState.activator.question_id,
          student_id: this.props.reduxState.activator.student_id,
      }
   });
  }
}

//FUNCTION- handle submit for submit button -- dispatch 'ADD_STUDENT_ANSWER'- does post request to server with student answer as payload
// then will redirect student to the submission view
handleSubmit = event => {
  event.preventDefault();
  console.log('in handleSubmit');
  this.props.dispatch({type:'ADD_STUDENT_ANSWER', payload: this.state.newAnswer});
  this.props.history.push('/submission');
}



  render() {
    const {classes} = this.props
    console.log(this.state.newAnswer);

    let activatorBoolean = this.props.reduxState.activatorConditional;
    let activatorToDisplay = null;

    //CONDITIONAL RENDERING-- if activatorConditional reducer has value of 0-- display wait for activator
    if (activatorBoolean === 0){
      activatorToDisplay = 
      <div className="activatorWait">
          <Typography variant="h3" className={classes.textColor}>Please wait for release of activator question</Typography>   
      </div>
    }

    //CONDITIONAL RENDERING-- if activatorConditional reducer has value of 1 and question_type is text_question
    //-- display text question 
    if (activatorBoolean === 1 && (this.props.reduxState.activator.question_type == "Text_Question")) {
      activatorToDisplay = 
      <div className="activatorDisplayText">
              <Typography variant="h3" className={classes.textColor}>Question:</Typography>   
              <br/>
              <br/>
              <Typography variant="h4" className={classes.textColor}>{this.props.reduxState.activator.question}</Typography> 
              <br/>
              <br/>
              <TextField
                    placeholder="Type Answer Here"
                    multiline={true}
                    rows={6}
                    variant="outlined"
                    value={this.state.newAnswer.answer}
                    onChange={this.handleChange('answer')}
                    style = {{width: 800}}
                />
                <br/>
                <br/>
              <Button size="large" onClick={this.handleSubmit}><Typography variant="h5" className={classes.textColor}>Add Answer</Typography></Button>
           </div>
    }

       //CONDITIONAL RENDERING-- if activatorConditional reducer has value of 1 and question_type is multiple_choice_question
       //-- display multiple choice question
    if (activatorBoolean === 1 && (this.props.reduxState.activator.question_type == "Multiple_Choice_Question")){
      activatorToDisplay = 
      <div className="activatorDisplayMC">
              <Typography variant="h3" className={classes.mcText}>Question:</Typography>   
              <br/>
              <br/>
              <Typography variant="h4" className={classes.mcText}>{this.props.reduxState.activator.question}</Typography> 
              <div className="mcAnswers">
              <RadioGroup
                aria-label=""
                name="mc_answer"
                value={this.state.newAnswer.answer}
                onChange={this.handleChange('answer')}
                className={classes.mcLabelText} 
              >
                <FormControlLabel className={classes.mcLabelText} value="a" control={<Radio />} label={<Typography variant="h5" className={classes.mcLabelText}>{this.props.reduxState.multipleChoice.mc_a}</Typography>} />
                <FormControlLabel className={classes.mcLabelText} value="b" control={<Radio />} label={<Typography variant="h5" className={classes.mcLabelText}>{this.props.reduxState.multipleChoice.mc_b}</Typography>}  />
                <FormControlLabel className={classes.mcLabelText} value="c" control={<Radio />} label={<Typography variant="h5" className={classes.mcLabelText}>{this.props.reduxState.multipleChoice.mc_c}</Typography>}  />
                <FormControlLabel className={classes.mcLabelText} value="d" control={<Radio />} label={<Typography variant="h5" className={classes.mcLabelText}>{this.props.reduxState.multipleChoice.mc_d}</Typography>}  />
              </RadioGroup>
             </div>
         
              <Button onClick={this.handleSubmit} color="primary"><Typography className={classes.mcLabelText} variant="h5">Add Answer</Typography></Button>
           </div>
    }


    //CONDITIONAL RENDERING-- if activatorConditional reducer has value of 2 and displays question time period has ended
    if (activatorBoolean === 2){
      activatorToDisplay = 
      <div className="activatorEnd">
          <Typography variant="h3" className={classes.textColor}>Question Time Period Has Ended</Typography>   
      </div>
    }
    return (
      <div className="activatorWrapper">
      <div className="studentActivatorHeader"> 
        <div className="logoutButtonStudentActivator"><LogoutButton/></div>
    
          <h3 className="studentActivatorHeaderText">Student Activator Page</h3>
        
      </div>
          {activatorToDisplay}
      </div>
    );
  }
}

const styles = theme => ({
  
  mcAnswers:{
    textAlign: 'center',
    color: '#303c6c',
    
  },
  mcLabelText:{
    fontSize: '22px',
    color: '#303c6c',
  },
  textColor:{
    color: '#303c6c',
  },
  mcText:{
    color: '#303c6c',
  }

  })




const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect(mapReduxStateToProps)(withStyles(styles)(StudentActivator));