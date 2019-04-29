import React, { Component, Fragment} from 'react';
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField'
import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/icons/List';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import LogoutButton from '../../LogOutButton/LogOutButton';
import './CreateActivator.css';

class CreateActivator extends Component {
  
  componentDidMount(){
    this.props.dispatch({type:'GET_CLASS'});
    this.props.dispatch({type:'GET_RANDOM_QUESTION'})
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
   <br/>
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
   <br/>
   </Fragment>
    )
  }
}



  render() {
    console.log(this.state.newActivator);
    console.log(this.state.multipleChoiceOptions);
    const {classes} = this.props;
    return (
      <div className="wrapper1">
        <div className="activatorHeader">
        </div>
        <div className="randomQuestion">
          <h3>Question: {this.props.reduxState.randomQuestion.question}?</h3>
          <h3 className="questionAnswer">Answer: {this.props.reduxState.randomQuestion.answer}</h3>
        </div>
        <div className="activatorForm">
          <h1 className="headerText">Create an Activator</h1>
          <form className={classes.form}>
            <FormControl variant="outlined" className={classes.formControl}>
                <TextField
                id="class_id"
                select
                label="Select A Class Period"
                value={this.state.newActivator.class_id}
                onChange={this.handleChange('class_id')}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                margin="normal"
                variant="outlined"
                style = {{width: 200}}
              >
                <MenuItem disabled>Select a Class Period</MenuItem>
                {this.props.reduxState.classes.map( classes =>
                      <MenuItem value={classes.class_id} key={classes.class_id}>{classes.class_period}</MenuItem>
                      )}
                    
              </TextField>
            </FormControl>
            
            <FormControl className={classes.formControl}>
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
                    style = {{width: 200}}
                      />
            </FormControl>

            <FormControl className={classes.formControl}>
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
                    style = {{width: 200}}
                />
            </FormControl>

            <FormControl className={classes.formControl}>
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
                  style = {{width: 200}}
                  className={classes.textField}
                />
            </FormControl>
            
            <FormControl className={classes.formControl}>
                <TextField
                id="question_type"
                select
                label="Select A Question Type"
                value={this.state.newActivator.question_type}
                onChange={this.handleChange('question_type')}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                margin="normal"
                variant="outlined"
                style = {{width: 200}}
              >
                <MenuItem disabled>Choose a Question Type</MenuItem>
                    <MenuItem value={'Text_Question'}>Text Question</MenuItem>
                    <MenuItem value={'Multiple_Choice_Question'}>Multiple Choice Question</MenuItem>
              </TextField>
            </FormControl>
            
            <FormControl className={classes.formControl}>
                <TextField
                    placeholder="Type Question Here"
                    multiline={true}
                    rows={6}
                    variant="outlined"
                    value={this.state.newActivator.question}
                    onChange={this.handleChange('question')}
                />
            </FormControl>

              {this.displayMCOptions()}

              <Button onClick={this.handleSubmit}>Create Activator</Button>
        </form>
      </div>
    </div>
    );
  }
}

const styles = theme => ({
 
  formControl:{
    margin: '0 auto',
    marginTop: '20px',
    display: 'block',  
  },
})





const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect( mapReduxStateToProps )(withStyles(styles)(CreateActivator));