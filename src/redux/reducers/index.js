import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
import profile from './profileReducer';
import teacher from './teacherReducer';
import classes from './classReducer';
import student from './studentReducer';
import classData from './classDataReducer';
import studentClass from './studentClassesReducer';
import quote from './quoteReducer';
import randomQuestion from './randomQuestionReducer';
import activator from './activatorReducer';
import activatorConditional from './activatorConditionReducer';
import multipleChoice from './multipleChoiceReducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  profile,
  teacher,
  classes,
  student,
  classData,
  studentClass,
  quote,
  randomQuestion,
  activator,
  activatorConditional,
  multipleChoice,
});

export default rootReducer;
