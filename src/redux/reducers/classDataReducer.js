
const classDataReducer = (state = [], action) => {
    console.log('in classDataReducer');
    switch (action.type) {
      case 'SET_CLASSDATA':
        return action.payload
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default classDataReducer;
  