
import React, { Component, Fragment} from 'react';
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
// import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import NavBar from '../NavBar/NavBar';
import List from '@material-ui/icons/List';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';


class CreateActivator extends Component {
  
  componentDidMount(){
    this.props.dispatch({type:'GET_CLASS'});
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });
  }


  state={
    newActivator: {
      class_id: '',
      date: '',
      time_start: '',
      time_end: '',
      question_type: '',
      question: '',
    },
    multipleChoiceOptions:{
      mc_a: '',
      mc_b: '',
      mc_c: '',
      mc_d: '',
    },
    labelWidth: 0,
  }

  clearInputs = () => {
    this.setState({
      newActivator: {
        class_id: '',
        date: '',
        time_start: '',
        time_end: '',
        question_type: '',
        question: '',
      },
      multipleChoiceOptions:{
        mc_a: '',
        mc_b: '',
        mc_c: '',
        mc_d: '',
      },
    })
    }
  

  handleChange = propertyName => {
    return(event) =>{
    this.setState({
        newActivator: {
            ...this.state.newActivator,
            [propertyName]: event.target.value,
        }
    });
  }
}

handleChangeMC = propertyName => {
  return(event) =>{
  this.setState({
      multipleChoiceOptions: {
          ...this.state.multipleChoiceOptions,
          [propertyName]: event.target.value,
      }
  });
}
}

handleSubmit = event => {
  event.preventDefault();

  console.log('in handleSubmit');
  this.props.dispatch({type: 'ADD_ACTIVATOR', payload:{newActivator: this.state.newActivator, multipleChoiceOptions:this.state.multipleChoiceOptions}});
  this.clearInputs();
}

displayMCOptions = () => {
  if(this.state.newActivator.question_type === 'Multiple_Choice_Question'){
    return(
      <Fragment>
      <FormControl>
      <InputLabel htmlFor="multiple_choice-a">A</InputLabel>
      <Input
        id="multiple_choice-a"
        startAdornment={
          <InputAdornment position="start">
            <List/>
          </InputAdornment>
        }
        value={this.state.multipleChoiceOptions.mc_a}
        onChange={this.handleChangeMC('mc_a')}
      />
    </FormControl>
    <FormControl>
     <InputLabel htmlFor="multiple_choice-b">B</InputLabel>
     <Input
       id="multiple_choice-b"
       startAdornment={
         <InputAdornment position="start">
           <List/>
         </InputAdornment>
       }
       value={this.state.multipleChoiceOptions.mc_b}
       onChange={this.handleChangeMC('mc_b')}
     />
   </FormControl>
   <FormControl>
     <InputLabel htmlFor="multiple_choice-c">C</InputLabel>
     <Input
       id="multiple_choice-c"
       startAdornment={
         <InputAdornment position="start">
           <List/>
         </InputAdornment>
       }
       value={this.state.multipleChoiceOptions.mc_c}
       onChange={this.handleChangeMC('mc_c')}
     />
   </FormControl>
   <FormControl>
     <InputLabel htmlFor="multiple_choice-d">D</InputLabel>
     <Input
       id="multiple_choice-d"
       startAdornment={
         <InputAdornment position="start">
           <List/>
         </InputAdornment>
       }
       value={this.state.multipleChoiceOptions.mc_d}
       onChange={this.handleChangeMC('mc_d')}
     />
   </FormControl>
   </Fragment>
    )
  }
}



  render() {
    console.log(this.state.newActivator);
    console.log(this.state.multipleChoiceOptions);
    const {classes} = this.props;
    return (
      <section>
        <NavBar/>
        <form className={classes.form}>
        <FormControl variant="outlined">
            <InputLabel
              ref={ref => {
                this.InputLabelRef = ref;
              }}
              htmlFor="class_id" >Select a Class </InputLabel>
            <Select
              value={this.state.newActivator.class_id}
              onChange={this.handleChange('class_id')}
              input={
                <OutlinedInput
                  labelWidth={this.state.labelWidth}
                  name="class_id"
                  id="class_id"
                  />}
                  >
                  {this.props.reduxState.classes.map( classes =>
                  <MenuItem value={classes.class_id} key={classes.class_id}>{classes.class_period}</MenuItem>
                  )}
            </Select>
            <FormHelperText>Required Field</FormHelperText>
        </FormControl>
        <br/>
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
                value={this.state.newActivator.date}
                onChange={this.handleChange('date')}
                   />
            <br/>
            <br/>

            <TextField
                id="time"
                label="Start Time"
                type="time"
                InputLabelProps={{
                shrink: true,
                }}
                inputProps={{
                step: 60, // 5 min
                }}
                variant="outlined"
                value={this.state.newActivator.time_start}
                onChange={this.handleChange('time_start')}
            />
            <br/>
            <br/>

            <TextField
                id="time"
                label="End Time"
                type="time"
                InputLabelProps={{
                shrink: true,
                }}
                inputProps={{
                step: 60, // 5 min
                }}
                variant="outlined"
                value={this.state.newActivator.time_end}
                onChange={this.handleChange('time_end')}
            />
            <br/>
            <br/>
            <Select
              value={this.state.newActivator.question_type}
              onChange={this.handleChange('question_type')}
              input={
                <OutlinedInput
                  labelWidth={this.state.labelWidth}
                  name="question_type"
                  id="question_type"
                  />}
                  >
                <MenuItem disabled>Choose a Question Type</MenuItem>
                <MenuItem value={'Text_Question'}>Text Question</MenuItem>
                <MenuItem value={'Multiple_Choice_Question'}>Multiple Choice Question</MenuItem>
            </Select>
            <br/>
            <br/>
            <TextField
                placeholder="Type Question Here"
                multiline={true}
                rows={6}
                variant="outlined"
                value={this.state.newActivator.question}
                onChange={this.handleChange('question')}
            />
            <br/>
            <br/>
            {this.displayMCOptions()}
            <Button onClick={this.handleSubmit}>Create Activator</Button>
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
  })






const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect( mapReduxStateToProps )(withStyles(styles)(CreateActivator));