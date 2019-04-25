import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getAnswerSaga(action) {
    console.log('in getAnswerSaga');
    console.log(action.payload);
    try{
        const response = yield axios.get(`/answer/?class_id=${action.payload.class_id}&date=${action.payload.date}`, {
         
        });
        console.log('Response is', response);
        // yield put({type:'SET_CLASS', payload: response.data});
    }
    catch (error) {
        console.log('ERROR IN GET', error);
        alert(`Sorry! Unable to get answers data. Try again later.`)
    }
}




function* answerSaga() {
  yield takeLatest ('GET_ANSWERS', getAnswerSaga);
}

export default answerSaga;
