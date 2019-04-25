
const studentClassReducer = (state = [], action) => {
    console.log('in studentClassReducer');
    switch (action.type) {
      case 'SET_STUDENT_CLASS':
        return action.payload
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default studentClassReducer;
  