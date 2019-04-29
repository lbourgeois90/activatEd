const randomQuestionReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_RANDOM_QUESTION':
        return {...action.payload};
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default randomQuestionReducer;
