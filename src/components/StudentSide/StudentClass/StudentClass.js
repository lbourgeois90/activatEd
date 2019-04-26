import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import LogoutButton from '../../LogOutButton/LogOutButton';
import NavBar from '../NavBar/NavBar';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


class StudentClass extends Component {

  state = {
    class_id: '',
    labelWidth: 0,
  }


  componentDidMount(){
    this.props.dispatch({type: 'GET_STUDENT_CLASS'})
  }
  

  handleSubmit = event => {
    event.preventDefault();
    console.log('in handleSubmit');
    console.log(this.state.class_id);
    this.props.dispatch({type:'GET_STUDENT_ACTIVATOR', payload: this.state.class_id});
    

  }


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
      <section>
          <NavBar/>
          <header>
          
              <h1>Get Student Classes</h1>
        
          </header>
          <FormControl>
            <TextField
              id="class_id"
              select
              label="Select"
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
          <Button onClick={this.handleSubmit}>Get Activator</Button>
      </section>
    );
  }
}
const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect( mapReduxStateToProps )(StudentClass)