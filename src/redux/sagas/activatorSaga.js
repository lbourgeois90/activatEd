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



function* getActivatorSaga(action) {
    console.log('in getActivatorSaga');
    try{
        const response = yield axios.get('/activator', {
           
        });
        console.log('Response is', response);
        // yield put({type:'SET_ACTIVATOR', payload: response.data});
    }
    catch (error) {
        console.log('ERROR IN GET', error);
        alert(`Sorry! Unable to get activator. Try again later.`)
    }
}




function* activatorSaga() {
  yield takeLatest ('ADD_ACTIVATOR', addActivatorSaga);
  yield takeLatest ('GET_ACTIVATOR', getActivatorSaga);
}

export default activatorSaga;
