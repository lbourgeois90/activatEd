import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addStudentSaga(action) {
    console.log('in addStudentSaga');
    try{
        yield axios.post('/student', action.payload);
        yield put({type: 'GET_STUDENT'});
    }
    catch (error) {
        console.log('ERROR IN POST STUDENT', error);
        alert(`Sorry! Unable to add student. Try again later.`)
    }
}


function* getStudentSaga(action) {
    console.log('in getStudentSaga');
    try{
        const response = yield axios.get('/student');
        console.log('Response is', response);
        yield put({type:'SET_STUDENT', payload: response.data});
    }
    catch (error) {
        console.log('ERROR IN GET', error);
        alert(`Sorry! Unable to get student data. Try again later.`)
    }
}


function* deleteStudentSaga(action) {
    console.log('in deleteStudentSaga');
    try{
        yield axios.delete('/student', action.payload);
    }
    catch (error) {
        console.log('ERROR IN DELETE STUDENT', error);
        alert(`Sorry! Unable to delete student. Try again later.`)
    }
}






function* studentSaga() {
  yield takeLatest('ADD_STUDENT', addStudentSaga);
  yield takeLatest ('GET_STUDENT', getStudentSaga);
  yield takeLatest ('DELETE_STUDENT', deleteStudentSaga);
}

export default studentSaga;
