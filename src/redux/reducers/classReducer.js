
const classReducer = (state = [], action) => {
    console.log('in classReducer');
    switch (action.type) {
      case 'SET_CLASS':
        return action.payload
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default classReducer;
  