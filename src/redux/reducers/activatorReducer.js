
const activatorReducer = (state = {}, action) => {
    console.log('in activatorReducer');
    switch (action.type) {
      case 'SET_ACTIVATOR':
        return {...action.payload}
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default activatorReducer;
  