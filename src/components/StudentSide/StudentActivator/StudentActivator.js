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
    if (activatorBoolean === 0){
      activatorToDisplay = 
      <div className="activatorWait">
          <Typography variant="h3">Please wait for release of activator question</Typography>   
      </div>
    }

    if (activatorBoolean === 1 && (this.props.reduxState.activator.question_type == "Text_Question")) {
      activatorToDisplay = 
      <div className="activatorDisplayText">
              <Typography variant="h3">Question:</Typography>   
              <br/>
              <br/>
              <Typography variant="h4">{this.props.reduxState.activator.question}</Typography> 
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
              <Button onClick={this.handleSubmit}><Typography variant="h5">Add Answer</Typography></Button>
           </div>
    }

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
                <FormControlLabel className={classes.mcLabelText} value="a" control={<Radio />} label={<Typography variant="h5">{this.props.reduxState.multipleChoice.mc_a}</Typography>} />
                <FormControlLabel className={classes.mcLabelText} value="b" control={<Radio />} label={<Typography variant="h5">{this.props.reduxState.multipleChoice.mc_b}</Typography>}  />
                <FormControlLabel className={classes.mcLabelText} value="c" control={<Radio />} label={<Typography variant="h5">{this.props.reduxState.multipleChoice.mc_c}</Typography>}  />
                <FormControlLabel className={classes.mcLabelText} value="d" control={<Radio />} label={<Typography variant="h5">{this.props.reduxState.multipleChoice.mc_d}</Typography>}  />
              </RadioGroup>
             </div>
         
              <Button onClick={this.handleSubmit}><Typography variant="h5">Add Answer</Typography></Button>
           </div>
    }



    if (activatorBoolean === 2){
      activatorToDisplay = 
      <div className="activatorEnd">
          <Typography variant="h3">Question Time Period Has Ended</Typography>   
      </div>
    }
    return (
      <div className="activatorWrapper">
      <div className="studentActivatorHeader"> 
        <div className="logoutButtonStudentActivator"><LogoutButton/></div>
    
          <h3>Student Activator Page</h3>
        
      </div>
      {activatorToDisplay}
      {/* {this.props.reduxState.activatorConditional === false ? 
           <Paper>
              <Typography variant="h3">Question:</Typography>   
              <Typography variant="h6">{this.props.reduxState.activator.question}</Typography> 
              <TextField
                    placeholder="Type Question Here"
                    multiline={true}
                    rows={6}
                    variant="outlined"
                    value={this.state.newAnswer.answer}
                    onChange={this.handleChange('answer')}
                />    
              <Button onClick={this.handleSubmit}>Add Answer</Button>
           </Paper>
           :
          <Paper>
            <Typography variant="h3">Please wait for release of activator question</Typography>   
          </Paper>
    } */}
    
      </div>
    );
  }
}

const styles = theme => ({
  
  mcAnswers:{
    textAlign: 'center',
    
  },
  mcLabelText:{
    fontSize: '22px',
  }

  })




const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect(mapReduxStateToProps)(withStyles(styles)(StudentActivator));