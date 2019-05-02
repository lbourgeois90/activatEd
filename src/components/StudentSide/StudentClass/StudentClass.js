import React, { Component} from 'react';
import { connect } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './StudentClass.css'

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


  //FUNCTION- on initialization of component-- dipsatch 'GET_STUDENT_CLASS' to get classes associated with logged in student
  //-- stored in reducer-- map through reducer to create select drop down for students to choose their class
  componentDidMount(){
    this.props.dispatch({type: 'GET_STUDENT_CLASS'})
  }
  

  //FUNCTION- on click of Get Activator button-- prevents reload of page-- gets class_id from state (from select)
  //sends class_id in query string URL to '/studentActivator' will be used in getting activator from DB
  handleGetActivator = event => {
    event.preventDefault();
    console.log('in handleSubmit');
    console.log(this.state.class_id);
    let class_id= this.state.class_id;
    this.props.history.push(`/studentactivator/?id=${class_id}`);
  }


  //FUNCTION- handle change for inputs-- sets state with input values
  handleChange = propertyName => {
    return(event) =>{
    
    this.setState({
        ...this.state,
        [propertyName]: event.target.value,
        })
  }
}


  render() {
    console.log(this.state.class_id);
    return (
      <section className="studentClassSection">
          <header>
          <h3 className="selectClassHeader">Select Your Class</h3>
          </header>
          <div className="studentClassFormDiv">
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
                    required
                    style = {{width: 400}}
                  >
                    {this.props.reduxState.studentClass.map( classes =>
                              <MenuItem value={classes.id} key={classes.id}>{classes.class_period}</MenuItem>
                            )}
                  </TextField>
                </FormControl>
                <br/>
                <Button size="large" color="primary" onClick={this.handleGetActivator}>Get Activator</Button>
            </form>
          </div>
      </section>
    );
  }
}
const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect( mapReduxStateToProps )(StudentClass)