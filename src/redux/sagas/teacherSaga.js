import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getTeacherSaga(action) {
    console.log('in addProfileSaga');
    try{
        yield axios.post('/teacher', action.payload);
    }
    catch (error) {
        console.log('ERROR IN POST', error);
        alert(`Sorry! Unable to add profile. Try again later.`)
    }
}

function* teacherSaga() {
  yield takeLatest('GET_TEACHER', getTeacherSaga);
}

export default teacherSaga;
