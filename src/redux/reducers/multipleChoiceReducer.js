
const multipleChoiceReducer = (state = {}, action) => {
    console.log('in multipleChoiceReducer');
    switch (action.type) {
      case 'SET_MULTIPLE_CHOICE':
        return {...action.payload}
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default multipleChoiceReducer;
  