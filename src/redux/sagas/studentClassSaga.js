import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';



function* getStudentClassSaga(action) {
    console.log('in getStudentClassSaga');
    try{
        const response = yield axios.get('/studentClasses');
        console.log('Response is', response);
        yield put({type:'SET_STUDENT_CLASS', payload: response.data});
    }
    catch (error) {
        console.log('ERROR IN GET', error);
        alert(`Sorry! Unable to get student class data. Try again later.`)
    }
}


function* studentClassSaga() {
  yield takeLatest('GET_STUDENT_CLASS', getStudentClassSaga)
}

export default studentClassSaga;
