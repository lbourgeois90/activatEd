import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addActivatorSaga(action) {
    console.log('in addActivatorSaga');
    console.log(action.payload);
    try{
        yield axios.post('/activator', action.payload);
    }
    catch (error) {
        console.log('ERROR IN POST ACTIVATOR', error);
        alert(`Sorry! Unable to add activator. Try again later.`)
    }
}

function* activatorSaga() {
  yield takeLatest ('ADD_ACTIVATOR', addActivatorSaga);
}

export default activatorSaga;
