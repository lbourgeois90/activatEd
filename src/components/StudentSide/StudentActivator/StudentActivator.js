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
var moment = require('moment');


class StudentActivator extends Component {

  state={
    newAnswer:{
      answer: '',
    },
    counter: false,
  }

  componentDidMount(){
    const searchObject = qs.parse(this.props.location.search);
    console.log(searchObject.id);
    this.props.dispatch({type:'GET_STUDENT_ACTIVATOR', payload: searchObject});
    this.props.dispatch({type:'SET_ACTIVATOR_BOOLEAN', payload: 0})
    let startActivator = setInterval(this.activatorStartTimeCheck, 10000);
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
  if(moment().isSameOrAfter(moment(time_start, "HH:mm"))){
      console.log('in IF STATEMENT activatorstarttime');
      this.props.dispatch({type:'SET_ACTIVATOR_BOOLEAN', payload: 1})
      clearInterval(this.state.startActivator);
  }
}

handleChange = () => {
  console.log('in handleChange');
}








  render() {
    let activatorBoolean = this.props.reduxState.activatorConditional;
    let activatorToDisplay = null;
    if (activatorBoolean === 0){
      activatorToDisplay = 
      <Paper>
          <Typography variant="h3">Please wait for release of activator question</Typography>   
      </Paper>
    }

    if (activatorBoolean === 1){
      activatorToDisplay = 
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
    }

    if (activatorBoolean === 1 && this.props.reduxState.multipleChoice.length !== 0){
      activatorToDisplay = 
      <Paper>
              <Typography variant="h3">Question:</Typography>   
              <Typography variant="h6">{this.props.reduxState.activator.question}</Typography> 
              <RadioGroup
                aria-label=""
                name="mc_answer"
                value={this.state.answer}
                onChange={this.handleChange('answer')}
              >
                <FormControlLabel value="a" control={<Radio />} label={this.props.reduxState.multipleChoice.mc_a} />
                <FormControlLabel value="b" control={<Radio />} label={this.props.reduxState.multipleChoice.mc_b}  />
                <FormControlLabel value="c" control={<Radio />} label={this.props.reduxState.multipleChoice.mc_c}  />
                <FormControlLabel value="d" control={<Radio />} label={this.props.reduxState.multipleChoice.mc_d}  />
                />
              </RadioGroup>
         
              <Button onClick={this.handleSubmit}>Add Answer</Button>
           </Paper>
    }



    if (activatorBoolean === 2){
      activatorToDisplay = 
      <Paper>
          <Typography variant="h3">Question Time Period Has Ended</Typography>   
      </Paper>
    }
    return (
      <section>
      <header>
         <h1>Student Activator Page</h1>
         <LogoutButton/>
      </header>
      <div className="activatorArea">
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
      </section>
    );
  }
}
const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect( mapReduxStateToProps )(StudentActivator);