import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addProfileSaga(action) {
    console.log('in addProfileSaga');
    try{
        yield axios.post('/profile', action.payload);
    }
    catch (error) {
        console.log('ERROR IN POST', error);
        alert(`Sorry! Unable to add profile. Try again later.`)
    }
}

function* profileSaga() {
  yield takeLatest('ADD_PROFILE', addProfileSaga);
}

export default profileSaga;
