import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getTeacherSaga(action) {
    console.log('in getTeacherSaga');
    try{
        const response = yield axios.get('/teacher');
        console.log('Response is', response);
        yield put({type:'SET_TEACHER', payload: response.data});
    }
    catch (error) {
        console.log('ERROR IN GET', error);
        alert(`Sorry! Unable to get teacher data. Try again later.`)
    }
}

function* teacherSaga() {
  yield takeLatest('GET_TEACHER', getTeacherSaga);
}

export default teacherSaga;
