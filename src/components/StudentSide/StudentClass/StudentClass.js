import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogoutButton from '../../LogOutButton/LogOutButton';
import NavBar from '../NavBar/NavBar';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';


class StudentClass extends Component {

  state = {
    class_id: '',
  }


  componentDidMount(){
    this.props.dispatch({type: 'GET_STUDENT_CLASS'})
  }
  

  handleSubmit = event => {
    event.preventDefault();
    console.log('in handleSubmit');
    this.setState({
     
    })
    this.props.history.push('/welcome');
  }


  handleChange = propertyName => {
    return(event) =>{
    
    this.setState({
     

        })
  }
}

  render() {
    return (
      <section>
          <NavBar/>
          <header>
          
              <h1>Get Student Classes</h1>
        
          </header>
          <FormControl>
                <InputLabel
                    ref={ref => {
                      this.InputLabelRef = ref;
                    }}
                    htmlFor="class_id" >Select a Class 
                </InputLabel>
                <Select
                    value={this.state.class_id}
                    onChange={this.handleChange('class_id')}
                    input={
                      <OutlinedInput
                        labelWidth={this.state.labelWidth}
                        name="class_id"
                        id="class_id"
                        />}
                        >
                        <MenuItem disabled>Select a Class</MenuItem>
                        {this.props.reduxState.studentClass.map( classes =>
                        <MenuItem value={classes.class_id} key={classes.class_id}>{classes.class_period}</MenuItem>
                        )}
                </Select>
              <FormHelperText>Required Field</FormHelperText>
          </FormControl>
          <Button onClick={this.handleNext}>Get Activator</Button>
      </section>
    );
  }
}
const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect( mapReduxStateToProps )(StudentClass)