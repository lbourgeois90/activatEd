import React, { Component} from 'react';
import { connect } from 'react-redux';
import NavBar from '../NavBar/NavBar';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

var moment = require('moment');


class StudentClass extends Component {

  currentTime= moment().format('HH:mm:ss')

  state = {
    class_id: '',
    labelWidth: 0,
    togglePageDisplay: true,
    currentActivatorState: 0,
    newAnswer:{
      answer: '',
    }
  }


  componentDidMount(){
    this.props.dispatch({type: 'GET_STUDENT_CLASS'})
  }
  

  handleGetActivator = event => {
    event.preventDefault();
    console.log('in handleSubmit');
    console.log(this.state.class_id);
    let class_id= this.state.class_id;
    this.props.history.push(`/studentactivator/?id=${class_id}`);
    // this.setState({
    //   togglePageDisplay: false,
    // })
    // this.trigger();
    

  }

  trigger() {
    setInterval(() => { 
        this.activatorTimeCheck();
    }, 10000);
}



  handleChange = propertyName => {
    return(event) =>{
    
    this.setState({
        ...this.state,
        [propertyName]: event.target.value,
        })
  }
}

handleSubmit = (event) => {

}

activatorTimeCheck=() => {
  console.log('Time is', moment().format('HH:mm'))
  let time_start = this.props.reduxState.activator.time_start;
  let time_end = this.props.reduxState.activator.time_end;
  console.log('Start Time is', time_start);
  console.log('End Time is', time_end);
  if(time_start == moment().format('HH:mm')){
      console.log('in IF STATEMENT activatorstarttime');
    return (
      this.setState({
        currentActivatorState: 1,
      })
    )
  }
  if(time_end == moment().format('HH:mm')){
    console.log('in IF STATEMENT activatorendtime');
    return(
      this.setState({
        currentActivatorState: 2,
      })
    )
  }
}



  render() {
    console.log(this.state.class_id);
    return (
      <section>
          <NavBar/>
          <header>
        
          </header>
          <form>
              <FormControl>
                <TextField
                  id="class_id"
                  select
                  label="Select A Class"
                  value={this.state.class_id}
                  onChange={this.handleChange('class_id')}
                  helperText="Please select your class"
                  margin="normal"
                  variant="outlined"
                >
                  {this.props.reduxState.studentClass.map( classes =>
                            <MenuItem value={classes.id} key={classes.id}>{classes.class_period}</MenuItem>
                          )}
                </TextField>
              </FormControl>
              <br/>
              <Button onClick={this.handleGetActivator}>Get Activator</Button>
          </form>
      </section>
    );
  }
}
const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect( mapReduxStateToProps )(StudentClass)