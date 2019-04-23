import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addStudentSaga(action) {
    console.log('in addStudentSaga');
    try{
        yield axios.post('/student', action.payload);
    }
    catch (error) {
        console.log('ERROR IN POST STUDENT', error);
        alert(`Sorry! Unable to add student. Try again later.`)
    }
}

function* studentSaga() {
  yield takeLatest('ADD_STUDENT', addStudentSaga);
}

export default studentSaga;
