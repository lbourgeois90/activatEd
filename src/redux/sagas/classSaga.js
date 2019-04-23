import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addClassSaga(action) {
    console.log('in addClassSaga');
    try{
        yield axios.post('/classes', action.payload);
    }
    catch (error) {
        console.log('ERROR IN POST addClassSaga', error);
        alert(`Sorry! Unable to add class. Try again later.`)
    }
}


function* getClassSaga(action) {
    console.log('in getClassSaga');
    try{
        const response = yield axios.get('/classes');
        console.log('Response is', response);
        yield put({type:'SET_CLASS', payload: response.data});
    }
    catch (error) {
        console.log('ERROR IN GET', error);
        alert(`Sorry! Unable to get class data. Try again later.`)
    }
}


function* classSaga() {
  yield takeLatest('ADD_CLASS', addClassSaga);
  yield takeLatest('GET_CLASS', getClassSaga)
}

export default classSaga;
