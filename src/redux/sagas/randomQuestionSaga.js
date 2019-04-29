import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';



function* getRandomQuestion(action) {
    console.log('in getRandomQuestion');
    try{
        const response = yield axios.get('/randomquestion');
        console.log('Response is', response);
        yield put({type:'SET_RANDOM_QUESTION', payload: response.data});
    }
    catch (error) {
        console.log('ERROR IN GET getRandomQuestion', error);
        alert(`Sorry! Unable to get random question. Try again later.`)
    }
}


function* randomQuestionSaga() {
  yield takeLatest('GET_RANDOM_QUESTION', getRandomQuestion)
}

export default randomQuestionSaga;
